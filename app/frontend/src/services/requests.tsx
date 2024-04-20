import axios from 'axios';
import { INewProductsModel } from '../interfaces/INewProductsModel';
import { IProductsError } from '../interfaces/IProductsError';

const api = axios.create({
  baseURL: `http://127.0.0.1:3001`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestPacks = async (endpoint: string, body: {
  product_code: string,
  new_price: string,
}): Promise<IProductsError[] | INewProductsModel[]> => {
  try {
    const { data } = await api.post(endpoint, body)
    return data as INewProductsModel[];
  } catch (error) {
    return error as IProductsError[];
  }
}

export const requestProducts = async (endpoint: string, body: {
  produtos: [],
}): Promise<IProductsError[] | INewProductsModel[]> => {
  try {
    const { data } = await api.post(endpoint, body)
    return data as INewProductsModel[];
  } catch (error) {
    return error as IProductsError[];
  }
}

export const requestUpdateProducts = async (endpoint: string, body: {
  product_code: string,
  new_price: string,
  packs: object,
}): Promise<IProductsError[] | INewProductsModel[]> => {
  try {
    const { data } = await api.put(endpoint, body)
    return data as INewProductsModel[];
  } catch (error) {
    return error as IProductsError[];
  }
}

export default api
