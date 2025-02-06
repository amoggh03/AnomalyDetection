// src/components/VideoPlayer/VideoPlayer.js

import React, { useEffect, useRef } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc, speed }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (speed === 0) {
      // Stop the video when the motor is stopped
      video.pause();
    } else {
      // Start or adjust the video playback speed
      video.playbackRate = speed; // Set playback speed based on motor speed
      video.play();

      // Ensure the video loops infinitely
      video.loop = true;
    }
  }, [speed]);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        width="100%"
        muted
        autoPlay
        loop
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;