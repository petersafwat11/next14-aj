import React from "react";
import Topic from "./reason";
import classes from "./topics.module.css";
const Topics = ({ topic, dispatchData }) => {
  const chooseTopic = [
    "Connection Trouble",
    "Server playing wrong match",
    "Advertise with us ",
    "Feedback",
    "Add a Channel",
    "Add a Sport or League",
    "Chat issues",
    "Something else",
  ];
  const selectTopic = (topic) => {
    dispatchData({ type: "TOPIC", value: topic });
  };
  return (
    <div className={classes["topics"]}>
      <p className={classes["label"]}>Select a topic</p>
      <div className={classes["topics-options"]}>
        <div className={classes["topics-options-first"]}>
          {chooseTopic.slice(0, 3).map((item, index) => (
            <Topic
              selectedTopic={topic}
              topic={item}
              key={index}
              selectTopic={selectTopic}
            />

          ))}
        </div>
        <div className={classes["topics-options-second"]}>
          {chooseTopic.slice(3, 6).map((item, index) => (
            <Topic
              selectedTopic={topic}
              topic={item}
              key={index}
              selectTopic={selectTopic}
            />
          ))}
        </div>
        <div className={classes["topics-options-third"]}>
          {chooseTopic.slice(6, 8).map((item, index) => (
            <Topic
              selectedTopic={topic}
              topic={item}
              key={index}
              selectTopic={selectTopic}
            />
          ))}
        </div>
        <div className={classes["topics-mobile"]}>
          {chooseTopic.slice(0, 8).map((item, index) => (
            <Topic
              selectedTopic={topic}
              topic={item}
              key={index}
              selectTopic={selectTopic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
