import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UserDto } from '@repo/contracts/dist/users';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    const newUser = await this.prisma.user.create({
      data: {
        username: user.username,
        hashedPassword: user.password,
      },
    });

    const { hashedPassword, ...rest } = newUser;
    return rest;
  }

  async findOne(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
