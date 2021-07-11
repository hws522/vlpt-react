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

### **useAsync 커스텀 Hook 만들어서 사용하기**

---

데이터를 요청해야 할 때마다 리듀서를 작성하는 것은 번거로운 일이다. 매번 반복되는 코드를 작성하는 대신에, 커스텀 Hook 을 만들어서 요청 상태 관리 로직을 쉽게 재사용하는 방법을 알아본다.

useAsync.js 파일을 생성하고, 코드를 작성한다.

useAsync.js

```js
import { useReducer, useEffect } from 'react';

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

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
```

`useAsync` 함수는 두가지 파라미터를 받아온다.

첫번째 파라미터는 API 요청을 시작하는 함수이고, 두번째 파라미터는 `deps` 인데 이 `deps` 값은 해당 함수 안에서 사용하는 `useEffect` 의 `deps` 로 설정된다.

이 값은 나중에 우리가 사용할 비동기 함수에서 파라미터가 필요하고, 그 파라미터가 바뀔 때 새로운 데이터를 불러오고 싶은 경우에 활용할 수 있다. (현재 Users 컴포넌트에서는 불필요)

이 값의 기본값은 `[]` .

즉 컴포넌트가 가장 처음 렌더링 할 때에만 API 를 호출하고 싶다는 의미다.

이 Hook 에서 반환하는 값은 요청 관련 상태와, `fetchData` 함수다. 이렇게 `fetchData` 함수를 반환하여서 나중에 데이터를 쉽게 리로딩 해줄 수 있다.

Users.js

```js
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, []);

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
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
```

코드가 훨씬 깔끔해졌다. 재사용하기도 좋다.

Users 컴포넌트는 컴포넌트가 처음 렌더링 되는 시점부터 API 를 요청하고 있다.

만약에 특정 버튼을 눌렀을 때만 API 를 요청하고 싶다면, 어떻게 해야할까.

POST, DELETE, PUT, PATCH 등의 HTTP 메서드를 사용하게 된다면 필요한 시점에만 API 를 호출해야 하기 때문에, 필요할 때에만 요청 할 수 있는 기능이 필요하다.

`useAsync` 에 다음과 같이 세번째 파라미터 `skip` 을 넣어보자.

useAsync.js

```js
import { useReducer, useEffect } from 'react';

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

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
```

`skip` 파라미터의 기본 값을 `false` 로 지정하고, 만약 이 값이 `true` 라면 `useEffect` 에서 아무런 작업도 하지 않도록 설정해주었다.

이에 따라 Users 컴포넌트를 수정해본다.

Users.js

```js
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
```

`useAsync` 의 세번째 파라미터에 `true` 를 넣어줬고, `!users` 인 상황에 불러오기 버튼을 렌더링해주었다.

<br>

API 를 요청할 때, 파라미터가 필요한 경우에 어떻게 해야 하는지 알아보자.

우리는 User 라는 컴포넌트를 만들 것이고, `id` 값을 props 로 받아와서 https://jsonplaceholder.typicode.com/users/1

이런식으로 맨 뒤에 `id` 를 넣어서 API 를 요청할 것이다.

User.js 를 생성 후 코드를 작성한다.

User.js

```js
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
```

`useAsync` 를 사용 할 때, 파라미터를 포함시켜서 함수를 호출하는 새로운 함수를 만들어서 등록해주었다.

그리고, `id` 가 바뀔 때 마다 재호출 되도록 `deps` 에 `id` 를 넣어주었다.

그 다음에는, Users.js 에서 `useState` 를 사용하여 `userId` 상태를 관리해주겠습니다. 초깃값은 `null` 이며, 리스트에 있는 항목을 클릭하면 클릭한 사용자의 `id` 를 `userId` 값으로 설정해준다.

Users.js

```js
import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)} style={{ cursor: 'pointer' }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
```

API 를 연동할 때, 이렇게 커스텀 Hook 을 만들어서 사용하면 편하다. 그리고 이 Hook 이 어떻게 만들어졌는지 잘 이해한다면 용도에 따라 기능을 조금 더 커스터마이징 해서 쓸 수도 있다.

<br>
<br>

### **react-async 로 요청 상태 관리하기**

---

<br>

react-async 는 `useAsync` 와 비슷한 함수가 들어있는 라이브러리이다.

이 라이브러리 안에 들어있는 함수 이름도 `useAsync` 이나, 사용법이 조금 다르다.

만약 프로젝트마다 직접 요청 상태 관리를 위한 커스텀 Hook 을 만들기 귀찮다면, 이 라이브러리를 사용하면 된다.

직접 커스텀 Hook 을 만들었을 때의 결과물은 배열로 반환하는 반면, 이 Hook 은 객체 형태로 반환한다.

