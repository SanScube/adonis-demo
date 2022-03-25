/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// get all products
Route.get('/products', 'ProductsController.index')

// Add product
Route.post('/products', 'ProductsController.store')

// get product by id
Route.get('/product', 'ProductsController.show')

// update product by id
Route.patch('/product', 'ProductsController.update')

// delete product by id
Route.delete('/product', 'ProductsController.destroy')

Route.get('/users', 'UsersController.index')
Route.post('/users', 'UsersController.store')
Route.delete('/users', 'UsersController.destroy')
Route.get('/users/:id', 'UsersController.show')
Route.patch('/users/:id', 'UsersController.update')

Route.get('/admins', 'AdminsController.index')
Route.post('/admins', 'AdminsController.store')
Route.delete('/admins/:id', 'AdminsController.destroy')
