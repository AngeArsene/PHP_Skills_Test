import axios from 'axios';
import { Modal } from 'bootstrap'; // Bootstrap will now be available globally

const tableElem        = document.getElementById('product-list')!;
const alertBoxElem     = document.getElementById('alert')!;
const alertMessageElem = document.getElementById('alert-message')!;

window.onload = async () => {
    const loadingRowElem = document.getElementById('loading-row')!;
    const totalInventoryElem = document.getElementById('total-inventory')!;

    const response = await axios.get('/products');
    const products: Product[] = response.data;

    let totalInventory: number = 0;
    loadingRowElem.remove();

    products.map((product: Product) => {
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += formatTableRow(product);
        totalInventoryElem.innerHTML = `${totalInventory}`;
    });
}

const formElem = document.getElementById('createCustomerForm') as HTMLFormElement;

formElem.onsubmit = async (event: Event) => {
    event.preventDefault();

    const formData = new FormData(formElem);

    try {
        const response = await axios.post('/products', formData);
        tableElem.innerHTML += formatTableRow(response.data);
    } catch (error) {
        alertBoxElem.style.display = 'block';
        alertMessageElem.innerHTML = 'Error submitting form. Please try again.';
    }

    removeModalForm();
    formElem.reset();

}

const removeModalForm = (): void => {
    // ✅ Close the modal
    const modalEl = document.getElementById('staticBackdrop');
    const modal = Modal.getInstance(modalEl!); // ✅ use existing instance only
    modal?.hide(); // Will clean up backdrop & re-enable scrolling

    // Remove backdrop
    document.querySelector('.modal-backdrop')?.remove();

    // Re-enable scroll
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const formatTableRow = (product: Product): string => {
    return `
        <tr>
            <th>${ product.id }</th>
            <td>${ product.name }</td>
            <td>${ product.quantity }</td>
            <td>${ product.price }</td>
            <td>${new Date(product.created_at).toLocaleDateString()}</td>
            <td>${ product.quantity * product.price }</td>
            <td>
                <a href="" class="btn btn-primary">Edit</a>
                <button type="submit" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `;
}

console.log("Ajax script loaded");
