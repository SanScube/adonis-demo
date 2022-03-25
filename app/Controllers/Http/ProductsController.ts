/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'
export default class ProductsController {
  // Get All Products
  async index({ response }) {
    const data = await Product.all()
    return response.ok({ data: data })
  }

  // Add a new Product
  async store({ request, response }) {
    const prodname = request.body().prod_name

    console.log(prodname)

    const product = await Product.findBy('prod_name', prodname)

    if (product) {
      return response.ok({ message: 'Product already exists' })
    } else {
      const data = await Product.create({
        prod_name: request.body().prod_name,
        price: request.body().price,
        rating: request.body().rating,
      })
      return response.created({ message: 'Product created successfully', data: data })
    }
  }

  // Get Product by ID
  async show({ request, response }) {
    const id = request.all().id
    console.log(id)
    const data = await Product.findBy('id', id)
    return response.ok({ data: data })
  }

  // Update a product by id
  async update({ request, response }) {
    const id = request.all().id
    const product = await Product.findOrFail(id)
    product.prod_name = request.body().prod_name
    product.save()
    response.created({ message: 'successfully updated', product: product })
  }

  // const project = await Project.findOrFail(1)
  // project.merge({
  //   name: 'My Test Project',
  //   description: 'Tacos are fun too'
  // })
  // await project.save()

  // Delete a product by ID

  async destroy({ request, response }) {
    try {
      const id = request.all().id
      const product = await Product.findOrFail(id)
      console.log(product)
      await product.delete()
      response.ok({ message: 'successfully deleted', product: product })
    } catch (err) {
      return response.notFound({ message: 'Data not found!!', err: err })
    }
  }
}

// Response messages
// item created - 201
// 2.return response.created({ message: 'successfully updated', product: product })
// 3.return response.ok({ data: data })

// 4.if data is not found-404
// 4.return response.notFound({ message: "Requested data not found" });

// 5.IF login credentials are not matching-400
// 5.response.badRequest({ error: 'Invalid login credentials' })

// not logged in -401
// 6.response.unauthorized({ error: 'Unauthorized' })
