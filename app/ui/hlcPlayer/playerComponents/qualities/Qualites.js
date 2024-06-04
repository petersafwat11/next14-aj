'use client';
import React, { useEffect, useRef } from 'react';
import classes from './qualities.module.css';

function Qualites({ setQualities }) {
  const qualitiesData = ['1080p', '720p', '340p', '240', '180p'];
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setQualities(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div ref={menuRef} className={classes['qualities-wrapper']}>
      <div>
        <div className={classes['quality-title']}>
          <div className={classes['title']}>Quality</div>
          <div
            onClick={() => setQualities(false)}
            className={classes['close-svg']}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="#FFFFFF
"
            >
              <g clipPath="url(#clip0_14_1593)">
                <path
                  d="M18.2083 6.14292L16.8571 4.79167L11.5 10.1487L6.14291 4.79167L4.79166 6.14292L10.1487 11.5L4.79166 16.8571L6.14291 18.2083L11.5 12.8512L16.8571 18.2083L18.2083 16.8571L12.8512 11.5L18.2083 6.14292Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_14_1593">
                  <rect width="23" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="2"
          viewBox="0 0 200 2"
          fill="none"
          style={{ marginBottom: '13px' }}
        >
          <path
            d="M1 1L245 0.999979"
            stroke="#818181"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={classes['qualities-content']}>
        {qualitiesData.map((quality, i) => (
          <div key={i} className={classes['quality-item']}>
            <div className={classes['quality-item-content']}>{quality}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Qualites;
