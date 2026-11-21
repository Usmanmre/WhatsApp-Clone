"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const connection_registry_1 = require("../connection/connection.registry");
let UsersService = class UsersService {
    constructor(userModel, connectionRegistry) {
        this.userModel = userModel;
        this.connectionRegistry = connectionRegistry;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new common_1.BadRequestException(`User with email ${email} already exists`);
        }
        if (!password) {
            throw new common_1.BadRequestException('Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        const name = email.split('@')[0];
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const existingUser = await this.userModel
            .findOne({ email: email.trim().toLowerCase() })
            .exec();
        if (!existingUser || !existingUser.password) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return {
            user: { ...existingUser.toObject() },
        };
    }
    async findAll() {
        const users = await this.userModel
            .find()
            .select('-password')
            .lean()
            .exec();
        const allUsers = users.map((user) => ({
            ...user,
            online: this.connectionRegistry.isOnline(user._id.toString()),
        }));
        return allUsers;
    }
    async findOne(email) {
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (!existingUser) {
            throw new common_1.BadRequestException(`User with email ${email} not found`);
        }
        return existingUser;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        connection_registry_1.ConnectionRegistry])
], UsersService);
//# sourceMappingURL=users.service.js.map