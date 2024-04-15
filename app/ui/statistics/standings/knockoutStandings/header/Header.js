import React from 'react'
import classes from './header.module.css'
const Header = () => {
  return (
    <div className={classes['container']}>
        <p className={classes['round']}>Round of 16</p>
        <p className={classes['round']}>Quarter-Finals</p>
        <p className={classes['round']}>Semi-Finals</p>
        <p className={classes['round']}>Final</p>
    </div>
  )
}

export default Header