import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE,TOG_LOVE ,SHOW_TREND,BACK_HOME,SEARCH,TOGGLE_CATE} from "../redux/action";
import { BsBagCheck } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import {FiTrendingUp} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineDelete, AiOutlineHeart,AiOutlineHome } from "react-icons/ai";
import cartimg from "./assets/cart.png";


const Header = () => {
  // cartopen and close
  const [cartList, setCartList] = useState(false);
  // cart add in shop
  const getdata = useSelector((state) => state.allItemsReducer.carts);
  /*console.log(getdata);*/

  // scroll navbar
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector("header")
    header.classList.add("active", this.window.scrollY > 100)
  })

  // delete cart
  const dispatch = useDispatch();
  const delet = (id) => {
    dispatch(DELETE(id));
  };

  // total prcie
  const [price, setPrice] = useState(0);

  const totals = () => {
    let price = 0;
    getdata.map((e, i) => (price = parseFloat(e.price) * e.qty + price));
    setPrice(price);
  };

  useEffect(() => {
    totals();
  }, [totals]);

  const toggleLove = () => {
    dispatch(TOG_LOVE());
  };

  const showTrending = ()=> {
    dispatch(SHOW_TREND());
  }

  const backHome = ()=> {
    dispatch(BACK_HOME());
  }

  const handleSearch=(e)=> {
    dispatch(SEARCH(e.target.value));
  }

  const toggleCategory = ()=> {
    dispatch(TOGGLE_CATE());
  }

  return (
    <header>
      <div className="header__search">
        <input type="text" placeholder="Search Products..." onChange={handleSearch}/>
        <BiSearch className="heIcon" />
      </div>
      <div className="header__user">
        <i onClick={()=>backHome()}><AiOutlineHome className="heIcon"/></i>
        <i onClick={()=>toggleCategory()}><MdOutlineCategory  className="heIcon" /> </i> 
        <i onClick={()=>toggleLove()}><AiOutlineHeart className="heIcon" /></i>
        <i onClick={()=>showTrending()}><FiTrendingUp className="heIcon"/></i>
      </div>
      <div className="header__card">
        <button className="button" onClick={() => setCartList(!cartList)}>
          <BsBagCheck className=" heIcon" />
          MY CART<span> ({getdata.length})</span>
        </button>
        <div className={cartList ? "showCart" : "hideCart"}>
          {getdata.length ? (
            <section className="details">
              <div className="details_title">
                <h3>Photo</h3>
                <p>Product Name</p>
              </div>
              {getdata.map((e) => (
                <div className="details_content" key={e.id}>
                  <div className="details_content_img">
                    <img src={e.image} alt="" />
                  </div>
                  <div className="details_content_detail">
                    <div>
                      <p>{e.title.slice(0, 20)}...</p>
                      <p>Price : ${e.price}</p>
                      <p>Quantity : {e.qty}</p>
                    </div>
                  </div>
                  <div>
                    <i onClick={() => delet(e.id)}>
                      <AiOutlineDelete />
                    </i>
                  </div>
                </div>
              ))}
              <div className="details_total">
                <h4>Total : ${price}</h4>
              </div>
            </section>
          ) : (
            <div className="empty">
              <p>Your cart is empty</p>
              <img src={cartimg} alt="" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
