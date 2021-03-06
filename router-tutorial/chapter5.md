### **React Router**

---

<br>

라우터 적용은 index.js 에서 BrowserRouter 라는 컴포넌트를 사용하여 구현한다.

index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // * BrowserRouter 불러오기
import App from './App';

// * App 을 BrowserRouter 로 감싸기
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

이제 라우트로 사용 할 페이지 컴포넌트를 만들 차례다.

Home.js

```js
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>이곳은 홈이에요. 가장 먼저 보여지는 페이지죠.</p>
    </div>
  );
};

export default Home;
```

About.js

```js
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.</p>
    </div>
  );
};

export default About;
```

<br>

### Route: 특정 주소에 컴포넌트 연결하기

<br>

사용자가 요청하는 주소에 따라 다른 컴포넌트를 보여주도록 한다.

이 작업을 할 때에는 `Route` 라는 컴포넌트를 사용한다.

사용방식은 다음과 같다.

```js
<Route path="주소규칙" component={보여주고싶은 컴포넌트}>
```

App.js

```js
import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

`/about` 경로로 들어가면 예상과는 다르게 Home 컴포넌트와 About 컴포넌트가 같이 나온다.

이는 /about 경로가 / 규칙과도 일치하기 때문에 발생한 현상인데, 이를 고치기 위해선 Home 을 위한 라우트에 exact 라는 props 를 true 로 설정하면 된다.

```js
<Route path="/" exact={true} component={Home} />
```

<br>

### Link: 누르면 다른 주소로 이동시키기

<br>

Link 컴포넌트는 클릭하면 다른 주소로 이동시키는 컴포넌트다.

리액트 라우터를 사용할땐 일반 `<a href="...">...</a>` 태그를 사용하면 안된다.

만약에 하신다면 `onClick` 에 `e.preventDefault()` 를 호출하고 따로 자바스크립트로 주소를 변환시켜주어야 한다.

그 대신에 `Link` 라는 컴포넌트를 사용해야하는데, 그 이유는 a 태그의 기본적인 속성은 페이지를 이동시키면서, 페이지를 아예 새로 불러오게 되기 때문이다.

그렇게 되면서 우리 리액트 앱이 지니고있는 상태들도 초기화되고, 렌더링된 컴포넌트도 모두 사라지고 새로 렌더링을 하게 된다.

그렇기 때문에 a 태그 대신에 Link 컴포넌트를 사용하는데, 이 컴포넌트는 HTML5 History API 를 사용하여 브라우저의 주소만 바꿀뿐 페이지를 새로 불러오지는 않는다.

App.js

```js
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

### 파라미터와 쿼리

<br>

페이지 주소를 정의 할 때, 우리는 유동적인 값을 전달해야 할 때도 있다. 이는 파라미터와 쿼리로 나뉘어질 수 있다.

```js
파라미터: /profiles/velopert
쿼리: /about?details=true
```

이것을 사용하는것에 대하여 무조건 따라야 하는 규칙은 없지만, 일반적으로는 `파라미터`는 특정 `id` 나 이름을 가지고 조회를 할 때 사용하고, `쿼리`의 경우엔 어떤 키워드를 검색하거나, 요청을 할 때 필요한 옵션을 전달 할 때 사용된다.

### URL Params

Profile 페이지에서 파라미터를 사용해본다.

`/profile/velopert` 이런식으로 뒷부분에 `username` 을 넣어줄 때 해당 값을 파라미터로 받아와본다.

`Profile` 이라는 컴포넌트를 만들어서 파라미터를 받아오는 예제 코드를 작성해보자.

Profile.js

```js
import React from 'react';

// 프로필에서 사용 할 데이터
const profileData = {
  velopert: {
    name: '김민준',
    description: 'Frontend Engineer @ Laftel Inc. 재밌는 것만 골라서 하는 개발자',
  },
  gildong: {
    name: '홍길동',
    description: '전래동화의 주인공',
  },
};

const Profile = ({ match }) => {
  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조합니다.
  const { username } = match.params;
  const profile = profileData[username];
  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

파라미터를 받아올 땐 `match` 안에 들어있는 `params` 값을 참조한다.

`match` 객체안에는 현재의 주소가 `Route` 컴포넌트에서 정한 규칙과 어떻게 일치하는지에 대한 정보가 들어있다.

이제 Profile 을 App 에서 적용해볼건데, path 규칙에는 `/profiles/:username` 이라고 넣어주면 `username` 에 해당하는 값을 파라미터로 넣어주어서 Profile 컴포넌트에서 `match props` 를 통하여 전달받을 수 있게 된다.

App.js

```js
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default App;
```

`/profiles/velopert` 경로로 직접 입력하여 들어가보자.

<br>

### Query

<br>

이번엔 About 페이지에서 쿼리를 받아온다. 쿼리는 라우트 컴포넌트에게 `props` 전달되는 `location` 객체에 있는 `search` 값에서 읽어올 수 있다.

`location` 객체는 현재 앱이 갖고있는 주소에 대한 정보를 지니고있다.

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

여기서 `search` 값을 확인해야하는데, 이 값은 문자열 형태로 되어있다.

객체 형태로 변환하는건 우리가 직접 해주어야 하다.

이 작업은 `qs` 라는 라이브러리를 사용하여 쉽게 할 수 있다.

이 라이브러리를 설치해준다:

```js
yarn add qs
```

이제, About 컴포넌트에서 search 값에있는 `detail` 값을 받아와서, 해당 값이 `true` 일때 추가정보를 보여주도록 구현을 해본다.

About.js

```js
import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const detail = query.detail === 'true'; // 쿼리의 파싱결과값은 문자열입니다.

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.</p>
      {detail && <p>추가적인 정보가 어쩌고 저쩌고..</p>}
    </div>
  );
};

