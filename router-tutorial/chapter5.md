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
