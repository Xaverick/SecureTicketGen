import React, {useContext, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './Home.scss'
const {useNavigate} = require('react-router-dom');
const {Context} = require('../../utils/context');



const Home = () => {
  const navigate = useNavigate();
  const {userInfo, updateUser, setUserInfo} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, []); 
  
  console.log(userInfo);

  const handleTicketButton = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/generateQRCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userInfo.username , email: userInfo.email}),
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

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-left">
          <h1>Game page photo</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae ut nesciunt delectus
            ea temporibus magni repudiandae deleniti tenetur inventore itaque? Maiores doloribus similique commodi, perspiciatis
            repudiandae non a. Doloribus, libero.</p>
          <h2>game page link</h2>
          <img src='' alt='' />
          <a href=''></a>
        </div>
        <div className="home-right">
          <h1> Game Rules</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam obcaecati
            dolores beatae necessitatibus odio est laborum illo maxime autem quos, voluptatibus, dolorum
            nesciunt iste officiis asperiores molestiae repellat, modi delectus?</p>
          <button className='button' onClick={handleTicketButton}>Get your Tickect</button>
        </div>
      </div>
    </>
  )
}

export default Home