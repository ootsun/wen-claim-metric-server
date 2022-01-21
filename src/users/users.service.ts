import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({email});
    }

    update(user: User): Promise<User | undefined> {
        return this.userRepository.save(user);
    }
}
