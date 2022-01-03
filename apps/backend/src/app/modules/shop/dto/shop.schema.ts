import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Shop {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String, { nullable: true })
  logo: string;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
