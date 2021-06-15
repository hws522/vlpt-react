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

우선 지난번에 만든 InputSample 에서 새로운 input 을 만든다.

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

### **배열에 항목 추가, 제거, 수정**

---

<br>

input 두개와 button 하나로 이루어진 CreateUser.js 라는 컴포넌트를 src 디렉터리에 만들어보자.

CreateUser.js

```js
import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input name="username" placeholder="계정명" onChange={onChange} value={username} />
      <input name="email" placeholder="이메일" onChange={onChange} value={email} />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;
```

이번 컴포넌트에서는 상태관리를 CreateUser 에서 하지 않고 부모 컴포넌트인 App 에서 하게 하고, input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 사용한다.

App.js

```js
import React, { useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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
  return (
    <>
      <CreateUser />
      <UserList users={users} />
    </>
  );
}

export default App;
```

CreateUser 컴포넌트에게 필요한 props 를 App 에서 준비한다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
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

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
    </>
  );
}

export default App;
```

그 다음, users 도 useState 를 사용하여 컴포넌트의 상태로서 관리해준다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
    </>
  );
}

export default App;
```

이제 배열에 변화를 줄 차례다.

배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다.

그렇기 때문에, 배열의 `push`, `splice`, `sort` 등의 함수를 사용하면 안된다.

만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야한다.

불변성을 지키면서 배열에 새 항목을 추가하는 방법은 두가지가 있다.

첫번째는 `spread` 연산자를 사용하는 것이다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
    </>
  );
}

export default App;
```

또 다른 방법은 `concat` 함수를 사용하는 것이다.

`concat` 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어준다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
    </>
  );
}

export default App;
```

<br>
<br>

배열에 항목을 제거 할 때에는 어떻게 해야 하는지 알아보자.

우선, UserList 에서 각 User 컴포넌트를 보여줄 때, 삭제 버튼을 렌더링해준다.

UserList.js

```js
import React from 'react';

function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default UserList;
```

User 컴포넌트의 삭제 버튼이 클릭 될 때는 `user.id` 값을 앞으로 props 로 받아올 `onRemove` 함수의 파라미터로 넣어서 호출해주어야 한다.

여기서 onRemove 는 "id 가 \_\_인 객체를 삭제해라" 라는 역할을 가지고 있다.

이 onRemove 함수는 UserList 에서도 전달 받을것이며, 이를 그대로 User 컴포넌트에게 전달해줄것이다.

이제, onRemove 함수를 구현해보자.

배열에 있는 항목을 제거할 때에는, 추가할 때와 마찬가지로 불변성을 지켜가면서 업데이트를 해주어야 한다.

불변성을 지키면서 특정 원소를 배열에서 제거하기 위해서는 `filter` 배열 내장 함수를 사용하는것이 가장 편하다.

이 함수는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어 준다.

App 컴포넌트에서 onRemove 를 다음과 같이 구현후, UserList 에게 전달한다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
```

<br>
<br>

배열 항목을 수정하는 방법을 알아보자.

User 컴포넌트에 계정명을 클릭했을때 색상이 초록색으로 바뀌고, 다시 누르면 검정색으로 바뀌도록 구현을 해본다.

우선, App 컴포넌트의 users 배열 안의 객체 안에 `active` 라는 속성을 추가해준다. (속성명은 아무거나 해도 된다.)

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
```

그 다음에는 User 컴포넌트에서 방금 넣어준 `active` 값에 따라 폰트의 색상을 바꿔주도록 구현을 해본다.

추가적으로, `cursor` 필드를 설정하여 마우스를 올렸을때 커서가 손가락 모양으로 변하도록 한다.

UserList.js

```js
import React from 'react';

function User({ user, onRemove }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
      >
        {user.username}
      </b>

      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default UserList;
```

이제 App.js 에서 `onToggle` 이라는 함수를 구현해보자.

배열의 불변성을 유지하면서 배열을 업데이트 할 때에도 `map` 함수를 사용 할 수 있다.

`id` 값을 비교해서 `id` 가 다르다면 그대로 두고, 같다면 `active` 값을 반전시키도록 구현을 하면 된다.

`onToggle` 함수를 만들어서 UserList 컴포넌트에게 전달한다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  };
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
```

그 다음에는 UserList 컴포넌트에서 `onToggle` 를 받아와서 User 에게 전달해주고, `onRemove` 를 구현했었던 것처럼 `onToggle` 에 `id` 를 넣어서 호출한다.

UserList.js

```js
import React from 'react';

