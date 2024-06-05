import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
      serveRoot: '/client',
      exclude: ['/api/(.*)'],
    }),
    /*     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'next', 'out'),
      serveRoot: '/next',
      exclude: ['/api/(.*)'],
    }), */
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
