import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/layout';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../actions';

const Categories = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])
    const categoryList = useSelector(state => state.category)
    // console.log(categoryList)
    const renderCategories = (categories) => {
        let myCategories = [];
        if (categories) {
            for (let category of categories) {
                myCategories.push(
                    <li key={category._id}>
                        {category.name}
                        {(category.children.length > 0) ? (
                            <ul>
                                {renderCategories(category.children)}
                            </ul>
                        ) : null}
                    </li>
                )
            }
        }

        return myCategories;
    }

    return (
        <Layout sidebar>
            <Container fluid style={{ marginTop: '1rem' }}>
                <Row>
                    <Col md={12}>
                        <div style={{ width: "100%", display: "flex", justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="outline-primary">add</Button>
                        </div>

                    </Col>
                </Row>
                {
                    categoryList ? (
                        <Row>
                            <Col md={12}>
                                <ul>
                                    {renderCategories(categoryList.categoryList)}
                                </ul>
                            </Col>
                        </Row>
                    ) : null
                }

            </Container>
        </Layout>
    )

}

export default Categories