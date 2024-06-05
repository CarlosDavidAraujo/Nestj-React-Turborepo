import { Controller, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@repo/contracts';
import { Public } from 'src/decorators/public-route';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @TsRestHandler(contract.auth.signIn)
  async signIn(@Res({ passthrough: true }) res: Response): Promise<any> {
    return tsRestHandler(
      contract.auth.signIn,

      async ({ body: { username, password } }) => {
        const user = await this.userService.findOne(username);

        if (!user) {
          return {
            status: 404,
            body: {
              message: 'Usuário não encontrado!',
            },
          };
        }

        const isPasswordCorrect = user.hashedPassword === password;

        if (!isPasswordCorrect) {
          return {
            status: 401,
            body: {
              message: 'Senha incorreta!',
            },
          };
        }

        const { access_token } = await this.authService.signIn(user);

        res
          .cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
          })
          .send({ status: 'ok' });

        return {
          status: 201,

          body: {
            status: 'ok',
          },
        };
      },
    );
  }

  @TsRestHandler(contract.auth.signOut)
  async signOut(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.signOut, async () => {
      res.clearCookie('access_token').send({ message: 'logout' });
      return {
        status: 201,
        body: {
          message: 'logout',
        },
      };
    });
  }

  @TsRestHandler(contract.auth.getSession)
  async getSession(@Req() req: Request) {
    return tsRestHandler(contract.auth.getSession, async () => {
      return {
        status: 200,
        // @ts-expect-error session existe no objeto req
        body: req.session,
      };
    });
  }
}
