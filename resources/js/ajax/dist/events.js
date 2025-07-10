var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createProduct, deleteProduct, updateProduct } from './api';
import { deleteModalForm, editModalForm, formatTableRow, removeModalForm } from './ui';
import { tableElem, totalInventoryElem, alertBoxElem, alertMessageElem } from './dom';
export const bindCreateForm = () => {
    const form = document.getElementById('createCustomerForm');
    form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        showSpinner();
        const formData = new FormData(form);
        try {
            const product = yield createProduct(formData);
            tableElem.innerHTML += formatTableRow(product);
            totalInventoryElem.innerHTML = `${Number(totalInventoryElem.innerHTML) + product.quantity * product.price}`;
            removeModalForm();
            form.reset();
            document.body.insertAdjacentHTML('beforeend', editModalForm(product));
            document.body.insertAdjacentHTML('beforeend', deleteModalForm(product.id));
            bindEditForm(product);
            bindDeleteForm(product.id);
            hideSpinner();
        }
        catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error submitting form. Please try again.';
        }
    });
};
export const bindEditForm = (product) => {
    const form = document.getElementById(`createCustomerForm${product.id}`);
    form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        showSpinner('createCustomerForm', product.id.toString(), 'Updating');
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        try {
            const updated = yield updateProduct(product.id, payload);
            const row = document.querySelector(`#product-list tr:nth-child(${updated.id})`);
            if (row)
                row.innerHTML = formatTableRow(updated);
            removeModalForm(product.id.toString());
            hideSpinner('createCustomerForm', product.id.toString());
            location.reload(); // Reload to ensure all data is up-to-date
        }
        catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error updating product. Please try again.';
        }
    });
};
export const bindDeleteForm = (id) => {
    const form = document.getElementById(`DeleteModalForm${id}`);
    form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        showSpinner('DeleteModalForm', id.toString(), 'Deleting');
        try {
            const status_code = yield deleteProduct(id);
            if (status_code !== 204) {
                alertBoxElem.style.display = 'block';
                alertMessageElem.innerHTML = 'Error deleting product. Please try again.';
                return;
            }
            const row = document.querySelector(`#product-list tr:nth-child(${id})`);
            if (row)
                row.remove();
            removeModalForm(id.toString());
            hideSpinner('DeleteModalForm', id.toString());
            location.reload(); // Reload to ensure all data is up-to-date
        }
        catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error updating product. Please try again.';
        }
    });
};
export const showSpinner = (class_name = null, id = null, action = 'Saving') => {
    const selector = class_name || 'createCustomerForm';
    const form = document.getElementById(selector + (id || ''));
    const submitButton = form.querySelector('button[type="submit"]');
    const saveText = submitButton === null || submitButton === void 0 ? void 0 : submitButton.querySelector('span');
    const saveSpinner = submitButton === null || submitButton === void 0 ? void 0 : submitButton.querySelectorAll('span')[1];
    const saveButton = document.getElementById('saveButton');
    // Disable the button to prevent multiple submissions
    saveButton.disabled = true;
    // Show the spinner
    saveSpinner.classList.remove('d-none');
    saveText.textContent = `${action}...`;
};
export const hideSpinner = (class_name = null, id = null) => {
    const selector = class_name || 'createCustomerForm';
    const form = document.getElementById(selector + (id || ''));
    const submitButton = form.querySelector('button[type="submit"]');
    const saveText = submitButton === null || submitButton === void 0 ? void 0 : submitButton.querySelector('span');
    const saveSpinner = submitButton === null || submitButton === void 0 ? void 0 : submitButton.querySelectorAll('span')[1];
    // Hide the spinner
    saveSpinner.classList.add('d-none');
    saveText.textContent = 'Save';
    // Re-enable the button
    const saveButton = document.getElementById('saveButton');
    saveButton.disabled = false;
};
