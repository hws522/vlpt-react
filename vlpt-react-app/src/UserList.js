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

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
