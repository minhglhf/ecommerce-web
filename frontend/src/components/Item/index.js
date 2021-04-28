import React from "react";
import { connect } from "react-redux";
import './style.css';
import { Link } from 'react-router-dom';


const Ittem = ({
  props
}) => {


  return (
    <div className="cart-item">
      <div className="iteminfo">
        <img src="https://cdn.tgdd.vn/Products/Images/42/220833/samsung-galaxy-s21-tim-600x600-600x600.jpg" alt="cc" />
        <div className="cart-item-info">
          <h4>{props.name}</h4>
          <h4 className="item-price">{props.price}</h4>
        </div>

      </div>

      <div className="overlay">
        <div className="but">
          <Link  >
            <button className="btn">View detail</button>
          </Link>


        </div>

      </div>
    </div>
  )
};
export default Ittem