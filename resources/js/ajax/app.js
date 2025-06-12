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
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const tableElem = document.getElementById('product-list');
    const totalInventoryElem = document.getElementById('total-inventory');
    const response = yield axios.get('/products');
    const products = response.data;
    let totalInventory = 0;
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += `
            <tr>
                <th>${product.id}</th>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${new Date(product.created_at).toLocaleDateString()}</td>
                <td>${product.total}</td>
                <td>
                    <a href="" class="btn btn-primary">Edit</a>
                    <button type="submit" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
        totalInventoryElem.innerHTML = `${totalInventory}`;
    }
});
console.log("Ajax script loaded");
