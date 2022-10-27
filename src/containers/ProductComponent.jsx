import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ALLITS } from "../redux/action";
import Categories from "./Categories";

const ProductComponent = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((e) => {
        console.log(e);
      });
    dispatch(
      ADD_ALLITS(response.data.map((item) => ({ ...item, qty: 0 })))
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(products);

  const products = useSelector((state) => state.allItemsReducer.products);
  const productsGroup2 = useSelector(
    (state) => state.allItemsReducer.displayedItem
  );
  const home = useSelector((state) => state.allItemsReducer.home);
  const category = useSelector((state) => state.allItemsReducer.category);

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  let finalProducts = home ? products:productsGroup2 ;

  const renderList = finalProducts.map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <div className="card" key={id}>
        <Link to={`product/${id}`}>
          <div className="card__internal">
            <div className="card__internal-image">
              <img src={image} alt={title} />
            </div>
            <div className="card__internal-content">
              <h1>{title}</h1>
              <p>${price}</p>
              <p>{category}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      {category&&<Categories categories={allCategories} />}
      <div className="grid">{renderList}</div>
    </>
  );
};

export default ProductComponent;
