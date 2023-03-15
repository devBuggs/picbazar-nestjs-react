import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import questionsJson from './questions.json';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { GetQuestionsArgs } from './dto/get-questions.args';
import { UpdateQuestionInput } from './dto/update-question.input';
import { GetMyQuestionsArgs } from './dto/get-my-questions.args';
import { GetAllQuestionsArgs } from './dto/get-all-questions.args';

const questions = plainToClass(Question, questionsJson);
const options = {
  keys: [],
  threshold: 0.3,
};
const fuse = new Fuse(questions, options);

@Injectable()
export class QuestionsService {
  private questions: Question[] = questions;

  create(createQuestionInput: CreateQuestionInput) {
    const newQuestion = {
      id: this.questions.length + 1,
      ...createQuestionInput,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // TODO: Fix it
    // @ts-ignore
    this.questions.push(newQuestion);
    return newQuestion;
  }

  findAll({ page, first, product_id }: GetQuestionsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Question[] = this.questions;

    if (product_id) {
      data = data.filter((p) => p.product_id === Number(product_id));
    }

    const results = data.slice(startIndex, endIndex);

    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }
  
  // findAllQuestion({ page, first, product_id }: GetAllQuestionsArgs) {
  //   const startIndex = (page - 1) * first;
  //   const endIndex = page * first;
  //   let data: Question[] = this.questions;

  //   if (product_id) {
  //     data = data.filter((p) => p.product_id === Number(product_id));
  //   }

  //   const results = data.slice(startIndex, endIndex);

  //   return {
  //     data: results,
  //     paginatorInfo: paginate(data.length, page, first, results.length),
  //   };
  // }

  findOne(id: number) {
    return this.questions.find((question) => question.id === Number(id));
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = this.questions.find((q) => q.id === Number(id));

    if (!question) {
      throw new NotFoundException();
    }

    question.answer = updateQuestionInput?.answer;

    return question;
  }

  getMyQuestions({ page, first }: GetMyQuestionsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    const data: Question[] = this.questions.slice(1, 15);
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  remove(id: number) {
    return this.questions[0];
  }
}
