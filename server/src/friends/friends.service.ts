import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRepository } from './friend.repository';
import { Friend } from './entities/friend.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(FriendRepository)
        private friendRepository: FriendRepository,
    ){}
    
    getFriendByUser(userId: number) {
        return this.friendRepository.getFriendByUser(userId);
    }

    createFriend(username: string,
        createFriendDto: User,
    ): Promise<Friend> {
        return this.friendRepository.createFriend(username, createFriendDto);
    }

    
}
