export interface ApolloContext {
  user: globalThis.Express.User
}

export type Resolver<T, Args> = (parent: any, args: Args, contextValue: ApolloContext) => T | Promise<T>;