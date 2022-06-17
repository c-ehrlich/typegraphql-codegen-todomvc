import { Length } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateTodoInput {
  @Length(1, 1000)
  @Field(() => String, { nullable: false })
  body: string;
}

@InputType()
export class UpdateTodoInput {
  @Field(() => ID, { nullable: false })
  id: string;

  @Length(1, 1000)
  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => Boolean, { nullable: true })
  completed: boolean;
}

@ObjectType()
export class Todo {
  @Field(() => ID, { nullable: false })
  id: string;
  
  @Field(() => String, { nullable: false })
  body: string;

  @Field(() => Boolean, { nullable: false })
  completed: boolean;

  @Field(() => String, { nullable: false })
  createdAt: string;

  @Field(() => String, { nullable: false })
  updatedAt: string;
}
