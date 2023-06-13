import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import{Request,Response} from 'express'
import {ApiTags} from '@nestjs/swagger'

@Controller('user')

@ApiTags('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

@Post('signup')
 async create(@Req() req:Request,@Res() res:Response,@Body() data: CreateUserDto) {
    try{
      await this.userService.create(data);
      res.status(HttpStatus.OK).json({
        message:'sucessful inserted',
        status:200
      })
    }
    catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:error,
      })
    }
  }

  @Get('getUsers')
  async findAll(@Req() req:Request,@Res() res:Response) {
    try{
      let users = await this.userService.findAll();
      res.status(HttpStatus.OK).json({
        message:'success',
        data:users
      });
    }
    catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"couldn't fetch All User"
      })
    }
  }

  @Get('getUserById/:id')
 async  findOne(@Param('id') id: string,@Req() req:Request, @Res() res:Response) {
    try {
      let user=await this.userService.findOne(+id)
      if(user){
        res.status(HttpStatus.OK).json({
          message:'success',
          status:200,
          data:user
        })
        return
      }
      res.status(HttpStatus.NOT_FOUND).json({
        message:'user not found'
      })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'error'
      }) 
    }
  }

  @Put('updateUser/:id')
 async update(@Param('id') id: string,@Req() req:Request, @Res() res:Response, @Body() updateUserDto: UpdateUserDto) {
  try {
    await this.userService.update(+id, updateUserDto);
    res.status(HttpStatus.OK).json({
      message:'updated successful',
      status:200
    })
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:'error',
      error:'not updated'
    })
  }
  }

  @Delete('deleteUser/:id')
 async remove(@Param('id') id: string,@Req() req:Request, @Res() res:Response) {
    try {
      await this.userService.remove(+id)
      res.status(HttpStatus.OK).json(
        {
          message:'delete successful',
          status:200
        }
      )
      
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'error',
        error:'not delete'
      })
    }
  }
}
