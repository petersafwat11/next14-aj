'use client';
import React, { useEffect, useRef, useState } from 'react';
import classes from './hlcPlayer.module.css';
import './volume.css';
function Contrrols({
  mute,
  isPlaying,
  playVideo,
  toggleFull,
  toggleSound,
  togglePictureInPicture,
  setQualities,
  videoRef,
}) {
  const [sliderValue, setSliderValue] = useState(0);
  const sliderEl = useRef(null);

  useEffect(() => {
    const updateSlider = (event) => {
      const tempSliderValue = event.target.value;
      setSliderValue(tempSliderValue);

      const progress = (tempSliderValue / sliderEl.current.max) * 100;

      sliderEl.current.style.background = `linear-gradient(to right, #fff ${progress}%, #ccc ${progress}%)`;

      videoRef.current.volume = tempSliderValue / sliderEl.current.max;
    };

    sliderEl.current.addEventListener('input', updateSlider);

    return () => {
      sliderEl.current.removeEventListener('input', updateSlider);
    };
  }, [videoRef]);

  return (
    <div className={classes['controls-wrapper']}>
      <div className={classes['controls']}>
        <div className={classes['controls-left']}>
          <button onClick={playVideo} className={classes['playing-control']}>
            {isPlaying == false ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 76 87"
                fill="none"
              >
                <path
                  d="M72.569 39.2085C75.8839 41.1365 75.8839 45.9247 72.569 47.8527L7.51387 85.6909C4.18056 87.6297 -3.85644e-06 85.225 -3.68788e-06 81.3688L-3.79957e-07 5.6924C-2.114e-07 1.83627 4.18056 -0.568452 7.51387 1.37031L72.569 39.2085Z"
                  fill="#D9D9D9"
                />
              </svg>
            ) : (
              <img
                width={20}
                height={20}
                src="/live-components/stop.png"
                alt="open"
              />
            )}
          </button>

          <div className="volume-container">
            <div className="volume-wrapper">
              <div className="content">
                <div className="range">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={sliderValue}
                    id="range2"
                    ref={sliderEl}
                    className="range-input"
                  />
                  <span className="value2">{sliderValue * 2}%</span>
                </div>
              </div>
            </div>
            {mute ? (
              <svg
                onClick={toggleSound}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                style={{ width: '20px', height: '20px' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  clipRule="evenodd"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <img
                onClick={toggleSound}
                width={20}
                height={20}
                src="/live-components/sound.png"
                alt="open"
              />
            )}
          </div>

          <div className={classes['dot-wrapper']}>
            <span></span>
            <p>Live</p>
          </div>
        </div>
        <div className={classes['controls-right']}>
          <button className={classes['qualities']}>
            <img
              onClick={() => setQualities((prev) => !prev)}
              width={20}
              height={20}
              src="/live-components/settings.png"
              alt="open"
            />
          </button>
          <button onClick={togglePictureInPicture}>
            <img
              width={20}
              height={20}
              src="/live-components/small-screen.png"
              alt="open"
            />
          </button>
          <button onClick={toggleFull}>
            <img
              width={20}
              height={20}
              src="/live-components/open-scale.png"
              alt="open"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contrrols;
