/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Admin from 'App/Models/Admin'
import AdminValidator from 'App/Validators/AdminValidator'

export default class AdminsController {
  // GET ALL ADMINS

  async index({ request, response }) {
    const admins = await Admin.all()
    return response.ok({ admins: admins })
  }

  // CREATE ADMIN
  async store({ request, response }) {
    try {
      const { name, nationality, drive } = await request.validate(AdminValidator)

      const ispresent = await Admin.findBy('name', name)
      if (ispresent) {
        return response.ok({ message: 'Admin Already exists' })
      } else {
        const admin = await Admin.create({
          name,
          nationality,
          drive,
        })
        return response.ok({ message: 'admin created', admin: admin })
      }
    } catch (err) {
      return response.badRequest({ message: err.message })
    }
  }

  // DELETE ADMIN

  async destroy({ request, response, params }: HttpContextContract) {
    try {
      const isadmin = await Admin.find(params.id)
      if (isadmin) {
        await isadmin.delete()
        return response.ok({ message: 'admin deleted' })
      } else {
        return response.badRequest({ message: 'admin not found' })
      }
    } catch (err) {
      return response.ok({ message: err.message })
    }
  }

  // UPDATE ADMIN
}
