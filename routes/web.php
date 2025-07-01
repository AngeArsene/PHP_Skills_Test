<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::view('/', 'index');

Route::apiResource('products', ProductController::class)->except('show');
