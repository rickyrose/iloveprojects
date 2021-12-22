import { Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class ProjectRatingService {
    constructor(private readonly projectService: ProjectsService) {}
}
