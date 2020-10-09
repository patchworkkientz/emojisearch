import React, {useState, useRef} from 'react';
import './App.css';
import emojis from './assets/emojiList.json';
import SearchInput from './SearchInput/SearchInput';
import Results from './Results/Results';
import Modal from './UI/Modal/Modal';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  let search = useRef();

  const [current, set] = useState({
    objects: emojis,
    results: emojis,
    selection: [],
    hideModal: true,
  });

  function searchResults() {
    const n = {...current};

    const s = search.current.value.toLowerCase();

    let results = [];

    let search1 = n.objects.filter(val => {
      return val.title.toLowerCase() === s;
    });

    results = search1;

    let search2 = n.objects.filter(val => {
      return val.title.toLowerCase().split(" ")[0] === s && !results.includes(val);
    });

    results = results.concat(search2);

    let search3 = n.objects.filter(val => {
      return val.title.toLowerCase().split(" ").includes(s) && !results.includes(val);
    });

    results = results.concat(search3);

    let search4 = n.objects.filter(val => {
      return val.keywords.toLowerCase().split(" ").includes(s) && !results.includes(val);
    });

    results = results.concat(search4);

    const re = new RegExp(`^${s}`);

    let search5 = n.objects.filter(val => {
      return re.test(val.title.toLowerCase()) && !results.includes(val);
    });

    results = results.concat(search5);

    let search6 = n.objects.filter(val => {
      return (val.title.toLowerCase().includes(s) || val.keywords.toLowerCase().includes(s)) && !results.includes(val);
    });

    results = results.concat(search6);

    n.results = results;

    set(n);
  }

  function addEmoji(obj) {
    const n = {...current};
    n.hideModal = false;
    if (!n.selection.includes(obj)) n.selection.push(obj);
    set(n);
    window.scrollTo(0, 0);
  }

  function closeModal() {
    const n = {...current};
    n.hideModal = true;
    set(n);
  }

  function clickKeyword(val) {
    search.current.value = val;
    searchResults();
    window.scrollTo(0, 0);
  }

  function removeEmoji(index) {
    const n = {...current};
    n.selection.splice(index, 1);
    console.log(n.selection);
    set(n);
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <SearchInput current={current} search={search} searchFunction={searchResults} removeEmoji={removeEmoji}/>
          <Results current={current} addEmoji={addEmoji} clickKeyword={clickKeyword}/>
          <Modal current={current} close={closeModal} removeEmoji={removeEmoji}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
