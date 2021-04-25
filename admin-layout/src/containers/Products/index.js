import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Input from '../../components/UI/input';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions';
const Products = (props) => {
    const [productInput, setProductInput] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        description: '',
        productPictures: [],
    })

    const handleProductPictures = (e) => {

        setProductInput({
            ...productInput,
            productPictures: [
                ...productInput.productPictures,
                e.target.files[0]
            ]
        })


    }
    // console.log(productInput.productPictures)
    const  dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const categoryList = useSelector(state => state.category)
    const handleCloseCancel = () => {
        setShow(false);
    };
    const handleCloseSave = () => {
        const form = new FormData();
        form.append('name', productInput.name)
        form.append('category', productInput.category)
        form.append('quantity', productInput.quantity)
        form.append('price', productInput.price)
        form.append('description', productInput.description)
        for(let pic of productInput.productPictures){
            form.append('productPicture', pic)
        }
        // productInput.productPictures.map(file => ))
        dispatch(addProduct(form))
        // console.log(form)
        setShow(false);
    };
    const handleShow = () => setShow(true)
    // console.log(productInput.productPictures)
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
                            <h3>Product</h3>
                            <Button variant="outline-primary" onClick={handleShow}>add</Button>
                        </div>

                    </Col>
                </Row>
                <Modal show={show} onHide={handleCloseCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            type="text"
                            placeholder="product name"
                            onChange={(e) => setProductInput({
                                ...productInput,
                                name: e.target.value,
                            })}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Quantity"
                            onChange={(e) => setProductInput({
                                ...productInput,
                                quantity: e.target.value,
                            })}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Price"
                            onChange={(e) => setProductInput({
                                ...productInput,
                                price: e.target.value,
                            })}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Description"
                            onChange={(e) => setProductInput({
                                ...productInput,
                                description: e.target.value,
                            })}
                        >
                        </Input>
                        <select className='form-control'
                            value={productInput.category}
                            onChange={(e) => setProductInput({  ...productInput, category: e.target.value,})}>
                            <option>select category</option>
                            {createCategoryList(categoryList.categoryList).map(option =>
                                <option key={option.key} value={option.key}>{option.name}</option>
                            )}
                        </select>

                        {
                            productInput.productPictures.length > 0 ? (
                                productInput.productPictures.map((pic, index) =>
                                    <div key={index}>
                                        {pic.name}
                                    </div>
                                )
                            ) : null
                        }

                        <Input
                            type="file"
                            placeholder="Product Images"
                            onChange={handleProductPictures}
                        ></Input>
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

export default Products