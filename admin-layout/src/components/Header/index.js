import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../../actions'
const Header = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }

    const RenderNotLoggedIn = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <NavLink to='/signin' className='nav-link'>Signin</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/signup' className='nav-link'>Signup</NavLink>

                </li>
            </Nav>
        )
    }

    const RenderLoggedIn = () => {
        return (
            <Nav>
                <li className='nav-item' style={{color: 'white', cursor: 'pointer'}}>
                    <span onClick={logout}>Signout</span>
                </li>
            </Nav>
        )
    }

    return (
        // <Container fluid>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to='/' className='navbar-brand'>Admin-Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                {
                    auth.authenticate ? (
                        <RenderLoggedIn />
                    ) : (
                        <RenderNotLoggedIn />
                    )
                }

            </Navbar.Collapse>
        </Navbar>
        // </Container>

    )
}

export default Header
