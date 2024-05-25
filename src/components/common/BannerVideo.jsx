import React from "react";

const BannerVideo = () => {
  return (
    <div className="banner-video-container ">
      <video
        className="banner-video md:h-[600px] h-[300px]"
        autoPlay
        loop
        muted
      >
        <source src="https://unitarmedia.blob.core.windows.net/data/unitar.mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BannerVideo;
