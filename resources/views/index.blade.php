@extends('layout.main')

@section('title', env('APP_NAME'))

@section('content')

    <div class="container">
        <x-create-modal-button />

        <table class="table table-hover text-center">
            <thead class="table-dark">
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
            </thead>
            <tbody>
                <tr>
                    <th>{{ 1 }}</th>
                    <td>{{ 'Ange' }}</td>
                    <td>{{ 'Arsene' }}</td>
                    <td>{{ 'nkenmandenga@gmail.com' }}</td>
                    <td>{{ 'Male' }}</td>
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
