import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, GET_1ITEM} from "../redux/action";
import { AiOutlineMinus, AiOutlineDelete, AiOutlinePlus,AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { DELETE, REMOVE_INT,ADD_FAV,REM_FAV } from "../redux/action";
import { useEffect } from "react";


const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.allItemsReducer.activeProduct);
  const { image, title, price, category, description, qty } = product;
  const favGroup =useSelector((state) => state.allItemsReducer.favGroup);
  let fav=false;
  for (let x of favGroup){
    if(x===productId){
      fav=true;
      break;
    }
  }
  const [toggle, setToggle] = useState(false);
  
  const addToCart = (e) => {
    if (!toggle) {
      setToggle((toggle) => !toggle);
    }
    dispatch(ADD(e));
  };

  const minus = (product) => {
    dispatch(REMOVE_INT(product));
  };

  const addHeart = (productId) => {
    dispatch(ADD_FAV(productId));
  };

  const removeHeart = (productId) => {
    dispatch(REM_FAV(productId));
  };
 
  const delet = (productId) => {
    dispatch(DELETE(productId));
    setToggle((toggle) => !toggle);
  };

  useEffect(() => {
    dispatch(GET_1ITEM(productId));
  }, [productId])
  
  return (
    <div className="container">
      {Object.keys(product).length === 0 ? (
        <div className="">Loading...</div>
      ) : (
        <div className="container__internal">
          <div className="container__internal-image">
            <img src={image} alt={title} />
          </div>
          <div className="container__internal-content">
            <h1>{title}</h1>
            <div className="container__internal-content_fragment">
              <h2>${price}</h2>
              {fav?<i onClick={()=>removeHeart(productId)}><AiFillHeart/></i>
              :<i onClick={()=>addHeart(productId)}><AiOutlineHeart/></i>}
            </div>
            <h3>{category}</h3>
            <p>{description}</p>
            <div>
              {toggle ? (
                <div className="container__internal-content_icons">
                  {qty <= 1 ? (
                    <i onClick={() => delet(productId)}>
                      <AiOutlineDelete />
                    </i>
                  ) : (
                    <i onClick={() => minus(product)}>
                      <AiOutlineMinus />
                    </i>
                  )}
                  <div>{qty}</div>
                  <i onClick={() => addToCart(product)}>
                    <AiOutlinePlus />
                  </i>
                </div>
              ) : (
                <div
                  className="container__internal-content_add"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
