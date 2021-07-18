import { Link, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록 : </h3>
      <ui>
        <li>
          <NavLink to="/profiles/testUser1" activeStyle={{ background: 'black', color: 'white' }}>
            User1
          </NavLink>
        </li>
        <li>
          <NavLink to="/profiles/testUser2" activeStyle={{ background: 'black', color: 'white' }}>
            User2
          </NavLink>
        </li>
      </ui>

      <Route path="/profiles" exact render={() => <div>사용자를 선택하라.</div>} />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
