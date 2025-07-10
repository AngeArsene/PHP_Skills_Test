import axios from 'axios';
import type { Product } from '../../types/index';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get('/products') as { data: Product[] };
    return response.data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
    const response = await axios.post('/products', formData) as { data: Product };
    return response.data;
};

export const updateProduct = async (id: number, data: Record<string, any>): Promise<Product> => {
    const response = await axios.put(`/products/${id}`, data) as { data: Product };
    return response.data;
};

export const deleteProduct = async (id: number): Promise<number> => {
    return (await axios.delete(`/products/${id}`)).status;
};
