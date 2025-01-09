import React from "react";

const UserCard = ({ user, onSelect }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={user.picture.medium}
        alt="User"
        style={{ borderRadius: "50%", marginBottom: "10px" }}
      />
      <h3>{`${user.name.first} ${user.name.last}`}</h3>
      <button
        onClick={onSelect}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          fontSize: "14px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Select
      </button>
    </div>
  );
};

export default UserCard;
