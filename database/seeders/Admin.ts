import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Admin.create({
      name: 'Prasunbro',
      nationality: 'Indian',
      drive: true,
    })
  }
}
