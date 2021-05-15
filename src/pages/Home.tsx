import React from 'react'
import HomeIllustration from '../assets/home-illustration';
import Btn from '../components/Btn';
import Input from '../components/Input';
import useScreenSize from '../hooks/useScreenSize';

const Home: React.FC = () => {
  let screenSize = useScreenSize();

  return(
  <main>
    <div className="home-container">
      {!['md', 'sm'].includes(screenSize) &&<div className="home-illustration-container">
        <HomeIllustration className="home-illustration"/>
      </div>}
      <div className="home-info">
        <h1 className="logo home-logo">Weero</h1>

        {['md', 'sm'].includes(screenSize) && <div className="home-illustration-container">
          <HomeIllustration className="home-illustration"/>
        </div>}

        <div className="home-paragraph">
          <p>it's all about you and your beautiful smile share it with the world.</p>
          <p>smile, spread love and beauty around.</p>
        </div>
        
        <div className="home-form">
          <Input classes="home-email" type="email" placeholder="Email"/>
          <Btn classes="home-join btn-big">join :)</Btn>
          or
          <Btn classes="home-login btn-big">login :)</Btn>
        </div>
      </div>
    </div>
  </main>)
}

export default Home;