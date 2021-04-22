import React from 'react'
import Header from '../Header'
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ? (
                    <Container fluid>
                        <Row className="dashboard">
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/products">Products</NavLink></li>
                                    <li><NavLink to="/orders">Order</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} className="sidecontainer">
                                {props.children}
                            </Col>
                        </Row>

                    </Container>
                ) : props.children
            }

        </>

    )
}

export default Layout