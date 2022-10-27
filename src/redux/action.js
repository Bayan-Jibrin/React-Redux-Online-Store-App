import { ADD_CART, REMOVE, REMOVE_ITEM,ADD_ALL,GET_ITEM ,REM_ACTIVE,ADD_FAVORITE,REMOVE_FAVORITE,
  TOGGLE_LOVE,SHOW_TREDING,MAIN_PAGE,SEARCH_PROD,FILTER_CATEGORY, TOGGLE_CATEGORY} from "./type"

export const ADD = (item) => {
  return {
    type: ADD_CART,
    payload: item,
  }
}
export const DELETE = (id) => {
  return {
    type: REMOVE,
    payload: id,
  }
}
export const REMOVE_INT = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  }
}

export const ADD_ALLITS = (items) => {
  return {
    type: ADD_ALL,
    payload: items,
  }
}

export const GET_1ITEM = (id) => {
  return {
    type: GET_ITEM,
    payload: id,
  }
}

export const REM_PROD = () => {
  return {
    type: REM_ACTIVE,
  }
}

export const ADD_FAV = (id) => {
  return {
    type: ADD_FAVORITE,
    payload: id,
  }
}

export const REM_FAV = (id) => {
  return {
    type: REMOVE_FAVORITE,
    payload: id,
  }
}

export const TOG_LOVE = () => {
  return {
    type: TOGGLE_LOVE,
  }
}

export const SHOW_TREND = () => {
  return {
    type: SHOW_TREDING,
  }
}

export const BACK_HOME = () => {
  return {
    type: MAIN_PAGE,
  }
}

export const SEARCH = (text) => {
  return {
    type: SEARCH_PROD,
    payload:text,
  }
}

export const FILTER_CATE = (category) => {
  return {
    type: FILTER_CATEGORY,
    payload:category,
  }
}

export const TOGGLE_CATE = () => {
  return {
    type: TOGGLE_CATEGORY,
  }
}