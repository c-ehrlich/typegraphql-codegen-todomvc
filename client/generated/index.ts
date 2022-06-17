import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT as string, {
    method: "POST",
    ...({"credentials":"include","headers":{"Content-Type":"application/json;charset=UTF-8"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTodoInput = {
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Todo;
  updateTodo: Todo;
};


export type MutationAddTodoArgs = {
  input: CreateTodoInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  todo: Todo;
  todos: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  body: Scalars['String'];
  completed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type UpdateTodoInput = {
  body?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type CreateTodoMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'Todo', id: string, body: string, completed: boolean, updatedAt: string } };

export type UpdateTodoMutationVariables = Exact<{
  input: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, body: string, completed: boolean, updatedAt: string } };

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, body: string, completed: boolean, updatedAt: string }> };

export type GetTodoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTodoQuery = { __typename?: 'Query', todo: { __typename?: 'Todo', id: string, body: string, completed: boolean, updatedAt: string } };


export const CreateTodoDocument = `
    mutation CreateTodo($input: CreateTodoInput!) {
  addTodo(input: $input) {
    id
    body
    completed
    updatedAt
  }
}
    `;
export const useCreateTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTodoMutation, TError, CreateTodoMutationVariables, TContext>) =>
    useMutation<CreateTodoMutation, TError, CreateTodoMutationVariables, TContext>(
      ['CreateTodo'],
      (variables?: CreateTodoMutationVariables) => fetcher<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, variables)(),
      options
    );
export const UpdateTodoDocument = `
    mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    body
    completed
    updatedAt
  }
}
    `;
export const useUpdateTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>) =>
    useMutation<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>(
      ['UpdateTodo'],
      (variables?: UpdateTodoMutationVariables) => fetcher<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, variables)(),
      options
    );
export const GetAllTodosDocument = `
    query GetAllTodos {
  todos {
    id
    body
    completed
    updatedAt
  }
}
    `;
export const useGetAllTodosQuery = <
      TData = GetAllTodosQuery,
      TError = unknown
    >(
      variables?: GetAllTodosQueryVariables,
      options?: UseQueryOptions<GetAllTodosQuery, TError, TData>
    ) =>
    useQuery<GetAllTodosQuery, TError, TData>(
      variables === undefined ? ['GetAllTodos'] : ['GetAllTodos', variables],
      fetcher<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, variables),
      options
    );
export const GetTodoDocument = `
    query GetTodo($id: String!) {
  todo(id: $id) {
    id
    body
    completed
    updatedAt
  }
}
    `;
export const useGetTodoQuery = <
      TData = GetTodoQuery,
      TError = unknown
    >(
      variables: GetTodoQueryVariables,
      options?: UseQueryOptions<GetTodoQuery, TError, TData>
    ) =>
    useQuery<GetTodoQuery, TError, TData>(
      ['GetTodo', variables],
      fetcher<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, variables),
      options
    );