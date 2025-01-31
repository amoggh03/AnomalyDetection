import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ speed }) => {
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleSpeedChange = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }

    const videoElement = videoRef.current;
    const videoDuration = videoElement.duration;

    const checkPlaybackTime = () => {
      if (videoElement.currentTime >= 60) {
        videoElement.pause();
      }
    };

    if (videoDuration < 60) {
      videoElement.loop = true;
    }

    videoElement.addEventListener('timeupdate', checkPlaybackTime);
    videoElement.onPlay = handleSpeedChange;

    return () => {
      videoElement.loop = false; // Reset loop when unmounting
      videoElement.removeEventListener('timeupdate', checkPlaybackTime);
    };
  }, [speed]);

  return (
    <div className="video-player-container">
      <video ref={videoRef} src="/videos/motor.mp4" onPlay={handleSpeedChange} loop controlsList="nodownload" disablePictureInPicture>
        Your browser does not support the video tag.
      </video>
      <button onClick={handlePlayPause} className="start-stop-button">Start/Stop</button>
    </div>
  );
};

export default VideoPlayer;