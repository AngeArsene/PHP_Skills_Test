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
import { Modal } from 'bootstrap';
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
        document.body.insertAdjacentHTML('beforeend', editModalForm(product));
        const editFormElem = document.getElementById(`createCustomerForm${product.id}`);
        editFormElem.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(editFormElem);
            const payload = Object.fromEntries(formData.entries());
            // 🧠 Extract product ID from form ID
            const productId = editFormElem.id.replace("createCustomerForm", "");
            try {
                const response = yield axios.put(`/products/${productId}`, payload);
                const product = response.data;
                // Update the table row
                const rowElem = document.querySelector(`#product-list tr:nth-child(${product.id})`);
                if (rowElem) {
                    rowElem.innerHTML = formatTableRow(product);
                }
                removeModalForm(productId);
                location.reload(); // Reload the page to reflect changes
            }
            catch (error) {
                alertBoxElem.style.display = 'block';
                alertMessageElem.innerHTML = 'Error updating product. Please try again.';
            }
            removeModalForm();
        });
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
const removeModalForm = (id = null) => {
    var _a;
    // ✅ Close the modal
    const modalEl = document.getElementById('staticBackdrop' + (id || ''));
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
                <button type="button" display="inline-block" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop${product.id}">
                    Edit Product
                </button>
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
const editModalForm = (product) => {
    return `
        <!-- Modal -->
        <div class="modal fade edit-modal" id="staticBackdrop${product.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <form class="modal-content" action="" method="POST" id="createCustomerForm${product.id}">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col">
                                <label for="name" class="form-label">Product Name</label>
                                <input type="text" value="${product.name}" class="form-control" id="product_name" name="name" required>
                            </div>
                            <div class="col">
                                <label for="quantity" class="form-label">Quantity in stock</label>
                                <input type="number" value="${product.quantity}" class="form-control" id="quantity" name="quantity" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="price" class="form-label">Price per item in (USD)</label>
                                <input type="number" value="${product.price}" class="form-control" id="price" name="price" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success" id="saveButton">
                            <span id="saveText">Save</span>
                            <span id="saveSpinner" class="spinner-border spinner-border-sm d-none" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>`;
};
console.log("Ajax script loaded");
