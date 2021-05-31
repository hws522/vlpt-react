import React, { useRef } from 'react';
import './App.css';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@gmail.com',
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@gmail.com',
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@gmail.com',
    },
  ];

  const nextId = useRef(4);

  const onCreate = () => {
    console.log(nextId.current); //  4
    nextId.current += 1;
  };

  return <UserList users={users} />;
}

export default App;
