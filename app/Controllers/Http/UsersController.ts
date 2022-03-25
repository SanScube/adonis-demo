/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.ok({ users: users })
  }

  async store({ request, response }: HttpContextContract) {
    // const data = request.only(['name', 'age', 'email', 'gender'])

    try {
      const dataname = request.input('name')
      const u = await User.findBy('name', dataname)
      console.log(u)

      if (u) {
        return response.ok({ message: 'user already exists' })
      } else {
        const userdata = request.all()
        console.log(userdata)

        const user = await User.create(userdata)

        return response.created({ message: 'User Created Successfully', user: user })
      }
    } catch (err) {
      return response.badRequest({ message: err.message })
    }
  }

  async destroy({ request, response }: HttpContextContract) {
    try {
      const id = request.all().id
      const user = await User.findOrFail(id)
      console.log(user)

      if (user) {
        await user.delete()
        return response.ok({ user: user })
      } else {
        return response.notFound({ message: 'User not found' })
      }
    } catch (err) {
      return response.badRequest({ message: err.message })
    }
  }

  async show({ response, params }: HttpContextContract) {
    console.log(params.id)

    try {
      const user = await User.findOrFail(params.id)
      console.log(user)
      if (user) {
        return response.ok({ user: user })
      } else {
        return response.notFound({ message: 'User not found' })
      }
    } catch (err) {
      return response.badRequest({ message: err.message })
    }
  }

  async update({ request, response, params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      const userdata = request.only(['name', 'age', 'email', 'gender'])
      user.merge(userdata)
      await user.save()
      return response.ok({ user: user })
    } catch (err) {
      return response.badRequest({ message: err.message })
    }
  }
}
