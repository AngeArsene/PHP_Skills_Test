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
        usort($this->products, function ($a, $b) {
            return strtotime($a['created_at']) <=> strtotime($b['created_at']);
        });

        return $this->products;
    }

    public function add(array $product): array
    {
        $this->products[] = array_merge($product, [
            'id' => count($this->products) + 1, // Simple ID generation
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        $this->save();

        return end($this->products);
    }

    public function update(string $id, array $product): ?array
    {
        $new_product = $this->products[$id - 1];

        $product = !empty($new_product) ?
            array_merge($new_product, $product) : null;

        if ($product) $this->products[$id - 1] = $product;

        $this->save();

        return $product;
    }

    private function save(): void
    {
        $path = base_path(self::DATA_PATH);
        file_put_contents($path, json_encode($this->products, JSON_PRETTY_PRINT));
    }

    public function __call($name, $arguments) {}
}
