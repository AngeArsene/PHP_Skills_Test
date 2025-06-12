@extends('layout.main')

@section('title', env('APP_NAME'))

@section('content')

    <div class="container">
        <x-create-modal-button />

        <table class="table table-hover text-center">
            <thead class="table-dark">
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity in stock</th>
                <th scope="col">Price per item (USD)</th>
                <th scope="col">Datetime Submitted</th>
                <th scope="col">Total Value (USD)</th>
                <th scope="col">Action</th>
            </thead>
            <tbody id="product-list">
                <tr id="loading-row">
                    <td colspan="7">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="spinner-border text-primary me-2" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <span>Loading products...</span>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot class="table-light fw-bold">
                <tr>
                    <td colspan="5" class="text-end">Total Inventory Value (USD):</td>
                    <td id="total-inventory"></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
@endsection
