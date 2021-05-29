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

### **조건부 렌더링**

---

<br>

조건부 렌더링이란, 특정 조건에 따라 다른 결과물을 렌더링 하는 것을 의미한다.

예를 들어서, App 컴포넌트에서 Hello 컴포넌트를 사용 할 때, isSpecial 이라는 props 를 설정해본다.

App.js

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

여기서 true 는 자바스크립트 값이기 때문에 중괄호로 감싸주었다.

그리고, Hello 컴포넌트에서는 isSpecial 이 true 이냐 false 이냐에 따라서 컴포넌트의 좌측에 \* 표시를 보여주게한다.

이를 처리하는 가장 기본적인 방법은, 삼항연산자를 사용하는 것.

Hello.js

```js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial ? <b>*</b> : null}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;
```

isSpecial 값이 true 라면 `<b>*</b>` 를, 그렇지 않다면 `null` 을 보여주도록 했다. 참고로 JSX 에서 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않게 된다.

보통 삼항연산자를 사용한 조건부 렌더링을 주로 특정 조건에 따라 보여줘야 하는 내용이 다를 때 사용한다.

지금은 내용이 달라지는게 아니라, 단순히 특정 조건이 true 이면 보여주고, 그렇지 않다면 숨겨주고 있는데, 이러한 상황에서는 && 연산자를 사용해서 처리하는 것이 더 간편하다.

Hello.js

```js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;
```

`isSpecial && <b>*</b>` 의 결과는 isSpecial 이 false 일땐 false 이고, isSpecial이 true 일 땐 `<b>*</b>` 가 된다.

컴포넌트의 props 값을 설정하게 될 때 만약 props 이름만 작성하고 값 설정을 생략한다면, 이를 true 로 설정한 것으로 간주한다.

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

이렇게 isSpecial 이름만 넣어주면 isSpecial={true} 와 동일한 의미이다.

<br>

### **useState**

---

<br>

컴포넌트에서 보여줘야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 어떻게 구현할 수 있는지에 대하여 알아보자.

리액트 16.8 이전 버전에서는 함수형 컴포넌트에서는 상태를 관리할 수 없었다. 리액트 16.8 에서 Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태를 관리할 수 있게 되었다. 이번에는 useState 라는 함수를 사용해보게 되는데, 이게 바로 리액트의 Hooks 중 하나이다.

정말 진부한 예제인, 버튼을 누르면 숫자가 바뀌는 Counter 컴포넌트를 만들어본다.

<br>

Counter.js

```js
import React from 'react';

function Counter() {
  return (
    <div>
      <h1>0</h1>
      <button>+1</button>
      <button>-1</button>
    </div>
  );
}

export default Counter;
```

App.js

```js
import React from 'react';
import Counter from './Counter';

function App() {
  return <Counter />;
}

export default App;
```

<br>

이제, Counter 에서 버튼이 클릭되는 이벤트가 발생 했을 때, 특정 함수가 호출되도록 설정을 해본다.

Counter.js

```js
import React from 'react';

function Counter() {
  const onIncrease = () => {
    console.log('+1');
  };
  const onDecrease = () => {
    console.log('-1');
  };
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

여기서 onIncrease 와 onDecrease 는 화살표 함수를 사용하여 구현을 해주었다.

함수를 만들고, button 의 onClick 으로 각 함수를 연결해주었다. 리액트에서 엘리먼트에 이벤트를 설정해줄때에는 `on이벤트이름 = {실행하고싶은함수}` 형태로 설정해주어야 한다. (사실 이름은 크게 상관은 없다.)

여기서 주의하셔야 하는 점은, 함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하시면 안된다.

```js
onClick={onIncrease()}
```

이렇게 하면 **렌더링되는 시점에서 함수가 호출되버리기 때문이다.**

이벤트를 설정할때에는 함수타입의 값을 넣어주어야 한다.

<br>

컴포넌트에서 동적인 값을 상태(state)라고 부른다. 리액트에 useState 라는 함수가 있는데, 이것을 사용하면 컴포넌트에서 상태를 관리 할 수 있다.

Counter.js

```js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
  };

  const onDecrease = () => {
    setNumber(number - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

<br>

```js
import React, { useState } from 'react';
```

위의 코드는 리액트 패키지에서 `useState` 라는 함수를 불러와 준다.

```js
const [number, setNumber] = useState(0);
```

`useState` 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출해준다. 이 함수를 호출해주면 배열이 반환되는데, 여기서 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수다.

```js
const numberState = useState(0);
const number = numberState[0];
const setNumber = numberState[1];
```

원래는 위와 같이 해야하지만, `배열 비구조화 할당` 을 통하여 각 원소를 추출해준 것이다.

```js
const onIncrease = () => {
  setNumber(number + 1);
};

const onDecrease = () => {
  setNumber(number - 1);
};
```

Setter 함수는 파라미터로 전달 받은 값을 최신 상태로 설정해준다.

```js
<h1>{number}</h1>
```

h1 태그에서는 이제 0 이 아닌 {number} 값을 보여주어야 한다.

<br>

지금은 Setter 함수를 사용 할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있다.

그 대신에 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있다.

Counter.js

```js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

onIncrease 와 onDecrease 에서 setNumber 를 사용 할 때 그 다음 상태를 파라미터로 넣어준것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어주었다.

함수형 업데이트는 주로 나중에 컴포넌트를 최적화를 하게 될 때 사용하게 된다. 지금 당장은 함수형 업데이트란게 있는 것 정도만 이해해두시면 충분하다.

<br>
