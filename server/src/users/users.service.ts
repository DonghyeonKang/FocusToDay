import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto, SearchUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-Status.enum';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository) //서비스안에서 Reposiory사용.
        private userRepository: UserRepository,
    ){}

    getUserName(): Promise<any> {
        return this.userRepository.getUserName();
    }

    //Promise<any>
    async getUserInfo(name: string): Promise<any>{
        // console.log(`service: ${name}`);
        return this.userRepository.getUserInfo(name);
    }
    
    // googleLogin(req:any){
    //     console.log(req.user);
    //     if(!req.user){
    //         return "No User from google"
    //     }
    //     return {
    //         message : 'User Info from Google',
    //         user: req.user
    //     }
        
    // }

    //친구목록 다 찾기
    getAllUser(): Promise<any> {
        return this.userRepository.getAllUser();
    }


    ////윤수 찾기=> user.exist(id) -> const user = user.find(id, ) -> return user.name

    
    getUserById(name: string): Promise <String> {
        return this.userRepository.getUserById(name);
    }


    
    // getUserById(searchUserDto: SearchUserDto): Promise <String> {
    //     return this.userRepository.getUserById(searchUserDto);
    // }

    createUser(createUserDto: CreateUserDto) : Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    deleteUser(id: number) : Promise<void> {
        return this.userRepository.deleteUser(id);
    }
    

    // private users: User[] = [];
    
    // getAllUsers(): User[] {
    //     return this.users;
    // }
}
