import React from "react";
import classes from "./topic.module.css";
const Topic = ({ topic, selectTopic, selectedTopic }) => {
  return (
    <p
      style={{
        backgroundColor: selectedTopic === topic ? "#03a1cd" : "",
      }}
      onClick={() => {
        selectTopic(topic);
      }}
      className={classes["topic-option"]}
    >
      {topic}
    </p>
  );
};

export default Topic;
