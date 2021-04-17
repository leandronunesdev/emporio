import { action } from "typesafe-actions";
import { CartTypes } from "./types";

export const addItem = (payload: any) => action(CartTypes.ADD_ITEM, payload)
export const removeItem = (payload: any) => action(CartTypes.REMOVE_ITEM, payload)
export const updateAmount = (payload: any) => action(CartTypes.UPDATE_AMOUNT, payload)
export const clearCart = () => action(CartTypes.CLEAR_CART)