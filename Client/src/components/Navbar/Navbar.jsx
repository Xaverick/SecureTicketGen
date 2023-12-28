import React from 'react'
import { useState } from "react";
import {HiMenuAlt4, HiX} from "react-icons/hi"
import {motion } from "framer-motion"
import "./Navbar.scss";
// import { images } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      
      <nav className="app__navbar">
          <div className="app__navbar-logo">
            <img src={"../../logo.svg"} alt="logo" />
          </div>
          <ul className='app__navbar-links'>
            {["", "login", "signup"].map((item) => (
              <li className='app__flex p-text' key={`link-${item}`}>
                  <div />
                  <a href={`auth`}> {item} </a>
              </li>
            ))}
          </ul>

          <div className='app__navbar-menu'>
            <HiMenuAlt4 onClick={() => setToggle(true)} />
            {toggle && (
              <motion.div 
                whileInView={{ x : [200,0]}} 
                transition={{duration: 0.65, ease: "easeOut"}}

              >
              <ul>
                <HiX onClick={() => setToggle(false)} />
                {["home", "about", "work", "skills", "contact"].map((item) => (
                  <li className='p-text' key={`${item}`}>
                      <a href={`#${item}`} onClick={() => setToggle(false)}> {item} </a>
                  </li>
                ))}
              </ul>
              </motion.div>
            )}
          </div>
      </nav>
    </>

  )
}

export default Navbar