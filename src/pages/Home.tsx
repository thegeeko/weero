import React, { useState } from "react";
import { useHistory } from "react-router";
import HomeIllustration from "../assets/home-illustration";
import Btn from "../components/Btn";
import Input from "../components/Input";
import useScreenSize from "../hooks/useScreenSize";

const Home: React.FC = () => {
  let screenSize = useScreenSize();
  const [email, setEmail] = useState("");
  const history = useHistory();

  function handleJoin() {
    console.log('object')
    email ? history.push(`/signup?email=${email}`) : history.push(`/signup`);
  }

  function handleEmailChange(e:React.FormEvent<HTMLInputElement>) {
    console.log(e)
    setEmail(e?.currentTarget?.value);
  }

  return (
    <main>
      <div className="home-container">
        {!["md", "sm"].includes(screenSize) && (
          <div className="home-illustration-container">
            <HomeIllustration className="home-illustration" />
          </div>
        )}
        <div className="home-info">
          <h1 className="logo home-logo">Weero</h1>

          {["md", "sm"].includes(screenSize) && (
            <div className="home-illustration-container">
              <HomeIllustration className="home-illustration" />
            </div>
          )}

          <div className="home-paragraph">
            <p>
              it's all about you and your beautiful smile share it with the
              world.
            </p>
            <p>smile, spread love and beauty around.</p>
          </div>

          <div className="home-form">
            <Input classes="home-email" type="email" placeholder="Email" onChange={handleEmailChange}/>
            <Btn classes="home-join btn-big" onClick={handleJoin}>
              join :)
            </Btn>
            or
            <Btn classes="home-login btn-big">login :)</Btn>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
