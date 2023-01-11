/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Post, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) { }


  @Post(['create'])
  async Create(@Body() body) {
    let result = await this.userService.createUserProfile(body)
    if (result.success) {
      return {
        status: 200,
        message: "Tạo tài khoản thành công",
      }
    } else {
      return {
        status: 400,
        message:result.error
      }
    }
  }



}
