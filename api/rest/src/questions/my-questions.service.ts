import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Question } from './entities/question.entity';
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import questionsJSON from '@db/questions.json';

const myQuestions = plainToClass(Question, questionsJSON);
const options = {
  keys: ['answer'],
  threshold: 0.3,
};
const fuse = new Fuse(myQuestions, options);

@Injectable()
export class MyQuestionsService {
  private myQuestion: Question[] = myQuestions;

  findMyQuestions({ limit, page, search, answer }: GetQuestionDto) {
    if (!page) page = 1;
    if (!limit) limit = 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Question[] = this.myQuestion;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    // const url = `/my-questions?search=${search}&answer=${answer}&limit=${limit}`;
    const url = `/my-questions?with=user&orderBy=created_at&sortedBy=desc`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findMyQuestion(id: number) {
    return this.myQuestion.find((p) => p.id === id);
  }

  create(createQuestionDto: CreateQuestionDto) {
    return this.myQuestion[0];
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.myQuestion[0];
  }

  delete(id: number) {
    return this.myQuestion[0];
  }
}
