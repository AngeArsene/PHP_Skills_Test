        <!-- Button trigger modal -->
        <button type="button" class="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add New
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <form class="modal-content" action="" method="POST" id="createCustomerForm">

                    @csrf

                    @method('post')

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Add New Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col">
                                <label for="product_name" class="form-label">Product Name</label>
                                <input type="text" class="form-control" id="product_name" name="product_name" required>
                            </div>
                            <div class="col">
                                <label for="quantity" class="form-label">Quantity in stock</label>
                                <input type="number" class="form-control" id="quantity" name="quantity" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="price" class="form-label">Price per item in (USD)</label>
                                <input type="number" class="form-control" id="price" name="price" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Save</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
