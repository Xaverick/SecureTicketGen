import React from 'react';
import './Welcome.scss';
import Navbar from '../../components/Navbar/Navbar';
import welcome from '../../assets/welcome.png';

import { Swiper, SwiperSlide } from 'swiper/react';

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
              <h1>Design confidently.</h1>
              <p>
                UsabilityHub is a remote user research platform that takes the
                guesswork out of design decisions by validating them with real
                users.
              </p>
              <a href="kjvskl" className="become-tester-button buttton-hover">
                Get started
              </a>
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
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt=""/>
            </SwiperSlide>
            </Swiper>
        </div>
      </>
    );
};

export default Welcome;
