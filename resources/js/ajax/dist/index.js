var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProducts } from './api';
import { deleteModalForm, editModalForm, formatTableRow } from './ui';
import { bindEditForm, bindCreateForm, bindDeleteForm } from './events';
import { tableElem, totalInventoryElem } from './dom';
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const loadingRow = document.getElementById('loading-row');
    let totalInventory = 0;
    const products = yield fetchProducts();
    loadingRow === null || loadingRow === void 0 ? void 0 : loadingRow.remove();
    products.forEach((product) => {
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += formatTableRow(product);
        totalInventoryElem.innerHTML = `${totalInventory}`;
        document.body.insertAdjacentHTML('beforeend', editModalForm(product));
        document.body.insertAdjacentHTML('beforeend', deleteModalForm(product.id));
        bindEditForm(product);
        bindDeleteForm(product.id);
    });
    bindCreateForm();
});
