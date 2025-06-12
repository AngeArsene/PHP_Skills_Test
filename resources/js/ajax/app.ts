import axios from 'axios';

window.onload = async (): Promise<void> => {
    const tableElem = document.getElementById('product-list')!;
    const loadingRowElem = document.getElementById('loading-row')!;
    const totalInventoryElem = document.getElementById('total-inventory')!;

    const response = await axios.get('/products');
    const products: Product[] = response.data;

    let totalInventory: number = 0;
    loadingRowElem.remove();

    products.map((product: Product) => {
        totalInventory += product.quantity * product.price;
        tableElem.innerHTML += `
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

        totalInventoryElem.innerHTML = `${totalInventory}`;
    });
}

console.log("Ajax script loaded");
