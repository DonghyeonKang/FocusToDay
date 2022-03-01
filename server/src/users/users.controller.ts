import { Body, ConsoleLogger, Controller, Delete, Get, Header, Param, ParseIntPipe, Post, Req, Request, Res, Response } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto, SearchUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from "axios";

@Controller('mypage')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    
    @Get('/')
    getUserName(): Promise<any> {
        return this.usersService.getUserName();
    }

    @Get('/info')
    getUserInfo(): Promise<any> {
        return this.usersService.getUserInfo();
    }

    @Get('/friendList')
    getAllUsers(): Promise<any> {
        return this.usersService.getAllUser();
    }

    //편집(삭제, 찾을때)
    @Delete('/friendList/edit/:id')
    deleteUser(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    
    //윤수 찾을 때,
    @Get('/friendList/edit/:name')
    getUserById(@Param('name') name: string): Promise<String> {
        return this.usersService.getUserById(name);
    }

    // @Get('/friendList/edit')
    // getUserById(@Body() searchUserDto: SearchUserDto): Promise<String> {
    //     return this.usersService.getUserById(searchUserDto);
    // }

    //윤수 만들 때,
    @Post('/login')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any>{
        
        // return console.log(body);
        // @Response() res
        // return console.log(res.req.body);
        
        const {
            name: n,
            email: e,
        } = createUserDto;

        console.log(e);
        
        // console.log(`넘어온 데이터 ${}`);

        return this.usersService.createUser(createUserDto);
    }

   
    

    
}
