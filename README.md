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

### **Input 상태 관리**

---

<br>

InputSample.js

```js
import React from 'react';

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}

export default InputSample;
```

App.js

```js
import React from 'react';
import InputSample from './InputSample';

function App() {
  return <InputSample />;
}

export default App;
```

input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록 구현을 해본다.

이번에도, useState 를 사용한다. 이번에는 input 의 onChange 라는 이벤트를 사용하는데, 이벤트에 등록하는 함수에서는 이벤트 객체 e 를 파라미터로 받아와서 사용 할 수 있다. 이 객체의 e.target 은 이벤트가 발생한 DOM 인 input DOM 을 가르키게됩니다. 이 DOM 의 value 값, 즉 e.target.value 를 조회하면 현재 input 에 입력한 값이 무엇인지 알 수 있다.

이 값을 useState 를 통해서 관리를 해주면 된다.

InputSample.js

```js
import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```

input 의 상태를 관리할 때에는 input 태그의 value 값도 설정해주는 것이 중요하다.

그렇게 해야, 상태가 바뀌었을때 input 의 내용도 업데이트 된다.

<br>

이번에는 input 이 여러개일때는 어떻게 관리해야 하는지 알아본다.

우선 지난번에 만든 InputSample 에서 새로운 input 을 보여주세요.

이번에는 input 이 비어져있을 때 인풋에 대한 설명을 보여주는 placeholder 값도 설정해본다.

InputSample.js

```js
import React, { useState } from 'react';

function InputSample() {
  const onChange = (e) => {};

  const onReset = () => {};

  return (
    <div>
      <input placeholder="이름" />
      <input placeholder="닉네임" />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        이름 (닉네임)
      </div>
    </div>
  );
}

export default InputSample;
```

input 의 개수가 여러개가 됐을때는, 단순히 useState 를 여러번 사용하고 onChange 도 여러개 만들어서 구현 할 수 있다. 하지만 그 방법은 가장 좋은 방법은 아니다.

더 좋은 방법은, input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이다. 그리고, useState 에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 한다.

InputSample.js

```js
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

<br>

리액트 상태에서 객체를 수정해야 할 때에는 이런식으로 직접 수정하면 안된다.

```js
inputs[name] = value;
```

그 대신 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 한다.

```js
setInputs({
  ...inputs,
  [name]: value,
});
```

이러한 작업을, "불변성을 지킨다" 라고 부른다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행된다.

만약에 `inputs[name] = value` 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다.

추가적으로, 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다.

지금은 이것만 기억하자.

리액트에서 객체를 업데이트하게 될 때에는 **기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서** 새 객체에 변화를 주어야 된다.

<br>

### **useRef**

---

<br>

JavaScript 를 사용 할 때에는, 우리가 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택한다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있다.

예를 들어서 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야된다던지, 또는 포커스를 설정해줘야된다던지 등 정말 다양한 상황이 있다. 추가적으로 Video.js, JWPlayer 같은 HTML5 Video 관련 라이브러리, 또는 D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리를 사용해야 할 때에도 특정 DOM 에다 적용하기 때문에 DOM 을 선택해야 하는 상황이 발생 할 수 있다.

그럴 땐, 리액트에서 ref 라는 것을 사용한다.

함수형 컴포넌트에서 ref 를 사용 할 때에는 useRef 라는 Hook 함수를 사용한다.

클래스형 컴포넌트에서는 콜백 함수를 사용하거나 React.createRef 라는 함수를 사용하는데, 나중에 알아보자. (참고로, 클래스 컴포넌트를 나중에 다루는 이유는, 이제 별로 중요하지 않기 때문이다.)

우리가 만든 InputSample 에서는 초기화 버튼을 누르면 포커스가 초기화 버튼에 그대로 남아있게 된다.

한번, 초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡히도록 useRef 를 사용하여 기능을 구현해본다.

InputSample.js

```js
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 한다. 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 된다.

위 예제에서는 onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해주었다.

<br>

### **배열 렌더링**

---

<br>

아래의 배열이 있다고 가정한다.

```js
const users = [
  {
    id: 1,
    username: 'velopert',
    email: 'public.velopert@gmail.com',
  },
  {
    id: 2,
    username: 'tester',
    email: 'tester@example.com',
  },
  {
    id: 3,
    username: 'liz',
    email: 'liz@example.com',
  },
];
```

만약에 이 내용을 컴포넌트로 렌더링한다면 어떻게 해야 할까.

일단, 가장 기본적인 방법으론 비효율적이지만, 그냥 그대로 코드를 작성하는 것이다.

UserList.js

