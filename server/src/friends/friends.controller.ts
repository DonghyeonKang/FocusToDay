import { Body, Controller, Delete, Get, Post, Req, Param, NotFoundException } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from './entities/friend.entity';
import { CreateFriendDto } from './dto/create-friend.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { map } from 'rxjs';
import { FriendReqService } from './friendReq.service';

@Controller('friends')
export class FriendsController {
  constructor(
    private friendService: FriendsService,
    private usersService: UsersService,
    private friendReqService: FriendReqService,
  ) {}

  @Get('/getAllFriends/:id')
  getFriendByUser(@Param('id') id: number): any {
    return this.friendService.getFriendByUser(id);
  }


    //친구 등록
  @Post('/')
  createFriend(@Body('email') email: string): any {
    const foundUser = this.usersService.getUserInfo(email);
    foundUser
      .then((user) => {
        user.forEach((info:any) => {
          return this.friendService.createFriend('정윤수', info);
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  


  //친구 요청 보내는 곳
  @Post('/req/send')
  sendFriendRequest(@Body('email') email:string): any {
    const exist = this.friendReqService.checkUserFriendReq(email);

    return exist.then((result) => {
      if(result !== false){
        return "duplicated request";
      }
      
      return this.usersService.getUserInfo(email)
      .then((user) => {
        user.forEach((info:any) => {
          console.log(info);
          return this.friendReqService.createFriendReq(info);
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    });
  }



  
  
  @Delete('/req/delete/:id')
  deleteFriendRequest(@Param('id') id: any): any {
    return this.friendReqService.deleteFriendRequest(id);
  }

  

}
