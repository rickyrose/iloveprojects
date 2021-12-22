import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRatingService } from './project-rating.service';

describe('ProjectRatingService', () => {
  let service: ProjectRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRatingService],
    }).compile();

    service = module.get<ProjectRatingService>(ProjectRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