```js
import React from 'react';

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];
  return (
    <div>
      <div>
        <b>{users[0].username}</b> <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b> <span>({users[1].email})</span>
      </div>
    </div>
  );
}

export default UserList;
```

그런데, 재사용되는 코드를 일일히 넣는게 별로 좋지 않으니, 컴포넌트를 재사용 할 수 있도록 새로 만들어준다.

참고로, 한 파일에 여러개의 컴포넌트를 선언해도 괜찮다.

UserList.js

```js
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];

  return (
    <div>
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    </div>
  );
}

export default UserList;
```

배열이 고정적이라면 상관없겟지만, 배열의 인덱스를 하나하나 조회해가면서 렌더링하는 방법은 동적인 배열을 렌더링하지 못한다.

동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 `map()` 을 사용한다.

`map()` 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을 만들어준다.

리액트에서 동적인 배열을 렌더링해야 할 때는 이 함수를 사용하여 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면 된다.

UserList.js

```js
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
}

export default UserList;
```

이렇게 하면 배열의 모든 원소가 렌더링된다. 하지만, 여기서 끝이 아니다.

브라우저에서 콘솔을 열어보면 다음과 같은 에러가 보여질 것이다.

`Warning: Each child in alistshould bave a unique "key" prop.`

리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정해야 한다.

key 값은 각 원소들마다 가지고 있는 고유값으로 설정을 해야한다. 지금의 경우엔 id 가 고유 값.

UserList.js

```js
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

만약 배열 안의 원소가 가지고 있는 고유한 값이 없다면 `map()` 함수를 사용 할 때 설정하는 콜백함수의 두번째 파라미터 index 를 key 로 사용하면 된다.

```js
<div>
  {users.map((user, index)=> (
    <User user={user} key={index}>
  ))}
</div>
```

만약에 배열을 렌더링 할 때 key 설정을 하지 않게된다면 기본적으로 배열의 index 값을 key 로 사용하게 되고, 아까 봤었던 경고메시지가 뜨게 된다.

이렇게 경고 메시지가 뜨는 이유는, 각 고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링 될 수 있기 때문이다.

때문에, 배열을 렌더링 할 때에는 고유한 key 값이 있는것이 중요하며, 만약에 배열안에 중복되는 key 가 있을 때에는 렌더링시에 오류메시지가 콘솔에 나타나게 되며, 업데이트가 제대로 이루어지지 않게 된다.

<br>

### **useRef 로 컴포넌트 안의 변수 만들기**

---

<br>

컴포넌트에서 특정 DOM 을 선택해야 할 때, `ref` 를 사용해야 한다고 배웠다. 그리고, 함수형 컴포넌트에서 이를 설정 할 때 `useRef` 를 사용하여 설정한다고 배웠다.

`useRef` Hook 은 DOM 을 선택하는 용도 외에도, 다른 용도가 한가지 더 있는데, 바로 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 것이다.

`useRef` 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않는다.

리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그 다음 렌더링 이후로 업데이트 된 상태를 조회 할 수 있는 반면, useRef 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있다.

이 변수를 사용하여 다음과 같은 값을 관리 할 수 있다.

- `setTimeout`, `setInterval` 을 통해서 만들어진 id

- 외부 라이브러리를 사용하여 생성된 인스턴스

- scroll 위치

우리는, App 컴포넌트에서 `useRef` 를 사용하여 변수를 관리해볼건데, 용도는 우리가 앞으로 배열에 새 항목을 추가할 시, 새 항목에서 사용 할 고유 id 를 관리하는 용도다.

`useRef` 를 사용하여 변수를 관리하기 전에 해야 할 작업이 있다.

지금은 우리가 UserList 컴포넌트 내부에서 배열을 직접 선언해서 사용을 하고 있는데, 이렇게 UserList 에서 선언해서 사용하는 대신 이 배열을 App 에서 선언하고 UserList 에게 props 로 전달을 해준다.

App.js

```js
import React from 'react';

import UserList from './UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];
  return <UserList users={users} />;
}

export default App;
```

UserList.js

```js
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

이제 App 에서 `useRef()` 를 사용하여 nextId 라는 변수를 만들어보자.

App.js

```js
import React, { useRef } from 'react';
import UserList from './UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current += 1;
  };
  return <UserList users={users} />;
}

export default App;
```

`useRef()` 를 사용 할 때 파라미터를 넣어주면, 이 값이 .current 값의 기본값이 된다.

그리고 이 값을 수정 할때에는 `.current` 값을 수정하면 되고, 조회 할 때에는 `.current` 를 조회하면 된다.

<br>
