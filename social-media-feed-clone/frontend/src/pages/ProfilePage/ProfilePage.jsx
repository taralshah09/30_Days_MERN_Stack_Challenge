import React, { useContext, useState } from 'react';
import "./ProfilePage.css";
import UserContext from "../../context/getUser";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "Hey there, I am using instagram");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  const handleSave = () => {
    // Implement save functionality to update user details in the database
    console.log("Saved details:", { name, email, bio });
  };

  return (
    <div className='profile-page'>
      <div className="profile-section">
        <img src={user.profilePicture} alt="User Profile" />
        <form className="profile-form">
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Bio:
            <textarea value={bio} onChange={handleBioChange} />
          </label>
          <button type="button" onClick={handleSave}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
