import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAuth {
  @Field(() => String)
  token: string;

  @Field(() => Date)
  expireTime: Date;
}
