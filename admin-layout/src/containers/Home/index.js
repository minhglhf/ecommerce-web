import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../../components/layout';
import  './style.css'

const Home = (props) => {
    return (
        <Layout>
            <Container fluid>
                <Row className="dashboard">
                    <Col md={2} className="sidebar">
                        Sidebar
                    </Col>
                    <Col md={10} className="sidecontainer">
                        Container
                    </Col>
                </Row>

            </Container>

        </Layout>
    )

}

export default Home