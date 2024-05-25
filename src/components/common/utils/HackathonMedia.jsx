import React from "react";

const HackathonMedia = ({ cover_image_url, avatar_url }) => {
  const containerStyle = {
    position: "relative",
    width: "300px",
    height: "200px",
  };

  const coverStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    objectFit: "cover",
  };

  const avatarStyle = {
    position: "absolute",
    left: "20px",
    bottom: "10px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "1px solid #7C7C7C",
    zIndex: 2,
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      {cover_image_url ? (
        <img src={cover_image_url} alt="" style={coverStyle} />
      ) : (
        <img src="/assets/noImage1.jpg" alt="" style={coverStyle} />
      )}
      {avatar_url ? (
        <img src={avatar_url} alt="" style={avatarStyle} />
      ) : (
        <img src="/assets/noImage2.jpg" alt="" style={avatarStyle} />
      )}
    </div>
  );
};

export default HackathonMedia;
