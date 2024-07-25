import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { WebSocketService } from '../socket/websocket.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    WebSocketService.emit("log-data","FindAll users method executed");
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    WebSocketService.emit("log-data","FindOneById users method executed with id ("+id+")");
    return this.userRepository.findOne({where: {id}});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    WebSocketService.emit("log-data","Create user method executed with user ("+JSON.stringify(user)+")");
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const baseUser = this.userRepository.findOne({where: {id}});
    await this.userRepository.update(id, updateUserDto);
    WebSocketService.emit("log-data","Update user method executed with initial user ("+JSON.stringify(baseUser)+") to --> ("+JSON.stringify(updateUserDto)+")");
    return this.userRepository.findOne({where: {id}});
  }

  async delete(id: number): Promise<void> {
    const user = this.userRepository.findOne({where: {id}});
    WebSocketService.emit("log-data","Delete user method executed user ("+JSON.stringify(user)+") ");
    await this.userRepository.delete(id);
  }
}
