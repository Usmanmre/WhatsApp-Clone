import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}, {}> & import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            name: string | undefined;
            email: string | undefined;
            password: string | undefined;
            avatar: string | undefined;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    findAll(): Promise<{
        online: boolean;
        name: string | undefined;
        email: string | undefined;
        password: string | undefined;
        avatar: string | undefined;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }[]>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
