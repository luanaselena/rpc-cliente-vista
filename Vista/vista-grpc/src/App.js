import axios from 'axios';

function App() {

  axios.get('http://localhost:5000/hello').then(res => console.log(res));

  return (
    <div className="App">
      Hola
    </div>
  );
}

export default App;
