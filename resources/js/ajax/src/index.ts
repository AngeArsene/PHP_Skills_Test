import { fetchProducts } from './api';
import { deleteModalForm, editModalForm, formatTableRow } from './ui';
import { bindEditForm, bindCreateForm, bindDeleteForm } from './events';
import { tableElem, totalInventoryElem } from './dom';
import { Product } from '../../types/index';

window.onload = async () => {
    const loadingRow = document.getElementById('loading-row');
    let totalInventory = 0;

    const products = await fetchProducts();
    loadingRow?.remove();

    products.forEach((product: Product) => {
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += formatTableRow(product);
        totalInventoryElem.innerHTML = `${totalInventory}`;

        document.body.insertAdjacentHTML('beforeend', editModalForm(product));
        document.body.insertAdjacentHTML('beforeend', deleteModalForm(product.id));
        bindEditForm(product);
        bindDeleteForm(product.id);
    });

    bindCreateForm();
};
