import { Link, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <div>
      <ui>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ui>
      <hr />

      <Route exact path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}

export default App;
