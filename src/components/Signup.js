import {useNavigate, Link} from 'react-router-dom';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase-config";
import logo from '../images/logo_white.png';
import sign from '../images/signup_img.svg';
import google from '../images/google.svg';
import facebook from '../images/facebook.svg';
import divider from '../images/divider.svg';
import './loginSign.css'

export default function Signup () {
    const navigate = useNavigate();
   
    const [userSign, setUserSign] = React.useState({
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
                console.log(userSign.email,userSign.password)
          createUserWithEmailAndPassword(auth, userSign.email, userSign.password)
          .then((cred)=>{console.log("user created:"+cred.user)
          navigate("/")} )
          .catch((err) => { console.log(err) })
    }

    function handleChange(e) {
        console.log('change')
        const { type, value } = e.target;
        setUserSign((prev) => ({ ...prev, [type]: value }))
      }

    return (
        <div className='Login-content'>
            <div className='lateral-nav'>
                <img src={logo} className='login-logo' alt=''/>
                <img src={sign} className='login-img' alt=''/>
            </div>
            <div className='login-container'>
                <Link to="/" className='back-btn'>Back</Link>
                <form 
                    className="contact-container"
                >
                    <h1>Signup</h1>
                    <p className='subtitle'>If you are already a member you can login with your email address and password.</p>
                    <div className='socials'>
                        <button className='social-logo'>
                            <img src={google}  alt=''/>
                            Google account
                        </button>
                        <button className='social-logo'>
                            <img src={facebook}  alt=''/>
                            Facebook account
                        </button>
                    </div>
                    <div className='divider'>
                        <img src={divider} className="divider-img" alt=''></img>
                        <p>Or</p>
                        <img src={divider} className="divider-img" alt=''></img>
                    </div>
                    <label className='label'>E-mail address</label>
                    <input className='input' type="email" name="email" onChange={handleChange}/>
                    <label className='label'>Password</label>
                    <input className='input' type="password" name="password" onChange={handleChange}/>
                    <button onClick={handleSubmit} className='signup-btn'>Signup</button>
                    <p className='question'>Already have an account ? <Link to="/login"> Login here</Link></p>
                </form> 
            </div>
        </div>
    )}