import React, { useEffect, useRef, useState } from 'react';

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const videoSources = ['squat.mp4', 'female.mp4', 'pushups.mp4'];
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.src = videoSources[currentSourceIndex];
    videoElement.play();
  }, [videoSources, currentSourceIndex]);

  const handleVideoEnded = () => {
    setCurrentSourceIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div className="navbar-video">
      <video ref={videoRef} autoPlay muted onEnded={handleVideoEnded}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
