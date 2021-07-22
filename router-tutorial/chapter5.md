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
