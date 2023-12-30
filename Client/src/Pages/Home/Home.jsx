import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './Home.scss'
import gamelogo from '../../assets/game image.jpeg'
const { useNavigate } = require('react-router-dom');
const { Context } = require('../../utils/context');



const Home = () => {
  const navigate = useNavigate();
  const { userInfo, updateUser, setUserInfo, ticket_id, setTicketid } = useContext(Context);

  const handleTicketButton = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/generateQRCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userInfo.username, email: userInfo.email }),
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        alert("Ticket issued");
        navigate('/TicketPage');
        console.log('Ticket issued');

      } else {
        // Handle login failure
        alert("Ticket not issued");

        console.error('Ticket not issued');
      }
    }

    catch (error) {
      alert("Ticket not issued");
      console.error(error);
    }

  }

  // const handlegoto = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_BACKEND}/getQRCode`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ username: userInfo.username, email: userInfo.email }),
  //         credentials: 'include', // Include cookies in the request
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setTicketid(data.ticket_id);
  //         navigate('/TicketPage');
  //         console.log('Ticket id fetched');
  //       } else {
  //         // Handle login failure
  //         console.error('Ticket id not fetched');
  //       }
  //     }

  //     catch (error) {
  //       console.error(error);
  //     }
  // }

  



  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-left">
          <h1>Game page photo</h1>
          <img src={gamelogo} alt='' />
          <h2>Soon it will be provided ...</h2>
          <a href=''></a>
        </div>
        <div className="home-right">
          <h1> Game Rules</h1>
          <p>
            1. Each player is limited to a single attempt at the game.
            This ensures equal opportunities and prevents one player from dominating the leaderboard through multiple plays.
          </p>
          <br />
          <p>
            2. Players earn points by shooting down obstacles.
            The scoring system could be based on factors such as the number of obstacles shot, their difficulty, or a combination of these elements.
          </p>
          <br />
          <p>
            3. The game is open for a specific period, creating a sense of urgency.
            Players need to participate within this timeframe to be eligible for rewards.
          </p>
          <br />
          <p>
            4. The leaderboard displays the top 5 players based on their scores.
            Rewards or discount coupons are allocated to these top 5 players.
          </p>

          <br />
          <p> <b>Pls verify your Email before issuing your ticket </b> </p>
          <br />
          <button className='button' onClick={handleTicketButton}>Get your Tickect</button>
          {/* <button className='button' onClick={handlegoto}>Go To Ticket Page</button> */}
        </div>
      </div>
    </>
  )
}

export default Home