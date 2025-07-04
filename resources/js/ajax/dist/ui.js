import { Modal } from 'bootstrap';
export const formatTableRow = (product) => `
    <tr>
        <th>${product.id}</th>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${new Date(product.created_at).toLocaleDateString()}</td>
        <td>${product.quantity * product.price}</td>
        <td>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop${product.id}">
                Edit
            </button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal${product.id}">
                Delete
            </button>
        </td>
    </tr>
`;
export const editModalForm = (product) => `
    <div class="modal fade edit-modal" id="staticBackdrop${product.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <form class="modal-content" id="createCustomerForm${product.id}">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Product Name</label>
                            <input type="text" value="${product.name}" class="form-control" name="name" required>
                        </div>
                        <div class="col">
                            <label class="form-label">Quantity in stock</label>
                            <input type="number" value="${product.quantity}" class="form-control" name="quantity" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Price per item (USD)</label>
                            <input type="number" value="${product.price}" class="form-control" name="price" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="saveButton">
                        <span id="saveText">Save</span>
                        <span id="saveSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
`;
export const deleteModalForm = (id) => `
    <div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel${id}" aria-hidden="true">
        <form id="DeleteModalForm${id}" class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Deleting Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Are you sure you want to delete this product ?</label>
                            <input type="hidden" value="${id}" class="form-control" name="id" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-danger" id="saveButton">
                        <span id="saveText">Delete</span>
                        <span id="saveSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </form>
    </div>
`;
export const removeModalForm = (id = null) => {
    var _a;
    const modalEl = document.getElementById('staticBackdrop' + (id || ''));
    const modal = Modal.getInstance(modalEl);
    modal === null || modal === void 0 ? void 0 : modal.hide();
    (_a = document.querySelector('.modal-backdrop')) === null || _a === void 0 ? void 0 : _a.remove();
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};
