import React from 'react'
import classes from './mainEvent.module.css'
const MainEvent = ({data}) => {
  return (
    <div className={classes["main-event"]}>
    <div className={classes["main-event-header"]}>
      <p className={classes["player-name"]}>{data.players[0].name}</p>
      <p className={classes["player-name"]}>{data.players[1].name}</p>
    </div>
    <div className={classes["main-event-stats"]}>
      {['age', 'height', 'weight', 'reach', 'record'].map(
        (item, index) => (
          <div className={classes["stat-item"]} key={Math.random()*10+ index}>
            <p>{data.players[0][item]}</p>
            <p className={classes['stat-item-middle']}>{item} </p>
            <p>{data.players[1][item]}</p>
          </div>
        )
      )}
    </div>
  </div>
)
}

export default MainEvent