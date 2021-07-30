import React, { useEffect, useState } from "react";
import SignupIllstration from "../assets/signup-illustration";
import Btn from "../components/Btn";
import Input from "../components/Input";
import useScreenSize from "../hooks/useScreenSize";
import useQuery from "../hooks/useQuery";
import { useFormik } from "formik";
import { signupValidation } from "../utils/validators";
import { auth } from "../utils/firebase";

const Signup: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState(false);
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const query = useQuery();
  const screenSize = useScreenSize();
  const formik = useFormik({
    onSubmit: (creds) => {
      auth
        .createUserWithEmailAndPassword(creds.email, creds.password)
        .then((newUser) => {
          newUser.user
            ?.updateProfile({ displayName: creds.username })
            .then((a) => {
              console.log(a);
            });
        })
        .catch((err) => {
          formik.setFieldError("email", err.message);
        });
    },
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: signupValidation,
  });

  auth.onAuthStateChanged((_user) => {
    if (_user) {
      setUser(_user);
      setEmailStatus(_user.emailVerified);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    let _email = query.get("email");
    if (_email) {
      formik.setFieldValue("email", _email);
    }
  }, []);

  return (
    <main>
      <div className="signup split-layout-cont">
        {!["md", "sm"].includes(screenSize) && (
          <div className="illustration-cont">
            <SignupIllstration className="illustration" />
          </div>
        )}
        <div className="info-cont">
          <h1 className="logo ">Weero</h1>

          {["md", "sm"].includes(screenSize) && (
            <div className="illustration-cont">
              <SignupIllstration className="illustration" />
            </div>
          )}

          <div className="paragraph">
            <p>Just a few steps away.</p>
          </div>

          {user && !emailStatus && (
            <p className="form">
              Verification email is sent to your email check it out plz :3.
            </p>
          )}

          {!user && (
            <form className="form" onSubmit={formik.handleSubmit}>
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
              <Input
                type="password"
                placeholder="Password"
                value={formik.values.password}
                error={formik.errors.password}
                onChange={formik.handleChange}
                id="password"
              />
              <Input
                type="password"
                placeholder="Password confirmation"
                value={formik.values.passwordConfirm}
                error={formik.errors.passwordConfirm}
                onChange={formik.handleChange}
                id="passwordConfirm"
              />
              <Btn type="submit" classes="signup-join btn-big">
                join :)
              </Btn>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Signup;
