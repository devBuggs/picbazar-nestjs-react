import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('AbusiveReportInputType', { isAbstract: true })
@ObjectType()
export class AbusiveReport extends CoreEntity {
  user_id?: number;
  user: User;
  @Field(() => ID)
  model_id?: number;
  model_type: string;
  message: string;
}
