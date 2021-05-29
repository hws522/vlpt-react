# Start React with Velopert

<br>

### **JSX**

---

<br>

1. 태그는 닫혀있어야 한다.

   `<input></input>` , `<input />`

<br>

2. 두개이상의 태그는 하나의 태그로 감싸줘야 한다.

   ```jsx
   <div>
     <Hello />
     <div>Hi</div>
   </div>
   ```

   ```jsx
   <>
     <Hello />
     <div>Hi</div>
   </>
   ```

<br>

3. jsx 내부에서 javascript 의 내용을 보여주고 싶다면 {...} 를 감싸준다.

   ```jsx
   function App() {
     const name = 'react';
     return (
       // return 옆 괄호는 그저 가독성을 위해. 없어도 상관없다.
       <>
         <Hello />
         <div>{name}</div>
       </>
     );
   }

   // 출력 : react
   // {} 없으면 name 그대로 출력
   ```

<br>

4. jsx 에서 style 을 사용할 때는 객체 형태로 넣어줘야 한다.

   그리고 class 이름을 지정할 때는 class 대신 className 으로 지정한다.

   ```jsx
   const style = {
       background : 'gray',
   }
   return (
       <div style={style}>
           <div className='my-style'>
       </div>
   )

   ```

<br>

5. 주석은 이렇게 달아야 한다.

   ```jsx
   return (
     <>
       {/* 주석은 이렇게. */}
       <Hello
       //  이렇게도 가능.
       />
       <div style={style}>{name}</div>
       <div className="gray-box"></div>
     </>
   );
   ```

<br>
<br>

### **PROPS**

---

<br>

props 는 properties 의 줄임말이다. 우리가 어떠한 값을 컴포넌트에게 전달해줘야 할 때, props 를 사용한다.

App 컴포넌트에서 Hello 컴포넌트를 사용 할 때 name 이라는 값을 전달해주고 싶다고 가정한다면, 이렇게 코드를 작성하면 된다.

<br>
App.js

```js
import React from 'react';
import Hello from './Hello';

function App() {
  return <Hello name="react" />;
}

export default App;
```

Hello.js

```js
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다. props 는 객체 형태로 전달되며, 만약 name 값을 조회하고 싶다면 `props.name` 을 조회하면 된다.

<br>

Hello 컴포넌트에 또 다른 props 를 전달해본다.

App.js

```js
import React from 'react';
import Hello from './Hello';

function App() {
  return <Hello name="react" color="red" />;
}

export default App;
```

Hello.js

```js
import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
}

export default Hello;
```

props 내부의 값을 조회 할 때마다 `props. `를 입력하고 있는데, 함수의 파라미터에서 비구조화 할당 (혹은 구조 분해) 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있다.

Hello.js

```js
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

export default Hello;
```

<br>

컴포넌트에 props 를 지정하지 않았을 때, 기본적으로 사용 할 값을 설정하고 싶다면 컴포넌트에 `defaultProps` 라는 값을 설정하면 된다.

Hello.js

```js
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;
```

App.js

```js
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </>
  );
}

export default App;
```

<br>

컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children` 을 조회하면 된다.

이번에, `props.children` 을 사용하는 새로운 컴포넌트를 만들어본다.

Wrapper.js

```js
import React from 'react';

function Wrapper() {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return <div style={style}></div>;
}

export default Wrapper;
```

App.js

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

브라우저를 확인하면 Hello 컴포넌트들은 보여지지 않을 것이다.

내부의 내용이 보여지게 하기 위해서는 Wrapper 에서 `props.children` 을 렌더링해주어야 한다.

Wrapper.js

```js
import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
```

<br>
