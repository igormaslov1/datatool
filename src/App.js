import { useEffect } from 'react';
import './App.css';
import Header from './Header/Header.js'

function App() {

    useEffect(() => {
      fetch("/dftoanalyze").then(response =>
        response.json().then(data=> {
          console.log(data)
        }))
    }, [])
    
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
