<?php

namespace Tests\Unit;

use App\Products;
use Tests\TestCase;

final class ProductsTest extends TestCase
{
    private Products $products;

    public static string $DATA_PATH = 'database/test/products.json';

    protected function setUp(): void
    {
        parent::setUp();
        $this->products = new Products(self::$DATA_PATH);
    }

    public function testTheProductsJsonFileIsEmpty(): void
    {
        $products_json_content = json_decode(file_get_contents(self::$DATA_PATH), true);

        $this->assertEmpty($products_json_content);
        $this->assertEmpty($this->products->all());
    }

    public function testThatTheProductsJsonFileIsNotEmptyOnAdd(): void
    {
        $product = [
            'price'    => 23,
            'name'     => 'Table',
            'quantity' => 4
        ];

        $this->products->add($product);
        $products = $this->products->all();

        $this->assertNotEmpty($products);
        $this->assertEquals(1, count($products));
    }

    protected function tearDown(): void
    {
        parent::tearDown();

        unlink(base_path(self::$DATA_PATH));
        rmdir(dirname(base_path(self::$DATA_PATH)));
    }
}
