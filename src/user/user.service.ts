import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}

  // create a Employee
 async create(createUserDto: any) {
    await this.userRepository.save(createUserDto);
  }

  // get all Employee
  async findAll() {
   return await this.userRepository.find({
      select:['id','name','email'],
      where:{isActive:true}
     });
  }

  // get one Employee
 async findOne(id: number) {
   return await this.userRepository.findOne({where:{id}})
  }

  // update Employee
 async update(id: number, updateUserDto: UpdateUserDto) {
   await this.userRepository.update(id,updateUserDto)
  }

  // delete Employee
 async remove(id: number) {
    await this.userRepository.softDelete(id) 
    await this.userRepository.update(id,{isActive:false})
  }
}
