import React, { useState } from 'react';
import axios from 'axios';
import './github-card.scss';

// GitHub usernames : gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

function Card(props) {
  const profile = props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} alt="" />
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );

}

function Form(props) {
  const [userName, setUserName] = useState(``);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setUserName(``);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder="GitHub username"
        ref={userName.input}
        required
      />
    </form>
  );
}

function App() {
  const [profiles, setProfiles] = useState([]);
  const addNewProfile = (profileData) => {
    setProfiles(oldProfile => [...oldProfile, profileData])
  }
  return (
    <div>
      <div className="header">The GitHub Cards App</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
    </div>
  );
}


export default App;