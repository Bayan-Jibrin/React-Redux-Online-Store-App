import {
  ADD_CART,
  REMOVE,
  REMOVE_ITEM,
  ADD_ALL,
  GET_ITEM,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_LOVE,
  SHOW_TREDING,
  MAIN_PAGE,
  SEARCH_PROD,
  FILTER_CATEGORY,
  TOGGLE_CATEGORY,
} from "./type";

const initialAllStore = {
  products: [],
  activeProduct: {},
  carts: [],
  displayedItem: [],
  searchText: "",
  home:true,
  category: false,
  favGroup: [],
};

export const allItemsReducer = (state = initialAllStore, action) => {
  switch (action.type) {
    case ADD_CART:
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].qty += 1;
        return {
          ...state,
          activeProduct: {
            ...state.activeProduct,
            qty: state.carts[itemIndex].qty,
          },
          carts: [...state.carts],
        };
      } else {
        const temp = { ...action.payload, qty: 1 };
        return {
          ...state,
          activeProduct: { ...state.activeProduct, qty: 1 },
          carts: [...state.carts, temp],
        };
      }

    case REMOVE:
      const data = state.carts.filter(
        (el) => Number(el.id) !== Number(action.payload)
      );
      return {
        ...state,
        activeProduct: { ...state.activeProduct, qty: 0 },
        carts: [...data],
      };

    case REMOVE_ITEM:
      const itemIndex_desc = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.carts[itemIndex_desc].qty >= 1) {
        state.carts[itemIndex_desc].qty -= 1;
        return {
          ...state,
          activeProduct: {
            ...state.activeProduct,
            qty: state.carts[itemIndex_desc].qty,
          },
          carts: [...state.carts],
        };
      }
      break;

    case ADD_ALL:
      return { ...state, products: action.payload };

    case GET_ITEM:
      let index = state.carts.findIndex(
        (item) => Number(item.id) === Number(action.payload)
      );

      if (index === -1) {
        index = state.products.findIndex(
          (item) => Number(item.id) === Number(action.payload)
        );
        if (index >= 0) {
          return { ...state, activeProduct: { ...state.products[index] } };
        }
      } else {
        return { ...state, activeProduct: { ...state.carts[index] } };
      }
      return { ...state };

    case ADD_FAVORITE:
      return {
        ...state,
        favGroup: [...state.favGroup, action.payload],
      };

    case REMOVE_FAVORITE:
      let new_fav = state.favGroup.filter(
        (item) => Number(item) !== Number(action.payload)
      );
      return {
        ...state,
        favGroup: [...new_fav],
      };

    case SHOW_TREDING:
      state.displayedItem = [...state.products];
      state.displayedItem.sort(function (a, b) {
        return b.rating.rate - a.rating.rate;
      });
      return {
        ...state,
        home:false,
        displayedItem: [...state.displayedItem],
      };

    case SEARCH_PROD:
      state.displayedItem = state.products.filter((product) =>
        product.title.includes(action.payload)
      );
      return {
        ...state,
        home:false,
        displayedItem: [...state.displayedItem],
      };

    case MAIN_PAGE:
      return {
        ...state,
        home:true,
        displayedItem: [...state.products],
      };

    case FILTER_CATEGORY:
      state.displayedItem = state.products.filter(
        (product) => product.category === action.payload
      );
      return {
        ...state,
        home:false,
        displayedItem: [...state.displayedItem],
      };

    case TOGGLE_CATEGORY:
      return {
        ...state,
        category: !state.category,
      };

    case TOGGLE_LOVE:
        state.displayedItem=[];
        for (let x of state.products){
          for(let y of state.favGroup){
            if(Number(y)===Number(x.id)){
              state.displayedItem.push(x);
            }
          }
        }
      return {
        ...state,
        home:false,
        displayedItem:[...state.displayedItem],
      };

    default:
      return state;
  }
};
