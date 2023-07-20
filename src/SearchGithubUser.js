import "./SearchGithubUser.css";
import { useState } from "react";

export default function SearchGithubUser() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.elements["user-search"].value;
    const apiUrl = `https://api.github.com/users/${username}`;

    try {
      const response = await fetch(apiUrl);
      if (response) {
        const data = await response.json();
        setUserData(data);
        setError(null);
      } else {
        setError("User not found");
        setUserData(null);
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      setUserData(null);
    }
  };

  return (
    <div className="container">
      <div className="search-input">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search" id="user-search"></input>
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      <div className="result">
        {error && <div className="error">{error}</div>}
        {userData && (
          <div className="user-result">
            <div className="user-avatar">
              <img src={userData.avatar_url} alt="avatar of user"></img>
            </div>
            <div className="user-info">
              <p>Name: {userData.name}</p>
              <p>Username: {userData.login}</p>
              <p>Bio: {userData.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
