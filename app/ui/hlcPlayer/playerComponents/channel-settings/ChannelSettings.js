'use client';

import React from 'react';
import classes from './channelSettings.module.css';
function ChannelSettings({
  isVisible,
  setAboutMenu,
  setShortcutsMenu,
  togglePictureInPicture,
}) {
  function openAbout() {
    setAboutMenu(true);
  }
  return (
    <div
      id="context"
      className={
        isVisible
          ? classes['channels-wrapper']
          : classes['channels-wrapper-none']
      }
    >
      <div onClick={openAbout} className={classes['channel-item']}>
        <div className={classes['channel-item-content']}>About This Video</div>
      </div>
      <div
        onClick={() => setShortcutsMenu(true)}
        className={classes['channel-item']}
      >
        <div className={classes['channel-item-content']}>
          Keyboard Shortcuts
        </div>
      </div>
      <div onClick={togglePictureInPicture} className={classes['channel-item']}>
        <div className={classes['channel-item-content']}>
          Picture in Picture (PiP)
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="246"
        height="2"
        viewBox="0 0 246 2"
        fill="none"
      >
        <path
          d="M1 1L245 0.999979"
          stroke="#818181"
          strokeWidth="0.3"
          strokeLinecap="round"
        />
      </svg>
      <div className={classes['logo-content']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53"
          height="33"
          viewBox="0 0 53 33"
          fill="none"
        >
          <path
            d="M26.5402 11.5545L23.3007 16.1744C18.87 22.4796 12.6735 27.3121 5.50103 30.0532L1.4926 31.5855C1.4926 31.5855 21.0411 3.85301 21.2132 3.64252L26.5402 11.5545Z"
            fill="#00C4FB"
          />
          <path
            d="M34.8714 23.8942L34.9737 23.9185L34.9559 23.8942L33.1494 21.2282L21.2199 3.63846C22.4499 2.1515 24.1793 0.906158 26.7247 0.906158C29.5039 0.906158 31.3412 2.39312 32.6435 4.29091L51.3736 31.5821H19.743C23.261 26.7172 28.8917 23.8515 34.8714 23.8942Z"
            fill="white"
          />
          <path
            d="M26.5363 11.5545L24.1793 14.9162L21.2085 3.64117L26.5363 11.5545Z"
            fill="#009CC8"
          />
          <path
            d="M46.0825 23.8941H34.9463L32.7558 20.6617L46.0825 23.8941Z"
            fill="#CBCBCB"
          />
        </svg>

        <div className={classes['logo-name']}>Powered by AJ Sports</div>
      </div>
    </div>
  );
}

export default ChannelSettings;
