import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateAbusiveReportInput } from './dto/create-abusive-report.input';
import { AcceptAbusiveReportInput } from './dto/accept-abusive-report.input';
import { GetMyReportsArgs, MyReportPaginator } from './dto/get-my-reports.args';
import { AbusiveReport } from './entities/abusive-report.entity';

@Resolver(() => AbusiveReport)
export class ReportsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => MyReportPaginator)
  async myReports(
    @Args() MyReportPaginator: GetMyReportsArgs,
  ): Promise<MyReportPaginator> {
    return this.reviewsService.myReports(MyReportPaginator);
  }

  @Mutation(() => AbusiveReport)
  createAbusiveReport(
    @Args('input') createAbusiveReportInput: CreateAbusiveReportInput,
  ) {
    return this.reviewsService.createAbusiveReport(createAbusiveReportInput);
  }

  @Mutation(() => AbusiveReport)
  rejectAbusiveReport(
    @Args('input') acceptAbusiveReportInput: AcceptAbusiveReportInput,
  ) {
    return [];
  }
}
