import React, {useContext, useEffect, useState} from 'react';
import './Welcome.scss';
import Navbar from '../../components/Navbar/Navbar';
import welcome from '../../assets/welcome.png';
import pic1 from '../../assets/pic1.jpeg'
import pic2 from '../../assets/pic2.jpeg'
import pic3 from '../../assets/pic3.jpeg'
import pic4 from '../../assets/pic4.jpeg'
import pic5 from '../../assets/pic5.jpeg'
import pic6 from '../../assets/pic6.jpeg'
import pic7 from '../../assets/pic7.jpeg'
import pic8 from '../../assets/pic8.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

const Welcome = () => {



  return (
    <>
      <Navbar />

      <header>
        <div className="container flex header">
          <div className="header-data flex left">
            <div className="typwriter-container">
              <h1>JSCOP 6.O</h1>
              <p>
                JSCOP 6.0, organized by the Optica Society, promises to be a dynamic and multifaceted event dedicated to advancing the knowledge and enthusiasm for optics and tech.
                The event also features competitions, offering participants the opportunity to showcase their skills through challenges such as poster presentations, project demonstrations, and perhaps even hands-on optical experiments.

              </p>
            </div>
            <Link to="/auth" className="become-tester-button buttton-hover">
              Get started
            </Link>
          </div>

          <div
            className="flex right"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <img src={welcome} alt="Header" className="header-img" />
          </div>
        </div>
      </header>

      <div className="slides">

        <h1>Some Photos of our events</h1>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={pic1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic4} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic5} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic6} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic7} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic8} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Welcome;
