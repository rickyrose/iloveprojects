import { Module } from '@nestjs/common';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectRatingService } from './project-rating.service';

@Module({
  imports: [ProjectsModule],
  providers: [ProjectRatingService]
})
export class ProjectRatingModule {}
