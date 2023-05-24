import './App.css';
import React, {useState, useEffect} from 'react';

import Article from './components/Article';


function App() {
  const [articles, setArticles] = useState([]);
  const [reddit, setReddit] = useState('webdev');

  useEffect(() => {
    fetch("https://www.reddit.com/r/"+ reddit +".json").then(res => {
      if (res.status != 200) {
        console.log("ERROR");
        return;
      }

      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children); 
        }
      });
    })
  }, [reddit]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className='input' value={reddit} onChange={e => setReddit(e.target.value)}/>
      </header>
      <div className='articles'>
        {
          (articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''
        }
      </div>
    </div>
  );
}

export default App;
