## 1. 리덕스에서 사용되는 키워드 숙지하기

리덕스를 사용하게 될 때 앞으로 접하게 될 키워드들을 미리 알아봅시다. 이 키워드들 중에서 대부분은 이전에 `useReducer`를 사용해볼때 접해본 개념이기도 합니다.

### 액션 (Action)

상태에 어떠한 변화가 필요하게 될 땐, 우리는 액션이란 것을 발생시킵니다. 이는, 하나의 객체로 표현되는데요, 액션 객체는 다음과 같은 형식으로 이뤄져있습니다.

```javascript
{
  type: "TOGGLE_VALUE"
}
```

액션 객체는 `type` 필드를 필수적으로 가지고 있어야하고 그 외의 값들은 개발자 마음대로 넣어줄 수 있습니다.

```javascript
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
{
  type: "CHANGE_INPUT",
  text: "안녕하세요"
}
```

### 액션 생성함수 (Action Creator)

액션 생성함수는, 액션을 만드는 함수입니다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어주죠.

```javascript
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data
  };
}

// 화살표 함수로도 만들 수 있습니다.
export const changeInput = text => ({ 
  type: "CHANGE_INPUT",
  text
});
```

이러한 액션 생성함수를 만들어서 사용하는 이유는 나중에 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위함입니다. 그래서 보통 함수 앞에 `export` 키워드를 붙여서 다른 파일에서 불러와서 사용합니다.

리덕스를 사용 할 때 액션 생성함수를 사용하는것이 필수적이진 않습니다. 액션을 발생 시킬 때마다 직접 액션 객체를 작성할수도 있습니다.

### 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수입니다. 리듀서는 두가지의 파라미터를 받아옵니다.

```javascript
function reducer(state, action) {
  // 상태 업데이트 로직
  return alteredState;
}
```

리듀서는, 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환합니다. 이 리듀서는 `useReducer` 를 사용할때 작성하는 리듀서와 똑같은 형태를 가지고 있습니다.

만약 카운터를 위한 리듀서를 작성한다면 다음과 같이 작성할 수 있습니다.

```javascript
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}
```

`useReducer` 에선 일반적으로 `default:` 부분에 `throw new Error('Unhandled Action')`과 같이 에러를 발생시키도록 처리하는게 일반적인 반면 리덕스의 리듀서에서는 기존 `state`를 그대로 반환하도록 작성해야합니다.

리덕스를 사용 할 때에는 여러개의 리듀서를 만들고 이를 합쳐서 루트 리듀서 (Root Reducer)를 만들 수 있습니다. (루트 리듀서 안의 작은 리듀서들은 서브 리듀서라고 부릅니다.)

### 스토어 (Store)

리덕스에서는 한 애플리케이션당 하나의 스토어를 만들게 됩니다. 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있습니다.

### 디스패치 (dispatch)

디스패치는 스토어의 내장함수 중 하나입니다. 디스패치는 액션을 발생 시키는 것 이라고 이해하시면 됩니다. dispatch 라는 함수에는 액션을 파라미터로 전달합니다.. dispatch(action) 이런식으로 말이죠.

그렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줍니다.

#### 구독 (subscribe)

구독 또한 스토어의 내장함수 중 하나입니다. subscribe 함수는, 함수 형태의 값을 파라미터로 받아옵니다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출됩니다.

리액트에서 리덕스를 사용하게 될 때 보통 이 함수를 직접 사용하는 일은 별로 없습니다. 그 대신에 react-redux 라는 라이브러리에서 제공하는 `connect` 함수 또는 `useSelector` Hook 을 사용하여 리덕스 스토어의 상태에 구독합니다.



---



## 2. 리덕스의 3가지 규칙

리덕스를 프로젝트에서 사용하게 될 때 알아두고, 꼭 지켜야 할 3가지 규칙이 있습니다.

### 1. 하나의 애플리케이션 안에는 하나의 스토어가 있습니다.

하나의 애플리케이션에선 단 한개의 스토어를 만들어서 사용합니다. 여러개의 스토어를 사용하는것은 사실 가능하기는 하나, 권장되지는 않습니다. 특정 업데이트가 너무 빈번하게 일어나거나, 애플리케이션의 특정 부분을 완전히 분리시키게 될 때 여러개의 스토어를 만들 수도 있습니다. 하지만 그렇게 하면, 개발 도구를 활용하지 못하게 됩니다.

### 2. 상태는 읽기전용 입니다.

