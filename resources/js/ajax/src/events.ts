import { Product } from '../../types/index';
import { createProduct, deleteProduct, updateProduct } from './api';
import { deleteModalForm, editModalForm, formatTableRow, removeModalForm } from './ui';
import { tableElem, totalInventoryElem, alertBoxElem, alertMessageElem } from './dom';

export const bindCreateForm = (): void => {
    const form = document.getElementById('createCustomerForm') as HTMLFormElement;
    form.onsubmit = async (e) => {
        e.preventDefault();
        showSpinner();

        const formData = new FormData(form);

        try {
            const product = await createProduct(formData);
            tableElem.innerHTML += formatTableRow(product);
            totalInventoryElem.innerHTML = `${Number(totalInventoryElem.innerHTML) + product.quantity * product.price}`;

            removeModalForm();
            form.reset();
            document.body.insertAdjacentHTML('beforeend', editModalForm(product));
            document.body.insertAdjacentHTML('beforeend', deleteModalForm(product.id));
            bindEditForm(product);
            bindDeleteForm(product.id);

            hideSpinner();
        } catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error submitting form. Please try again.';
        }
    };
};

export const bindEditForm = (product: Product): void => {
    const form = document.getElementById(`createCustomerForm${product.id}`) as HTMLFormElement;
    form.onsubmit = async (e) => {
        e.preventDefault();
        showSpinner('createCustomerForm', product.id.toString(), 'Updating');

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const updated = await updateProduct(product.id, payload);
            const row = document.querySelector(`#product-list tr:nth-child(${updated.id})`);

            if (row) row.innerHTML = formatTableRow(updated);
            removeModalForm(product.id.toString());

            hideSpinner('createCustomerForm', product.id.toString());
            location.reload(); // Reload to ensure all data is up-to-date
        } catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error updating product. Please try again.';
        }
    };
};

export const bindDeleteForm = (id: number): void => {
    const form = document.getElementById(`DeleteModalForm${id}`) as HTMLFormElement;
    form.onsubmit = async (e) => {
        e.preventDefault();
        showSpinner('DeleteModalForm', id.toString(), 'Deleting');

        try {
            const status_code = await deleteProduct(id);

            if (status_code !== 204) {
                alertBoxElem.style.display = 'block';
                alertMessageElem.innerHTML = 'Error deleting product. Please try again.';
                return;
            }

            const row = document.querySelector(`#product-list tr:nth-child(${id})`);
            if (row) row.remove();
            removeModalForm(id.toString());

            hideSpinner('DeleteModalForm', id.toString());
            location.reload(); // Reload to ensure all data is up-to-date
        } catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error updating product. Please try again.';
        }
    };
};

export const showSpinner = (class_name: string|null = null, id: string|null = null, action: string|null = 'Saving') => {
    const selector = class_name || 'createCustomerForm';
    const form = document.getElementById(selector + (id || '')) as HTMLFormElement;
    const submitButton = form.querySelector('button[type="submit"]');
    const saveText = submitButton?.querySelector('span') as HTMLSpanElement;
    const saveSpinner = submitButton?.querySelectorAll('span')[1] as HTMLSpanElement;

    const saveButton = document.getElementById('saveButton')! as HTMLButtonElement;

    // Disable the button to prevent multiple submissions
    saveButton.disabled = true;

    // Show the spinner
    saveSpinner.classList.remove('d-none');
    saveText.textContent = `${action}...`;
};

export const hideSpinner = (class_name: string|null = null, id: string|null = null) => {
    const selector = class_name || 'createCustomerForm';
    const form = document.getElementById(selector + (id || '')) as HTMLFormElement;
    const submitButton = form.querySelector('button[type="submit"]');
    const saveText = submitButton?.querySelector('span') as HTMLSpanElement;
    const saveSpinner = submitButton?.querySelectorAll('span')[1] as HTMLSpanElement;

    // Hide the spinner
    saveSpinner.classList.add('d-none');
    saveText.textContent = 'Save';

    // Re-enable the button
    const saveButton = document.getElementById('saveButton')! as HTMLButtonElement;
    saveButton.disabled = false;
}
