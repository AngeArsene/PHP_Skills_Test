<?php

namespace App;

use Exception;

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
    public static $DATA_PATH = 'database/products.json';

    /**
     * Products constructor.
     * Initializes the products collection by reading from a JSON file.
     *
     * @param array|null $path
     *
     * @throws \Exception If unable to read or write the products data file.
     */
    public function __construct(?string $path = null)
    {
        self::$DATA_PATH = $path ?? self::$DATA_PATH;
        $path = base_path(self::$DATA_PATH);

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
        $up_product = $this->products[$id - 1];

        if (!empty($up_product)) {
            $this->products[$id - 1] = array_merge($up_product, $product);
            $product = $this->products[$id - 1];

            $this->save();
        } else {
            throw new Exception("The product id given to update was not found.", 404);
        }

        return $product;
    }

    public function delete(string $id): void
    {
        unset($this->products[$id - 1]);

        // coming soon

        $this->save();
    }

    /**
     * Save the current products array to the JSON file.
     *
     * @return void
     */
    private function save(): void
    {
        $path = base_path(self::$DATA_PATH);
        file_put_contents($path, json_encode($this->products, JSON_PRETTY_PRINT));
    }
}
