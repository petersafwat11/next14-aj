'use client';
import React, { useEffect, useRef } from 'react';
import classes from './about.module.css';
function AboutLive({ setAboutMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAboutMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef} className={classes['wrapper-parent']}>
      <div className={classes['about-wrapper']}>
        <svg
          onClick={() => setAboutMenu(false)}
          className={classes['close-svg']}
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <g clipPath="url(#clip0_14_1559)">
            <path
              d="M18.2083 6.14291L16.8571 4.79166L11.5 10.1487L6.14292 4.79166L4.79167 6.14291L10.1488 11.5L4.79167 16.8571L6.14292 18.2083L11.5 12.8512L16.8571 18.2083L18.2083 16.8571L12.8513 11.5L18.2083 6.14291Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_1559">
              <rect width="23" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className={classes['about-item']}>
          <div className={classes['about-item-content']}>
            Title <span>BT Sports 1</span>
          </div>
        </div>
        <div className={classes['about-item']}>
          <div className={classes['about-item-content']}>
            Duration <span>Live </span>
          </div>
        </div>
        <div className={classes['about-item']}>
          <div className={classes['about-item-content']}>
            Quality <span>4K</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="246"
          height="2"
          viewBox="0 0 246 2"
          fill="none"
          className={classes['svg-line']}
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
    </div>
  );
}

export default AboutLive;