해당라이브러리를 설치한다.

```js
yarn add react-async
```

공식사용법을 확인한다.

```js
import { useAsync } from 'react-async';

const loadCustomer = async ({ customerId }, { signal }) => {
  const res = await fetch(`/api/customers/${customerId}`, { signal });
  if (!res.ok) throw new Error(res);
  return res.json();
};

const MyComponent = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadCustomer, customerId: 1 });
  if (isLoading) return 'Loading...';
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    return (
      <div>
        <strong>Loaded some data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  return null;
};
```

react-async 의 `useAsync` 를 사용할 때, 파라미터로 넣는 옵션 객체에는 호출할 함수 `promiseFn` 을 넣고, 파라미터도 필드 이름과 함께 (customerId) 넣어주어야 한다.

User 컴포넌트를 react-async 의 `useAsync` 로 전환해보자.

User.js

```js
import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
}

function User({ id }) {
  const {
    data: user,
    error,
    isLoading,
  } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
```

`useAsync` 를 사용할 때에는 프로미스를 반환하는 함수의 파라미터를 객체형태로 해주어야 한다.

```js
async function getUser({ id }) {}
```

그래야, `id` 값을 따로 받아와서 사용 할 수 있게 된다.

그리고, `useAsync` 를 사용 할 때 `watch` 값에 특정 값을 넣어주면 이 값이 바뀔 때마다 `promiseFn` 에 넣은 함수를 다시 호출해준다.

조금 더 복잡한 비교를 해야 하는 경우 `watchFn` 을 사용 할 수 있다.

Users 컴포넌트를 react-async 의 `useAsync` 를 사용하는 코드로 전환해보자.

Users.js

```js
import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const {
    data: users,
    error,
    isLoading,
    reload,
  } = useAsync({
    promiseFn: getUsers,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={reload}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)} style={{ cursor: 'pointer' }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
```

`reload` 함수를 사용하면, 데이터를 다시 불러올 수 있다.

지금은 이전에 Users 컴포넌트를 만들 때, 불러오기 버튼을 눌러야만 데이터를 불러오도록 만들어줬었는데, 이렇게 해주면, 컴포넌트를 렌더링하는 시점부터 데이터를 불러오게 된다.

만약에 우리가 이전 섹션에서 배웠던 `skip` 처럼, 렌더링하는 시점이 아닌 사용자의 특정 인터랙션에 따라 API 를 호출하고 싶을 땐 `promiseFn` 대신 `deferFn` 을 사용하고, `reload` 대신 `run` 함수를 사용하면 된다.

Users.js

```js
import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const {
    data: users,
    error,
    isLoading,
    run,
  } = useAsync({
    deferFn: getUsers,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={run}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)} style={{ cursor: 'pointer' }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={run}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
```

이제 렌더링 시에는 데이터 요청을 하지 않고, 불러오기 버튼을 눌렀을때 데이터 요청을 하게 되는지 확인해본다.

react-async 라이브러리는 정말 쓸만하고, 편하다. 다만, 우리가 이전에 직접 만들었던 `useAsync` 와 크게 다를 건 없다. 어떤 측면에서는 우리가 직접 만든 Hook 이 편하기도 하다. 예를 들어서 Hook 의 옵션이 굉장히 간단하고, `watch` 같은 것 대신에 `deps` 를 사용하기도 하고, 반환 값이 배열 형태이기 때문에 (리액트 자체 내장 Hook 과 사용성이 비슷하다는 측면에서) 더욱 Hook 스럽다.

반면에 react-async 의 `useAsync` 는 옵션이 다양하고 (`promiseFn`, `deferFn`, `watch`, ...) 결과 값도 객체 안에 다양한 값이 들어있어서 (`run`, `reload`, ...) 헷갈릴 수 있는 단점이 있긴 하지만 다양한 기능이 이미 내장되어있고 (예를 들어서 요청을 취소 할 수도 있다.) Hook 을 직접 만들 필요 없이 바로 불러와서 사용 할 수 있는 측면에서는 정말 편하다.

만약 우리가 직접 만들었던 `useAsync` 의 작동 방식을 완벽히 이해했다면 여러분의 필요에 따라 커스터마이징 해가면서 사용 할 수 있으니까 직접 만들어서 사용하는 것을 추천한다.

특히나, 연습용 프로젝트가 아니라, 오랫동안 유지보수 할 수도 있게 되는 프로젝트라면 더더욱 추천한다.

반면, 작은 프로젝트이거나, 직접 만든 `useAsync` 의 작동 방식이 조금 어렵게 느껴지신다면 라이브러리로 설치해서 사용하는것도 좋다.

<br>
<br>
