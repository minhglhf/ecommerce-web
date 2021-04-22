import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import Input from '../../components/UI/input'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import { signup } from '../../actions'
const Signup = (props) => {
    const auth = useSelector(state => state.auth)
    const userr = useSelector(state => state.user)
    const [user, setUser] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const dispatch = useDispatch();
    const userSignup = (e) => {

        e.preventDefault();

        dispatch(signup(user))
    }
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    if (userr.pending) {
        return <h3>loading....</h3>
    }


    return (


        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        name="firstName"
                                        type="text"
                                        placeholder="firstName"
                                        onChange={(e) => { setUser({ email: user.email, password: user.password, firstName: e.target.value, lastName: user.lastName }) }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        name="lastName"
                                        type="text"
                                        placeholder="lastName"
                                        onChange={(e) => { setUser({ email: user.email, password: user.password, firstName: user.firstName, lastName: e.target.value }) }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                name="Email"
                                type="email"
                                placeholder="email"
                                onChange={(e) => { setUser({ email: e.target.value, password: user.password, firstName: user.firstName, lastName: user.lastName }) }}
                            />

                            <Input
                                name="Password"
                                type="password"
                                placeholder="password"
                                onChange={(e) => { setUser({ email: user.email, password: e.target.value, firstName: user.firstName, lastName: user.lastName }) }}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                                    </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Layout>


    )

}

export default Signup