function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default UserList;
```

<br>

### **useEffect 를 사용하여 마운트, 언마운트, 업데이트 시 할 작업 설정**

---

useEffect 라는 Hook 을 사용하여 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법에 대해서 알아본다.

### 마운트/언마운트

UserList.js

```js
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default UserList;
```

useEffect 를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣는다.

만약에 deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect 에 등록한 함수가 호출된다.

그리고, useEffect 에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부른다.

cleanup 함수는 useEffect 에 대한 뒷정리를 해준다고 이해하면 되는데, deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출된다.

주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있다.

- props 로 받은 값을 컴포넌트의 로컬 상태로 설정

- 외부 API 요청 (REST API 등)

- 라이브러리 사용 (D3, Video.js 등...)

- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

그리고 언마운트 시에 하는 작업들은 다음과 같은 사항이 있다.

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)

- 라이브러리 인스턴스 제거

### deps 에 특정 값 넣기

deps 에 특정 값을 넣어보도록 한다.

deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다. 그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 된다.

```js
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default UserList;
```

useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 deps 에 넣어주어야 한다.

그렇게 하는게, 규칙이다.

만약 useEffect 안에서 사용하는 상태나 props 를 deps 에 넣지 않게 된다면 useEffect 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 된다.

deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 된다.

```js
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default UserList;
```

리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링이 된다.

바뀐 내용이 없다 할지라도.

물론, 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당한다. 하지만, Virtual DOM 에는 모든걸 다 렌더링하고 있다는 것이다.

나중에는, 컴포넌트를 최적화 하는 과정에서 기존의 내용을 그대로 사용하면서 Virtual DOM 에 렌더링 하는 리소스를 아낄 수도 있다.

<br>

### **useMemo**

---

<br>

성능 최적화를 위하여 연산된 값을 `useMemo`라는 Hook 을 사용하여 재사용하는 방법을 알아보도록 한다.

App 컴포넌트에서 다음과 같이 `countActiveUsers` 라는 함수를 만들어서, active 값이 true 인 사용자의 수를 세어서 화면에 렌더링을 해본다.

App.js

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  };
  const count = countActiveUsers(users);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

`countActiveUsers` 함수에서 콘솔에 메시지를 출력하도록 한 이유는, 이 함수가 호출될때마다 우리가 알수있게 하기 위함이다.

여기서 발생하는 성능적 문제가 한가지 있는데 바로, input 의 값을 바꿀때에도 `countActiveUsers` 함수가 호출된다는 것 이다.

활성 사용자 수를 세는건, users 에 변화가 있을때만 세야되는건데, input 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 이렇게 불필요할때에도 호출하여서 자원이 낭비되고 있다.

이러한 상황에는 `useMemo` 라는 Hook 함수를 사용하면 성능을 최적화 할 수 있다.

Memo 는 "memoized" 를 의미하는데, 이는, 이전에 계산 한 값을 재사용한다는 의미를 가지고 있다.

App.js

```js
import React, { useRef, useState, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  };
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

<br>

### **useCallback**

---

<br>

`useCallback` 은 우리가 지난 시간에 배웠던 `useMemo` 와 비슷한 Hook 이다.

`useMemo` 는 특정 결과값을 재사용 할 때 사용하는 반면, `useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

이전에 App.js 에서 구현했었던 onCreate, onRemove, onToggle 함수를 확인해보면, 이 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어진다.

함수를 선언하는 것 자체는 사실 메모리도, CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만, 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요하다.

그 이유는, 우리가 나중에 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할건데, 이 작업을 하려면, 함수를 재사용하는것이 필수다.

`useCallback` 은 이런식으로 사용한다.

App.js

```js
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인 것을 제거함
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );
  const onToggle = useCallback(
    (id) => {
      setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
    },
    [users]
  );
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

주의할 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다는 것이다.

만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없다.

props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 한다.

사실, `useCallback` 은 `useMemo` 를 기반으로 만들어졌다.

다만, 함수를 위해서 사용 할 때 더욱 편하게 해준 것 뿐이다.

이런식으로도 표현 할 수 있다.

```js
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);
```

`useCallback` 을 사용 함으로써, 바로 이뤄낼수 있는 눈에 띄는 최적화는 없다.

컴포넌트 렌더링 최적화 작업을 해주어야만 성능이 최적화된다.

<br>

### **React.memo**

---

<br>

컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 `React.memo` 라는 함수에 대해서 알아본다.

