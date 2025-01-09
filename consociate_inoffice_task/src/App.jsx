import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => setUsers(response.data.results))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>User Cards</h1>

      {!selectedUser && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              onSelect={() => handleSelectUser(user)}
            />
          ))}
        </div>
      )}

      {selectedUser && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Selected User Details</h2>
          <img
            src={selectedUser.picture.large}
            alt="User"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          />
          <p>
            <strong>Name:</strong> {`${selectedUser.name.first} ${selectedUser.name.last}`}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <button
            onClick={() => setSelectedUser(null)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Cards
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
