import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to='/' className='navbar-brand'>Admin-Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <li className='nav-item'>
                        <NavLink to='/signin' className='nav-link'>Signin</NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='/signup' className='nav-link'>Signup</NavLink>
                    </li>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
