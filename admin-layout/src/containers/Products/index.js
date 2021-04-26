import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';
import Input from '../../components/UI/input';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, fetchProducts } from '../../actions';
import { generateImageUrl } from '../../config';
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
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(fetchProducts());

    }, [])
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [productDetail, setProductDetail] = useState(null)
    const showProductDetailModal = (product) => {
        setProductDetail(product)
        setShowDetail(true);
        console.log(product)
    }

    const categoryList = useSelector(state => state.category)
    const productList = useSelector(state => state.product)
    const handleCloseCancel = () => {
        setShow(false);
        setShowDetail(false)
    };
    const handleCloseSave = () => {
        const form = new FormData();
        form.append('name', productInput.name)
        form.append('category', productInput.category)
        form.append('quantity', productInput.quantity)
        form.append('price', productInput.price)
        form.append('description', productInput.description)
        for (let pic of productInput.productPictures) {
            form.append('productPicture', pic)
        }
        // productInput.productPictures.map(file => ))
        dispatch(addProduct(form))
        // console.log(form)
        setShow(false);
    };

    const renderProduct = () => {
        return (
            <div>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.products != null ? productList.products.map((product, index) => {
                            return (
                                <tr key={index} onClick={() => {
                                    showProductDetailModal(product)
                                }}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td>oh no</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </Table>
            </div>
        )

    }

    const renderProductDetailModal = () => {
        return (
            <Modal show={showDetail} onHide={handleCloseCancel} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>product detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        {/* <Col md={6}> */}
                        <div style={{ width: '30%' }}><h6>Name : </h6></div>
                        <div style={{ width: '70%' }}>
                            <p>{productDetail != null ? productDetail.name : null}</p>
                        </div>

                        {/* </Col> */}
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ width: '30%' }}><h6>Price : </h6></div>
                        <div style={{ width: '70%' }}>
                            <p>{productDetail != null ? productDetail.price : null}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ width: '30%' }}><h6>Quantity : </h6></div>
                        <div style={{ width: '70%' }}>
                            <p>{productDetail != null ? productDetail.quantity : null}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ width: '30%' }}><h6>Description : </h6></div>
                        <div style={{ width: '70%' }}>
                            <p>{productDetail != null ? productDetail.description : null}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ width: '30%' }}><h6>Category : </h6></div>
                        <div style={{ width: '70%' }}>
                            <p>{productDetail != null ? productDetail.category.name : null}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ width: '30%' }}><h6>Image : </h6></div>
                        <div style={{ width: '70%' }}>
                            {
                                productDetail!=null && productDetail.productPictures != null ? productDetail.productPictures.map((pic, index) => {
                                    return (
                                        <div key={index}>
                                            <img style={{ width: '4rem', height: '4rem' }} src={generateImageUrl(pic.img)} />
                                        </div>
                                    )
                                }) : null

                            }

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

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
                {renderProduct()}
                {renderProductDetailModal()}
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
                            onChange={(e) => setProductInput({ ...productInput, category: e.target.value, })}>
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