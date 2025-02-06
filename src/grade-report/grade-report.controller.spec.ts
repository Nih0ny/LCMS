import { Test, TestingModule } from '@nestjs/testing';
import { GradeReportController } from './grade-report.controller';

describe('GradeReportController', () => {
  let controller: GradeReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeReportController],
    }).compile();

    controller = module.get<GradeReportController>(GradeReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
