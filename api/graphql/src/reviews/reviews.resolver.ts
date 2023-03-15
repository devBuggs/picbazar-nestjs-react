import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { GetReviewsArgs, ReviewPaginator } from './dto/get-reviews.args';
import { UpdateReviewInput } from './dto/update-review.input';
import { GetReviewArgs } from './dto/get-review.args';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  createReview(@Args('input') createReviewInput: CreateReviewInput) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => ReviewPaginator, { name: 'reviews' })
  getReviews(@Args() getReviewsArgs: GetReviewsArgs) {
    return this.reviewsService.findAll(getReviewsArgs);
  }

  @Query(() => Review, { name: 'review' })
  getReview(@Args() getReviewArgs: GetReviewArgs) {
    return this.reviewsService.findOne(getReviewArgs.id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => Review)
  deleteReview(@Args('id', { type: () => ID }) id: number) {
    return this.reviewsService.remove(id);
  }
}
