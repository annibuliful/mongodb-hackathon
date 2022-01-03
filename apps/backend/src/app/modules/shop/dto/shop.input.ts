import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShopInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  logo?: string;
}

@InputType()
export class UpdateShopInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  logo?: string;
}
