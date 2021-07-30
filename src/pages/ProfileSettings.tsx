import { useFormik } from "formik";
import { auth } from "../utils/firebase";
import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import ProfileImage from "../components/ProfileImage";

const ProfileSettings: React.FC = () => {
  const [profileImageBase64, changeProfileImageBase64] = useState("");
  const user = auth.currentUser;

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      if (typeof fileReader.result == "string")
        changeProfileImageBase64(fileReader.result);
    });

    if (e.currentTarget.files !== null && e.currentTarget.files[0])
      fileReader.readAsDataURL(e.currentTarget.files[0]);
  };

  const formik = useFormik({
    onSubmit: () => {},
    initialValues: {
      email: "",
      username: "",
      profileURL: "",
    },
  });

  return (
    <main>
      <div className="profile-settings">
        <div>
          <h1 className="logo">Weero</h1>
          <h3 className="sub-header">Customize your profile</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="file"
            placeholder="ur profile image"
            onChange={handleProfileChange}
            id="profile-image"
            classes="profile-image-field"
          ></Input>
          <label className="image-preview" htmlFor="profile-image">
            {profileImageBase64 || user?.photoURL ? (
              profileImageBase64 ? (
                <ProfileImage url={profileImageBase64} />
              ) : (
                <ProfileImage url={user?.photoURL ? user?.photoURL : ""} />
              )
            ) : (
              <ProfileImage name={user?.displayName ? user.displayName : ""} />
            )}
          </label>
          <Input
            type="text"
            placeholder="Username"
            value={formik.values.username}
            error={formik.errors.username}
            onChange={formik.handleChange}
            id="username"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
            id="email"
          />
        </form>
      </div>
    </main>
  );
};

export default ProfileSettings;
