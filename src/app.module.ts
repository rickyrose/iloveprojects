import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule, MongooseModule.forRoot('mongodb://localhost:27017/nest-proj'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
