<?php

namespace Tests\Unit;

use App\Products;
use Faker\Factory;
use Tests\TestCase;

final class ProductsTest extends TestCase
{
    private Products $products;
    private $faker;

    public static string $DATA_PATH = 'database/test/products.json';

    protected function setUp(): void
    {
        parent::setUp();
        $this->products = new Products(self::$DATA_PATH);
        $this->faker = Factory::create();

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
            'price'    => random_int(100, 1000),
            'name'     => $this->faker->word(),
            'quantity' => random_int(1, 10),
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
