import React, { useState } from 'react'
import Layout from '../../components/layout'

import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { login } from '../../actions'
import { useDispatch } from 'react-redux'
import Input from '../../components/UI/input'


const Signin = (props) => {

    const [user, setUser] = useState({ email: "", password: "" });
    const [err, setErr] = useState('');

    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        dispatch(login(user))
    }
    return (
        <Layout>
            <Container style={{ maxWidth: '50%' }}>
                <Row>
                    <Col md={12}>
                        <Form onSubmit={userLogin}>
                            <Input
                                name="Email"
                                type="email"
                                value={user.email}
                                placeholder="email"
                                onChange={(e) => {setUser({email:e.target.value, password: user.password})}}
                            />

                            <Input
                                name="Password"
                                type="password"
                                value={user.password}
                                placeholder="password"
                                onChange={(e) => {setUser({email:user.email, password: e.target.value})}}
                            />
                           
                            <Button variant="primary" type="submit" >
                                Signin
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Layout>

    )

}

export default Signin
