import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const getSavedCart = () => {
  try {
    const saved = localStorage.getItem("shopsphere_cart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const calculateTotals = (items) => {
  const totalOriginalPrice = items.reduce(
    (acc, item) => acc + (item.product?.price || item.price || 1999) * (item.quantity || 1),
    0
  );
  const totalDiscountedPrice = items.reduce(
    (acc, item) => acc + (item.product?.discountedPrice || item.discountedPrice || 799) * (item.quantity || 1),
    0
  );
  const totalItem = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const discounte = totalOriginalPrice - totalDiscountedPrice;

  return {
    totalPrice: totalOriginalPrice,
    totalDiscountedPrice,
    totalItem,
    discounte,
  };
};

const initialItems = getSavedCart();
const initialTotals = calculateTotals(initialItems);

const initialState = {
  cart: {
    cartItems: initialItems,
    ...initialTotals,
  },
  loading: false,
  error: null,
  cartItems: initialItems,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DIRECT_ADD_ITEM": {
      const newItem = action.payload;
      const existingIndex = state.cart.cartItems.findIndex(
        (i) => i.product?._id === newItem.product?._id && i.size === newItem.size
      );

      let updatedItems = [];
      if (existingIndex > -1) {
        updatedItems = [...state.cart.cartItems];
        updatedItems[existingIndex].quantity += newItem.quantity || 1;
      } else {
        updatedItems = [newItem, ...state.cart.cartItems];
      }

      localStorage.setItem("shopsphere_cart", JSON.stringify(updatedItems));
      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedItems,
          ...totals,
        },
        cartItems: updatedItems,
      };
    }

    case "DIRECT_UPDATE_QTY": {
      const { _id, quantity } = action.payload;
      const updatedItems = state.cart.cartItems.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, quantity) } : item
      );

      localStorage.setItem("shopsphere_cart", JSON.stringify(updatedItems));
      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedItems,
          ...totals,
        },
        cartItems: updatedItems,
      };
    }

    case "DIRECT_REMOVE_ITEM": {
      const updatedItems = state.cart.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem("shopsphere_cart", JSON.stringify(updatedItems));
      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedItems,
          ...totals,
        },
        cartItems: updatedItems,
      };
    }

    case GET_CART_REQUEST:
    case ADD_ITEM_TO_CART_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, loading: true };

    case GET_CART_SUCCESS:
      if (action.payload?.cartItems?.length > 0) {
        localStorage.setItem("shopsphere_cart", JSON.stringify(action.payload.cartItems));
        return {
          ...state,
          cart: action.payload,
          cartItems: action.payload.cartItems,
          loading: false,
        };
      }
      return { ...state, loading: false };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REMOVE_CART_ITEM_SUCCESS:
    case UPDATE_CART_ITEM_SUCCESS:
      return { ...state, loading: false };

    case GET_CART_FAILURE:
    case ADD_ITEM_TO_CART_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
