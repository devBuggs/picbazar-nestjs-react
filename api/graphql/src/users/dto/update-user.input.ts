import { RegisterInput } from './create-user.input';
import { InputType, Field, PartialType, ID, PickType, ObjectType } from '@nestjs/graphql';
import { UserAddressInput } from '../../orders/dto/create-order.input';
import { AddressType } from '../../addresses/entities/address.entity';
import { Profile, Social } from '../entities/profile.entity';
import { Attachment } from 'src/common/entities/attachment.entity';

@InputType()
export class UpdateUserInput extends PartialType(RegisterInput) {
  @Field(() => ID)
  id: number;
  name?: string;
  profile?: ProfileHasOne;
  address?: AddressHasMany;
}

@InputType()
class AddressHasMany {
  @Field(() => [UserAddressUpsertInput], { nullable: 'itemsAndList' })
  upsert?: UserAddressUpsertInput[];
}

@InputType()
class UserAddressUpsertInput {
  @Field(() => ID, { nullable: true })
  id?: number;
  title: string;
  default?: boolean;
  address: UserAddressInput;
  type: AddressType;
}

@InputType()
class UserProfileInput {
  @Field(() => ID, { nullable: true })
  id: number;
  avatar: Attachment;
  bio?: string;
  socials?: Social[];
  contact?: string;
}
@InputType()
class ProfileHasOne {
  @Field(() => UserProfileInput, { nullable: true })
  upsert: UserProfileInput;
}


