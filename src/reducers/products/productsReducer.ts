import { Product } from "../../domain";
import { Action } from "../../actions/action";
import { GET_PRODUCTS_TYPE } from "../../actions/products/productsActions";

const mock = new Product({
  id: 0,
  name: "Shirt",
  description: "A white Shirt",
  imageUrl: "https://decathlonpro.vteximg.com.br/arquivos/ids/408259-500-500/ekiden-ts-white-2015-2xl1.jpg?v=636555837796230000",
  price: 29.99
});

const mockProducts = [mock, mock, mock, mock, mock, mock]

interface IProductReducerState {
  products: Product[]
}

export const productsReducerInitialState: IProductReducerState = {
  products: mockProducts
}

export const productsReducer = (state: IProductReducerState, action: Action<Product | Product[]>) => {
  switch(action.type) {
    case GET_PRODUCTS_TYPE:
      return Object.assign({}, state, {
        products: action.payload
      });

    default:
      return productsReducerInitialState;
  }
}