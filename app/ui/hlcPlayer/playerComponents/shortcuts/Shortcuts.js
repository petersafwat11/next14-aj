'use client';
import React, { useEffect, useRef } from 'react';
import classes from './shortcuts.module.css';
function Shortcuts({ setShortcutsMenu, handleShortcutsChange, workShortcuts }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShortcutsMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div ref={menuRef} className={classes['shortcuts-parent']}>
      <div className={classes['shortcuts-wrraper']}>
        <svg
          onClick={() => setShortcutsMenu(false)}
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
        <div className={classes['shortcuts-title']}>Keyboard Shortcuts</div>
        <label className={classes['switch']}>
          <input
            checked={workShortcuts}
            onChange={handleShortcutsChange}
            className={classes['switch-input']}
            type="checkbox"
          />
          <span className={classes['rounded-slider']}></span>
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="246"
          height="2"
          viewBox="0 0 277 2"
          fill="none"
          style={{ marginTop: '15px', marginBottom: '10px' }}
        >
          <path
            d="M1 1L245 0.999979"
            stroke="#818181"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
        </svg>
        <div className={classes['shortcuts-content']}>
          <div className={classes['short-item']}>
            <div>Play/Pause</div>
            <div className={classes['short-icon']}>SPACE</div>
          </div>
          <div className={classes['short-item']}>
            <div>Increase Volume</div>
            <div className={classes['short-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
              >
                <path
                  d="M5.47524 0.28623C5.2214 0.0323896 4.80985 0.0323896 4.55601 0.28623L0.419432 4.4228C0.165591 4.67665 0.165591 5.0882 0.419432 5.34204C0.673272 5.59588 1.08483 5.59588 1.33867 5.34204L5.01563 1.66509L8.69258 5.34204C8.94642 5.59588 9.35798 5.59588 9.61182 5.34204C9.86566 5.0882 9.86566 4.67665 9.61182 4.42281L5.47524 0.28623ZM5.66562 12.7458L5.66563 0.74585L4.36563 0.74585L4.36563 12.7458L5.66562 12.7458Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={classes['short-item']}>
            <div>Decrease Volume</div>
            <div className={classes['short-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
              >
                <path
                  d="M4.55601 13.2055C4.80985 13.4593 5.2214 13.4593 5.47524 13.2055L9.61182 9.06889C9.86566 8.81505 9.86566 8.4035 9.61182 8.14966C9.35798 7.89581 8.94642 7.89581 8.69258 8.14966L5.01563 11.8266L1.33867 8.14966C1.08483 7.89581 0.673272 7.89581 0.419431 8.14966C0.16559 8.4035 0.16559 8.81505 0.419431 9.06889L4.55601 13.2055ZM4.36563 0.74585L4.36563 12.7458L5.66563 12.7458L5.66562 0.74585L4.36563 0.74585Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={classes['short-item']}>
            <div>Seek Forward</div>
            <div className={classes['short-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
              >
                <path
                  d="M12.4596 5.45962C12.7135 5.20578 12.7135 4.79422 12.4596 4.54038L8.32305 0.403808C8.06921 0.149967 7.65765 0.149967 7.40381 0.403808C7.14997 0.657648 7.14997 1.06921 7.40381 1.32305L11.0808 5L7.40381 8.67696C7.14996 8.9308 7.14996 9.34235 7.40381 9.5962C7.65765 9.85004 8.0692 9.85004 8.32304 9.5962L12.4596 5.45962ZM-1.1365e-07 5.65L12 5.65L12 4.35L1.1365e-07 4.35L-1.1365e-07 5.65Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={classes['short-item']}>
            <div>Seek Backword</div>
            <div className={classes['short-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
              >
                <path
                  d="M0.556006 5.28623C0.302165 5.54007 0.302165 5.95163 0.556005 6.20547L4.69258 10.342C4.94642 10.5959 5.35798 10.5959 5.61182 10.342C5.86566 10.0882 5.86566 9.67664 5.61182 9.4228L1.93486 5.74585L5.61182 2.06889C5.86566 1.81505 5.86566 1.4035 5.61182 1.14966C5.35798 0.895814 4.94642 0.895814 4.69258 1.14966L0.556006 5.28623ZM13.0156 5.09585L1.01563 5.09585L1.01562 6.39585L13.0156 6.39585L13.0156 5.09585Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={classes['short-item']}>
            <div>Captions On/Off</div>
            <div className={classes['short-icon']}>C</div>
          </div>
          <div className={classes['short-item']}>
            <div>Fullscreen / Exit</div>
            <div className={classes['short-icon']}>F</div>
          </div>
          <div className={classes['short-item']}>
            <div>Mute / Unmute</div>
            <div className={classes['short-icon']}>M</div>
          </div>
          <div className={classes['short-item']}>
            <div>Seek %</div>
            <div className={classes['short-icon']}>0-9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shortcuts;
