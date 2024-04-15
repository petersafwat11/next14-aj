import React from 'react'
import classes from './header.module.css'
const Header = () => {
  return (
    <div className={classes['container']}>
        <p className={classes['para']}>Knockout Stage</p>
    </div>
  )
}

export default Header