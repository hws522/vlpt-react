import { Link, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록 : </h3>
      <ui>
        <li>
          <Link to="/profiles/testUser1">User1</Link>
        </li>
        <li>
          <Link to="/profiles/testUser2">User2</Link>
        </li>
      </ui>

      <Route path="/profiles" exact render={() => <div>사용자를 선택하라.</div>} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
