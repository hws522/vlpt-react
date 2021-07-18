import { Link, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profiles from './Profiles';

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
        <li>
          <Link to="/profiles">PROFILES</Link>
        </li>
      </ui>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
}

export default App;
