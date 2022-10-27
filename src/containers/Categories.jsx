import React from 'react'
import {FILTER_CATE} from '../redux/action'
import { useDispatch } from "react-redux";

const Categories = ({ categories}) => {

  const dispatch = useDispatch();
  const F=(category)=> {
    dispatch(FILTER_CATE(category));
  };
  
    return (
      <div className="btn-container">
        {categories.map((category, index) => {
          return (
            <button
              type="button"
              className="filter-btn"
              key={index}
              onClick={()=>F(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    );
  };
  
  export default Categories;