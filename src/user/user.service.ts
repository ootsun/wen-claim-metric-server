import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({username: username});
    }

    update(user: User): Promise<User | undefined> {
        return this.userRepository.save(user);
    }
}
