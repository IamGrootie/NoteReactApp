import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import logo from "../../images/logo2.png";
import {useAuth} from '../auth'
import './NavBar.css'


export default function NavBar() {
  const {currentUser, logout} = useAuth();
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Logout failed');
    }
  }

  return (
    <nav className="lateral--nav">
        <img src={logo} alt="logo" className='img-logo'/>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/notes'>Notes</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
        <button onClick={handleSubmit} className='logout-btn'>Logout</button>
    </nav>
  )
}
