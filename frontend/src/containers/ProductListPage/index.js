import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsBySlug } from "../../actions/product.actions";
import Ittem from "../../components/Item"

const ProductListPage = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product)
  // console.log(products)
  useEffect(() => {

    dispatch(fetchProductsBySlug(props.match.params.slug))
  }, [])

  return (
    <Layout>
      {
        products.products != null ? products.products.map((p, i) => {
          const { name, price } = p;
          return (
            <Ittem key={i} name={name} price={price}></Ittem>
          )
        }) : null
      }

    </Layout>
  )
};

export default ProductListPage;
