import { useFormik } from "formik";
import { auth, storage } from "../utils/firebase";
import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import ProfileImage from "../components/ProfileImage";
import Btn from "../components/Btn";
import { useHistory } from "react-router-dom";
import { profileValidation } from "../utils/validators";

const ProfileSettings: React.FC = () => {
  const history = useHistory();
  const [profileImageBase64, changeProfileImageBase64] = useState("");
  let user = auth.currentUser;
  const profileStorageRef = storage.ref(`profiles/${user?.uid}`);

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      if (typeof fileReader.result == "string")
        changeProfileImageBase64(fileReader.result);
    });

    if (e.currentTarget.files !== null && e.currentTarget.files[0])
      fileReader.readAsDataURL(e.currentTarget.files[0]);
  };

  useEffect(
    () =>
      auth.onAuthStateChanged((_user) => {
        if (_user && _user.emailVerified) {
          formik.setFieldValue("username", _user.displayName);
          formik.setFieldValue("profileURL", _user.photoURL);
          user = _user;
        } else {
          history.push("/signup");
        }
      }),
    []
  );

  const formik = useFormik({
    onSubmit: async (creds) => {
      let updatedUser: { displayName?: string; photoURL?: string } = {};
      if (creds.username !== user?.displayName) {
        updatedUser.displayName = creds.username;
      }
      if (profileImageBase64) {
        let uploadRes = await profileStorageRef.putString(
          profileImageBase64,
          "data_url"
        );
        let profileLink = await uploadRes.ref.getDownloadURL();
        profileLink
          ? (updatedUser.photoURL = profileLink)
          : formik.setFieldError("username", profileLink);
      }
      if (updatedUser && Object.keys(updatedUser).length > 0 && user) {
        await user.updateProfile(updatedUser);
        console.log(user);
      }
    },
    initialValues: {
      username: "",
      profileURL: "",
    },
    validationSchema: profileValidation,
  });

  return (
    <main>
      <div className="profile-settings">
        <div>
          <h1 className="logo">Weero</h1>
          <p className="sub-header">Customize your profile</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            customProps={{
              accept: "image/png, image/jpeg",
            }}
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
          <Btn type="submit" classes="btn-big">
            update
          </Btn>
        </form>
      </div>
    </main>
  );
};

export default ProfileSettings;