리액트에서 state 를 업데이트 해야 할 때, setState 를 사용하고, 배열을 업데이트 해야 할 때는 배열 자체에 push 를 직접 하지 않고, concat 같은 함수를 사용하여 기존의 배열은 수정하지 않고 새로운 배열을 만들어서 교체하는 방식으로 업데이트를 합니다. 엄청 깊은 구조로 되어있는 객체를 업데이트를 할 때도 마찬가지로, 기존의 객체는 건드리지 않고 `Object.assign` 을 사용하거나 spread 연산자 (`...`) 를 사용하여 업데이트 하곤 하죠.

리덕스에서도 마찬가지입니다. 기존의 상태는 건들이지 않고 새로운 상태를 생성하여 업데이트 해주는 방식으로 해주면, 나중에 개발자 도구를 통해서 뒤로 돌릴 수도 있고 다시 앞으로 돌릴 수도 있습니다.

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경 되는 것을 감지하기 위하여 [shallow equality](https://redux.js.org/docs/faq/ImmutableData.html#how-redux-uses-shallow-checking) 검사를 하기 때문입니다. 이를 통하여 객체의 변화를 감지 할 때 객체의 깊숙한 안쪽까지 비교를 하는 것이 아니라 겉핥기 식으로 비교를 하여 좋은 성능을 유지할 수 있는 것이죠.

우리는 이 튜토리얼에서는 Immutable.js 혹은 Immer.js 를 사용하여 불변성을 유지하며 상태를 관리하는 방법에 대해서 다뤄보게 됩니다. 불변성과 Immutable.js 가 익숙하지 않다면 [리액트의 불변함, 그리고 컴포넌트에서 Immutable.js 사용하기](https://velopert.com/3486) 포스트를 읽으시면 도움이 될거에요.

### 3. 변화를 일으키는 함수, 리듀서는 순수한 함수여야 합니다.

순수한 함수, 라는 개념이 익숙하지 않으시죠. 다음 사항을 기억해주세요.

- 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받습니다.
- 이전의 상태는 절대로 건들이지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환합니다.
- 똑같은 파라미터로 호출된 리듀서 함수는 **언제나** 똑같은 결과값을 반환해야만 합니다.

3가지 사항을 주의해주세요. 동일한 인풋이라면 언제나 동일한 아웃풋이 있어야 합니다. 그런데 일부 로직들 중에서는 실행 할 때마다 다른 결과값이 나타날 수도 있죠. new Date() 를 사용한다던지.. 랜덤 숫자를 생성한다던지.. 혹은, 네트워크에 요청을 한다던지! 그러한 작업은 결코 순수하지 않은 작업이므로, 리듀서 함수의 바깥에서 처리해줘야 합니다. 그런것을 하기 위해서, [리덕스 미들웨어](https://velopert.com/3401) 를 사용하곤 하죠. 이에 대해선 나중에 다뤄보게 됩니다.



---



## 3. 리덕스 사용 할 준비하기

리덕스에서 리액트를 본격적으로 사용해보기 전에, 리액트 컴포넌트 없이, 리덕스에서 제공되는 기능들을 먼저 연습해보겠습니다.

먼저 새로운 프로젝트를 만들어주세요.

```
$ npx create-react-app learn-redux
```

그리고 해당 디렉터리에서 redux 라이브러리를 설치해주세요.

```
$ cd learn-redux
$ yarn add redux
```

그 다음에는, exercise.js 라는 파일을 src 에 생성하세요. 이 파일에서 redux 를 불러와서 redux에 내장된 API를 사용해보고, 연습해보도록 하겠습니다.

해당 파일에 우선 console 에 'Hello!' 를 출력하도록 코드를 작성해보세요.

#### exercise.js

```javascript
console.log('Hello!');
```

그 다음에는 index.js 에서 해당 파일을 다음과 같이 불러와보세요.

#### index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './exercise'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

그리고 나서 `yarn start` 명령어를 실행하여 개발서버를 실행한뒤 브라우저에서 개발자 도구를 열어보세요.

콘솔에 다음과 같이 텍스트가 출력됐나요?

![img](https://i.imgur.com/AWfUV8w.png)

그 다음에는 exercise.js 를 다음과 같이 작성해보세요. 주석을 하나하나 잘 읽어주세요.

#### exercise.js

```javascript
import { createStore } from 'redux';

// createStore는 스토어를 만들어주는 함수입니다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만듭니다.

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  counter: 0,
  text: '',
  list: []
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성합니다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성합니다.
function increase() {
  return {
    type: INCREASE // 액션 객체에는 type 값이 필수입니다.
  };
}

// 화살표 함수로 작성하는 것이 더욱 코드가 간단하기에,
// 이렇게 쓰는 것을 추천합니다.
const decrease = () => ({
  type: DECREASE
});

const changeText = text => ({
  type: CHANGE_TEXT,
  text // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = item => ({
  type: ADD_TO_LIST,
  item
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!

function reducer(state = initialState, action) {
  // state 의 초깃값을 initialState 로 지정했습니다.
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item)
      };
    default:
      return state;
  }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.

// 액션들을 디스패치 해봅시다.
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));
```

리덕스 스토어 안의 상태는 액션이 디스패치됨에 따라 업데이트됩니다. 위 코드에서는 우리가 `listener`라는 함수를 만들어서 리덕스 상태에 변화가 생겼을 때 마다 콘솔에 상태를 출력하도록 처리하였습니다.

코드의 최하단에서는 여러가지 액션들을 디스패치 했는데요, 액션이 디스패치 될 때마다 상태가 바뀌고, 이에 따라 `listener` 함수가 호출 될 것입니다. 브라우저를 열어서 개발자 도구를 열어보세요.

![img](https://i.imgur.com/1kwc0ML.png)

위와 같이 결과가 잘 나타났나요?

결과가 잘 나타난 것을 확인하셨다면 이제 본격적으로 리액트 프로젝트에 리덕스를 적용해보도록 하겠습니다. index.js 에서 방금 만든 exercise.js 를 불러오는 코드를 지워주세요.

#### index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```





---





## 4. 리덕스 모듈 만들기

이번에는, 리액트 프로젝트에 리덕스를 적용하기 위해서 리덕스 모듈을 만들어보도록 하겠습니다. 리덕스 모듈이란 다음 항목들이 모두 들어있는 자바스크립트 파일을 의미합니다.

- 액션 타입
- 액션 생성함수
- 리듀서

리덕스를 사용하기 위해 필요한 위 항목들은 각각 다른 파일에 저장 할 수도 있습니다.

리덕스 GitHub 레포에 등록되어있는 [예제 프로젝트](https://github.com/reduxjs/redux/tree/master/examples/todos/src)를 보면 다음과 같이 코드가 분리되어 있습니다.

- actions
  - index.js
- reducers
  - todos.js
  - visibilityFilter.js
  - index.js

위 예제 프로젝트에서는 액션과 리듀서가 서로 다른 파일에 정의되어있습니다. 하지만, 이 코드들이 꼭 분리되어있을 필요는 없습니다. 이 코드들이 서로 다른 디렉터리에, 그리고 서로 다른 파일에 분리가 되어있으면 개발을 하는데 꽤나 불편합니다. 그래서 우리는 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성해보도록 하겠습니다. 이를 [Ducks 패턴](https://github.com/erikras/ducks-modular-redux)이라고 부릅니다. 리덕스 관련 코드를 분리하는 방식은 정해져있는 방식이 없으므로 나중에는 여러분이 자유롭게 분리하셔도 상관없습니다.

### counter 모듈 만들기

자! 그러면 리덕스 모듈을 만들어볼까요? 첫번째 모듈은 counter 모듈입니다.

src 디렉터리에 modules 디렉터리를 만들고, 그 안에 counter.js 파일을 생성하여 다음 코드를 작성해주세요.

주석 꼼꼼히 읽어주세요~

#### modules/counter.js

```javascript
/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
  number: 0,
  diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}
```

### todos 모듈 만들기

todos 모듈도 만들어봅시다. modules 디렉터리에 todos.js 파일을 다음과 같이 작성해주세요.

#### modules/todos.js

```javascript
/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* 액션 생성함수 선언 */
let nextId = 1; // todo 데이터에서 사용 할 고유 id
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
    text
  }
});
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요 없습니다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없습니다.
const initialState = [
  /* 우리는 다음과 같이 구성된 객체를 이 배열 안에 넣을 것입니다.
  {
    id: 1,
    text: '예시',
    done: false
  } 
  */
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id // id 가 일치하면
            ? { ...todo, done: !todo.done } // done 값을 반전시키고
            : todo // 아니라면 그대로 둠
      );
    default:
      return state;
  }
}
```

### 루트 리듀서 만들기

우리는 현재 두가지의 리덕스 모듈을 만들었습니다. 그래서 리듀서도 두개죠. 한 프로젝트에 여러개의 리듀서가 있을때는 이를 한 리듀서로 합쳐서 사용합니다. 합쳐진 리듀서를 우리는 루트 리듀서라고 부릅니다.

리듀서를 합치는 작업은 리덕스에 내장되어있는 [`combineReducers`](https://redux.js.org/api/combinereducers)라는 함수를 사용합니다.

modules 디렉터리에 index.js 를 만들고 다음과 같이 코드를 작성해보세요.

#### modules/index.js

```javascript
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos
});

export default rootReducer;
```

이제 리듀서가 합쳐졌습니다! 루트 리듀서가 만들어졌으면, 이제 스토어를 만들어봅시다.

리덕스 스토어를 만드는 작업은 src 디렉터리의 index.js 에서 해주겠습니다.

#### index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만듭니다.
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```

스토어를 만들고, 스토어의 상태를 출력해보았습니다. 브라우저에서 어떤 결과가 나타났는지 확인해보세요.

![img](https://i.imgur.com/uDzQ8BV.png)

counter, todos 서브 리듀서의 상태가 합쳐졌습니다!

상태가 잘 출력된것을 확인하셨다면 `console.log(store.getState());` 코드는 이제 지워주세요.

### 리액트 프로젝트에 리덕스 적용하기

리액트 프로젝트에 리덕스를 적용 할 때에는 react-redux 라는 라이브러리를 사용해야합니다. 해당 라이브러리를 설치해주세요.

```
$ yarn add react-redux
```

그 다음에는 index.js 에서 Provider라는 컴포넌트를 불러와서 App 컴포넌트를 감싸주세요. 그리고 Provider의 props 에 store 를 넣어주세요.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만듭니다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Provider로 store를 넣어서 App 을 감싸게 되면 우리가 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있게 된답니다.



---





## 5. 카운터 구현하기

카운터를 구현해봅시다.

### 프리젠테이셔널 컴포넌트 만들기

프리젠테이셔널 컴포넌트란, 리덕스 스토어에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props 로만 받아와서 사용하는 컴포넌트입니다.

src 디렉터리에 components 디렉터리를 만들고, 그 안에 Counter.js 를 다음과 같이 만들어주세요.

#### Counter.js

```javascript
import React from 'react';

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = e => {
    // e.target.value 의 타입은 문자열이기 때문에 숫자로 변환해주어야 합니다.
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
```

프리젠테이셔널 컴포넌트에선 주로 이렇게 UI를 선언하는 것에 집중하며, 필요한 값들이나 함수는 props 로 받아와서 사용하는 형태로 구현합니다.

### 컨테이너 컴포넌트 만들기

컨테이너 컴포넌트란, 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미합니다. 그리고, HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용합니다.

src 디렉터리에 containers 디렉터리를 만들고 CounterContainer.js 라는 파일을 만드세요.

#### CounterContainer.js

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
```

이제 App 컴포넌트에서 CounterContainer를 불러와서 렌더링하세요.

```javascript
import React from 'react';
import CounterContainer from './containers/CounterContainer';

function App() {
  return (
    <div>
      <CounterContainer />
    </div>
  );
}

export default App;
```

![img](https://i.imgur.com/Y60kM3K.png)

+, - 버튼을 눌러보세요. 그리고 input 의 숫자도 변경해본다음에 또 +, - 버튼을 눌러보세요. 카운터가 잘 작동하고 있나요?

### 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트

우리가 이번에 리액트 컴포넌트에서 리덕스를 사용 할 때 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리해서 작업을 했습니다. [이러한 패턴](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)을 리덕스의 창시자 Dan Abramov가 소개하게 되면서 이렇게 컴포넌트들을 구분지어서 진행하는게 당연시 됐었습니다.

하지만, 꼭 이렇게 하실 필요는 없습니다. Dan Abramov 또한 2019년에 자신이 썼던 포스트를 수정하게 되면서 꼭 이런 형태로 할 필요는 없다고 명시하였습니다.

순전히 여러분이 편하다고 생각하는 방식을 택하시면 됩니다.

저는 개인적으로 프리젠테이셔널 / 컨테이너 컴포넌트를 구분지어서 작성하긴 하지만 디렉터리 상으로는 따로 구분 짓지 않는 것을 선호합니다.

하지만 컴포넌트를 분리해서 작성하는 것이 아직까진 정석이긴 하기 때문에 이번 리덕스 강의에서는 분리해서 작성을 하겠습니다.



---



## 7. 할 일 목록 구현하기

이번에는 할 일 목록을 구현해보도록 하겠습니다.

### 프리젠테이셔널 컴포넌트 구현하기

먼저 Todos 라는 프리젠테이셔널 컴포넌트를 구현하겠습니다. components 디렉터리에 Todos.js 파일을 생성하세요.

이 파일에는 TodoItem, TodoList, Todos 이렇게 총 3가지의 컴포넌트를 작성 할 것입니다. 이렇게 여러개의 컴포넌트를 만드는 이유는 컴포넌트의 리렌더링 성능을 최적화하기 위함입니다. 지금은 편의상 한 파일에 모두 작성을 할건데, 취향에 따라 각각 다른 파일에 분리하셔도 상관 없습니다.

#### components/Todos.js

```javascript
import React, { useState } from 'react';

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아닙니다.
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // 인풋 초기화
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할 일을 입력하세요.."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;
```

### 컨테이너 컴포넌트 만들기

이제 컨테이너 컴포넌트도 만듭시다. containers 디렉터리에 TodosContainer.js 파일을 생성해서 다음과 같이 작성해보세요.

```javascript
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer() {
  // useSelector 에서 꼭 객체를 반환 할 필요는 없습니다.
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 반환하면 됩니다.
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const onCreate = text => dispatch(addTodo(text));
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
```

이제 이 컴포넌트를 App에서 렌더링해볼까요?

#### App.js

```javascript
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
```

![img](https://i.imgur.com/5Jqntqc.png)

새 항목이 잘 등록되는지, 그리고 항목을 클릭했을때 토글이 잘되는지 확인해보세요.



---





## 8. useSelector 최적화

리액트 컴포넌트에서 리덕스 상태를 조회해서 사용 할 때 최적화를 하기 위해서 어떤 사항을 고려해야 하는지 알아보도록 하겠습니다.

지난 섹션에서 할 일 목록을 만들 때에는 프리젠테이셔널 컴포넌트에서 React.memo를 사용하여 리렌더링 최적화를 해줬었는데요, 컨테이너 컴포넌트에서는 어떤 것들을 검토해야 하는지 알아보겠습니다.

우선, 리액트 개발자 도구의 톱니바퀴를 눌러서 Highlight Updates 를 체크하세요.

![img](https://i.imgur.com/nkUAJbh.png)

![img](https://i.imgur.com/RYJ7fL9.png)

그리고 나서 카운터의 +, - 를 눌러보시면 하단의 할 일 목록이 리렌더링되진 않지만 할 일 목록의 항목을 토글 할 때에는 카운터가 리렌더링되는 것을 확인 할 수 있습니다.

![img](https://i.imgur.com/PhazYbT.gif)

기본적으로, `useSelector`를 사용해서 리덕스 스토어의 상태를 조회 할 땐 만약 상태가 바뀌지 않았으면 리렌더링하지 않습니다.

TodosContainer 의 경우 카운터 값이 바뀔 때 `todos` 값엔 변화가 없으니까, 리렌더링되지 않는것이죠.

```javascript
const todos = useSelector(state => state.todos);
```

반면 CounterContainer 를 확인해볼까요?

```javascript
const { number, diff } = useSelector(state => ({
  number: state.counter.number,
  diff: state.counter.diff
}));
```

CounterContainer에서는 사실상 `useSelector` Hook 을 통해 매번 렌더링 될 때마다 새로운 객체 `{ number, diff }`를 만드는 것이기 때문에 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없어서 낭비 렌더링이 이루어지고 있는 것 입니다.

이를 최적화 하기 위해선 두가지 방법이 있습니다.

첫번째는, `useSelector` 를 여러번 사용하는 것 입니다.

```javascript
const number = useSelector(state => state.counter.number);
const diff = useSelector(state => state.counter.diff);
```

이렇게 하면 해당 값들 하나라도 바뀌었을 때에만 컴포넌트가 리렌더링 됩니다.

두번째는, react-redux의 `shallowEqual` 함수를 `useSelector`의 두번째 인자로 전달해주는 것 입니다.

```javascript
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual
  );

  (...)
```

`useSelector` 의 두번째 파라미터는 `equalityFn` 인데요,

```javascript
equalityFn?: (left: any, right: any) => boolean
```

이전 값과 다음 값을 비교하여 `true`가 나오면 리렌더링을 하지 않고 `false`가 나오면 리렌더링을 합니다.

`shallowEqual`은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교해줍니다.

여기서 겉에 있는 값이란, 만약 다음과 같은 객체가 있다면

```javascript
const object = {
  a: {
    x: 3,
    y: 2,
    z: 1
  },
  b: 1,
  c: [{ id: 1 }]
}
```

가장 겉에 있는 값은 `object.a`, `object.b`, `object.c` 입니다. `shallowEqual` 에서는 해당 값들만 비교하고 `object.a.x` 또는 `object.c[0]` 값은 비교하지 않습니다.

------

이렇게 둘 중 하나의 방식으로 최적화를 해주면, 컨테이너 컴포넌트가 필요한 상황에서만 리렌더링 될 것입니다.

