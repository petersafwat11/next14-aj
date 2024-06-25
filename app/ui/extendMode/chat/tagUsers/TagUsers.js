import React, { useState } from "react";
import classes from "./tagUsers.module.css";
const TagUsers = ({ setMentionSomeone, toggleTagUsers, activeUsers }) => {
  const dummyUsers = [
    "championsleague208championsleague208",
    "championsleagasdihashdue208",
    "championsleague208",
    "championsleague208",
    "championslue208",
    "championsleague20jsjsjjjj8",
    "championsleague208",
    "championslue208",
    "championsleague20jsjsjjjj8",
  ];
  const [searchUsers, setSearchUsers] = useState([]);
  const handleSearch = (name) => {
    const filteredusers = searchUsers.filter((user) => {
      return user.includes(name);
    });
    // setSearchUsers(users);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}></div>
      <div className={classes["body"]}>
        <h2 className={classes["title"]}>Users</h2>
        <div className={classes["users"]}>
          {
            // activeUsers
            dummyUsers.map((user, index) => (
              <p
                onClick={(e) => {
                  setMentionSomeone(user);
                  toggleTagUsers();
                }}
                key={index}
                className={classes["user"]}
              >
                {user}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TagUsers;
