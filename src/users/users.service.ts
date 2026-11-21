import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { ConnectionRegistry } from 'src/connection/connection.registry';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly connectionRegistry: ConnectionRegistry,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // Extract name from email
    const name = email.split('@')[0];

    // Create user
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }


  async login(loginUserDto: LoginUserDto) {
  const { email, password } = loginUserDto;
 if (!email || !password) {
    throw new BadRequestException('Email and password are required');
  }
  // Find user and explicitly include password
  const existingUser = await this.userModel
    .findOne({ email: email .trim().toLowerCase() })
    .exec();

  // Generic error prevents email enumeration
  if (!existingUser || !existingUser.password) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Verify password
  const isMatch = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Return safe user data
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

  async findOne(email: string) {

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (!existingUser) {
      throw new BadRequestException(`User with email ${email} not found`);
    }
    return existingUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
