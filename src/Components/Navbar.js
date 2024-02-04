import React from 'react'
import HomeImg from "../Assests/Home.svg"
import account from "../Assests/account.svg"
import noti from "../Assests/noti.svg"
import save from "../Assests/save.svg"
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='nav_container'>
        <div className='text-logo'>TravelMedia.in</div>
        <div className='nav_child'>
            <NavLink to="/"><img src={HomeImg} alt='home'/></NavLink>

            <img src={noti} alt='noti'/>

            <NavLink to="/details/:id"><img src={save} alt='save'/></NavLink>
            <img src={account} alt='account'/>
        </div>
        <div></div>
    </div>
  )
}

export default Navbar