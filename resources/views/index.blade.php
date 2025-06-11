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
                <th scope="col">Price per item</th>
                <th scope="col">Datetime Submitted</th>
                <th scope="col">Action</th>
            </thead>
            <tbody>
                <tr>
                    <th>{{ 1 }}</th>
                    <td>{{ 'Gaz Oven' }}</td>
                    <td>{{ 15 }}</td>
                    <td>{{ '$' . 15000 }}</td>
                    <td>{{ date('y-m-d H:i:s') }}</td>
                    <td>
                        <a href="" class="btn btn-primary">Edit</a>
                        <form action="" method="POST" onsubmit="return confirm('Are you sure you want to delete this customer?')" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection
