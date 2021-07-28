import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SigninIllstration from "../assets/signin-illustration";
import Btn from "../components/Btn";
import Input from "../components/Input";
import useScreenSize from "../hooks/useScreenSize";
import useQuery from "../hooks/useQuery";
import { useFormik } from "formik";
import { signinValidation } from "../utils/validators";
import { auth } from "../utils/firebase";

const Signin: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState(false);
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const query = useQuery();
  const history = useHistory();
  const screenSize = useScreenSize();
  const formik = useFormik({
    onSubmit: (creds) => {
      auth
        .signInWithEmailAndPassword(creds.email, creds.password)
        .catch((err) => {
          formik.setFieldError("password", err.message);
        });
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidation,
  });

  auth.onAuthStateChanged((_user) => {
    if (_user) {
      setUser(_user);
      setEmailStatus(_user.emailVerified);
      emailStatus ? history.push("/tl") : history.push("/signup");
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
      <div className="signin split-layout-cont">
        {!["md", "sm"].includes(screenSize) && (
          <div className="illustration-cont">
            <SigninIllstration className="illustration" />
          </div>
        )}
        <div className="info-cont">
          <h1 className="logo ">Weero</h1>

          {["md", "sm"].includes(screenSize) && (
            <div className="illustration-cont">
              <SigninIllstration className="illustration" />
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
                classes="signup-email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                error={formik.errors.email}
                onChange={formik.handleChange}
                id="email"
              />
              <Input
                classes="signup-email"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                error={formik.errors.password}
                onChange={formik.handleChange}
                id="password"
              />
              <Btn type="submit" classes="signup-join btn-big">
                I'm back :)
              </Btn>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Signin;