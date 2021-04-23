import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Layout from '../../components/layout';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, fetchCategories } from '../../actions';
import Input from '../../components/UI/input';
const Categories = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleCloseCancel = () => {
        setShow(false);
    };
    const handleCloseSave = () => {
        const form = new FormData();
        form.append('name', categoryInput.name)
        form.append('parentId', categoryInput.parentId)
        form.append('categoryImage', categoryInput.image)

        // const cateObj = {
        //     name: categoryInput.name,
        //     parentId: categoryInput.parentId,
        //     categoryImage: categoryInput.image
        // }
        dispatch(addCategory(form))
        setShow(false);
    };
    const handleShow = () => setShow(true)

    const [categoryInput, setCategoryInput] = useState({ name: '', image: '', parentId: '' })

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

    const createCategoryList = (categories, options = []) => {
        if (categories) {
            for (let category of categories) {
                options.push({ name: category.name, key: category._id, })
                if (category.children.length > 0) {
                    createCategoryList(category.children, options);
                }
            }
        }
        return options
    }

    return (
        <Layout sidebar>
            <Container fluid style={{ marginTop: '1rem' }}>
                <Row>
                    <Col md={12}>
                        <div style={{ width: "100%", display: "flex", justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="outline-primary" onClick={handleShow}>add</Button>
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
                <Modal show={show} onHide={handleCloseCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            type="text"
                            placeholder="category name"
                            onChange={(e) => setCategoryInput({ name: e.target.value, parentId: categoryInput.parentId, image: categoryInput.image })}
                        >
                        </Input>
                        <Input
                            type="file"
                            placeholder="category image"
                            onChange={(e) => setCategoryInput({ name: categoryInput.name, parentId: categoryInput.parentId, image: e.target.files[0] })}
                        >
                        </Input>
                        <select className='form-control'
                            value={categoryInput.parentId}
                            onChange={(e) => setCategoryInput({ name: categoryInput.name, parentId: e.target.value, image: categoryInput.image })}>
                            <option>select category parent</option>
                            {createCategoryList(categoryList.categoryList).map(option =>
                                <option key={option.key} value={option.key}>{option.name}</option>
                            )}
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCancel}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={handleCloseSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>


        </Layout>
    )

}

export default Categories