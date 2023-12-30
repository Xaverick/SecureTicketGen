import React, { createContext, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
const { Context } = require('../../utils/context');
// Context
export const AccountContext = createContext();

// Common styles
const CommonStyles = `
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
`;

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  position: relative; /* Relative position for the circle */
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
  position: relative;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MutedLink = styled.a`
  ${CommonStyles}
  color: rgba(200, 200, 200, 0.8);
  border-bottom: 1px dashed rgba(200, 200, 200, 0.8);
`;

const BoldLink = styled.a`
  ${CommonStyles}
  color: rgba(241,196,15,1);
  border-bottom: 1px dashed rgba(241,196,15,1);
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(241, 196, 15, 1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: linear-gradient(
    58deg, rgba(243,172,18,1) 20%, rgba(241,196,15,1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

const LineText = styled.p`
  font-size: 1.2rem;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
`;

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

function Marginer(props) {
    const { direction } = props;

    if (direction === "horizontal") return <HorizontalMargin {...props} />;
    else {
        return <VerticalMargin {...props} />;
    }
}

Marginer.defaultProps = {
    direction: "horizontal",
};

// Animations
const BackDropAnimation = keyframes`
  0% {
    width: 160%;
    height: 550px;
    border-radius: 50%;
    transform: rotate(60deg);
  }
  100% {
    width: 233%;
    height: 1050px;
    border-radius: 20%;
    transform: rotate(60deg);
  }
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 160%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -290px;
  left: -70px;
  background: linear-gradient(
    58deg, rgba(243,172,18,1) 20%, rgba(241,196,15,1) 100%
  );
  animation: ${BackDropAnimation} 2.3s ease-in-out;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`;

const SmallText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin-top: 7px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const backdropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export default function AccountBox(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400);
    };

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>

                    <BackDrop
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === "signin" && (
                        <HeaderContainer>
                            <HeaderText>Welcome</HeaderText>
                            <HeaderText>Back</HeaderText>
                            <SmallText>Please sign-in to continue!</SmallText>
                        </HeaderContainer>
                    )}
                    {active === "signup" && (
                        <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please sign-up to continue!</SmallText>
                        </HeaderContainer>
                    )}
                </TopContainer>
                <InnerContainer>
                    {active === "signin" && <LoginForm />}
                    {active === "signup" && <SignupForm />}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    );
}

export function LoginForm() {
    const navigate = useNavigate();
    const { userInfo, updateUser, setUserInfo } = useContext(Context);
    const { switchToSignup } = useContext(AccountContext);
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
    const [emailerror, Setemailerror] = useState("");
    const [passworderror, Setpassworderror] = useState("");

    const handleEmailChange = (e) => {
        Setemail(e.target.value);
        Setemailerror("");
    };


    const handlePasswordChange = (e) => {
        Setpassword(e.target.value);
        Setpassworderror("");
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


    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSignIn}>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="emailId"
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailerror && <span style={{ color: 'white' }}>{emailerror}</span>}
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="passwordId"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passworderror && <span style={{ color: 'white' }}>{passworderror}</span>}
                <SubmitButton type="submit">Signin</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Don't have an account?{" "}
                <BoldLink onClick={switchToSignup} href="#">
                    Signup
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}

export function SignupForm() {
    const navigate = useNavigate();
    const { switchToSignin } = useContext(AccountContext);
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
        <BoxContainer>
            <FormContainer onSubmit={handleSignUp}>
                <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="usernameId"
                    value={username}
                    onChange={handleUsernameChange}
                />
                {usernameerror && <span style={{ color: 'white' }}>{usernameerror}</span>}
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="emailId"
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailerror && <span style={{ color: 'white' }}>{emailerror}</span>}
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="passwordId"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passworderror && <span style={{ color: 'white' }}>{passworderror}</span>}
                <SubmitButton type="submit">Signup</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Already have an account?{" "}
                <BoldLink onClick={switchToSignin} href="#">
                    Signin
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}