이 함수를 사용한다면, 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.

사용법은 굉장히 쉽다.

그냥, 감싸주면 끝.

CreateUser.js

```js
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      <input name="username" placeholder="계정명" onChange={onChange} value={username} />
      <input name="email" placeholder="이메일" onChange={onChange} value={email} />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
```

UserList.js

```js
import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

그런데, User 중 하나라도 수정하면 모든 User 들이 리렌더링되고, CreateUser 도 리렌더링이 된다.

이유는 간단하다.

users 배열이 바뀔때마다 onCreate 도 새로 만들어지고, onToggle, onRemove 도 새로 만들어지기 때문이다.

```js
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));

  setInputs({
    username: '',
    email: '',
  });
  nextId.current += 1;
}, [users, username, email]);

const onRemove = useCallback(
  (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  },
  [users]
);
const onToggle = useCallback(
  (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  },
  [users]
);
```

deps 에 users 가 들어있기 때문에 배열이 바뀔때마다 함수가 새로 만들어지는건, 당연하다.

deps 에서 users 를 지우고, 함수들에서 현재 useState 로 관리하는 users 를 참조하지 않게 하면된다.

바로 함수형 업데이트다.

함수형 업데이트를 하게 되면, setUsers 에 등록하는 콜백함수의 파라미터에서 최신 users 를 참조 할 수 있기 때문에 deps 에 users 를 넣지 않아도 된다.

App.js

```js
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers((users) => users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);
  const onToggle = useCallback((id) => {
    setUsers((users) => users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

리액트 개발을 할 때, useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 해야한다.

예를 들어서, User 컴포넌트에 b 와 button 에 onClick 으로 설정해준 함수들은, 해당 함수들을 useCallback 으로 재사용한다고 해서 리렌더링을 막을 수 있는것은 아니므로, 굳이 그렇게 할 필요 없다.

추가적으로, 렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용해야 한다.

추가적으로, React.memo 에서 두번째 파라미터에 propsAreEqual 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능하다.

```js
export default React.memo(UserList, (prevProps, nextProps) => prevProps.users === nextProps.users);
```

하지만, 이걸 잘못사용한다면 오히려 의도치 않은 버그들이 발생하기 쉽다.

예를 들어서, 함수형 업데이트로 전환을 안했는데 이렇게 users 만 비교를 하게 된다면, onToggle 과 onRemove 에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있다.

### `제대로 모르면 쓰지를 말자.`

<br>

### **useReducer**

---

<br>

우리가 이전에 만든 사용자 리스트 기능에서의 주요 상태 업데이트 로직은 App 컴포넌트 내부에서 이루어졌다.

상태를 업데이트 할 때에는 `useState` 를 사용해서 새로운 상태를 설정해주었는데, 상태를 관리하게 될 때 `useState` 를 사용하는것 말고도 다른 방법이 있다.

바로, `useReducer` 를 사용하는건데, 이 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.

상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있다.

App 컴포넌트에서 `useReducer` 를 사용해보기전에 우리가 `useState` 를 처음 배울 때 만들었던 Counter.js 컴포넌트에서 `useReducer` 를 사용해본다.

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

`useReducer` Hook 함수를 사용해보기전에 우선 `reducer` 가 무엇인지 알아보자.

`reducer` 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수다.

```js
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

`reducer` 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다.

여기서 `action` 은 업데이트를 위한 정보를 가지고 있다.

주로 type 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 따로 없다.

액션의 예시

```js
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

`action` 객체의 형태는 자유다.

`type` 값을 대문자와 \_ 로 구성하는 관습이 존재하기도 하지만, 꼭 따라야 할 필요는 없다.

이제 `reducer` 를 배웠으니 `useReducer` 의 사용법을 알아본다.

`useReducer` 의 사용법은 다음과 같다.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

여기서 `state` 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가르키게 되고, `dispatch` 는 액션을 발생시키는 함수라고 이해하시면 된다.

이 함수는 다음과 같이 사용한다. `dispatch({ type: 'INCREMENT' })`

그리고 `useReducer` 에 넣는 첫번째 파라미터는 `reducer` 함수이고, 두번째 파라미터는 `초기 상태` 다.

그럼, Counter 컴포넌트를 만약에 `useReducer` 로 구현한다면 어떻게 바뀌는지 알아보자.

Counter.js

```js
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
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

index.js 파일을 열어서 App 대신 Counter 를 렌더링해본다.

index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Counter from './Counter';

ReactDOM.render(<Counter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

잘 작동하는것을 확인했다면 App 컴포넌트를 렌더링하도록 다시 복구한다.

이번에는, App 컴포넌트에 있던 상태 업데이트 로직들을 `useState` 가 아닌 `useReducer` 를 사용하여 구현해본다.

우선, App 에서 사용 할 초기 상태를 컴포넌트 바깥으로 분리해주고, App 내부의 로직들을 모두 제거한다.

App.js

```js
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function App() {
  return (
    <>
      <CreateUser />
      <UserList users={[]} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

먼저, `reducer` 함수의 틀만 만들어주고, `useReducer` 를 컴포넌트에서 사용해본다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <CreateUser />
      <UserList users={[]} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

그 다음엔, `state` 에서 필요한 값들을 비구조화 할당 문법을 사용하여 추출하여 각 컴포넌트에게 전달해준다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;

  return (
    <>
      <CreateUser username={username} email={email} />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

이제 onChange 부터 구현을 해준다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

CHANGE_INPUT 이라는 액션 객체를 사용하여 inputs 상태를 업데이트해주었다.

`reducer` 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 위 형태와 같이 `spread` 연산자를 사용해주었다.

이번엔 onCreate 를 만든다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

이제 onToggle 과 onRemove 도 구현해본다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

이제 마지막, 활성 사용자수 구하는것도 구현한다. 사실 이 부분은 바뀌는 코드가 없다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

이제 모든 기능들이 `useReducer` 를 사용하여 구현됐다.

<br>

자 이제 궁금해지는 점이 한가지 있을 것이다.

어떨 때 `useReducer` 를 쓰고 어떨 때 `useState` 를 써야 할까?

일단, 여기에 있어서는 정해진 답은 없다. 상황에 따라 불편할때도 있고 편할 때도 있다.

예를 들어서 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면 확실히 `useState` 로 관리하는게 편할 것이다.

```js
const [value, setValue] = useState(true);
```

하지만, 만약에 컴포넌트에서 관리하는 값이 여러개가 되어서 상태의 구조가 복잡해진다면 `useReducer`로 관리하는 것이 편해질 수도 있다.

이에 대한 결정은, 앞으로 `useState, useReducer` 를 자주 사용해보시고 맘에드는 방식을 선택한다.

<br>

### **Custom Hooks 만들기**

---

<br>

컴포넌트를 만들다보면, 반복되는 로직이 자주 발생한다. 예를 들어서 input 을 관리하는 코드는 관리 할 때마다 꽤나 비슷한 코드가 반복된다.

이번에는 그러한 상황에 커스텀 `Hooks` 를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아본다.

src 디렉터리에 hooks 라는 디렉터리를 만들고, 그 안에 useInputs.js 라는 파일을 만든다.

커스텀 Hooks 를 만들 때에는 보통 이렇게 `use` 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다.

커스텀 Hooks 를 만드는 방법은 굉장히 간단하다.

그냥, 그 안에서 `useState, useEffect, useReducer, useCallback` 등 Hooks 를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

useInputs.js

```js
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

이제 우리가 만든 `useInputs` Hook 을 App.js 에서 사용해보자.

이 작업을 하기 위해서는 먼저 useReducer 쪽에서 사용하는 inputs 를 없애고 이에 관련된 작업을 useInputs 를 대체해주어야 한다.

새로운 항목을 추가 할 때 input 값을 초기화해야 하므로 데이터 등록 후 `reset()` 을 호출해준다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case 'REMOVE_USER':
      return {
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

이렇게 커스텀 Hook 을 만들어서 사용하면 컴포넌트의 로직을 분리시켜서 필요 할 때 쉽게 재사용 할 수도 있다.

<br>
<br>

### **Context API 를 사용한 전역 값 관리**

---

<br>

우리가 현재 만들고 있는 프로젝트를 보면, App 컴포넌트에서 onToggle, onRemove 가 구현이 되어있고 이 함수들은 UserList 컴포넌트를 거쳐서 각 User 컴포넌트들에게 전달이 되고 있다.

여기서 UserList 컴포넌트의 경우에는 onToggle 과 onRemove 를 전달하기 위하여 중간 다리역할만 하고 있다.

```js
function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}
```

UserList 에서는 해당 함수들을 직접 사용하는 일도 없다.

지금과 같이 특정 함수를 특정 컴포넌트를 거쳐서 원하는 컴포넌트에게 전달하는 작업은 리액트로 개발을 하다보면 자주 발생 할 수 있는 작업인데, 위와 같이 컴포넌트 한개정도를 거쳐서 전달하는건 사실 그렇게 큰 불편함도 없지만, 만약 3~4개 이상의 컴포넌트를 거쳐서 전달을 해야 하는 일이 발생하게 된다면 이는 매우 번거로울 것이다.

그럴 땐, 리액트의 `Context API` 와 이전 섹션에서 배웠던 `dispatch` 를 함께 사용하면 이러한 복잡한 구조를 해결 할 수 있다.

리액트의 `Context API` 를 사용하면, 프로젝트 안에서 전역적으로 사용 할 수 있는 값을 관리 할 수 있다.

여기서 "상태" 가 아닌 "값" 이라고 언급을 했는데, 이 값은 꼭 상태를 가르키지 않아도 된다.

이 값은 함수일수도 있고, 어떤 외부 라이브러리 인스턴스일수도 있고 심지어 DOM 일 수도 있다.

물론, `Context API` 를 사용해서 프로젝트의 상태를 전역적으로 관리 할 수도 있긴한데, 이에 대해서는 나중에 더 자세히 알아보도록 한다.

우선, `Context API` 를 사용해여 새로운 Context 를 만드는 방법을 알아본다.

Context 를 만들 땐 다음과 같이 `React.createContext()` 라는 함수를 사용한다.

```js
const UserDispatch = React.createContext(null);
```

`createContext` 의 파라미터에는 Context 의 기본값을 설정할 수 있다. 여기서 설정하는 값은 Context 를 쓸 때 값을 따로 지정하지 않을 경우 사용되는 기본 값이다.

Context 를 만들면, Context 안에 Provider 라는 컴포넌트가 들어있는데 이 컴포넌트를 통하여 Context 의 값을 정할 수 있다. 이 컴포넌트를 사용할 때, `value` 라는 값을 설정해주면 된다.

```js
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```

이렇게 설정해주고 나면 Provider 에 의하여 감싸진 컴포넌트 중 어디서든지 우리가 Context 의 값을 다른 곳에서 바로 조회해서 사용 할 수 있다.

조회하는 방법은 잠시 후 알아보도록 하고, 지금은 우선 App 컴포넌트 에서 Context 를 만들고, 사용하고, 내보내는 작업을 해준다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: '',
    email: '',
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

지금은 우리가 UserDispatch 라는 Context 를 만들어서, 어디서든지 dispatch 를 꺼내 쓸 수 있도록 준비를 해준 것이다.

그리고, UserDispatch 를 만들 때 다음과 같이 내보내주는 작업을 했다.

```js
export const UserDispatch = react.createContext(null);
```

이렇게 내보내주면 나중에 사용하고 싶을 때 다음과 같이 불러와서 사용 할 수 있다.

```js
import { UserDispatch } from './App';
```

Context 를 다 만드셨으면, App 에서 onToggle 과 onRemove 를 지우고, UserList 에게 props를 전달하는것도 지운다.

App.js

```js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: '',
    email: '',
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

이제 UserList 컴포넌트에서 에서 onToggle 과 onRemove 와 관련된 코드들을 지워준다.

UserList.js

```js
import React from 'react';

const User = React.memo(function User({ user }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => {}}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => {}}>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

이제, User 컴포넌트에서 바로 dispatch 를 사용 할건데, 그렇게 하기 위해서는 useContext 라는 Hook 을 사용해서 우리가 만든 UserDispatch Context 를 조회해야 한다.

```js
import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => {
          dispatch({ type: 'TOGGLE_USER', id: user.id });
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: 'REMOVE_USER', id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

이렇게 Context API 를 사용해서 dispatch 를 어디서든지 조회해서 사용해줄 수 있게 해주면 코드의 구조가 훨씬 깔끔해질 수 있다.

이로써 useState 를 사용하는 것과 useReducer 를 사용하는 것의 큰 차이를 발견했다. useReducer 를 사용하면 이렇게 dispatch 를 Context API 를 사용해서 전역적으로 사용 할 수 있게 해주면 컴포넌트에게 함수를 전달해줘야 하는 상황에서 코드의 구조가 훨씬 깔끔해질 수 있다.

만약에 깊은 곳에 위치하는 컴포넌트에게 여러 컴포넌트를 거쳐서 함수를 전달해야 하는 일이 있다면 이렇게 Context API 를 사용하면 된다.

<br>
