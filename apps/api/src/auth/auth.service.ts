import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@repo/db';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
