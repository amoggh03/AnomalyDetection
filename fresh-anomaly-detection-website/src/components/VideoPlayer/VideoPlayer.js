import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div>
      <video controls width="100%">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;