import React from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'

const Home = () => {
  return (
    <>
      <Seo
        title="Kāpiti Youth Support"
        description="Passionate in supporting rangatahi to be everything they possibly can be"
        url={window.location.href}
      />

      <PageHeader title="Welcome To Kāpiti Youth Support" image_url="/header_imgs/bg2.webp"/>
    <div className="background-color">
    <div className="Home-quote">
        <h3>Passionate in supporting rangatahi to be everything they possibly can be</h3>
    </div>
    <div className="home-info">
        <h4>Nau mai haere mai, welcome to Kāpiti Youth Support.</h4>
        <h4>Kāpiti Youth Support is a Youth One Stop Shop, providing free health, mental health <br/>
            and social support services to rangatahi aged 10-24 years living in Kāpiti.</h4>
        <h4>We're a registered charity, and we've been around for more than 25 years.</h4>
    </div>
    <div className="home-btns">
        <button>Book appointment by text: 027 248 2744</button>
        <button>WHAT WE DO</button>
        <button>WHY WE DO IT</button>
    </div>
</div>

    </>
  )
}

export default Home
