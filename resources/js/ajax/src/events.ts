import { Product } from '../../types/index';
import { createProduct, updateProduct } from './api';
import { editModalForm, formatTableRow, removeModalForm } from './ui';
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
            bindEditForm(product);
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
        showSpinner(product.id.toString());

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const updated = await updateProduct(product.id.toString(), payload);
            const row = document.querySelector(`#product-list tr:nth-child(${updated.id})`);

            if (row) row.innerHTML = formatTableRow(updated);
            removeModalForm(product.id.toString());
            location.reload(); // Reload to ensure all data is up-to-date
        } catch (err) {
            alertBoxElem.style.display = 'block';
            alertMessageElem.innerHTML = 'Error updating product. Please try again.';
        }
    };
};

export const showSpinner = (id: string | null = null) => {
    const form = document.getElementById('createCustomerForm' + (id || '')) as HTMLFormElement;
    const submitButton = form.querySelector('button[type="submit"]');
    const saveText = submitButton?.querySelector('span') as HTMLSpanElement;
    const saveSpinner = submitButton?.querySelectorAll('span')[1] as HTMLSpanElement;

    const modalForm = document.getElementById('createCustomerForm' + (id || '')) as HTMLElement;
    const saveButton = document.getElementById('saveButton')! as HTMLButtonElement;
    // const saveText = document.getElementById('saveText')!;
    // const saveSpinner = document.getElementById('saveSpinner')!;

    // Disable the button to prevent multiple submissions
    saveButton.disabled = true;

    // Show the spinner
    saveSpinner.classList.remove('d-none');
    saveText.textContent = 'Saving...';
};
