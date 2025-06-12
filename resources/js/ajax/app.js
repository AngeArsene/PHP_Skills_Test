var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import axios from 'axios';
import { Modal } from 'bootstrap'; // Bootstrap will now be available globally
const tableElem = document.getElementById('product-list');
const alertBoxElem = document.getElementById('alert');
const alertMessageElem = document.getElementById('alert-message');
const totalInventoryElem = document.getElementById('total-inventory');
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const loadingRowElem = document.getElementById('loading-row');
    const response = yield axios.get('/products');
    const products = response.data;
    let totalInventory = 0;
    loadingRowElem.remove();
    products.map((product) => {
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += formatTableRow(product);
        totalInventoryElem.innerHTML = `${totalInventory}`;
    });
});
const formElem = document.getElementById('createCustomerForm');
formElem.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(formElem);
    try {
        const response = yield axios.post('/products', formData);
        tableElem.innerHTML += formatTableRow(response.data);
        totalInventoryElem.innerHTML = `
            ${Number(totalInventoryElem.innerHTML) +
            response.data.quantity * response.data.price}`;
    }
    catch (error) {
        alertBoxElem.style.display = 'block';
        alertMessageElem.innerHTML = 'Error submitting form. Please try again.';
    }
    removeModalForm();
    formElem.reset();
});
const removeModalForm = () => {
    var _a;
    // ✅ Close the modal
    const modalEl = document.getElementById('staticBackdrop');
    const modal = Modal.getInstance(modalEl); // ✅ use existing instance only
    modal === null || modal === void 0 ? void 0 : modal.hide(); // Will clean up backdrop & re-enable scrolling
    // Remove backdrop
    (_a = document.querySelector('.modal-backdrop')) === null || _a === void 0 ? void 0 : _a.remove();
    // Re-enable scroll
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};
const formatTableRow = (product) => {
    return `
        <tr>
            <th>${product.id}</th>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${new Date(product.created_at).toLocaleDateString()}</td>
            <td>${product.quantity * product.price}</td>
            <td>
                <a href="" class="btn btn-primary">Edit</a>
                <button type="submit" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `;
};
(_a = document.getElementById('createCustomerForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', () => {
    const saveButton = document.getElementById('saveButton');
    const saveText = document.getElementById('saveText');
    const saveSpinner = document.getElementById('saveSpinner');
    // Disable the button to prevent multiple submissions
    saveButton.disabled = true;
    // Show the spinner
    saveSpinner.classList.remove('d-none');
    saveText.textContent = 'Saving...';
});
console.log("Ajax script loaded");
