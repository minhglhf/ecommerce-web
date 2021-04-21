import React from 'react'
import Layout from '../../components/layout'

import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { login } from '../../actions'
import { useDispatch } from 'react-redux'


const Signin = (props) => {

    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        const user = { email: 'minh@gmail.com', password: '12345780' }

        dispatch(login(user))
    }
    return (
        <Layout>
            <Container style={{ maxWidth: '50%' }}>
                <Row>
                    <Col md={12}>
                        <Form onSubmit={userLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Layout>

    )

}

export default Signin
