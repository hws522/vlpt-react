### **API 연동의 기본**

---

<br>

API를 호출하기 위해서 `axios` 라는 라이브러리를 설치한다.

```js
yarn add axios
```

axios 를 이용해서 GET, PUT, POST, DELETE 등의 메서드로 API 요청을 할 수 있다.

간단하게 말하면 REST API 를 사용할 때에는 하고 싶은 작업데 따라 다른 메서드로 요청을 할 수 있다.

- GET : 데이터 조회

- POST : 데이터 등록

- PUT : 데이터 수정

- DELETE : 데이터 삭제

PATCH, HEAD 와 같은 메서드들은 나중에 알아본다.

```js
import axios from 'axios';

axios.get('/users/1');
```

get 이 위치한 자리에는 메서드 이름을 소문자로 넣는다. 예를 들어서 새로운 데이터를 등록하고 싶다면 axios.post() 를 사용하면 된다.

그리고, 파라미터에는 API 의 주소를 넣는다.

axios.post() 로 데이터를 등록 할 때에는 두번째 파라미터에 등록하고자 하는 정보를 넣을 수 있다.

```js
axios.post('/users', {
  username: 'blabla',
  name: 'blabla',
});
```

우리가 이번에 API 연동 실습을 할 때에는 JSONPlaceholder 에 있는 연습용 API 를 사용해볼 것이다.

그 중에서 사용할 API 는 다음 주소이다.

https://jsonplaceholder.typicode.com/users

결과물은 다음과 같은 형식이다.

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  (...)
]
```

<br>

### **useState 와 useEffect 로 데이터 로딩하기**

---

<br>

`useState` 를 사용하여 요청 상태를 관리하고, `useEffect` 를 사용하여 컴포넌트가 렌더링되는 시점에 요청을 시작하는 작업을 해본다.

요청에 대한 상태를 관리 할 때에는 다음과 같이 총 3가지 상태를 관리해주어야 한다.

1. 요청의 결과
2. 로딩 상태
3. 에러

src 컴포넌트에 Users.js 를 생성하고 다음 코드를 작성해보자.

Users.js

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
}

export default Users;
```

참고로, `useEffect` 에 첫번째 파라미터로 등록하는 함수에는 `async` 를 사용할 수 없기 때문에 함수 내부에서 `async` 를 사용하는 새로운 함수를 선언해주어야 한다.

로딩 상태가 활성화 됐을 때는 로딩중.. 이라는 문구를 보여주고,

users 값이 아직 없을 때에는 null 을 보여주도록 처리했다.

제일 마지막에서는 users 배열을 렌더링하는 작업을 해주었다.

이제 이 컴포넌트가 잘 작동하는지 확인하기 위해 App 컴포넌트에서 User 컴포넌트를 렌더링한다.

<br>

에러가 발생하는지 확인하기 위해 주소를 이상하게 바꾸어본다.

```js
const response = await axios.get('https://jsonplaceholder.typicode.com/users/asdfasdf');
```

에러를 확인한 뒤 다시 원상복구시킨다.

이번에는 버튼을 눌러서 API 재요청하는 기능을 구현해본다. 그렇게 하려면 `fetchUsers` 함수를 바깥으로 꺼내주고 버튼을 만들어 해당 함수를 연결해주면 된다.

Users.js

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
```

<br>
<br>

### **useReducer 로 요청 상태 관리하기**

---

구현했던 User 컴포넌트에서 `useState` 대신에 `useReducer` 를 사용해서 구현을 해보도록 한다.

`useReducer` 를 사용하여 `LOADING, SUCCESS, ERROR` 액션에 따라 다르게 처리를 해본다.

Users.js

```js
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
```

`useReducer` 로 구현했을 때의 장점은 `useState` 의 `setState` 함수를 여러번 사용하지 않아도 된다는 점과, 리듀서로 로직을 분리했기 때문에 다른곳에서도 쉽게 재사용을 할 수 있다는 점이다.

취향에 따라 `useState` 로 구현을 해도 무방하다.

<br>
<br>
