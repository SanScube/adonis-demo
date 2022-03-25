import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
export default class ProductSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Product.create({
      prod_name: 'Iphone XR',
      rating: 4.5,
      price: 25000,
    })
  }
}
