import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShopInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  logo?: string;
}
