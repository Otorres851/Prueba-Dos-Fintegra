import './App.css';
import { Title } from './Components/Title';
import SearchAge from './Components/SearchAge';

const App = () => {
  return (
    <div className="App">
      <Title>Age Predictor</Title>
      <SearchAge />
    </div>
  );
}

export default App;