export default About;
```

`/about?detail=true` 경로에 한번 들어가본다.

<br>

### 서브라우트

<br>

서브 라우트는, 라우트 내부의 라우트를 만드는것을 의미한다. 이 작업은 그렇게 복잡하지 않다. 그냥 컴포넌트를 만들어서 그 안에 또 Route 컴포넌트를 렌더링하면 된다.

한번 Profiles 라는 컴포넌트를 만들어서, 그 안에 각 유저들의 프로필 링크들과 프로필 라우트를 함께 렌더링해보자.

Profiles.js

```js
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route path="/profiles" exact render={() => <div>유저를 선택해주세요.</div>} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

위 코드에서 첫번째 Route 컴포넌트에서는 component 대신에 render 가 사용되었는데, 여기서는 컴포넌트가 아니라, JSX 자체를 렌더링 할 수 있다.

JSX 를 렌더링하는 것이기에, 상위 영역에서 props 나 기타 값들을 필요하면 전달 해 줄 수 있다.

그 다음, App 에서 Profiles 를 위한 링크와 라우트를 생성해준다. (기존 Profiles 라우트는 제거.)

```js
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
};

export default App;
```

만약에 여러분이 만들게되는 서비스에서 특정 라우트 내에 탭 같은것을 만들게 된다면, 단순히 state 로 관리하는 것 보다 서브 라우트로 관리를 하는 것을 권장한다.

그 이유는, setState 같은것을 할 필요도 없고, 링크를 통하여 다른 곳에서 쉽게 진입 시킬 수도 있고, 나중에 검색엔진 크롤링 까지 고려한다면, 검색엔진 봇이 더욱 다양한 데이터를 수집해 갈 수 있기 때문이다.

<br>

### 라우터 부가기능

<br>

**history 객체**

`history` 객체는 라우트로 사용된 컴포넌트에게 `match, location` 과 함께 전달되는 `props` 중 하나다. 이 객체를 통하여, 우리가 컴포넌트 내에 구현하는 메소드에서 라우터에 직접 접근을 할 수 있다 - 뒤로가기, 특정 경로로 이동, 이탈 방지 등..

한번, 이 객체를 사용하는 예제 페이지를 작성해본다.

HistorySample.js

```js
import React, { useEffect } from 'react';

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    console.log(history);
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
}

export default HistorySample;
```

App.js

```js
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
    </div>
  );
};

export default App;
```

이렇게 `history` 객체를 사용하면 조건부로 다른 곳으로 이동도 가능하고, 이탈을 메시지박스를 통하여 막을 수도 있다.

### withRouter HoC

`withRouter HoC` 는 라우트 컴포넌트가 아닌곳에서 `match / location / history` 를 사용해야 할 때 쓰면 된다.

WithRouterSample.js

```js
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

Profiles.js

```js
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route path="/profiles" exact render={() => <div>유저를 선택해주세요.</div>} />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

`withRouter` 를 사용하면, 자신의 부모 컴포넌트 기준의 `match` 값이 전달된다. 그래서 현재 gildong 이라는 URL Params 가 있는 상황임에도 불구하고 params 쪽이 `{}` 이렇게 비어있다. `WithRouterSample` 은 Profiles 에서 렌더링 되었고, 해당 컴포넌트는 `/profile` 규칙에 일치하기 때문에 이러한 결과가 나타났다.

<br>

### Switch

`Switch` 는 여러 `Route` 들을 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링시켜준다. `Switch` 를 사용하면, 아무것도 일치하지 않았을때 보여줄 Not Found 페이지를 구현 할 수도 있다.

App.js

```js
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route
          // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
```

<br>

### NavLink

`NavLink` 는 `Link` 랑 비슷한데, 만약 현재 경로와 `Link` 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용 할 수 있는 컴포넌트다.

Profiles.js

```js
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <NavLink to="/profiles/velopert" activeStyle={{ background: 'black', color: 'white' }}>
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink to="/profiles/gildong" activeStyle={{ background: 'black', color: 'white' }}>
            gildong
          </NavLink>
        </li>
      </ul>

      <Route path="/profiles" exact render={() => <div>유저를 선택해주세요.</div>} />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

만약에 스타일이 아니라 CSS 클래스를 적용하시고 싶으면 `activeStyle` 대신 `activeClassName` 을 사용하면 된다.

<br>

이후 문서정리 부분은 너무 예전거라 생략..
