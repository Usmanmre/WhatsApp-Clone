import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ConnectionRegistry } from 'src/connection/connection.registry';
export declare class UsersService {
    private readonly userModel;
    private readonly connectionRegistry;
    constructor(userModel: Model<User>, connectionRegistry: ConnectionRegistry);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
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
    findOne(email: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
