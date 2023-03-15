import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto, ReviewPaginator } from './dto/get-reviews.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './reviews.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //   find all reviews
  // TODO: there is a bug in displaying all reviews
  // front-end a issue ase with pobon paul
  // In product single page front-end all the reviews apperaed. It should be based on product ID.
  @Get()
  async findAll(@Query() query: GetReviewsDto) {
    return this.reviewService.findAllReviews(query);
  }

  //   find one review by ID
  @Get(':id')
  find(@Param('id') id: string) {
    return this.reviewService.findReview(+id);
  }

  //  create a new review
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  // delete a review
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(+id);
  }
}
