import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import reviewsJson from './reviews.json';
import { GetReviewsArgs } from './dto/get-reviews.args';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { GetMyReportsArgs } from './dto/get-my-reports.args';
import { CreateAbusiveReportInput } from './dto/create-abusive-report.input';

const reviews = plainToClass(Review, reviewsJson);
const options = {
  keys: ['product_id'],
  threshold: 0.3,
};
const fuse = new Fuse(reviews, options);

@Injectable()
export class ReviewsService {
  private reviews: Review[] = reviews;

  create(createReviewInput: CreateReviewInput) {
    const newReview = {
      id: this.reviews.length + 1,
      ...createReviewInput,
      created_at: new Date(),
      updated_at: new Date(),
      user: this.reviews[0].user,
    };
    // TODO: Fix it
    // @ts-ignore
    this.reviews.push(newReview);
    return newReview;
  }

  findAll({ page, first, product_id }: GetReviewsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Review[] = this.reviews;

    if (product_id) {
      data = data.filter((p) => p.product_id === Number(product_id));
    }

    const results = data.slice(startIndex, endIndex);

    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  findOne(id: number) {
    return this.reviews.find((review) => review.id === Number(id));
  }

  update(id: number, updateReviewInput: UpdateReviewInput) {
    return this.reviews[0];
  }

  remove(id: number) {
    return this.reviews[0];
  }

  myReports({ page, first }: GetMyReportsArgs) {
    return {
      data: [],
      paginatorInfo: paginate(0, page, first, 0),
    };
  }

  createAbusiveReport({
    message,
    model_id,
    model_type,
  }: CreateAbusiveReportInput) {
    return {
      created_at: new Date(),
      id: 1,
      message,
      model_id,
      model_type: `Marvel\\Database\\Models\\${model_type}`,
      updated_at: new Date(),
      user_id: 3,
    };
  }
}
