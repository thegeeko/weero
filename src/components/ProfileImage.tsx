import React from "react";

type profileProps = {
  url?: string;
  name?: string;
};

const profileImage: React.FC<profileProps> = (props: profileProps) => {
  return (
    <div className="profile-image-cont">
      {props.url ? (
        <img src={props.url} alt="profile" />
      ) : (
        <span>{props.name ? props.name[0].toUpperCase() : "U"}</span>
      )}
    </div>
  );
};

export default profileImage;
