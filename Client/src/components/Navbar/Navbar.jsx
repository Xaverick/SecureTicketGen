import React from 'react'
import { useState, useContext, useEffect } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi"
import { motion } from "framer-motion"
import "./Navbar.scss";
import {Context} from "../../utils/context"
import { Link } from "react-router-dom";

// import { images } from "../../constants";
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  
  const {userInfo, updateUser, setUserInfo} = useContext(Context);
  const handleLogout = () => {
    console.log("logging out");
    fetch(`${process.env.REACT_APP_BACKEND}/user/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(null);
        setToggle(false);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <>

      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className='app__navbar-links'>
          {
            
            userInfo ? 
            ["logout"].map((item) => (
              <li className='p-text' key={`${item}`}>
                <Link to='/' onClick={handleLogout}> {item} </Link>
              </li>
            )) : 
          
            ["login", "signup"].map((item) => (
              <li className='p-text' key={`${item}`}>
                <a href={`auth`} onClick={() => setToggle(false)}> {item} </a>
              </li>
            ))

          }

        </ul>

        <div className='app__navbar-menu'>
          <HiMenuAlt4 onClick={() => setToggle(true)} />
          {toggle && (
            <motion.div
              whileInView={{ x: [200, 0] }}
              transition={{ duration: 0.65, ease: "easeOut" }}

            >
              <ul>
                <HiX onClick={() => setToggle(false)} />
                
                {
                  userInfo  ? 
                  ["logout"].map((item) => (
                    <li className='p-text' key={`${item}`}>
                      <a href="/" onClick={handleLogout}> {item} </a>
                    </li>
                  )) : 
                
                  ["login", "signup"].map((item) => (
                    <li className='p-text' key={`${item}`}>
                      <a href={`auth`} onClick={() => setToggle(false)}> {item} </a>
                    </li>
                  ))

                }
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </>

  )
}

export default Navbar