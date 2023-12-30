import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
const { Context } = require('../../utils/context');


const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;

}

`;
const BackgroundBox = styled.div`
  background-color: #beeefb;
  height: 50vh;
  width: 100vw; 
  max-width: 1000px; 
  @media (max-width: 768px) {
    width: 90%; 
  }
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
    props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
    props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #053271;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #053271;
    border-right: 4px solid #053271;
    border-left: 4px solid #053271;
  }
`;

const Box2 = styled.div`
  background-color: #053271;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? "52%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "😜";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

function FormComponent() {
  const navigate = useNavigate();
  const { userInfo, updateUser, setUserInfo } = useContext(Context);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [username, Setusername] = useState("");
  const [emailerror, Setemailerror] = useState("");
  const [passworderror, Setpassworderror] = useState("");
  const [usernameerror, Setusernameerror] = useState("");
  const handleEmailChange = (e) => {
    Setemail(e.target.value);
    Setemailerror("");
  };
  const handlePasswordChange = (e) => {
    Setpassword(e.target.value);
    Setpassworderror("");
  };
  const handleUsernameChange = (e) => {
    Setusername(e.target.value);
    Setusernameerror("");
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      Setemailerror("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Setemailerror("Invalid email format");
    }
    if (!password) {
      Setpassworderror("Password is required");
    }

    else{
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Include cookies in the request
        });
  
        if (response.ok) {
          alert("Login successful");
          // navigate('/home');
          console.log('Login successful');

        } else {
          // Handle login failure
          alert("Login failed");

          console.error('Login failed');
        }
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
    
        fetchData().then(() => {
            navigate('/home');

        })



      } catch (error) {
        alert("Error during login");
        console.error('Error during login:', error);
      }
    }



  };
 
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username) {
      Setusernameerror("Username is required");
    }

    if (!email) {
      Setemailerror("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Setemailerror("Invalid email format");
    }

    if (!password) {
      Setpassworderror("Password is required");
    }

    else{
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
          credentials: 'include', // Include cookies in the request

        });
  
        if (response.ok) {
          alert("Registration successful, Email is sent, Pls verify Your Email, and pls Login");
          console.log('Registration successful');

        } else {
          // Handle login failure
          alert("Registration failed");
          console.error('Registration failed');
        }

      } catch (error) {
        alert("Error during Registration");
        console.error('Error during Registration:', error);
      }
    }

  }
  return (
    <>
      {" "}
      <BackgroundBox clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <Form className="signin" onSubmit={handleSignIn}>
          <Title>Sign In</Title>
          <Input
            type="email"
            name="email"
            id="emailId"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailerror && <span style={{ color: 'red' }}>{emailerror}</span>}
          <Input
            type="password"
            name="password"
            id="passwordId"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passworderror && <span style={{ color: 'red' }}>{passworderror}</span>}
          <Link href="#">Forgot Your Password?</Link>
          <Button>Sign In</Button>
        </Form>

        <Form className="signup" onSubmit={handleSignUp}>
          <Title>Sign Up</Title>
          <Input
            type="text"
            name="username"
            id="usernameId"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameerror && <span style={{ color: 'red' }}>{usernameerror}</span>}
          <Input
            type="email"
            name="email"
            id="emailId"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailerror && <span style={{ color: 'red' }}>{emailerror}</span>}
          <Input
            type="password"
            name="password"
            id="passwordId"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passworderror && <span style={{ color: 'red' }}>{passworderror}</span>}
          <Link href="#" onClick={handleClick}>
            Already have an Account?
          </Link>
          <Button>Sign Up</Button>
        </Form>

        <Text className="text1" clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤶</span>
        </Text>

        <Text className="text2" clicked={click}>
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤷</span>
        </Text>
        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default FormComponent;
