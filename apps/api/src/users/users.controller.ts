import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@repo/contracts';
import { Public } from 'src/decorators/public-route';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @TsRestHandler(contract.users)
  async handler(): Promise<any> {
    return tsRestHandler(contract.users, {
      create: async ({ body }) => {
        const existentUser = await this.usersService.findOne(body.username);

        if (existentUser) {
          return {
            status: 400,
            body: {
              message: 'O nome de usuário já está em uso.',
            },
          };
        }

        return {
          status: 201,
          body: await this.usersService.create(body),
        };
      },
    });
  }
}
