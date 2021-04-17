import { ArrayCart, CartTypes } from "./types";

const initialStateCart: ArrayCart = {
  CartItens: []
}

function reducerCart(state = initialStateCart, action: any) {
  switch(action.type) {
    case CartTypes.ADD_ITEM: {
      const { payload } = action;
      const { id } = payload;

      const itemExists = state.CartItens.find((item: any) => item.id === id);

      if (itemExists) {
        itemExists.amount = itemExists.amount + 1;
      } else {
        payload.amount = 1;
        state.CartItens.push(payload)
      } return state
    }
    
    case CartTypes.REMOVE_ITEM:
      const productIndex = state.CartItens.findIndex((item: any) => item.id === action.payload);

      if (productIndex >= 0) {
        state.CartItens.splice(productIndex, 1)
      } return state   
         
    case CartTypes.UPDATE_AMOUNT:
      const { id, amount } = action.payload;
      const itemExists = state.CartItens.find((item: any) => item.id === id)
      
      if (itemExists) {
        console.log(action.payload)
        const itemIndex = state.CartItens.findIndex((item: any) => item.id === itemExists.id);

        if (itemIndex >= 0 && amount >= 0) {
          state.CartItens[itemIndex].amount = Number(amount);
        }
      } return state      

    case CartTypes.CLEAR_CART:
      return {
        CartItens: []
      }

      default: return state
  }
}

export default reducerCart