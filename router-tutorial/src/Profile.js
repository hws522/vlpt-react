const profileData = {
  testUser1: {
    name: 'user1',
    description: 'test user1',
  },

  testUser2: {
    name: 'user2',
    description: 'test user2',
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>no user</div>;
  }

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
