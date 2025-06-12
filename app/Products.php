<?php

namespace App;

class Products
{
    private array $products;

    public const DATA_PATH = 'database/products.json';

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $path = base_path(self::DATA_PATH);

        if (!file_exists($path)) {
            file_put_contents($path, json_encode([], true));
        }

        $this->products = json_decode(file_get_contents($path), true);
    }

    public function all(): array
    {
        return $this->products;
    }

    public function __call($name, $arguments)
    {

    }
}
