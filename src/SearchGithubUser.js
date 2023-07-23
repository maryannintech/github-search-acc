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
      if (response.status === 404) {
        setError("User not found");
        setUserData(null);
      } else if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError(null);
      } else {
        setError("An error occurred while fetching data");
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
        {error && <div className="error"><p>{error}</p></div>}
        {userData && (
          <div className="user-result">
            <p className="user-name">@{userData.login}</p>
            <div className="user-firstrow">
              <div className="user-avatar">
                <img src={userData.avatar_url} alt="avatar of user"></img>
              </div>
              <div className="user-info">
                <p>{userData.name}</p>
                <p>: {userData.bio}</p>
                <a href={userData.html_url} rel="noopener noreferrer" target="_blank"> 🧑‍💻 Visit their GitHub page! <i className="bi bi-box-arrow-up-right"></i> </a>
              </div>
            </div>
            <div className="user-secondrow">
              <div className="user-follow">
                <p>Following: {userData.following}</p>
                <p>Followers: {userData.followers}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
