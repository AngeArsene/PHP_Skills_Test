<?php

namespace App;

/**
 * Class Products
 *
 * Manages a collection of products stored in a JSON file.
 * Provides methods to retrieve, add, and update products.
 *
 * @package App
 */
class Products
{
    /**
     * @var array $products
     * An array containing the list of products.
     */
    private array $products;

    /**
     * The relative path to the products data JSON file.
     *
     * @var string
     */
    public const DATA_PATH = 'database/products.json';

    /**
     * Products constructor.
     * Initializes the products collection by reading from a JSON file.
     *
     * @throws \Exception If unable to read or write the products data file.
     */
    public function __construct()
    {
        $path = base_path(self::DATA_PATH);

        if (!file_exists($path)) {
            file_put_contents($path, json_encode([], true));
        }

        $this->products = json_decode(file_get_contents($path), true);
    }

    /**
     * Retrieve all products, sorted by creation date.
     *
     * @return array The list of all products.
     */
    public function all(): array
    {
        usort($this->products, function ($a, $b) {
            return strtotime($a['created_at']) <=> strtotime($b['created_at']);
        });

        return $this->products;
    }

    /**
     * Add a new product to the collection.
     *
     * @param array $product The product data to add.
     * @return array The newly added product.
     */
    public function add(array $product): array
    {
        $this->products[] = $product = array_merge($product, [
            'id' => count($this->products) + 1, // Simple ID generation
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        $this->save();

        return $product;
    }

    /**
     * Update an existing product by ID.
     *
     * @param string $id The ID of the product to update.
     * @param array $product The updated product data.
     * @return array|null The updated product, or null if not found.
     */
    public function update(string $id, array $product): ?array
    {
        $new_product = $this->products[$id - 1];

        $product = !empty($new_product) ?
            array_merge($new_product, $product) : null;

        if ($product) $this->products[$id - 1] = $product;

        $this->save();

        return $product;
    }

    /**
     * Save the current products array to the JSON file.
     *
     * @return void
     */
    private function save(): void
    {
        $path = base_path(self::DATA_PATH);
        file_put_contents($path, json_encode($this->products, JSON_PRETTY_PRINT));
    }
}
