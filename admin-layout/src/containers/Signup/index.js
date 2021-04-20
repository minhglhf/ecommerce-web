import React from 'react'
import Layout from '../../components/layout'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import Input from '../../components/UI/input'


const Signup = (props) => {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        name="firstName"
                                        type="text"
                                        placeholder="firstName"
                                        onChange={() => { }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        name="lastName"
                                        type="text"
                                        placeholder="lastName"
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                name="Email"
                                type="email"
                                placeholder="email"
                                onChange={() => { }}
                            />

                            <Input
                                name="Password"
                                type="password"
                                placeholder="password"
                                onChange={() => { }}
                            />
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
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