export enum CartTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  CLEAR_CART = 'CLEAR_CART'  
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  amount: number;
}

export interface ArrayCart {
  CartItens: CartItem[];
}