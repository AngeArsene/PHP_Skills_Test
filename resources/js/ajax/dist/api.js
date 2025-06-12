var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get('/products');
    return response.data;
});
export const createProduct = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.post('/products', formData);
    return response.data;
});
export const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.put(`/products/${id}`, data);
    return response.data;
});
