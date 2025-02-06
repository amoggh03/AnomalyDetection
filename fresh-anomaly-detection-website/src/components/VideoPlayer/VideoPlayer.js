// src/components/VideoPlayer/VideoPlayer.js

import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <video controls width="100%">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;