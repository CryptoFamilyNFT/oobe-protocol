
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AgentPersona
 * 
 */
export type AgentPersona = $Result.DefaultSelection<Prisma.$AgentPersonaPayload>
/**
 * Model ProofOfAction
 * 
 */
export type ProofOfAction = $Result.DefaultSelection<Prisma.$ProofOfActionPayload>
/**
 * Model ProofOfEvidence
 * 
 */
export type ProofOfEvidence = $Result.DefaultSelection<Prisma.$ProofOfEvidencePayload>
/**
 * Model ProofOfEvolution
 * 
 */
export type ProofOfEvolution = $Result.DefaultSelection<Prisma.$ProofOfEvolutionPayload>
/**
 * Model MemorySnapshot
 * 
 */
export type MemorySnapshot = $Result.DefaultSelection<Prisma.$MemorySnapshotPayload>
/**
 * Model SolanaTransaction
 * 
 */
export type SolanaTransaction = $Result.DefaultSelection<Prisma.$SolanaTransactionPayload>
/**
 * Model TokenMetadata
 * 
 */
export type TokenMetadata = $Result.DefaultSelection<Prisma.$TokenMetadataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AgentPersonas
 * const agentPersonas = await prisma.agentPersona.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AgentPersonas
   * const agentPersonas = await prisma.agentPersona.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agentPersona`: Exposes CRUD operations for the **AgentPersona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentPersonas
    * const agentPersonas = await prisma.agentPersona.findMany()
    * ```
    */
  get agentPersona(): Prisma.AgentPersonaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proofOfAction`: Exposes CRUD operations for the **ProofOfAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProofOfActions
    * const proofOfActions = await prisma.proofOfAction.findMany()
    * ```
    */
  get proofOfAction(): Prisma.ProofOfActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proofOfEvidence`: Exposes CRUD operations for the **ProofOfEvidence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProofOfEvidences
    * const proofOfEvidences = await prisma.proofOfEvidence.findMany()
    * ```
    */
  get proofOfEvidence(): Prisma.ProofOfEvidenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proofOfEvolution`: Exposes CRUD operations for the **ProofOfEvolution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProofOfEvolutions
    * const proofOfEvolutions = await prisma.proofOfEvolution.findMany()
    * ```
    */
  get proofOfEvolution(): Prisma.ProofOfEvolutionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memorySnapshot`: Exposes CRUD operations for the **MemorySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemorySnapshots
    * const memorySnapshots = await prisma.memorySnapshot.findMany()
    * ```
    */
  get memorySnapshot(): Prisma.MemorySnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.solanaTransaction`: Exposes CRUD operations for the **SolanaTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SolanaTransactions
    * const solanaTransactions = await prisma.solanaTransaction.findMany()
    * ```
    */
  get solanaTransaction(): Prisma.SolanaTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenMetadata`: Exposes CRUD operations for the **TokenMetadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenMetadata
    * const tokenMetadata = await prisma.tokenMetadata.findMany()
    * ```
    */
  get tokenMetadata(): Prisma.TokenMetadataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AgentPersona: 'AgentPersona',
    ProofOfAction: 'ProofOfAction',
    ProofOfEvidence: 'ProofOfEvidence',
    ProofOfEvolution: 'ProofOfEvolution',
    MemorySnapshot: 'MemorySnapshot',
    SolanaTransaction: 'SolanaTransaction',
    TokenMetadata: 'TokenMetadata'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agentPersona" | "proofOfAction" | "proofOfEvidence" | "proofOfEvolution" | "memorySnapshot" | "solanaTransaction" | "tokenMetadata"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AgentPersona: {
        payload: Prisma.$AgentPersonaPayload<ExtArgs>
        fields: Prisma.AgentPersonaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentPersonaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentPersonaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          findFirst: {
            args: Prisma.AgentPersonaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentPersonaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          findMany: {
            args: Prisma.AgentPersonaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          create: {
            args: Prisma.AgentPersonaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          createMany: {
            args: Prisma.AgentPersonaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentPersonaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          delete: {
            args: Prisma.AgentPersonaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          update: {
            args: Prisma.AgentPersonaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          deleteMany: {
            args: Prisma.AgentPersonaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentPersonaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentPersonaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          upsert: {
            args: Prisma.AgentPersonaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          aggregate: {
            args: Prisma.AgentPersonaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentPersona>
          }
          groupBy: {
            args: Prisma.AgentPersonaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentPersonaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentPersonaCountArgs<ExtArgs>
            result: $Utils.Optional<AgentPersonaCountAggregateOutputType> | number
          }
        }
      }
      ProofOfAction: {
        payload: Prisma.$ProofOfActionPayload<ExtArgs>
        fields: Prisma.ProofOfActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProofOfActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProofOfActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          findFirst: {
            args: Prisma.ProofOfActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProofOfActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          findMany: {
            args: Prisma.ProofOfActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>[]
          }
          create: {
            args: Prisma.ProofOfActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          createMany: {
            args: Prisma.ProofOfActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProofOfActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>[]
          }
          delete: {
            args: Prisma.ProofOfActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          update: {
            args: Prisma.ProofOfActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          deleteMany: {
            args: Prisma.ProofOfActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProofOfActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProofOfActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>[]
          }
          upsert: {
            args: Prisma.ProofOfActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfActionPayload>
          }
          aggregate: {
            args: Prisma.ProofOfActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProofOfAction>
          }
          groupBy: {
            args: Prisma.ProofOfActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProofOfActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProofOfActionCountArgs<ExtArgs>
            result: $Utils.Optional<ProofOfActionCountAggregateOutputType> | number
          }
        }
      }
      ProofOfEvidence: {
        payload: Prisma.$ProofOfEvidencePayload<ExtArgs>
        fields: Prisma.ProofOfEvidenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProofOfEvidenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProofOfEvidenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          findFirst: {
            args: Prisma.ProofOfEvidenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProofOfEvidenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          findMany: {
            args: Prisma.ProofOfEvidenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>[]
          }
          create: {
            args: Prisma.ProofOfEvidenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          createMany: {
            args: Prisma.ProofOfEvidenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProofOfEvidenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>[]
          }
          delete: {
            args: Prisma.ProofOfEvidenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          update: {
            args: Prisma.ProofOfEvidenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          deleteMany: {
            args: Prisma.ProofOfEvidenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProofOfEvidenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProofOfEvidenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>[]
          }
          upsert: {
            args: Prisma.ProofOfEvidenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvidencePayload>
          }
          aggregate: {
            args: Prisma.ProofOfEvidenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProofOfEvidence>
          }
          groupBy: {
            args: Prisma.ProofOfEvidenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProofOfEvidenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProofOfEvidenceCountArgs<ExtArgs>
            result: $Utils.Optional<ProofOfEvidenceCountAggregateOutputType> | number
          }
        }
      }
      ProofOfEvolution: {
        payload: Prisma.$ProofOfEvolutionPayload<ExtArgs>
        fields: Prisma.ProofOfEvolutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProofOfEvolutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProofOfEvolutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          findFirst: {
            args: Prisma.ProofOfEvolutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProofOfEvolutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          findMany: {
            args: Prisma.ProofOfEvolutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>[]
          }
          create: {
            args: Prisma.ProofOfEvolutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          createMany: {
            args: Prisma.ProofOfEvolutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProofOfEvolutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>[]
          }
          delete: {
            args: Prisma.ProofOfEvolutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          update: {
            args: Prisma.ProofOfEvolutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          deleteMany: {
            args: Prisma.ProofOfEvolutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProofOfEvolutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProofOfEvolutionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>[]
          }
          upsert: {
            args: Prisma.ProofOfEvolutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofOfEvolutionPayload>
          }
          aggregate: {
            args: Prisma.ProofOfEvolutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProofOfEvolution>
          }
          groupBy: {
            args: Prisma.ProofOfEvolutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProofOfEvolutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProofOfEvolutionCountArgs<ExtArgs>
            result: $Utils.Optional<ProofOfEvolutionCountAggregateOutputType> | number
          }
        }
      }
      MemorySnapshot: {
        payload: Prisma.$MemorySnapshotPayload<ExtArgs>
        fields: Prisma.MemorySnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemorySnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemorySnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          findFirst: {
            args: Prisma.MemorySnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemorySnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          findMany: {
            args: Prisma.MemorySnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>[]
          }
          create: {
            args: Prisma.MemorySnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          createMany: {
            args: Prisma.MemorySnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemorySnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>[]
          }
          delete: {
            args: Prisma.MemorySnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          update: {
            args: Prisma.MemorySnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MemorySnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemorySnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemorySnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>[]
          }
          upsert: {
            args: Prisma.MemorySnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemorySnapshotPayload>
          }
          aggregate: {
            args: Prisma.MemorySnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemorySnapshot>
          }
          groupBy: {
            args: Prisma.MemorySnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemorySnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemorySnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MemorySnapshotCountAggregateOutputType> | number
          }
        }
      }
      SolanaTransaction: {
        payload: Prisma.$SolanaTransactionPayload<ExtArgs>
        fields: Prisma.SolanaTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SolanaTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SolanaTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          findFirst: {
            args: Prisma.SolanaTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SolanaTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          findMany: {
            args: Prisma.SolanaTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>[]
          }
          create: {
            args: Prisma.SolanaTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          createMany: {
            args: Prisma.SolanaTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SolanaTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>[]
          }
          delete: {
            args: Prisma.SolanaTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          update: {
            args: Prisma.SolanaTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          deleteMany: {
            args: Prisma.SolanaTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SolanaTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SolanaTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>[]
          }
          upsert: {
            args: Prisma.SolanaTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolanaTransactionPayload>
          }
          aggregate: {
            args: Prisma.SolanaTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSolanaTransaction>
          }
          groupBy: {
            args: Prisma.SolanaTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SolanaTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SolanaTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<SolanaTransactionCountAggregateOutputType> | number
          }
        }
      }
      TokenMetadata: {
        payload: Prisma.$TokenMetadataPayload<ExtArgs>
        fields: Prisma.TokenMetadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenMetadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenMetadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          findFirst: {
            args: Prisma.TokenMetadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenMetadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          findMany: {
            args: Prisma.TokenMetadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>[]
          }
          create: {
            args: Prisma.TokenMetadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          createMany: {
            args: Prisma.TokenMetadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenMetadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>[]
          }
          delete: {
            args: Prisma.TokenMetadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          update: {
            args: Prisma.TokenMetadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          deleteMany: {
            args: Prisma.TokenMetadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenMetadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenMetadataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>[]
          }
          upsert: {
            args: Prisma.TokenMetadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenMetadataPayload>
          }
          aggregate: {
            args: Prisma.TokenMetadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenMetadata>
          }
          groupBy: {
            args: Prisma.TokenMetadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenMetadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenMetadataCountArgs<ExtArgs>
            result: $Utils.Optional<TokenMetadataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agentPersona?: AgentPersonaOmit
    proofOfAction?: ProofOfActionOmit
    proofOfEvidence?: ProofOfEvidenceOmit
    proofOfEvolution?: ProofOfEvolutionOmit
    memorySnapshot?: MemorySnapshotOmit
    solanaTransaction?: SolanaTransactionOmit
    tokenMetadata?: TokenMetadataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentPersonaCountOutputType
   */

  export type AgentPersonaCountOutputType = {
    proofsOfAction: number
    proofsOfEvidence: number
    proofsOfEvolution: number
    memorySnapshots: number
  }

  export type AgentPersonaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proofsOfAction?: boolean | AgentPersonaCountOutputTypeCountProofsOfActionArgs
    proofsOfEvidence?: boolean | AgentPersonaCountOutputTypeCountProofsOfEvidenceArgs
    proofsOfEvolution?: boolean | AgentPersonaCountOutputTypeCountProofsOfEvolutionArgs
    memorySnapshots?: boolean | AgentPersonaCountOutputTypeCountMemorySnapshotsArgs
  }

  // Custom InputTypes
  /**
   * AgentPersonaCountOutputType without action
   */
  export type AgentPersonaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersonaCountOutputType
     */
    select?: AgentPersonaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentPersonaCountOutputType without action
   */
  export type AgentPersonaCountOutputTypeCountProofsOfActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfActionWhereInput
  }

  /**
   * AgentPersonaCountOutputType without action
   */
  export type AgentPersonaCountOutputTypeCountProofsOfEvidenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfEvidenceWhereInput
  }

  /**
   * AgentPersonaCountOutputType without action
   */
  export type AgentPersonaCountOutputTypeCountProofsOfEvolutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfEvolutionWhereInput
  }

  /**
   * AgentPersonaCountOutputType without action
   */
  export type AgentPersonaCountOutputTypeCountMemorySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemorySnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AgentPersona
   */

  export type AggregateAgentPersona = {
    _count: AgentPersonaCountAggregateOutputType | null
    _avg: AgentPersonaAvgAggregateOutputType | null
    _sum: AgentPersonaSumAggregateOutputType | null
    _min: AgentPersonaMinAggregateOutputType | null
    _max: AgentPersonaMaxAggregateOutputType | null
  }

  export type AgentPersonaAvgAggregateOutputType = {
    evolutionLevel: number | null
    experiencePoints: number | null
  }

  export type AgentPersonaSumAggregateOutputType = {
    evolutionLevel: number | null
    experiencePoints: number | null
  }

  export type AgentPersonaMinAggregateOutputType = {
    id: string | null
    name: string | null
    walletAddress: string | null
    description: string | null
    avatar: string | null
    merkleRoot: string | null
    evolutionLevel: number | null
    experiencePoints: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentPersonaMaxAggregateOutputType = {
    id: string | null
    name: string | null
    walletAddress: string | null
    description: string | null
    avatar: string | null
    merkleRoot: string | null
    evolutionLevel: number | null
    experiencePoints: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentPersonaCountAggregateOutputType = {
    id: number
    name: number
    walletAddress: number
    description: number
    personality: number
    traits: number
    avatar: number
    merkleRoot: number
    evolutionLevel: number
    experiencePoints: number
    memoryData: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentPersonaAvgAggregateInputType = {
    evolutionLevel?: true
    experiencePoints?: true
  }

  export type AgentPersonaSumAggregateInputType = {
    evolutionLevel?: true
    experiencePoints?: true
  }

  export type AgentPersonaMinAggregateInputType = {
    id?: true
    name?: true
    walletAddress?: true
    description?: true
    avatar?: true
    merkleRoot?: true
    evolutionLevel?: true
    experiencePoints?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentPersonaMaxAggregateInputType = {
    id?: true
    name?: true
    walletAddress?: true
    description?: true
    avatar?: true
    merkleRoot?: true
    evolutionLevel?: true
    experiencePoints?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentPersonaCountAggregateInputType = {
    id?: true
    name?: true
    walletAddress?: true
    description?: true
    personality?: true
    traits?: true
    avatar?: true
    merkleRoot?: true
    evolutionLevel?: true
    experiencePoints?: true
    memoryData?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentPersonaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentPersona to aggregate.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentPersonas
    **/
    _count?: true | AgentPersonaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentPersonaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentPersonaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentPersonaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentPersonaMaxAggregateInputType
  }

  export type GetAgentPersonaAggregateType<T extends AgentPersonaAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentPersona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentPersona[P]>
      : GetScalarType<T[P], AggregateAgentPersona[P]>
  }




  export type AgentPersonaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentPersonaWhereInput
    orderBy?: AgentPersonaOrderByWithAggregationInput | AgentPersonaOrderByWithAggregationInput[]
    by: AgentPersonaScalarFieldEnum[] | AgentPersonaScalarFieldEnum
    having?: AgentPersonaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentPersonaCountAggregateInputType | true
    _avg?: AgentPersonaAvgAggregateInputType
    _sum?: AgentPersonaSumAggregateInputType
    _min?: AgentPersonaMinAggregateInputType
    _max?: AgentPersonaMaxAggregateInputType
  }

  export type AgentPersonaGroupByOutputType = {
    id: string
    name: string
    walletAddress: string | null
    description: string | null
    personality: JsonValue | null
    traits: JsonValue | null
    avatar: string | null
    merkleRoot: string | null
    evolutionLevel: number
    experiencePoints: number
    memoryData: JsonValue | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AgentPersonaCountAggregateOutputType | null
    _avg: AgentPersonaAvgAggregateOutputType | null
    _sum: AgentPersonaSumAggregateOutputType | null
    _min: AgentPersonaMinAggregateOutputType | null
    _max: AgentPersonaMaxAggregateOutputType | null
  }

  type GetAgentPersonaGroupByPayload<T extends AgentPersonaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentPersonaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentPersonaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentPersonaGroupByOutputType[P]>
            : GetScalarType<T[P], AgentPersonaGroupByOutputType[P]>
        }
      >
    >


  export type AgentPersonaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    walletAddress?: boolean
    description?: boolean
    personality?: boolean
    traits?: boolean
    avatar?: boolean
    merkleRoot?: boolean
    evolutionLevel?: boolean
    experiencePoints?: boolean
    memoryData?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proofsOfAction?: boolean | AgentPersona$proofsOfActionArgs<ExtArgs>
    proofsOfEvidence?: boolean | AgentPersona$proofsOfEvidenceArgs<ExtArgs>
    proofsOfEvolution?: boolean | AgentPersona$proofsOfEvolutionArgs<ExtArgs>
    memorySnapshots?: boolean | AgentPersona$memorySnapshotsArgs<ExtArgs>
    _count?: boolean | AgentPersonaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    walletAddress?: boolean
    description?: boolean
    personality?: boolean
    traits?: boolean
    avatar?: boolean
    merkleRoot?: boolean
    evolutionLevel?: boolean
    experiencePoints?: boolean
    memoryData?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    walletAddress?: boolean
    description?: boolean
    personality?: boolean
    traits?: boolean
    avatar?: boolean
    merkleRoot?: boolean
    evolutionLevel?: boolean
    experiencePoints?: boolean
    memoryData?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectScalar = {
    id?: boolean
    name?: boolean
    walletAddress?: boolean
    description?: boolean
    personality?: boolean
    traits?: boolean
    avatar?: boolean
    merkleRoot?: boolean
    evolutionLevel?: boolean
    experiencePoints?: boolean
    memoryData?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentPersonaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "walletAddress" | "description" | "personality" | "traits" | "avatar" | "merkleRoot" | "evolutionLevel" | "experiencePoints" | "memoryData" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["agentPersona"]>
  export type AgentPersonaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proofsOfAction?: boolean | AgentPersona$proofsOfActionArgs<ExtArgs>
    proofsOfEvidence?: boolean | AgentPersona$proofsOfEvidenceArgs<ExtArgs>
    proofsOfEvolution?: boolean | AgentPersona$proofsOfEvolutionArgs<ExtArgs>
    memorySnapshots?: boolean | AgentPersona$memorySnapshotsArgs<ExtArgs>
    _count?: boolean | AgentPersonaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentPersonaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgentPersonaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPersonaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentPersona"
    objects: {
      proofsOfAction: Prisma.$ProofOfActionPayload<ExtArgs>[]
      proofsOfEvidence: Prisma.$ProofOfEvidencePayload<ExtArgs>[]
      proofsOfEvolution: Prisma.$ProofOfEvolutionPayload<ExtArgs>[]
      memorySnapshots: Prisma.$MemorySnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      walletAddress: string | null
      description: string | null
      personality: Prisma.JsonValue | null
      traits: Prisma.JsonValue | null
      avatar: string | null
      merkleRoot: string | null
      evolutionLevel: number
      experiencePoints: number
      memoryData: Prisma.JsonValue | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agentPersona"]>
    composites: {}
  }

  type AgentPersonaGetPayload<S extends boolean | null | undefined | AgentPersonaDefaultArgs> = $Result.GetResult<Prisma.$AgentPersonaPayload, S>

  type AgentPersonaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentPersonaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentPersonaCountAggregateInputType | true
    }

  export interface AgentPersonaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentPersona'], meta: { name: 'AgentPersona' } }
    /**
     * Find zero or one AgentPersona that matches the filter.
     * @param {AgentPersonaFindUniqueArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentPersonaFindUniqueArgs>(args: SelectSubset<T, AgentPersonaFindUniqueArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentPersona that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentPersonaFindUniqueOrThrowArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentPersonaFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentPersonaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentPersona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindFirstArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentPersonaFindFirstArgs>(args?: SelectSubset<T, AgentPersonaFindFirstArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentPersona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindFirstOrThrowArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentPersonaFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentPersonaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentPersonas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentPersonas
     * const agentPersonas = await prisma.agentPersona.findMany()
     * 
     * // Get first 10 AgentPersonas
     * const agentPersonas = await prisma.agentPersona.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentPersonaFindManyArgs>(args?: SelectSubset<T, AgentPersonaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentPersona.
     * @param {AgentPersonaCreateArgs} args - Arguments to create a AgentPersona.
     * @example
     * // Create one AgentPersona
     * const AgentPersona = await prisma.agentPersona.create({
     *   data: {
     *     // ... data to create a AgentPersona
     *   }
     * })
     * 
     */
    create<T extends AgentPersonaCreateArgs>(args: SelectSubset<T, AgentPersonaCreateArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentPersonas.
     * @param {AgentPersonaCreateManyArgs} args - Arguments to create many AgentPersonas.
     * @example
     * // Create many AgentPersonas
     * const agentPersona = await prisma.agentPersona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentPersonaCreateManyArgs>(args?: SelectSubset<T, AgentPersonaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentPersonas and returns the data saved in the database.
     * @param {AgentPersonaCreateManyAndReturnArgs} args - Arguments to create many AgentPersonas.
     * @example
     * // Create many AgentPersonas
     * const agentPersona = await prisma.agentPersona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentPersonas and only return the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentPersonaCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentPersonaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentPersona.
     * @param {AgentPersonaDeleteArgs} args - Arguments to delete one AgentPersona.
     * @example
     * // Delete one AgentPersona
     * const AgentPersona = await prisma.agentPersona.delete({
     *   where: {
     *     // ... filter to delete one AgentPersona
     *   }
     * })
     * 
     */
    delete<T extends AgentPersonaDeleteArgs>(args: SelectSubset<T, AgentPersonaDeleteArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentPersona.
     * @param {AgentPersonaUpdateArgs} args - Arguments to update one AgentPersona.
     * @example
     * // Update one AgentPersona
     * const agentPersona = await prisma.agentPersona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentPersonaUpdateArgs>(args: SelectSubset<T, AgentPersonaUpdateArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentPersonas.
     * @param {AgentPersonaDeleteManyArgs} args - Arguments to filter AgentPersonas to delete.
     * @example
     * // Delete a few AgentPersonas
     * const { count } = await prisma.agentPersona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentPersonaDeleteManyArgs>(args?: SelectSubset<T, AgentPersonaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentPersonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentPersonas
     * const agentPersona = await prisma.agentPersona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentPersonaUpdateManyArgs>(args: SelectSubset<T, AgentPersonaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentPersonas and returns the data updated in the database.
     * @param {AgentPersonaUpdateManyAndReturnArgs} args - Arguments to update many AgentPersonas.
     * @example
     * // Update many AgentPersonas
     * const agentPersona = await prisma.agentPersona.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentPersonas and only return the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentPersonaUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentPersonaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentPersona.
     * @param {AgentPersonaUpsertArgs} args - Arguments to update or create a AgentPersona.
     * @example
     * // Update or create a AgentPersona
     * const agentPersona = await prisma.agentPersona.upsert({
     *   create: {
     *     // ... data to create a AgentPersona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentPersona we want to update
     *   }
     * })
     */
    upsert<T extends AgentPersonaUpsertArgs>(args: SelectSubset<T, AgentPersonaUpsertArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentPersonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaCountArgs} args - Arguments to filter AgentPersonas to count.
     * @example
     * // Count the number of AgentPersonas
     * const count = await prisma.agentPersona.count({
     *   where: {
     *     // ... the filter for the AgentPersonas we want to count
     *   }
     * })
    **/
    count<T extends AgentPersonaCountArgs>(
      args?: Subset<T, AgentPersonaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentPersonaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentPersona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentPersonaAggregateArgs>(args: Subset<T, AgentPersonaAggregateArgs>): Prisma.PrismaPromise<GetAgentPersonaAggregateType<T>>

    /**
     * Group by AgentPersona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentPersonaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentPersonaGroupByArgs['orderBy'] }
        : { orderBy?: AgentPersonaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentPersonaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentPersonaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentPersona model
   */
  readonly fields: AgentPersonaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentPersona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentPersonaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proofsOfAction<T extends AgentPersona$proofsOfActionArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersona$proofsOfActionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proofsOfEvidence<T extends AgentPersona$proofsOfEvidenceArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersona$proofsOfEvidenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proofsOfEvolution<T extends AgentPersona$proofsOfEvolutionArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersona$proofsOfEvolutionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memorySnapshots<T extends AgentPersona$memorySnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersona$memorySnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentPersona model
   */
  interface AgentPersonaFieldRefs {
    readonly id: FieldRef<"AgentPersona", 'String'>
    readonly name: FieldRef<"AgentPersona", 'String'>
    readonly walletAddress: FieldRef<"AgentPersona", 'String'>
    readonly description: FieldRef<"AgentPersona", 'String'>
    readonly personality: FieldRef<"AgentPersona", 'Json'>
    readonly traits: FieldRef<"AgentPersona", 'Json'>
    readonly avatar: FieldRef<"AgentPersona", 'String'>
    readonly merkleRoot: FieldRef<"AgentPersona", 'String'>
    readonly evolutionLevel: FieldRef<"AgentPersona", 'Int'>
    readonly experiencePoints: FieldRef<"AgentPersona", 'Float'>
    readonly memoryData: FieldRef<"AgentPersona", 'Json'>
    readonly isActive: FieldRef<"AgentPersona", 'Boolean'>
    readonly createdAt: FieldRef<"AgentPersona", 'DateTime'>
    readonly updatedAt: FieldRef<"AgentPersona", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentPersona findUnique
   */
  export type AgentPersonaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona findUniqueOrThrow
   */
  export type AgentPersonaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona findFirst
   */
  export type AgentPersonaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentPersonas.
     */
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona findFirstOrThrow
   */
  export type AgentPersonaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentPersonas.
     */
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona findMany
   */
  export type AgentPersonaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersonas to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona create
   */
  export type AgentPersonaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentPersona.
     */
    data: XOR<AgentPersonaCreateInput, AgentPersonaUncheckedCreateInput>
  }

  /**
   * AgentPersona createMany
   */
  export type AgentPersonaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentPersonas.
     */
    data: AgentPersonaCreateManyInput | AgentPersonaCreateManyInput[]
  }

  /**
   * AgentPersona createManyAndReturn
   */
  export type AgentPersonaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * The data used to create many AgentPersonas.
     */
    data: AgentPersonaCreateManyInput | AgentPersonaCreateManyInput[]
  }

  /**
   * AgentPersona update
   */
  export type AgentPersonaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentPersona.
     */
    data: XOR<AgentPersonaUpdateInput, AgentPersonaUncheckedUpdateInput>
    /**
     * Choose, which AgentPersona to update.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona updateMany
   */
  export type AgentPersonaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentPersonas.
     */
    data: XOR<AgentPersonaUpdateManyMutationInput, AgentPersonaUncheckedUpdateManyInput>
    /**
     * Filter which AgentPersonas to update
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to update.
     */
    limit?: number
  }

  /**
   * AgentPersona updateManyAndReturn
   */
  export type AgentPersonaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * The data used to update AgentPersonas.
     */
    data: XOR<AgentPersonaUpdateManyMutationInput, AgentPersonaUncheckedUpdateManyInput>
    /**
     * Filter which AgentPersonas to update
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to update.
     */
    limit?: number
  }

  /**
   * AgentPersona upsert
   */
  export type AgentPersonaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentPersona to update in case it exists.
     */
    where: AgentPersonaWhereUniqueInput
    /**
     * In case the AgentPersona found by the `where` argument doesn't exist, create a new AgentPersona with this data.
     */
    create: XOR<AgentPersonaCreateInput, AgentPersonaUncheckedCreateInput>
    /**
     * In case the AgentPersona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentPersonaUpdateInput, AgentPersonaUncheckedUpdateInput>
  }

  /**
   * AgentPersona delete
   */
  export type AgentPersonaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter which AgentPersona to delete.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona deleteMany
   */
  export type AgentPersonaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentPersonas to delete
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to delete.
     */
    limit?: number
  }

  /**
   * AgentPersona.proofsOfAction
   */
  export type AgentPersona$proofsOfActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    where?: ProofOfActionWhereInput
    orderBy?: ProofOfActionOrderByWithRelationInput | ProofOfActionOrderByWithRelationInput[]
    cursor?: ProofOfActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProofOfActionScalarFieldEnum | ProofOfActionScalarFieldEnum[]
  }

  /**
   * AgentPersona.proofsOfEvidence
   */
  export type AgentPersona$proofsOfEvidenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    where?: ProofOfEvidenceWhereInput
    orderBy?: ProofOfEvidenceOrderByWithRelationInput | ProofOfEvidenceOrderByWithRelationInput[]
    cursor?: ProofOfEvidenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProofOfEvidenceScalarFieldEnum | ProofOfEvidenceScalarFieldEnum[]
  }

  /**
   * AgentPersona.proofsOfEvolution
   */
  export type AgentPersona$proofsOfEvolutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    where?: ProofOfEvolutionWhereInput
    orderBy?: ProofOfEvolutionOrderByWithRelationInput | ProofOfEvolutionOrderByWithRelationInput[]
    cursor?: ProofOfEvolutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProofOfEvolutionScalarFieldEnum | ProofOfEvolutionScalarFieldEnum[]
  }

  /**
   * AgentPersona.memorySnapshots
   */
  export type AgentPersona$memorySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    where?: MemorySnapshotWhereInput
    orderBy?: MemorySnapshotOrderByWithRelationInput | MemorySnapshotOrderByWithRelationInput[]
    cursor?: MemorySnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemorySnapshotScalarFieldEnum | MemorySnapshotScalarFieldEnum[]
  }

  /**
   * AgentPersona without action
   */
  export type AgentPersonaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
  }


  /**
   * Model ProofOfAction
   */

  export type AggregateProofOfAction = {
    _count: ProofOfActionCountAggregateOutputType | null
    _avg: ProofOfActionAvgAggregateOutputType | null
    _sum: ProofOfActionSumAggregateOutputType | null
    _min: ProofOfActionMinAggregateOutputType | null
    _max: ProofOfActionMaxAggregateOutputType | null
  }

  export type ProofOfActionAvgAggregateOutputType = {
    amount: number | null
    gasUsed: number | null
  }

  export type ProofOfActionSumAggregateOutputType = {
    amount: number | null
    gasUsed: number | null
  }

  export type ProofOfActionMinAggregateOutputType = {
    id: string | null
    actionType: string | null
    actionData: string | null
    transactionHash: string | null
    blockNumber: string | null
    amount: number | null
    tokenAddress: string | null
    result: string | null
    isSuccessful: boolean | null
    gasUsed: number | null
    errorMessage: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfActionMaxAggregateOutputType = {
    id: string | null
    actionType: string | null
    actionData: string | null
    transactionHash: string | null
    blockNumber: string | null
    amount: number | null
    tokenAddress: string | null
    result: string | null
    isSuccessful: boolean | null
    gasUsed: number | null
    errorMessage: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfActionCountAggregateOutputType = {
    id: number
    actionType: number
    actionData: number
    actionParameters: number
    transactionHash: number
    blockNumber: number
    amount: number
    tokenAddress: number
    result: number
    isSuccessful: number
    gasUsed: number
    errorMessage: number
    createdAt: number
    personaId: number
    _all: number
  }


  export type ProofOfActionAvgAggregateInputType = {
    amount?: true
    gasUsed?: true
  }

  export type ProofOfActionSumAggregateInputType = {
    amount?: true
    gasUsed?: true
  }

  export type ProofOfActionMinAggregateInputType = {
    id?: true
    actionType?: true
    actionData?: true
    transactionHash?: true
    blockNumber?: true
    amount?: true
    tokenAddress?: true
    result?: true
    isSuccessful?: true
    gasUsed?: true
    errorMessage?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfActionMaxAggregateInputType = {
    id?: true
    actionType?: true
    actionData?: true
    transactionHash?: true
    blockNumber?: true
    amount?: true
    tokenAddress?: true
    result?: true
    isSuccessful?: true
    gasUsed?: true
    errorMessage?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfActionCountAggregateInputType = {
    id?: true
    actionType?: true
    actionData?: true
    actionParameters?: true
    transactionHash?: true
    blockNumber?: true
    amount?: true
    tokenAddress?: true
    result?: true
    isSuccessful?: true
    gasUsed?: true
    errorMessage?: true
    createdAt?: true
    personaId?: true
    _all?: true
  }

  export type ProofOfActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfAction to aggregate.
     */
    where?: ProofOfActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfActions to fetch.
     */
    orderBy?: ProofOfActionOrderByWithRelationInput | ProofOfActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProofOfActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProofOfActions
    **/
    _count?: true | ProofOfActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProofOfActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProofOfActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProofOfActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProofOfActionMaxAggregateInputType
  }

  export type GetProofOfActionAggregateType<T extends ProofOfActionAggregateArgs> = {
        [P in keyof T & keyof AggregateProofOfAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProofOfAction[P]>
      : GetScalarType<T[P], AggregateProofOfAction[P]>
  }




  export type ProofOfActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfActionWhereInput
    orderBy?: ProofOfActionOrderByWithAggregationInput | ProofOfActionOrderByWithAggregationInput[]
    by: ProofOfActionScalarFieldEnum[] | ProofOfActionScalarFieldEnum
    having?: ProofOfActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProofOfActionCountAggregateInputType | true
    _avg?: ProofOfActionAvgAggregateInputType
    _sum?: ProofOfActionSumAggregateInputType
    _min?: ProofOfActionMinAggregateInputType
    _max?: ProofOfActionMaxAggregateInputType
  }

  export type ProofOfActionGroupByOutputType = {
    id: string
    actionType: string
    actionData: string
    actionParameters: JsonValue | null
    transactionHash: string | null
    blockNumber: string | null
    amount: number | null
    tokenAddress: string | null
    result: string | null
    isSuccessful: boolean
    gasUsed: number | null
    errorMessage: string | null
    createdAt: Date
    personaId: string
    _count: ProofOfActionCountAggregateOutputType | null
    _avg: ProofOfActionAvgAggregateOutputType | null
    _sum: ProofOfActionSumAggregateOutputType | null
    _min: ProofOfActionMinAggregateOutputType | null
    _max: ProofOfActionMaxAggregateOutputType | null
  }

  type GetProofOfActionGroupByPayload<T extends ProofOfActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProofOfActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProofOfActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProofOfActionGroupByOutputType[P]>
            : GetScalarType<T[P], ProofOfActionGroupByOutputType[P]>
        }
      >
    >


  export type ProofOfActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actionType?: boolean
    actionData?: boolean
    actionParameters?: boolean
    transactionHash?: boolean
    blockNumber?: boolean
    amount?: boolean
    tokenAddress?: boolean
    result?: boolean
    isSuccessful?: boolean
    gasUsed?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfAction"]>

  export type ProofOfActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actionType?: boolean
    actionData?: boolean
    actionParameters?: boolean
    transactionHash?: boolean
    blockNumber?: boolean
    amount?: boolean
    tokenAddress?: boolean
    result?: boolean
    isSuccessful?: boolean
    gasUsed?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfAction"]>

  export type ProofOfActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actionType?: boolean
    actionData?: boolean
    actionParameters?: boolean
    transactionHash?: boolean
    blockNumber?: boolean
    amount?: boolean
    tokenAddress?: boolean
    result?: boolean
    isSuccessful?: boolean
    gasUsed?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfAction"]>

  export type ProofOfActionSelectScalar = {
    id?: boolean
    actionType?: boolean
    actionData?: boolean
    actionParameters?: boolean
    transactionHash?: boolean
    blockNumber?: boolean
    amount?: boolean
    tokenAddress?: boolean
    result?: boolean
    isSuccessful?: boolean
    gasUsed?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    personaId?: boolean
  }

  export type ProofOfActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "actionType" | "actionData" | "actionParameters" | "transactionHash" | "blockNumber" | "amount" | "tokenAddress" | "result" | "isSuccessful" | "gasUsed" | "errorMessage" | "createdAt" | "personaId", ExtArgs["result"]["proofOfAction"]>
  export type ProofOfActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }

  export type $ProofOfActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProofOfAction"
    objects: {
      persona: Prisma.$AgentPersonaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actionType: string
      actionData: string
      actionParameters: Prisma.JsonValue | null
      transactionHash: string | null
      blockNumber: string | null
      amount: number | null
      tokenAddress: string | null
      result: string | null
      isSuccessful: boolean
      gasUsed: number | null
      errorMessage: string | null
      createdAt: Date
      personaId: string
    }, ExtArgs["result"]["proofOfAction"]>
    composites: {}
  }

  type ProofOfActionGetPayload<S extends boolean | null | undefined | ProofOfActionDefaultArgs> = $Result.GetResult<Prisma.$ProofOfActionPayload, S>

  type ProofOfActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProofOfActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProofOfActionCountAggregateInputType | true
    }

  export interface ProofOfActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProofOfAction'], meta: { name: 'ProofOfAction' } }
    /**
     * Find zero or one ProofOfAction that matches the filter.
     * @param {ProofOfActionFindUniqueArgs} args - Arguments to find a ProofOfAction
     * @example
     * // Get one ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProofOfActionFindUniqueArgs>(args: SelectSubset<T, ProofOfActionFindUniqueArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProofOfAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProofOfActionFindUniqueOrThrowArgs} args - Arguments to find a ProofOfAction
     * @example
     * // Get one ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProofOfActionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProofOfActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionFindFirstArgs} args - Arguments to find a ProofOfAction
     * @example
     * // Get one ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProofOfActionFindFirstArgs>(args?: SelectSubset<T, ProofOfActionFindFirstArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionFindFirstOrThrowArgs} args - Arguments to find a ProofOfAction
     * @example
     * // Get one ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProofOfActionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProofOfActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProofOfActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProofOfActions
     * const proofOfActions = await prisma.proofOfAction.findMany()
     * 
     * // Get first 10 ProofOfActions
     * const proofOfActions = await prisma.proofOfAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proofOfActionWithIdOnly = await prisma.proofOfAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProofOfActionFindManyArgs>(args?: SelectSubset<T, ProofOfActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProofOfAction.
     * @param {ProofOfActionCreateArgs} args - Arguments to create a ProofOfAction.
     * @example
     * // Create one ProofOfAction
     * const ProofOfAction = await prisma.proofOfAction.create({
     *   data: {
     *     // ... data to create a ProofOfAction
     *   }
     * })
     * 
     */
    create<T extends ProofOfActionCreateArgs>(args: SelectSubset<T, ProofOfActionCreateArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProofOfActions.
     * @param {ProofOfActionCreateManyArgs} args - Arguments to create many ProofOfActions.
     * @example
     * // Create many ProofOfActions
     * const proofOfAction = await prisma.proofOfAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProofOfActionCreateManyArgs>(args?: SelectSubset<T, ProofOfActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProofOfActions and returns the data saved in the database.
     * @param {ProofOfActionCreateManyAndReturnArgs} args - Arguments to create many ProofOfActions.
     * @example
     * // Create many ProofOfActions
     * const proofOfAction = await prisma.proofOfAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProofOfActions and only return the `id`
     * const proofOfActionWithIdOnly = await prisma.proofOfAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProofOfActionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProofOfActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProofOfAction.
     * @param {ProofOfActionDeleteArgs} args - Arguments to delete one ProofOfAction.
     * @example
     * // Delete one ProofOfAction
     * const ProofOfAction = await prisma.proofOfAction.delete({
     *   where: {
     *     // ... filter to delete one ProofOfAction
     *   }
     * })
     * 
     */
    delete<T extends ProofOfActionDeleteArgs>(args: SelectSubset<T, ProofOfActionDeleteArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProofOfAction.
     * @param {ProofOfActionUpdateArgs} args - Arguments to update one ProofOfAction.
     * @example
     * // Update one ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProofOfActionUpdateArgs>(args: SelectSubset<T, ProofOfActionUpdateArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProofOfActions.
     * @param {ProofOfActionDeleteManyArgs} args - Arguments to filter ProofOfActions to delete.
     * @example
     * // Delete a few ProofOfActions
     * const { count } = await prisma.proofOfAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProofOfActionDeleteManyArgs>(args?: SelectSubset<T, ProofOfActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProofOfActions
     * const proofOfAction = await prisma.proofOfAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProofOfActionUpdateManyArgs>(args: SelectSubset<T, ProofOfActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfActions and returns the data updated in the database.
     * @param {ProofOfActionUpdateManyAndReturnArgs} args - Arguments to update many ProofOfActions.
     * @example
     * // Update many ProofOfActions
     * const proofOfAction = await prisma.proofOfAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProofOfActions and only return the `id`
     * const proofOfActionWithIdOnly = await prisma.proofOfAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProofOfActionUpdateManyAndReturnArgs>(args: SelectSubset<T, ProofOfActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProofOfAction.
     * @param {ProofOfActionUpsertArgs} args - Arguments to update or create a ProofOfAction.
     * @example
     * // Update or create a ProofOfAction
     * const proofOfAction = await prisma.proofOfAction.upsert({
     *   create: {
     *     // ... data to create a ProofOfAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProofOfAction we want to update
     *   }
     * })
     */
    upsert<T extends ProofOfActionUpsertArgs>(args: SelectSubset<T, ProofOfActionUpsertArgs<ExtArgs>>): Prisma__ProofOfActionClient<$Result.GetResult<Prisma.$ProofOfActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProofOfActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionCountArgs} args - Arguments to filter ProofOfActions to count.
     * @example
     * // Count the number of ProofOfActions
     * const count = await prisma.proofOfAction.count({
     *   where: {
     *     // ... the filter for the ProofOfActions we want to count
     *   }
     * })
    **/
    count<T extends ProofOfActionCountArgs>(
      args?: Subset<T, ProofOfActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProofOfActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProofOfAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProofOfActionAggregateArgs>(args: Subset<T, ProofOfActionAggregateArgs>): Prisma.PrismaPromise<GetProofOfActionAggregateType<T>>

    /**
     * Group by ProofOfAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProofOfActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProofOfActionGroupByArgs['orderBy'] }
        : { orderBy?: ProofOfActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProofOfActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProofOfActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProofOfAction model
   */
  readonly fields: ProofOfActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProofOfAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProofOfActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persona<T extends AgentPersonaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersonaDefaultArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProofOfAction model
   */
  interface ProofOfActionFieldRefs {
    readonly id: FieldRef<"ProofOfAction", 'String'>
    readonly actionType: FieldRef<"ProofOfAction", 'String'>
    readonly actionData: FieldRef<"ProofOfAction", 'String'>
    readonly actionParameters: FieldRef<"ProofOfAction", 'Json'>
    readonly transactionHash: FieldRef<"ProofOfAction", 'String'>
    readonly blockNumber: FieldRef<"ProofOfAction", 'String'>
    readonly amount: FieldRef<"ProofOfAction", 'Float'>
    readonly tokenAddress: FieldRef<"ProofOfAction", 'String'>
    readonly result: FieldRef<"ProofOfAction", 'String'>
    readonly isSuccessful: FieldRef<"ProofOfAction", 'Boolean'>
    readonly gasUsed: FieldRef<"ProofOfAction", 'Int'>
    readonly errorMessage: FieldRef<"ProofOfAction", 'String'>
    readonly createdAt: FieldRef<"ProofOfAction", 'DateTime'>
    readonly personaId: FieldRef<"ProofOfAction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProofOfAction findUnique
   */
  export type ProofOfActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfAction to fetch.
     */
    where: ProofOfActionWhereUniqueInput
  }

  /**
   * ProofOfAction findUniqueOrThrow
   */
  export type ProofOfActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfAction to fetch.
     */
    where: ProofOfActionWhereUniqueInput
  }

  /**
   * ProofOfAction findFirst
   */
  export type ProofOfActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfAction to fetch.
     */
    where?: ProofOfActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfActions to fetch.
     */
    orderBy?: ProofOfActionOrderByWithRelationInput | ProofOfActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfActions.
     */
    cursor?: ProofOfActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfActions.
     */
    distinct?: ProofOfActionScalarFieldEnum | ProofOfActionScalarFieldEnum[]
  }

  /**
   * ProofOfAction findFirstOrThrow
   */
  export type ProofOfActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfAction to fetch.
     */
    where?: ProofOfActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfActions to fetch.
     */
    orderBy?: ProofOfActionOrderByWithRelationInput | ProofOfActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfActions.
     */
    cursor?: ProofOfActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfActions.
     */
    distinct?: ProofOfActionScalarFieldEnum | ProofOfActionScalarFieldEnum[]
  }

  /**
   * ProofOfAction findMany
   */
  export type ProofOfActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfActions to fetch.
     */
    where?: ProofOfActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfActions to fetch.
     */
    orderBy?: ProofOfActionOrderByWithRelationInput | ProofOfActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProofOfActions.
     */
    cursor?: ProofOfActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfActions.
     */
    skip?: number
    distinct?: ProofOfActionScalarFieldEnum | ProofOfActionScalarFieldEnum[]
  }

  /**
   * ProofOfAction create
   */
  export type ProofOfActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProofOfAction.
     */
    data: XOR<ProofOfActionCreateInput, ProofOfActionUncheckedCreateInput>
  }

  /**
   * ProofOfAction createMany
   */
  export type ProofOfActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProofOfActions.
     */
    data: ProofOfActionCreateManyInput | ProofOfActionCreateManyInput[]
  }

  /**
   * ProofOfAction createManyAndReturn
   */
  export type ProofOfActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * The data used to create many ProofOfActions.
     */
    data: ProofOfActionCreateManyInput | ProofOfActionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfAction update
   */
  export type ProofOfActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProofOfAction.
     */
    data: XOR<ProofOfActionUpdateInput, ProofOfActionUncheckedUpdateInput>
    /**
     * Choose, which ProofOfAction to update.
     */
    where: ProofOfActionWhereUniqueInput
  }

  /**
   * ProofOfAction updateMany
   */
  export type ProofOfActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProofOfActions.
     */
    data: XOR<ProofOfActionUpdateManyMutationInput, ProofOfActionUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfActions to update
     */
    where?: ProofOfActionWhereInput
    /**
     * Limit how many ProofOfActions to update.
     */
    limit?: number
  }

  /**
   * ProofOfAction updateManyAndReturn
   */
  export type ProofOfActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * The data used to update ProofOfActions.
     */
    data: XOR<ProofOfActionUpdateManyMutationInput, ProofOfActionUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfActions to update
     */
    where?: ProofOfActionWhereInput
    /**
     * Limit how many ProofOfActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfAction upsert
   */
  export type ProofOfActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProofOfAction to update in case it exists.
     */
    where: ProofOfActionWhereUniqueInput
    /**
     * In case the ProofOfAction found by the `where` argument doesn't exist, create a new ProofOfAction with this data.
     */
    create: XOR<ProofOfActionCreateInput, ProofOfActionUncheckedCreateInput>
    /**
     * In case the ProofOfAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProofOfActionUpdateInput, ProofOfActionUncheckedUpdateInput>
  }

  /**
   * ProofOfAction delete
   */
  export type ProofOfActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
    /**
     * Filter which ProofOfAction to delete.
     */
    where: ProofOfActionWhereUniqueInput
  }

  /**
   * ProofOfAction deleteMany
   */
  export type ProofOfActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfActions to delete
     */
    where?: ProofOfActionWhereInput
    /**
     * Limit how many ProofOfActions to delete.
     */
    limit?: number
  }

  /**
   * ProofOfAction without action
   */
  export type ProofOfActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfAction
     */
    select?: ProofOfActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfAction
     */
    omit?: ProofOfActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfActionInclude<ExtArgs> | null
  }


  /**
   * Model ProofOfEvidence
   */

  export type AggregateProofOfEvidence = {
    _count: ProofOfEvidenceCountAggregateOutputType | null
    _avg: ProofOfEvidenceAvgAggregateOutputType | null
    _sum: ProofOfEvidenceSumAggregateOutputType | null
    _min: ProofOfEvidenceMinAggregateOutputType | null
    _max: ProofOfEvidenceMaxAggregateOutputType | null
  }

  export type ProofOfEvidenceAvgAggregateOutputType = {
    confidenceScore: number | null
  }

  export type ProofOfEvidenceSumAggregateOutputType = {
    confidenceScore: number | null
  }

  export type ProofOfEvidenceMinAggregateOutputType = {
    id: string | null
    evidenceType: string | null
    evidenceData: string | null
    sourceType: string | null
    sourceUrl: string | null
    hash: string | null
    isVerified: boolean | null
    confidenceScore: number | null
    verificationMethod: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfEvidenceMaxAggregateOutputType = {
    id: string | null
    evidenceType: string | null
    evidenceData: string | null
    sourceType: string | null
    sourceUrl: string | null
    hash: string | null
    isVerified: boolean | null
    confidenceScore: number | null
    verificationMethod: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfEvidenceCountAggregateOutputType = {
    id: number
    evidenceType: number
    evidenceData: number
    sourceType: number
    sourceUrl: number
    hash: number
    metadata: number
    isVerified: number
    confidenceScore: number
    verificationMethod: number
    createdAt: number
    personaId: number
    _all: number
  }


  export type ProofOfEvidenceAvgAggregateInputType = {
    confidenceScore?: true
  }

  export type ProofOfEvidenceSumAggregateInputType = {
    confidenceScore?: true
  }

  export type ProofOfEvidenceMinAggregateInputType = {
    id?: true
    evidenceType?: true
    evidenceData?: true
    sourceType?: true
    sourceUrl?: true
    hash?: true
    isVerified?: true
    confidenceScore?: true
    verificationMethod?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfEvidenceMaxAggregateInputType = {
    id?: true
    evidenceType?: true
    evidenceData?: true
    sourceType?: true
    sourceUrl?: true
    hash?: true
    isVerified?: true
    confidenceScore?: true
    verificationMethod?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfEvidenceCountAggregateInputType = {
    id?: true
    evidenceType?: true
    evidenceData?: true
    sourceType?: true
    sourceUrl?: true
    hash?: true
    metadata?: true
    isVerified?: true
    confidenceScore?: true
    verificationMethod?: true
    createdAt?: true
    personaId?: true
    _all?: true
  }

  export type ProofOfEvidenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfEvidence to aggregate.
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvidences to fetch.
     */
    orderBy?: ProofOfEvidenceOrderByWithRelationInput | ProofOfEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProofOfEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProofOfEvidences
    **/
    _count?: true | ProofOfEvidenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProofOfEvidenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProofOfEvidenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProofOfEvidenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProofOfEvidenceMaxAggregateInputType
  }

  export type GetProofOfEvidenceAggregateType<T extends ProofOfEvidenceAggregateArgs> = {
        [P in keyof T & keyof AggregateProofOfEvidence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProofOfEvidence[P]>
      : GetScalarType<T[P], AggregateProofOfEvidence[P]>
  }




  export type ProofOfEvidenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfEvidenceWhereInput
    orderBy?: ProofOfEvidenceOrderByWithAggregationInput | ProofOfEvidenceOrderByWithAggregationInput[]
    by: ProofOfEvidenceScalarFieldEnum[] | ProofOfEvidenceScalarFieldEnum
    having?: ProofOfEvidenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProofOfEvidenceCountAggregateInputType | true
    _avg?: ProofOfEvidenceAvgAggregateInputType
    _sum?: ProofOfEvidenceSumAggregateInputType
    _min?: ProofOfEvidenceMinAggregateInputType
    _max?: ProofOfEvidenceMaxAggregateInputType
  }

  export type ProofOfEvidenceGroupByOutputType = {
    id: string
    evidenceType: string
    evidenceData: string
    sourceType: string | null
    sourceUrl: string | null
    hash: string | null
    metadata: JsonValue | null
    isVerified: boolean
    confidenceScore: number
    verificationMethod: string | null
    createdAt: Date
    personaId: string
    _count: ProofOfEvidenceCountAggregateOutputType | null
    _avg: ProofOfEvidenceAvgAggregateOutputType | null
    _sum: ProofOfEvidenceSumAggregateOutputType | null
    _min: ProofOfEvidenceMinAggregateOutputType | null
    _max: ProofOfEvidenceMaxAggregateOutputType | null
  }

  type GetProofOfEvidenceGroupByPayload<T extends ProofOfEvidenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProofOfEvidenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProofOfEvidenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProofOfEvidenceGroupByOutputType[P]>
            : GetScalarType<T[P], ProofOfEvidenceGroupByOutputType[P]>
        }
      >
    >


  export type ProofOfEvidenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evidenceType?: boolean
    evidenceData?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    hash?: boolean
    metadata?: boolean
    isVerified?: boolean
    confidenceScore?: boolean
    verificationMethod?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvidence"]>

  export type ProofOfEvidenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evidenceType?: boolean
    evidenceData?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    hash?: boolean
    metadata?: boolean
    isVerified?: boolean
    confidenceScore?: boolean
    verificationMethod?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvidence"]>

  export type ProofOfEvidenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evidenceType?: boolean
    evidenceData?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    hash?: boolean
    metadata?: boolean
    isVerified?: boolean
    confidenceScore?: boolean
    verificationMethod?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvidence"]>

  export type ProofOfEvidenceSelectScalar = {
    id?: boolean
    evidenceType?: boolean
    evidenceData?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    hash?: boolean
    metadata?: boolean
    isVerified?: boolean
    confidenceScore?: boolean
    verificationMethod?: boolean
    createdAt?: boolean
    personaId?: boolean
  }

  export type ProofOfEvidenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evidenceType" | "evidenceData" | "sourceType" | "sourceUrl" | "hash" | "metadata" | "isVerified" | "confidenceScore" | "verificationMethod" | "createdAt" | "personaId", ExtArgs["result"]["proofOfEvidence"]>
  export type ProofOfEvidenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfEvidenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfEvidenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }

  export type $ProofOfEvidencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProofOfEvidence"
    objects: {
      persona: Prisma.$AgentPersonaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evidenceType: string
      evidenceData: string
      sourceType: string | null
      sourceUrl: string | null
      hash: string | null
      metadata: Prisma.JsonValue | null
      isVerified: boolean
      confidenceScore: number
      verificationMethod: string | null
      createdAt: Date
      personaId: string
    }, ExtArgs["result"]["proofOfEvidence"]>
    composites: {}
  }

  type ProofOfEvidenceGetPayload<S extends boolean | null | undefined | ProofOfEvidenceDefaultArgs> = $Result.GetResult<Prisma.$ProofOfEvidencePayload, S>

  type ProofOfEvidenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProofOfEvidenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProofOfEvidenceCountAggregateInputType | true
    }

  export interface ProofOfEvidenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProofOfEvidence'], meta: { name: 'ProofOfEvidence' } }
    /**
     * Find zero or one ProofOfEvidence that matches the filter.
     * @param {ProofOfEvidenceFindUniqueArgs} args - Arguments to find a ProofOfEvidence
     * @example
     * // Get one ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProofOfEvidenceFindUniqueArgs>(args: SelectSubset<T, ProofOfEvidenceFindUniqueArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProofOfEvidence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProofOfEvidenceFindUniqueOrThrowArgs} args - Arguments to find a ProofOfEvidence
     * @example
     * // Get one ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProofOfEvidenceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProofOfEvidenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfEvidence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceFindFirstArgs} args - Arguments to find a ProofOfEvidence
     * @example
     * // Get one ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProofOfEvidenceFindFirstArgs>(args?: SelectSubset<T, ProofOfEvidenceFindFirstArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfEvidence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceFindFirstOrThrowArgs} args - Arguments to find a ProofOfEvidence
     * @example
     * // Get one ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProofOfEvidenceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProofOfEvidenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProofOfEvidences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProofOfEvidences
     * const proofOfEvidences = await prisma.proofOfEvidence.findMany()
     * 
     * // Get first 10 ProofOfEvidences
     * const proofOfEvidences = await prisma.proofOfEvidence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proofOfEvidenceWithIdOnly = await prisma.proofOfEvidence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProofOfEvidenceFindManyArgs>(args?: SelectSubset<T, ProofOfEvidenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProofOfEvidence.
     * @param {ProofOfEvidenceCreateArgs} args - Arguments to create a ProofOfEvidence.
     * @example
     * // Create one ProofOfEvidence
     * const ProofOfEvidence = await prisma.proofOfEvidence.create({
     *   data: {
     *     // ... data to create a ProofOfEvidence
     *   }
     * })
     * 
     */
    create<T extends ProofOfEvidenceCreateArgs>(args: SelectSubset<T, ProofOfEvidenceCreateArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProofOfEvidences.
     * @param {ProofOfEvidenceCreateManyArgs} args - Arguments to create many ProofOfEvidences.
     * @example
     * // Create many ProofOfEvidences
     * const proofOfEvidence = await prisma.proofOfEvidence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProofOfEvidenceCreateManyArgs>(args?: SelectSubset<T, ProofOfEvidenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProofOfEvidences and returns the data saved in the database.
     * @param {ProofOfEvidenceCreateManyAndReturnArgs} args - Arguments to create many ProofOfEvidences.
     * @example
     * // Create many ProofOfEvidences
     * const proofOfEvidence = await prisma.proofOfEvidence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProofOfEvidences and only return the `id`
     * const proofOfEvidenceWithIdOnly = await prisma.proofOfEvidence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProofOfEvidenceCreateManyAndReturnArgs>(args?: SelectSubset<T, ProofOfEvidenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProofOfEvidence.
     * @param {ProofOfEvidenceDeleteArgs} args - Arguments to delete one ProofOfEvidence.
     * @example
     * // Delete one ProofOfEvidence
     * const ProofOfEvidence = await prisma.proofOfEvidence.delete({
     *   where: {
     *     // ... filter to delete one ProofOfEvidence
     *   }
     * })
     * 
     */
    delete<T extends ProofOfEvidenceDeleteArgs>(args: SelectSubset<T, ProofOfEvidenceDeleteArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProofOfEvidence.
     * @param {ProofOfEvidenceUpdateArgs} args - Arguments to update one ProofOfEvidence.
     * @example
     * // Update one ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProofOfEvidenceUpdateArgs>(args: SelectSubset<T, ProofOfEvidenceUpdateArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProofOfEvidences.
     * @param {ProofOfEvidenceDeleteManyArgs} args - Arguments to filter ProofOfEvidences to delete.
     * @example
     * // Delete a few ProofOfEvidences
     * const { count } = await prisma.proofOfEvidence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProofOfEvidenceDeleteManyArgs>(args?: SelectSubset<T, ProofOfEvidenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfEvidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProofOfEvidences
     * const proofOfEvidence = await prisma.proofOfEvidence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProofOfEvidenceUpdateManyArgs>(args: SelectSubset<T, ProofOfEvidenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfEvidences and returns the data updated in the database.
     * @param {ProofOfEvidenceUpdateManyAndReturnArgs} args - Arguments to update many ProofOfEvidences.
     * @example
     * // Update many ProofOfEvidences
     * const proofOfEvidence = await prisma.proofOfEvidence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProofOfEvidences and only return the `id`
     * const proofOfEvidenceWithIdOnly = await prisma.proofOfEvidence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProofOfEvidenceUpdateManyAndReturnArgs>(args: SelectSubset<T, ProofOfEvidenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProofOfEvidence.
     * @param {ProofOfEvidenceUpsertArgs} args - Arguments to update or create a ProofOfEvidence.
     * @example
     * // Update or create a ProofOfEvidence
     * const proofOfEvidence = await prisma.proofOfEvidence.upsert({
     *   create: {
     *     // ... data to create a ProofOfEvidence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProofOfEvidence we want to update
     *   }
     * })
     */
    upsert<T extends ProofOfEvidenceUpsertArgs>(args: SelectSubset<T, ProofOfEvidenceUpsertArgs<ExtArgs>>): Prisma__ProofOfEvidenceClient<$Result.GetResult<Prisma.$ProofOfEvidencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProofOfEvidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceCountArgs} args - Arguments to filter ProofOfEvidences to count.
     * @example
     * // Count the number of ProofOfEvidences
     * const count = await prisma.proofOfEvidence.count({
     *   where: {
     *     // ... the filter for the ProofOfEvidences we want to count
     *   }
     * })
    **/
    count<T extends ProofOfEvidenceCountArgs>(
      args?: Subset<T, ProofOfEvidenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProofOfEvidenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProofOfEvidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProofOfEvidenceAggregateArgs>(args: Subset<T, ProofOfEvidenceAggregateArgs>): Prisma.PrismaPromise<GetProofOfEvidenceAggregateType<T>>

    /**
     * Group by ProofOfEvidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvidenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProofOfEvidenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProofOfEvidenceGroupByArgs['orderBy'] }
        : { orderBy?: ProofOfEvidenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProofOfEvidenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProofOfEvidenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProofOfEvidence model
   */
  readonly fields: ProofOfEvidenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProofOfEvidence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProofOfEvidenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persona<T extends AgentPersonaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersonaDefaultArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProofOfEvidence model
   */
  interface ProofOfEvidenceFieldRefs {
    readonly id: FieldRef<"ProofOfEvidence", 'String'>
    readonly evidenceType: FieldRef<"ProofOfEvidence", 'String'>
    readonly evidenceData: FieldRef<"ProofOfEvidence", 'String'>
    readonly sourceType: FieldRef<"ProofOfEvidence", 'String'>
    readonly sourceUrl: FieldRef<"ProofOfEvidence", 'String'>
    readonly hash: FieldRef<"ProofOfEvidence", 'String'>
    readonly metadata: FieldRef<"ProofOfEvidence", 'Json'>
    readonly isVerified: FieldRef<"ProofOfEvidence", 'Boolean'>
    readonly confidenceScore: FieldRef<"ProofOfEvidence", 'Float'>
    readonly verificationMethod: FieldRef<"ProofOfEvidence", 'String'>
    readonly createdAt: FieldRef<"ProofOfEvidence", 'DateTime'>
    readonly personaId: FieldRef<"ProofOfEvidence", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProofOfEvidence findUnique
   */
  export type ProofOfEvidenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvidence to fetch.
     */
    where: ProofOfEvidenceWhereUniqueInput
  }

  /**
   * ProofOfEvidence findUniqueOrThrow
   */
  export type ProofOfEvidenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvidence to fetch.
     */
    where: ProofOfEvidenceWhereUniqueInput
  }

  /**
   * ProofOfEvidence findFirst
   */
  export type ProofOfEvidenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvidence to fetch.
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvidences to fetch.
     */
    orderBy?: ProofOfEvidenceOrderByWithRelationInput | ProofOfEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfEvidences.
     */
    cursor?: ProofOfEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfEvidences.
     */
    distinct?: ProofOfEvidenceScalarFieldEnum | ProofOfEvidenceScalarFieldEnum[]
  }

  /**
   * ProofOfEvidence findFirstOrThrow
   */
  export type ProofOfEvidenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvidence to fetch.
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvidences to fetch.
     */
    orderBy?: ProofOfEvidenceOrderByWithRelationInput | ProofOfEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfEvidences.
     */
    cursor?: ProofOfEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfEvidences.
     */
    distinct?: ProofOfEvidenceScalarFieldEnum | ProofOfEvidenceScalarFieldEnum[]
  }

  /**
   * ProofOfEvidence findMany
   */
  export type ProofOfEvidenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvidences to fetch.
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvidences to fetch.
     */
    orderBy?: ProofOfEvidenceOrderByWithRelationInput | ProofOfEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProofOfEvidences.
     */
    cursor?: ProofOfEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvidences.
     */
    skip?: number
    distinct?: ProofOfEvidenceScalarFieldEnum | ProofOfEvidenceScalarFieldEnum[]
  }

  /**
   * ProofOfEvidence create
   */
  export type ProofOfEvidenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * The data needed to create a ProofOfEvidence.
     */
    data: XOR<ProofOfEvidenceCreateInput, ProofOfEvidenceUncheckedCreateInput>
  }

  /**
   * ProofOfEvidence createMany
   */
  export type ProofOfEvidenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProofOfEvidences.
     */
    data: ProofOfEvidenceCreateManyInput | ProofOfEvidenceCreateManyInput[]
  }

  /**
   * ProofOfEvidence createManyAndReturn
   */
  export type ProofOfEvidenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * The data used to create many ProofOfEvidences.
     */
    data: ProofOfEvidenceCreateManyInput | ProofOfEvidenceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfEvidence update
   */
  export type ProofOfEvidenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * The data needed to update a ProofOfEvidence.
     */
    data: XOR<ProofOfEvidenceUpdateInput, ProofOfEvidenceUncheckedUpdateInput>
    /**
     * Choose, which ProofOfEvidence to update.
     */
    where: ProofOfEvidenceWhereUniqueInput
  }

  /**
   * ProofOfEvidence updateMany
   */
  export type ProofOfEvidenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProofOfEvidences.
     */
    data: XOR<ProofOfEvidenceUpdateManyMutationInput, ProofOfEvidenceUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfEvidences to update
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * Limit how many ProofOfEvidences to update.
     */
    limit?: number
  }

  /**
   * ProofOfEvidence updateManyAndReturn
   */
  export type ProofOfEvidenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * The data used to update ProofOfEvidences.
     */
    data: XOR<ProofOfEvidenceUpdateManyMutationInput, ProofOfEvidenceUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfEvidences to update
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * Limit how many ProofOfEvidences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfEvidence upsert
   */
  export type ProofOfEvidenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * The filter to search for the ProofOfEvidence to update in case it exists.
     */
    where: ProofOfEvidenceWhereUniqueInput
    /**
     * In case the ProofOfEvidence found by the `where` argument doesn't exist, create a new ProofOfEvidence with this data.
     */
    create: XOR<ProofOfEvidenceCreateInput, ProofOfEvidenceUncheckedCreateInput>
    /**
     * In case the ProofOfEvidence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProofOfEvidenceUpdateInput, ProofOfEvidenceUncheckedUpdateInput>
  }

  /**
   * ProofOfEvidence delete
   */
  export type ProofOfEvidenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
    /**
     * Filter which ProofOfEvidence to delete.
     */
    where: ProofOfEvidenceWhereUniqueInput
  }

  /**
   * ProofOfEvidence deleteMany
   */
  export type ProofOfEvidenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfEvidences to delete
     */
    where?: ProofOfEvidenceWhereInput
    /**
     * Limit how many ProofOfEvidences to delete.
     */
    limit?: number
  }

  /**
   * ProofOfEvidence without action
   */
  export type ProofOfEvidenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvidence
     */
    select?: ProofOfEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvidence
     */
    omit?: ProofOfEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvidenceInclude<ExtArgs> | null
  }


  /**
   * Model ProofOfEvolution
   */

  export type AggregateProofOfEvolution = {
    _count: ProofOfEvolutionCountAggregateOutputType | null
    _avg: ProofOfEvolutionAvgAggregateOutputType | null
    _sum: ProofOfEvolutionSumAggregateOutputType | null
    _min: ProofOfEvolutionMinAggregateOutputType | null
    _max: ProofOfEvolutionMaxAggregateOutputType | null
  }

  export type ProofOfEvolutionAvgAggregateOutputType = {
    version: number | null
    impactScore: number | null
  }

  export type ProofOfEvolutionSumAggregateOutputType = {
    version: number | null
    impactScore: number | null
  }

  export type ProofOfEvolutionMinAggregateOutputType = {
    id: string | null
    evolutionType: string | null
    reasoning: string | null
    trigger: string | null
    version: number | null
    isReversible: boolean | null
    impactScore: number | null
    merkleProof: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfEvolutionMaxAggregateOutputType = {
    id: string | null
    evolutionType: string | null
    reasoning: string | null
    trigger: string | null
    version: number | null
    isReversible: boolean | null
    impactScore: number | null
    merkleProof: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type ProofOfEvolutionCountAggregateOutputType = {
    id: number
    evolutionType: number
    previousState: number
    newState: number
    changes: number
    reasoning: number
    trigger: number
    version: number
    isReversible: number
    impactScore: number
    merkleProof: number
    createdAt: number
    personaId: number
    _all: number
  }


  export type ProofOfEvolutionAvgAggregateInputType = {
    version?: true
    impactScore?: true
  }

  export type ProofOfEvolutionSumAggregateInputType = {
    version?: true
    impactScore?: true
  }

  export type ProofOfEvolutionMinAggregateInputType = {
    id?: true
    evolutionType?: true
    reasoning?: true
    trigger?: true
    version?: true
    isReversible?: true
    impactScore?: true
    merkleProof?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfEvolutionMaxAggregateInputType = {
    id?: true
    evolutionType?: true
    reasoning?: true
    trigger?: true
    version?: true
    isReversible?: true
    impactScore?: true
    merkleProof?: true
    createdAt?: true
    personaId?: true
  }

  export type ProofOfEvolutionCountAggregateInputType = {
    id?: true
    evolutionType?: true
    previousState?: true
    newState?: true
    changes?: true
    reasoning?: true
    trigger?: true
    version?: true
    isReversible?: true
    impactScore?: true
    merkleProof?: true
    createdAt?: true
    personaId?: true
    _all?: true
  }

  export type ProofOfEvolutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfEvolution to aggregate.
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvolutions to fetch.
     */
    orderBy?: ProofOfEvolutionOrderByWithRelationInput | ProofOfEvolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProofOfEvolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProofOfEvolutions
    **/
    _count?: true | ProofOfEvolutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProofOfEvolutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProofOfEvolutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProofOfEvolutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProofOfEvolutionMaxAggregateInputType
  }

  export type GetProofOfEvolutionAggregateType<T extends ProofOfEvolutionAggregateArgs> = {
        [P in keyof T & keyof AggregateProofOfEvolution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProofOfEvolution[P]>
      : GetScalarType<T[P], AggregateProofOfEvolution[P]>
  }




  export type ProofOfEvolutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofOfEvolutionWhereInput
    orderBy?: ProofOfEvolutionOrderByWithAggregationInput | ProofOfEvolutionOrderByWithAggregationInput[]
    by: ProofOfEvolutionScalarFieldEnum[] | ProofOfEvolutionScalarFieldEnum
    having?: ProofOfEvolutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProofOfEvolutionCountAggregateInputType | true
    _avg?: ProofOfEvolutionAvgAggregateInputType
    _sum?: ProofOfEvolutionSumAggregateInputType
    _min?: ProofOfEvolutionMinAggregateInputType
    _max?: ProofOfEvolutionMaxAggregateInputType
  }

  export type ProofOfEvolutionGroupByOutputType = {
    id: string
    evolutionType: string
    previousState: JsonValue
    newState: JsonValue
    changes: JsonValue
    reasoning: string | null
    trigger: string | null
    version: number
    isReversible: boolean
    impactScore: number
    merkleProof: string | null
    createdAt: Date
    personaId: string
    _count: ProofOfEvolutionCountAggregateOutputType | null
    _avg: ProofOfEvolutionAvgAggregateOutputType | null
    _sum: ProofOfEvolutionSumAggregateOutputType | null
    _min: ProofOfEvolutionMinAggregateOutputType | null
    _max: ProofOfEvolutionMaxAggregateOutputType | null
  }

  type GetProofOfEvolutionGroupByPayload<T extends ProofOfEvolutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProofOfEvolutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProofOfEvolutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProofOfEvolutionGroupByOutputType[P]>
            : GetScalarType<T[P], ProofOfEvolutionGroupByOutputType[P]>
        }
      >
    >


  export type ProofOfEvolutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evolutionType?: boolean
    previousState?: boolean
    newState?: boolean
    changes?: boolean
    reasoning?: boolean
    trigger?: boolean
    version?: boolean
    isReversible?: boolean
    impactScore?: boolean
    merkleProof?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvolution"]>

  export type ProofOfEvolutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evolutionType?: boolean
    previousState?: boolean
    newState?: boolean
    changes?: boolean
    reasoning?: boolean
    trigger?: boolean
    version?: boolean
    isReversible?: boolean
    impactScore?: boolean
    merkleProof?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvolution"]>

  export type ProofOfEvolutionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evolutionType?: boolean
    previousState?: boolean
    newState?: boolean
    changes?: boolean
    reasoning?: boolean
    trigger?: boolean
    version?: boolean
    isReversible?: boolean
    impactScore?: boolean
    merkleProof?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proofOfEvolution"]>

  export type ProofOfEvolutionSelectScalar = {
    id?: boolean
    evolutionType?: boolean
    previousState?: boolean
    newState?: boolean
    changes?: boolean
    reasoning?: boolean
    trigger?: boolean
    version?: boolean
    isReversible?: boolean
    impactScore?: boolean
    merkleProof?: boolean
    createdAt?: boolean
    personaId?: boolean
  }

  export type ProofOfEvolutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evolutionType" | "previousState" | "newState" | "changes" | "reasoning" | "trigger" | "version" | "isReversible" | "impactScore" | "merkleProof" | "createdAt" | "personaId", ExtArgs["result"]["proofOfEvolution"]>
  export type ProofOfEvolutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfEvolutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type ProofOfEvolutionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }

  export type $ProofOfEvolutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProofOfEvolution"
    objects: {
      persona: Prisma.$AgentPersonaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evolutionType: string
      previousState: Prisma.JsonValue
      newState: Prisma.JsonValue
      changes: Prisma.JsonValue
      reasoning: string | null
      trigger: string | null
      version: number
      isReversible: boolean
      impactScore: number
      merkleProof: string | null
      createdAt: Date
      personaId: string
    }, ExtArgs["result"]["proofOfEvolution"]>
    composites: {}
  }

  type ProofOfEvolutionGetPayload<S extends boolean | null | undefined | ProofOfEvolutionDefaultArgs> = $Result.GetResult<Prisma.$ProofOfEvolutionPayload, S>

  type ProofOfEvolutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProofOfEvolutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProofOfEvolutionCountAggregateInputType | true
    }

  export interface ProofOfEvolutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProofOfEvolution'], meta: { name: 'ProofOfEvolution' } }
    /**
     * Find zero or one ProofOfEvolution that matches the filter.
     * @param {ProofOfEvolutionFindUniqueArgs} args - Arguments to find a ProofOfEvolution
     * @example
     * // Get one ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProofOfEvolutionFindUniqueArgs>(args: SelectSubset<T, ProofOfEvolutionFindUniqueArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProofOfEvolution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProofOfEvolutionFindUniqueOrThrowArgs} args - Arguments to find a ProofOfEvolution
     * @example
     * // Get one ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProofOfEvolutionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProofOfEvolutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfEvolution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionFindFirstArgs} args - Arguments to find a ProofOfEvolution
     * @example
     * // Get one ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProofOfEvolutionFindFirstArgs>(args?: SelectSubset<T, ProofOfEvolutionFindFirstArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProofOfEvolution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionFindFirstOrThrowArgs} args - Arguments to find a ProofOfEvolution
     * @example
     * // Get one ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProofOfEvolutionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProofOfEvolutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProofOfEvolutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProofOfEvolutions
     * const proofOfEvolutions = await prisma.proofOfEvolution.findMany()
     * 
     * // Get first 10 ProofOfEvolutions
     * const proofOfEvolutions = await prisma.proofOfEvolution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proofOfEvolutionWithIdOnly = await prisma.proofOfEvolution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProofOfEvolutionFindManyArgs>(args?: SelectSubset<T, ProofOfEvolutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProofOfEvolution.
     * @param {ProofOfEvolutionCreateArgs} args - Arguments to create a ProofOfEvolution.
     * @example
     * // Create one ProofOfEvolution
     * const ProofOfEvolution = await prisma.proofOfEvolution.create({
     *   data: {
     *     // ... data to create a ProofOfEvolution
     *   }
     * })
     * 
     */
    create<T extends ProofOfEvolutionCreateArgs>(args: SelectSubset<T, ProofOfEvolutionCreateArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProofOfEvolutions.
     * @param {ProofOfEvolutionCreateManyArgs} args - Arguments to create many ProofOfEvolutions.
     * @example
     * // Create many ProofOfEvolutions
     * const proofOfEvolution = await prisma.proofOfEvolution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProofOfEvolutionCreateManyArgs>(args?: SelectSubset<T, ProofOfEvolutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProofOfEvolutions and returns the data saved in the database.
     * @param {ProofOfEvolutionCreateManyAndReturnArgs} args - Arguments to create many ProofOfEvolutions.
     * @example
     * // Create many ProofOfEvolutions
     * const proofOfEvolution = await prisma.proofOfEvolution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProofOfEvolutions and only return the `id`
     * const proofOfEvolutionWithIdOnly = await prisma.proofOfEvolution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProofOfEvolutionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProofOfEvolutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProofOfEvolution.
     * @param {ProofOfEvolutionDeleteArgs} args - Arguments to delete one ProofOfEvolution.
     * @example
     * // Delete one ProofOfEvolution
     * const ProofOfEvolution = await prisma.proofOfEvolution.delete({
     *   where: {
     *     // ... filter to delete one ProofOfEvolution
     *   }
     * })
     * 
     */
    delete<T extends ProofOfEvolutionDeleteArgs>(args: SelectSubset<T, ProofOfEvolutionDeleteArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProofOfEvolution.
     * @param {ProofOfEvolutionUpdateArgs} args - Arguments to update one ProofOfEvolution.
     * @example
     * // Update one ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProofOfEvolutionUpdateArgs>(args: SelectSubset<T, ProofOfEvolutionUpdateArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProofOfEvolutions.
     * @param {ProofOfEvolutionDeleteManyArgs} args - Arguments to filter ProofOfEvolutions to delete.
     * @example
     * // Delete a few ProofOfEvolutions
     * const { count } = await prisma.proofOfEvolution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProofOfEvolutionDeleteManyArgs>(args?: SelectSubset<T, ProofOfEvolutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfEvolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProofOfEvolutions
     * const proofOfEvolution = await prisma.proofOfEvolution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProofOfEvolutionUpdateManyArgs>(args: SelectSubset<T, ProofOfEvolutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProofOfEvolutions and returns the data updated in the database.
     * @param {ProofOfEvolutionUpdateManyAndReturnArgs} args - Arguments to update many ProofOfEvolutions.
     * @example
     * // Update many ProofOfEvolutions
     * const proofOfEvolution = await prisma.proofOfEvolution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProofOfEvolutions and only return the `id`
     * const proofOfEvolutionWithIdOnly = await prisma.proofOfEvolution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProofOfEvolutionUpdateManyAndReturnArgs>(args: SelectSubset<T, ProofOfEvolutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProofOfEvolution.
     * @param {ProofOfEvolutionUpsertArgs} args - Arguments to update or create a ProofOfEvolution.
     * @example
     * // Update or create a ProofOfEvolution
     * const proofOfEvolution = await prisma.proofOfEvolution.upsert({
     *   create: {
     *     // ... data to create a ProofOfEvolution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProofOfEvolution we want to update
     *   }
     * })
     */
    upsert<T extends ProofOfEvolutionUpsertArgs>(args: SelectSubset<T, ProofOfEvolutionUpsertArgs<ExtArgs>>): Prisma__ProofOfEvolutionClient<$Result.GetResult<Prisma.$ProofOfEvolutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProofOfEvolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionCountArgs} args - Arguments to filter ProofOfEvolutions to count.
     * @example
     * // Count the number of ProofOfEvolutions
     * const count = await prisma.proofOfEvolution.count({
     *   where: {
     *     // ... the filter for the ProofOfEvolutions we want to count
     *   }
     * })
    **/
    count<T extends ProofOfEvolutionCountArgs>(
      args?: Subset<T, ProofOfEvolutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProofOfEvolutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProofOfEvolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProofOfEvolutionAggregateArgs>(args: Subset<T, ProofOfEvolutionAggregateArgs>): Prisma.PrismaPromise<GetProofOfEvolutionAggregateType<T>>

    /**
     * Group by ProofOfEvolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofOfEvolutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProofOfEvolutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProofOfEvolutionGroupByArgs['orderBy'] }
        : { orderBy?: ProofOfEvolutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProofOfEvolutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProofOfEvolutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProofOfEvolution model
   */
  readonly fields: ProofOfEvolutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProofOfEvolution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProofOfEvolutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persona<T extends AgentPersonaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersonaDefaultArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProofOfEvolution model
   */
  interface ProofOfEvolutionFieldRefs {
    readonly id: FieldRef<"ProofOfEvolution", 'String'>
    readonly evolutionType: FieldRef<"ProofOfEvolution", 'String'>
    readonly previousState: FieldRef<"ProofOfEvolution", 'Json'>
    readonly newState: FieldRef<"ProofOfEvolution", 'Json'>
    readonly changes: FieldRef<"ProofOfEvolution", 'Json'>
    readonly reasoning: FieldRef<"ProofOfEvolution", 'String'>
    readonly trigger: FieldRef<"ProofOfEvolution", 'String'>
    readonly version: FieldRef<"ProofOfEvolution", 'Int'>
    readonly isReversible: FieldRef<"ProofOfEvolution", 'Boolean'>
    readonly impactScore: FieldRef<"ProofOfEvolution", 'Float'>
    readonly merkleProof: FieldRef<"ProofOfEvolution", 'String'>
    readonly createdAt: FieldRef<"ProofOfEvolution", 'DateTime'>
    readonly personaId: FieldRef<"ProofOfEvolution", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProofOfEvolution findUnique
   */
  export type ProofOfEvolutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvolution to fetch.
     */
    where: ProofOfEvolutionWhereUniqueInput
  }

  /**
   * ProofOfEvolution findUniqueOrThrow
   */
  export type ProofOfEvolutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvolution to fetch.
     */
    where: ProofOfEvolutionWhereUniqueInput
  }

  /**
   * ProofOfEvolution findFirst
   */
  export type ProofOfEvolutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvolution to fetch.
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvolutions to fetch.
     */
    orderBy?: ProofOfEvolutionOrderByWithRelationInput | ProofOfEvolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfEvolutions.
     */
    cursor?: ProofOfEvolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfEvolutions.
     */
    distinct?: ProofOfEvolutionScalarFieldEnum | ProofOfEvolutionScalarFieldEnum[]
  }

  /**
   * ProofOfEvolution findFirstOrThrow
   */
  export type ProofOfEvolutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvolution to fetch.
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvolutions to fetch.
     */
    orderBy?: ProofOfEvolutionOrderByWithRelationInput | ProofOfEvolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProofOfEvolutions.
     */
    cursor?: ProofOfEvolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProofOfEvolutions.
     */
    distinct?: ProofOfEvolutionScalarFieldEnum | ProofOfEvolutionScalarFieldEnum[]
  }

  /**
   * ProofOfEvolution findMany
   */
  export type ProofOfEvolutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter, which ProofOfEvolutions to fetch.
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProofOfEvolutions to fetch.
     */
    orderBy?: ProofOfEvolutionOrderByWithRelationInput | ProofOfEvolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProofOfEvolutions.
     */
    cursor?: ProofOfEvolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProofOfEvolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProofOfEvolutions.
     */
    skip?: number
    distinct?: ProofOfEvolutionScalarFieldEnum | ProofOfEvolutionScalarFieldEnum[]
  }

  /**
   * ProofOfEvolution create
   */
  export type ProofOfEvolutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProofOfEvolution.
     */
    data: XOR<ProofOfEvolutionCreateInput, ProofOfEvolutionUncheckedCreateInput>
  }

  /**
   * ProofOfEvolution createMany
   */
  export type ProofOfEvolutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProofOfEvolutions.
     */
    data: ProofOfEvolutionCreateManyInput | ProofOfEvolutionCreateManyInput[]
  }

  /**
   * ProofOfEvolution createManyAndReturn
   */
  export type ProofOfEvolutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * The data used to create many ProofOfEvolutions.
     */
    data: ProofOfEvolutionCreateManyInput | ProofOfEvolutionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfEvolution update
   */
  export type ProofOfEvolutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProofOfEvolution.
     */
    data: XOR<ProofOfEvolutionUpdateInput, ProofOfEvolutionUncheckedUpdateInput>
    /**
     * Choose, which ProofOfEvolution to update.
     */
    where: ProofOfEvolutionWhereUniqueInput
  }

  /**
   * ProofOfEvolution updateMany
   */
  export type ProofOfEvolutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProofOfEvolutions.
     */
    data: XOR<ProofOfEvolutionUpdateManyMutationInput, ProofOfEvolutionUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfEvolutions to update
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * Limit how many ProofOfEvolutions to update.
     */
    limit?: number
  }

  /**
   * ProofOfEvolution updateManyAndReturn
   */
  export type ProofOfEvolutionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * The data used to update ProofOfEvolutions.
     */
    data: XOR<ProofOfEvolutionUpdateManyMutationInput, ProofOfEvolutionUncheckedUpdateManyInput>
    /**
     * Filter which ProofOfEvolutions to update
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * Limit how many ProofOfEvolutions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProofOfEvolution upsert
   */
  export type ProofOfEvolutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProofOfEvolution to update in case it exists.
     */
    where: ProofOfEvolutionWhereUniqueInput
    /**
     * In case the ProofOfEvolution found by the `where` argument doesn't exist, create a new ProofOfEvolution with this data.
     */
    create: XOR<ProofOfEvolutionCreateInput, ProofOfEvolutionUncheckedCreateInput>
    /**
     * In case the ProofOfEvolution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProofOfEvolutionUpdateInput, ProofOfEvolutionUncheckedUpdateInput>
  }

  /**
   * ProofOfEvolution delete
   */
  export type ProofOfEvolutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
    /**
     * Filter which ProofOfEvolution to delete.
     */
    where: ProofOfEvolutionWhereUniqueInput
  }

  /**
   * ProofOfEvolution deleteMany
   */
  export type ProofOfEvolutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProofOfEvolutions to delete
     */
    where?: ProofOfEvolutionWhereInput
    /**
     * Limit how many ProofOfEvolutions to delete.
     */
    limit?: number
  }

  /**
   * ProofOfEvolution without action
   */
  export type ProofOfEvolutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProofOfEvolution
     */
    select?: ProofOfEvolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProofOfEvolution
     */
    omit?: ProofOfEvolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofOfEvolutionInclude<ExtArgs> | null
  }


  /**
   * Model MemorySnapshot
   */

  export type AggregateMemorySnapshot = {
    _count: MemorySnapshotCountAggregateOutputType | null
    _avg: MemorySnapshotAvgAggregateOutputType | null
    _sum: MemorySnapshotSumAggregateOutputType | null
    _min: MemorySnapshotMinAggregateOutputType | null
    _max: MemorySnapshotMaxAggregateOutputType | null
  }

  export type MemorySnapshotAvgAggregateOutputType = {
    nodeCount: number | null
    sizeBytes: number | null
  }

  export type MemorySnapshotSumAggregateOutputType = {
    nodeCount: number | null
    sizeBytes: bigint | null
  }

  export type MemorySnapshotMinAggregateOutputType = {
    id: string | null
    snapshotType: string | null
    merkleRoot: string | null
    nodeCount: number | null
    sizeBytes: bigint | null
    compressionMethod: string | null
    isCompressed: boolean | null
    description: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type MemorySnapshotMaxAggregateOutputType = {
    id: string | null
    snapshotType: string | null
    merkleRoot: string | null
    nodeCount: number | null
    sizeBytes: bigint | null
    compressionMethod: string | null
    isCompressed: boolean | null
    description: string | null
    createdAt: Date | null
    personaId: string | null
  }

  export type MemorySnapshotCountAggregateOutputType = {
    id: number
    snapshotType: number
    memoryData: number
    merkleRoot: number
    merkleProofs: number
    nodeCount: number
    sizeBytes: number
    compressionMethod: number
    isCompressed: number
    description: number
    metadata: number
    createdAt: number
    personaId: number
    _all: number
  }


  export type MemorySnapshotAvgAggregateInputType = {
    nodeCount?: true
    sizeBytes?: true
  }

  export type MemorySnapshotSumAggregateInputType = {
    nodeCount?: true
    sizeBytes?: true
  }

  export type MemorySnapshotMinAggregateInputType = {
    id?: true
    snapshotType?: true
    merkleRoot?: true
    nodeCount?: true
    sizeBytes?: true
    compressionMethod?: true
    isCompressed?: true
    description?: true
    createdAt?: true
    personaId?: true
  }

  export type MemorySnapshotMaxAggregateInputType = {
    id?: true
    snapshotType?: true
    merkleRoot?: true
    nodeCount?: true
    sizeBytes?: true
    compressionMethod?: true
    isCompressed?: true
    description?: true
    createdAt?: true
    personaId?: true
  }

  export type MemorySnapshotCountAggregateInputType = {
    id?: true
    snapshotType?: true
    memoryData?: true
    merkleRoot?: true
    merkleProofs?: true
    nodeCount?: true
    sizeBytes?: true
    compressionMethod?: true
    isCompressed?: true
    description?: true
    metadata?: true
    createdAt?: true
    personaId?: true
    _all?: true
  }

  export type MemorySnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemorySnapshot to aggregate.
     */
    where?: MemorySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemorySnapshots to fetch.
     */
    orderBy?: MemorySnapshotOrderByWithRelationInput | MemorySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemorySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemorySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemorySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemorySnapshots
    **/
    _count?: true | MemorySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemorySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemorySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemorySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemorySnapshotMaxAggregateInputType
  }

  export type GetMemorySnapshotAggregateType<T extends MemorySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMemorySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemorySnapshot[P]>
      : GetScalarType<T[P], AggregateMemorySnapshot[P]>
  }




  export type MemorySnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemorySnapshotWhereInput
    orderBy?: MemorySnapshotOrderByWithAggregationInput | MemorySnapshotOrderByWithAggregationInput[]
    by: MemorySnapshotScalarFieldEnum[] | MemorySnapshotScalarFieldEnum
    having?: MemorySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemorySnapshotCountAggregateInputType | true
    _avg?: MemorySnapshotAvgAggregateInputType
    _sum?: MemorySnapshotSumAggregateInputType
    _min?: MemorySnapshotMinAggregateInputType
    _max?: MemorySnapshotMaxAggregateInputType
  }

  export type MemorySnapshotGroupByOutputType = {
    id: string
    snapshotType: string
    memoryData: JsonValue
    merkleRoot: string
    merkleProofs: JsonValue | null
    nodeCount: number
    sizeBytes: bigint
    compressionMethod: string | null
    isCompressed: boolean
    description: string | null
    metadata: JsonValue | null
    createdAt: Date
    personaId: string
    _count: MemorySnapshotCountAggregateOutputType | null
    _avg: MemorySnapshotAvgAggregateOutputType | null
    _sum: MemorySnapshotSumAggregateOutputType | null
    _min: MemorySnapshotMinAggregateOutputType | null
    _max: MemorySnapshotMaxAggregateOutputType | null
  }

  type GetMemorySnapshotGroupByPayload<T extends MemorySnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemorySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemorySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemorySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MemorySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MemorySnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotType?: boolean
    memoryData?: boolean
    merkleRoot?: boolean
    merkleProofs?: boolean
    nodeCount?: boolean
    sizeBytes?: boolean
    compressionMethod?: boolean
    isCompressed?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memorySnapshot"]>

  export type MemorySnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotType?: boolean
    memoryData?: boolean
    merkleRoot?: boolean
    merkleProofs?: boolean
    nodeCount?: boolean
    sizeBytes?: boolean
    compressionMethod?: boolean
    isCompressed?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memorySnapshot"]>

  export type MemorySnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotType?: boolean
    memoryData?: boolean
    merkleRoot?: boolean
    merkleProofs?: boolean
    nodeCount?: boolean
    sizeBytes?: boolean
    compressionMethod?: boolean
    isCompressed?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    personaId?: boolean
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memorySnapshot"]>

  export type MemorySnapshotSelectScalar = {
    id?: boolean
    snapshotType?: boolean
    memoryData?: boolean
    merkleRoot?: boolean
    merkleProofs?: boolean
    nodeCount?: boolean
    sizeBytes?: boolean
    compressionMethod?: boolean
    isCompressed?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    personaId?: boolean
  }

  export type MemorySnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "snapshotType" | "memoryData" | "merkleRoot" | "merkleProofs" | "nodeCount" | "sizeBytes" | "compressionMethod" | "isCompressed" | "description" | "metadata" | "createdAt" | "personaId", ExtArgs["result"]["memorySnapshot"]>
  export type MemorySnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type MemorySnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }
  export type MemorySnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | AgentPersonaDefaultArgs<ExtArgs>
  }

  export type $MemorySnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemorySnapshot"
    objects: {
      persona: Prisma.$AgentPersonaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapshotType: string
      memoryData: Prisma.JsonValue
      merkleRoot: string
      merkleProofs: Prisma.JsonValue | null
      nodeCount: number
      sizeBytes: bigint
      compressionMethod: string | null
      isCompressed: boolean
      description: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      personaId: string
    }, ExtArgs["result"]["memorySnapshot"]>
    composites: {}
  }

  type MemorySnapshotGetPayload<S extends boolean | null | undefined | MemorySnapshotDefaultArgs> = $Result.GetResult<Prisma.$MemorySnapshotPayload, S>

  type MemorySnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemorySnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemorySnapshotCountAggregateInputType | true
    }

  export interface MemorySnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemorySnapshot'], meta: { name: 'MemorySnapshot' } }
    /**
     * Find zero or one MemorySnapshot that matches the filter.
     * @param {MemorySnapshotFindUniqueArgs} args - Arguments to find a MemorySnapshot
     * @example
     * // Get one MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemorySnapshotFindUniqueArgs>(args: SelectSubset<T, MemorySnapshotFindUniqueArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemorySnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemorySnapshotFindUniqueOrThrowArgs} args - Arguments to find a MemorySnapshot
     * @example
     * // Get one MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemorySnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MemorySnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemorySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotFindFirstArgs} args - Arguments to find a MemorySnapshot
     * @example
     * // Get one MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemorySnapshotFindFirstArgs>(args?: SelectSubset<T, MemorySnapshotFindFirstArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemorySnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotFindFirstOrThrowArgs} args - Arguments to find a MemorySnapshot
     * @example
     * // Get one MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemorySnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MemorySnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemorySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemorySnapshots
     * const memorySnapshots = await prisma.memorySnapshot.findMany()
     * 
     * // Get first 10 MemorySnapshots
     * const memorySnapshots = await prisma.memorySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memorySnapshotWithIdOnly = await prisma.memorySnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemorySnapshotFindManyArgs>(args?: SelectSubset<T, MemorySnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemorySnapshot.
     * @param {MemorySnapshotCreateArgs} args - Arguments to create a MemorySnapshot.
     * @example
     * // Create one MemorySnapshot
     * const MemorySnapshot = await prisma.memorySnapshot.create({
     *   data: {
     *     // ... data to create a MemorySnapshot
     *   }
     * })
     * 
     */
    create<T extends MemorySnapshotCreateArgs>(args: SelectSubset<T, MemorySnapshotCreateArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemorySnapshots.
     * @param {MemorySnapshotCreateManyArgs} args - Arguments to create many MemorySnapshots.
     * @example
     * // Create many MemorySnapshots
     * const memorySnapshot = await prisma.memorySnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemorySnapshotCreateManyArgs>(args?: SelectSubset<T, MemorySnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemorySnapshots and returns the data saved in the database.
     * @param {MemorySnapshotCreateManyAndReturnArgs} args - Arguments to create many MemorySnapshots.
     * @example
     * // Create many MemorySnapshots
     * const memorySnapshot = await prisma.memorySnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemorySnapshots and only return the `id`
     * const memorySnapshotWithIdOnly = await prisma.memorySnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemorySnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, MemorySnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemorySnapshot.
     * @param {MemorySnapshotDeleteArgs} args - Arguments to delete one MemorySnapshot.
     * @example
     * // Delete one MemorySnapshot
     * const MemorySnapshot = await prisma.memorySnapshot.delete({
     *   where: {
     *     // ... filter to delete one MemorySnapshot
     *   }
     * })
     * 
     */
    delete<T extends MemorySnapshotDeleteArgs>(args: SelectSubset<T, MemorySnapshotDeleteArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemorySnapshot.
     * @param {MemorySnapshotUpdateArgs} args - Arguments to update one MemorySnapshot.
     * @example
     * // Update one MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemorySnapshotUpdateArgs>(args: SelectSubset<T, MemorySnapshotUpdateArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemorySnapshots.
     * @param {MemorySnapshotDeleteManyArgs} args - Arguments to filter MemorySnapshots to delete.
     * @example
     * // Delete a few MemorySnapshots
     * const { count } = await prisma.memorySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemorySnapshotDeleteManyArgs>(args?: SelectSubset<T, MemorySnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemorySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemorySnapshots
     * const memorySnapshot = await prisma.memorySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemorySnapshotUpdateManyArgs>(args: SelectSubset<T, MemorySnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemorySnapshots and returns the data updated in the database.
     * @param {MemorySnapshotUpdateManyAndReturnArgs} args - Arguments to update many MemorySnapshots.
     * @example
     * // Update many MemorySnapshots
     * const memorySnapshot = await prisma.memorySnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemorySnapshots and only return the `id`
     * const memorySnapshotWithIdOnly = await prisma.memorySnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemorySnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, MemorySnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemorySnapshot.
     * @param {MemorySnapshotUpsertArgs} args - Arguments to update or create a MemorySnapshot.
     * @example
     * // Update or create a MemorySnapshot
     * const memorySnapshot = await prisma.memorySnapshot.upsert({
     *   create: {
     *     // ... data to create a MemorySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemorySnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MemorySnapshotUpsertArgs>(args: SelectSubset<T, MemorySnapshotUpsertArgs<ExtArgs>>): Prisma__MemorySnapshotClient<$Result.GetResult<Prisma.$MemorySnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemorySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotCountArgs} args - Arguments to filter MemorySnapshots to count.
     * @example
     * // Count the number of MemorySnapshots
     * const count = await prisma.memorySnapshot.count({
     *   where: {
     *     // ... the filter for the MemorySnapshots we want to count
     *   }
     * })
    **/
    count<T extends MemorySnapshotCountArgs>(
      args?: Subset<T, MemorySnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemorySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemorySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemorySnapshotAggregateArgs>(args: Subset<T, MemorySnapshotAggregateArgs>): Prisma.PrismaPromise<GetMemorySnapshotAggregateType<T>>

    /**
     * Group by MemorySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemorySnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemorySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemorySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MemorySnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemorySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemorySnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemorySnapshot model
   */
  readonly fields: MemorySnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemorySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemorySnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persona<T extends AgentPersonaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentPersonaDefaultArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemorySnapshot model
   */
  interface MemorySnapshotFieldRefs {
    readonly id: FieldRef<"MemorySnapshot", 'String'>
    readonly snapshotType: FieldRef<"MemorySnapshot", 'String'>
    readonly memoryData: FieldRef<"MemorySnapshot", 'Json'>
    readonly merkleRoot: FieldRef<"MemorySnapshot", 'String'>
    readonly merkleProofs: FieldRef<"MemorySnapshot", 'Json'>
    readonly nodeCount: FieldRef<"MemorySnapshot", 'Int'>
    readonly sizeBytes: FieldRef<"MemorySnapshot", 'BigInt'>
    readonly compressionMethod: FieldRef<"MemorySnapshot", 'String'>
    readonly isCompressed: FieldRef<"MemorySnapshot", 'Boolean'>
    readonly description: FieldRef<"MemorySnapshot", 'String'>
    readonly metadata: FieldRef<"MemorySnapshot", 'Json'>
    readonly createdAt: FieldRef<"MemorySnapshot", 'DateTime'>
    readonly personaId: FieldRef<"MemorySnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MemorySnapshot findUnique
   */
  export type MemorySnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MemorySnapshot to fetch.
     */
    where: MemorySnapshotWhereUniqueInput
  }

  /**
   * MemorySnapshot findUniqueOrThrow
   */
  export type MemorySnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MemorySnapshot to fetch.
     */
    where: MemorySnapshotWhereUniqueInput
  }

  /**
   * MemorySnapshot findFirst
   */
  export type MemorySnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MemorySnapshot to fetch.
     */
    where?: MemorySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemorySnapshots to fetch.
     */
    orderBy?: MemorySnapshotOrderByWithRelationInput | MemorySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemorySnapshots.
     */
    cursor?: MemorySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemorySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemorySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemorySnapshots.
     */
    distinct?: MemorySnapshotScalarFieldEnum | MemorySnapshotScalarFieldEnum[]
  }

  /**
   * MemorySnapshot findFirstOrThrow
   */
  export type MemorySnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MemorySnapshot to fetch.
     */
    where?: MemorySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemorySnapshots to fetch.
     */
    orderBy?: MemorySnapshotOrderByWithRelationInput | MemorySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemorySnapshots.
     */
    cursor?: MemorySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemorySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemorySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemorySnapshots.
     */
    distinct?: MemorySnapshotScalarFieldEnum | MemorySnapshotScalarFieldEnum[]
  }

  /**
   * MemorySnapshot findMany
   */
  export type MemorySnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MemorySnapshots to fetch.
     */
    where?: MemorySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemorySnapshots to fetch.
     */
    orderBy?: MemorySnapshotOrderByWithRelationInput | MemorySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemorySnapshots.
     */
    cursor?: MemorySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemorySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemorySnapshots.
     */
    skip?: number
    distinct?: MemorySnapshotScalarFieldEnum | MemorySnapshotScalarFieldEnum[]
  }

  /**
   * MemorySnapshot create
   */
  export type MemorySnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a MemorySnapshot.
     */
    data: XOR<MemorySnapshotCreateInput, MemorySnapshotUncheckedCreateInput>
  }

  /**
   * MemorySnapshot createMany
   */
  export type MemorySnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemorySnapshots.
     */
    data: MemorySnapshotCreateManyInput | MemorySnapshotCreateManyInput[]
  }

  /**
   * MemorySnapshot createManyAndReturn
   */
  export type MemorySnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many MemorySnapshots.
     */
    data: MemorySnapshotCreateManyInput | MemorySnapshotCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemorySnapshot update
   */
  export type MemorySnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a MemorySnapshot.
     */
    data: XOR<MemorySnapshotUpdateInput, MemorySnapshotUncheckedUpdateInput>
    /**
     * Choose, which MemorySnapshot to update.
     */
    where: MemorySnapshotWhereUniqueInput
  }

  /**
   * MemorySnapshot updateMany
   */
  export type MemorySnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemorySnapshots.
     */
    data: XOR<MemorySnapshotUpdateManyMutationInput, MemorySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MemorySnapshots to update
     */
    where?: MemorySnapshotWhereInput
    /**
     * Limit how many MemorySnapshots to update.
     */
    limit?: number
  }

  /**
   * MemorySnapshot updateManyAndReturn
   */
  export type MemorySnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * The data used to update MemorySnapshots.
     */
    data: XOR<MemorySnapshotUpdateManyMutationInput, MemorySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MemorySnapshots to update
     */
    where?: MemorySnapshotWhereInput
    /**
     * Limit how many MemorySnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemorySnapshot upsert
   */
  export type MemorySnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the MemorySnapshot to update in case it exists.
     */
    where: MemorySnapshotWhereUniqueInput
    /**
     * In case the MemorySnapshot found by the `where` argument doesn't exist, create a new MemorySnapshot with this data.
     */
    create: XOR<MemorySnapshotCreateInput, MemorySnapshotUncheckedCreateInput>
    /**
     * In case the MemorySnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemorySnapshotUpdateInput, MemorySnapshotUncheckedUpdateInput>
  }

  /**
   * MemorySnapshot delete
   */
  export type MemorySnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
    /**
     * Filter which MemorySnapshot to delete.
     */
    where: MemorySnapshotWhereUniqueInput
  }

  /**
   * MemorySnapshot deleteMany
   */
  export type MemorySnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemorySnapshots to delete
     */
    where?: MemorySnapshotWhereInput
    /**
     * Limit how many MemorySnapshots to delete.
     */
    limit?: number
  }

  /**
   * MemorySnapshot without action
   */
  export type MemorySnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemorySnapshot
     */
    select?: MemorySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemorySnapshot
     */
    omit?: MemorySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemorySnapshotInclude<ExtArgs> | null
  }


  /**
   * Model SolanaTransaction
   */

  export type AggregateSolanaTransaction = {
    _count: SolanaTransactionCountAggregateOutputType | null
    _avg: SolanaTransactionAvgAggregateOutputType | null
    _sum: SolanaTransactionSumAggregateOutputType | null
    _min: SolanaTransactionMinAggregateOutputType | null
    _max: SolanaTransactionMaxAggregateOutputType | null
  }

  export type SolanaTransactionAvgAggregateOutputType = {
    slot: number | null
    confirmations: number | null
    fee: number | null
  }

  export type SolanaTransactionSumAggregateOutputType = {
    slot: number | null
    confirmations: number | null
    fee: bigint | null
  }

  export type SolanaTransactionMinAggregateOutputType = {
    id: string | null
    transactionHash: string | null
    agentWallet: string | null
    blockNumber: string | null
    blockTime: Date | null
    slot: number | null
    status: string | null
    confirmations: number | null
    fee: bigint | null
    memo: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SolanaTransactionMaxAggregateOutputType = {
    id: string | null
    transactionHash: string | null
    agentWallet: string | null
    blockNumber: string | null
    blockTime: Date | null
    slot: number | null
    status: string | null
    confirmations: number | null
    fee: bigint | null
    memo: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SolanaTransactionCountAggregateOutputType = {
    id: number
    transactionHash: number
    agentWallet: number
    blockNumber: number
    blockTime: number
    slot: number
    status: number
    confirmations: number
    instructions: number
    accountKeys: number
    fee: number
    memo: number
    logs: number
    errorMessage: number
    balanceChanges: number
    tokenBalanceChanges: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SolanaTransactionAvgAggregateInputType = {
    slot?: true
    confirmations?: true
    fee?: true
  }

  export type SolanaTransactionSumAggregateInputType = {
    slot?: true
    confirmations?: true
    fee?: true
  }

  export type SolanaTransactionMinAggregateInputType = {
    id?: true
    transactionHash?: true
    agentWallet?: true
    blockNumber?: true
    blockTime?: true
    slot?: true
    status?: true
    confirmations?: true
    fee?: true
    memo?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SolanaTransactionMaxAggregateInputType = {
    id?: true
    transactionHash?: true
    agentWallet?: true
    blockNumber?: true
    blockTime?: true
    slot?: true
    status?: true
    confirmations?: true
    fee?: true
    memo?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SolanaTransactionCountAggregateInputType = {
    id?: true
    transactionHash?: true
    agentWallet?: true
    blockNumber?: true
    blockTime?: true
    slot?: true
    status?: true
    confirmations?: true
    instructions?: true
    accountKeys?: true
    fee?: true
    memo?: true
    logs?: true
    errorMessage?: true
    balanceChanges?: true
    tokenBalanceChanges?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SolanaTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SolanaTransaction to aggregate.
     */
    where?: SolanaTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolanaTransactions to fetch.
     */
    orderBy?: SolanaTransactionOrderByWithRelationInput | SolanaTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SolanaTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolanaTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolanaTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SolanaTransactions
    **/
    _count?: true | SolanaTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SolanaTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SolanaTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SolanaTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SolanaTransactionMaxAggregateInputType
  }

  export type GetSolanaTransactionAggregateType<T extends SolanaTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateSolanaTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSolanaTransaction[P]>
      : GetScalarType<T[P], AggregateSolanaTransaction[P]>
  }




  export type SolanaTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolanaTransactionWhereInput
    orderBy?: SolanaTransactionOrderByWithAggregationInput | SolanaTransactionOrderByWithAggregationInput[]
    by: SolanaTransactionScalarFieldEnum[] | SolanaTransactionScalarFieldEnum
    having?: SolanaTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SolanaTransactionCountAggregateInputType | true
    _avg?: SolanaTransactionAvgAggregateInputType
    _sum?: SolanaTransactionSumAggregateInputType
    _min?: SolanaTransactionMinAggregateInputType
    _max?: SolanaTransactionMaxAggregateInputType
  }

  export type SolanaTransactionGroupByOutputType = {
    id: string
    transactionHash: string
    agentWallet: string | null
    blockNumber: string | null
    blockTime: Date | null
    slot: number
    status: string
    confirmations: number | null
    instructions: JsonValue | null
    accountKeys: JsonValue | null
    fee: bigint
    memo: string | null
    logs: JsonValue | null
    errorMessage: string | null
    balanceChanges: JsonValue | null
    tokenBalanceChanges: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SolanaTransactionCountAggregateOutputType | null
    _avg: SolanaTransactionAvgAggregateOutputType | null
    _sum: SolanaTransactionSumAggregateOutputType | null
    _min: SolanaTransactionMinAggregateOutputType | null
    _max: SolanaTransactionMaxAggregateOutputType | null
  }

  type GetSolanaTransactionGroupByPayload<T extends SolanaTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SolanaTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SolanaTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SolanaTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], SolanaTransactionGroupByOutputType[P]>
        }
      >
    >


  export type SolanaTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionHash?: boolean
    agentWallet?: boolean
    blockNumber?: boolean
    blockTime?: boolean
    slot?: boolean
    status?: boolean
    confirmations?: boolean
    instructions?: boolean
    accountKeys?: boolean
    fee?: boolean
    memo?: boolean
    logs?: boolean
    errorMessage?: boolean
    balanceChanges?: boolean
    tokenBalanceChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["solanaTransaction"]>

  export type SolanaTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionHash?: boolean
    agentWallet?: boolean
    blockNumber?: boolean
    blockTime?: boolean
    slot?: boolean
    status?: boolean
    confirmations?: boolean
    instructions?: boolean
    accountKeys?: boolean
    fee?: boolean
    memo?: boolean
    logs?: boolean
    errorMessage?: boolean
    balanceChanges?: boolean
    tokenBalanceChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["solanaTransaction"]>

  export type SolanaTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionHash?: boolean
    agentWallet?: boolean
    blockNumber?: boolean
    blockTime?: boolean
    slot?: boolean
    status?: boolean
    confirmations?: boolean
    instructions?: boolean
    accountKeys?: boolean
    fee?: boolean
    memo?: boolean
    logs?: boolean
    errorMessage?: boolean
    balanceChanges?: boolean
    tokenBalanceChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["solanaTransaction"]>

  export type SolanaTransactionSelectScalar = {
    id?: boolean
    transactionHash?: boolean
    agentWallet?: boolean
    blockNumber?: boolean
    blockTime?: boolean
    slot?: boolean
    status?: boolean
    confirmations?: boolean
    instructions?: boolean
    accountKeys?: boolean
    fee?: boolean
    memo?: boolean
    logs?: boolean
    errorMessage?: boolean
    balanceChanges?: boolean
    tokenBalanceChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SolanaTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionHash" | "agentWallet" | "blockNumber" | "blockTime" | "slot" | "status" | "confirmations" | "instructions" | "accountKeys" | "fee" | "memo" | "logs" | "errorMessage" | "balanceChanges" | "tokenBalanceChanges" | "createdAt" | "updatedAt", ExtArgs["result"]["solanaTransaction"]>

  export type $SolanaTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SolanaTransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionHash: string
      agentWallet: string | null
      blockNumber: string | null
      blockTime: Date | null
      slot: number
      status: string
      confirmations: number | null
      instructions: Prisma.JsonValue | null
      accountKeys: Prisma.JsonValue | null
      fee: bigint
      memo: string | null
      logs: Prisma.JsonValue | null
      errorMessage: string | null
      balanceChanges: Prisma.JsonValue | null
      tokenBalanceChanges: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["solanaTransaction"]>
    composites: {}
  }

  type SolanaTransactionGetPayload<S extends boolean | null | undefined | SolanaTransactionDefaultArgs> = $Result.GetResult<Prisma.$SolanaTransactionPayload, S>

  type SolanaTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SolanaTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SolanaTransactionCountAggregateInputType | true
    }

  export interface SolanaTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SolanaTransaction'], meta: { name: 'SolanaTransaction' } }
    /**
     * Find zero or one SolanaTransaction that matches the filter.
     * @param {SolanaTransactionFindUniqueArgs} args - Arguments to find a SolanaTransaction
     * @example
     * // Get one SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SolanaTransactionFindUniqueArgs>(args: SelectSubset<T, SolanaTransactionFindUniqueArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SolanaTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SolanaTransactionFindUniqueOrThrowArgs} args - Arguments to find a SolanaTransaction
     * @example
     * // Get one SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SolanaTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, SolanaTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SolanaTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionFindFirstArgs} args - Arguments to find a SolanaTransaction
     * @example
     * // Get one SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SolanaTransactionFindFirstArgs>(args?: SelectSubset<T, SolanaTransactionFindFirstArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SolanaTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionFindFirstOrThrowArgs} args - Arguments to find a SolanaTransaction
     * @example
     * // Get one SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SolanaTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, SolanaTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SolanaTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SolanaTransactions
     * const solanaTransactions = await prisma.solanaTransaction.findMany()
     * 
     * // Get first 10 SolanaTransactions
     * const solanaTransactions = await prisma.solanaTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const solanaTransactionWithIdOnly = await prisma.solanaTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SolanaTransactionFindManyArgs>(args?: SelectSubset<T, SolanaTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SolanaTransaction.
     * @param {SolanaTransactionCreateArgs} args - Arguments to create a SolanaTransaction.
     * @example
     * // Create one SolanaTransaction
     * const SolanaTransaction = await prisma.solanaTransaction.create({
     *   data: {
     *     // ... data to create a SolanaTransaction
     *   }
     * })
     * 
     */
    create<T extends SolanaTransactionCreateArgs>(args: SelectSubset<T, SolanaTransactionCreateArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SolanaTransactions.
     * @param {SolanaTransactionCreateManyArgs} args - Arguments to create many SolanaTransactions.
     * @example
     * // Create many SolanaTransactions
     * const solanaTransaction = await prisma.solanaTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SolanaTransactionCreateManyArgs>(args?: SelectSubset<T, SolanaTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SolanaTransactions and returns the data saved in the database.
     * @param {SolanaTransactionCreateManyAndReturnArgs} args - Arguments to create many SolanaTransactions.
     * @example
     * // Create many SolanaTransactions
     * const solanaTransaction = await prisma.solanaTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SolanaTransactions and only return the `id`
     * const solanaTransactionWithIdOnly = await prisma.solanaTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SolanaTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, SolanaTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SolanaTransaction.
     * @param {SolanaTransactionDeleteArgs} args - Arguments to delete one SolanaTransaction.
     * @example
     * // Delete one SolanaTransaction
     * const SolanaTransaction = await prisma.solanaTransaction.delete({
     *   where: {
     *     // ... filter to delete one SolanaTransaction
     *   }
     * })
     * 
     */
    delete<T extends SolanaTransactionDeleteArgs>(args: SelectSubset<T, SolanaTransactionDeleteArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SolanaTransaction.
     * @param {SolanaTransactionUpdateArgs} args - Arguments to update one SolanaTransaction.
     * @example
     * // Update one SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SolanaTransactionUpdateArgs>(args: SelectSubset<T, SolanaTransactionUpdateArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SolanaTransactions.
     * @param {SolanaTransactionDeleteManyArgs} args - Arguments to filter SolanaTransactions to delete.
     * @example
     * // Delete a few SolanaTransactions
     * const { count } = await prisma.solanaTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SolanaTransactionDeleteManyArgs>(args?: SelectSubset<T, SolanaTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SolanaTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SolanaTransactions
     * const solanaTransaction = await prisma.solanaTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SolanaTransactionUpdateManyArgs>(args: SelectSubset<T, SolanaTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SolanaTransactions and returns the data updated in the database.
     * @param {SolanaTransactionUpdateManyAndReturnArgs} args - Arguments to update many SolanaTransactions.
     * @example
     * // Update many SolanaTransactions
     * const solanaTransaction = await prisma.solanaTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SolanaTransactions and only return the `id`
     * const solanaTransactionWithIdOnly = await prisma.solanaTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SolanaTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, SolanaTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SolanaTransaction.
     * @param {SolanaTransactionUpsertArgs} args - Arguments to update or create a SolanaTransaction.
     * @example
     * // Update or create a SolanaTransaction
     * const solanaTransaction = await prisma.solanaTransaction.upsert({
     *   create: {
     *     // ... data to create a SolanaTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SolanaTransaction we want to update
     *   }
     * })
     */
    upsert<T extends SolanaTransactionUpsertArgs>(args: SelectSubset<T, SolanaTransactionUpsertArgs<ExtArgs>>): Prisma__SolanaTransactionClient<$Result.GetResult<Prisma.$SolanaTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SolanaTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionCountArgs} args - Arguments to filter SolanaTransactions to count.
     * @example
     * // Count the number of SolanaTransactions
     * const count = await prisma.solanaTransaction.count({
     *   where: {
     *     // ... the filter for the SolanaTransactions we want to count
     *   }
     * })
    **/
    count<T extends SolanaTransactionCountArgs>(
      args?: Subset<T, SolanaTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SolanaTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SolanaTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SolanaTransactionAggregateArgs>(args: Subset<T, SolanaTransactionAggregateArgs>): Prisma.PrismaPromise<GetSolanaTransactionAggregateType<T>>

    /**
     * Group by SolanaTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolanaTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SolanaTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SolanaTransactionGroupByArgs['orderBy'] }
        : { orderBy?: SolanaTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SolanaTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolanaTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SolanaTransaction model
   */
  readonly fields: SolanaTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SolanaTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SolanaTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SolanaTransaction model
   */
  interface SolanaTransactionFieldRefs {
    readonly id: FieldRef<"SolanaTransaction", 'String'>
    readonly transactionHash: FieldRef<"SolanaTransaction", 'String'>
    readonly agentWallet: FieldRef<"SolanaTransaction", 'String'>
    readonly blockNumber: FieldRef<"SolanaTransaction", 'String'>
    readonly blockTime: FieldRef<"SolanaTransaction", 'DateTime'>
    readonly slot: FieldRef<"SolanaTransaction", 'Int'>
    readonly status: FieldRef<"SolanaTransaction", 'String'>
    readonly confirmations: FieldRef<"SolanaTransaction", 'Int'>
    readonly instructions: FieldRef<"SolanaTransaction", 'Json'>
    readonly accountKeys: FieldRef<"SolanaTransaction", 'Json'>
    readonly fee: FieldRef<"SolanaTransaction", 'BigInt'>
    readonly memo: FieldRef<"SolanaTransaction", 'String'>
    readonly logs: FieldRef<"SolanaTransaction", 'Json'>
    readonly errorMessage: FieldRef<"SolanaTransaction", 'String'>
    readonly balanceChanges: FieldRef<"SolanaTransaction", 'Json'>
    readonly tokenBalanceChanges: FieldRef<"SolanaTransaction", 'Json'>
    readonly createdAt: FieldRef<"SolanaTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"SolanaTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SolanaTransaction findUnique
   */
  export type SolanaTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter, which SolanaTransaction to fetch.
     */
    where: SolanaTransactionWhereUniqueInput
  }

  /**
   * SolanaTransaction findUniqueOrThrow
   */
  export type SolanaTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter, which SolanaTransaction to fetch.
     */
    where: SolanaTransactionWhereUniqueInput
  }

  /**
   * SolanaTransaction findFirst
   */
  export type SolanaTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter, which SolanaTransaction to fetch.
     */
    where?: SolanaTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolanaTransactions to fetch.
     */
    orderBy?: SolanaTransactionOrderByWithRelationInput | SolanaTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SolanaTransactions.
     */
    cursor?: SolanaTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolanaTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolanaTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SolanaTransactions.
     */
    distinct?: SolanaTransactionScalarFieldEnum | SolanaTransactionScalarFieldEnum[]
  }

  /**
   * SolanaTransaction findFirstOrThrow
   */
  export type SolanaTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter, which SolanaTransaction to fetch.
     */
    where?: SolanaTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolanaTransactions to fetch.
     */
    orderBy?: SolanaTransactionOrderByWithRelationInput | SolanaTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SolanaTransactions.
     */
    cursor?: SolanaTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolanaTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolanaTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SolanaTransactions.
     */
    distinct?: SolanaTransactionScalarFieldEnum | SolanaTransactionScalarFieldEnum[]
  }

  /**
   * SolanaTransaction findMany
   */
  export type SolanaTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter, which SolanaTransactions to fetch.
     */
    where?: SolanaTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolanaTransactions to fetch.
     */
    orderBy?: SolanaTransactionOrderByWithRelationInput | SolanaTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SolanaTransactions.
     */
    cursor?: SolanaTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolanaTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolanaTransactions.
     */
    skip?: number
    distinct?: SolanaTransactionScalarFieldEnum | SolanaTransactionScalarFieldEnum[]
  }

  /**
   * SolanaTransaction create
   */
  export type SolanaTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a SolanaTransaction.
     */
    data: XOR<SolanaTransactionCreateInput, SolanaTransactionUncheckedCreateInput>
  }

  /**
   * SolanaTransaction createMany
   */
  export type SolanaTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SolanaTransactions.
     */
    data: SolanaTransactionCreateManyInput | SolanaTransactionCreateManyInput[]
  }

  /**
   * SolanaTransaction createManyAndReturn
   */
  export type SolanaTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many SolanaTransactions.
     */
    data: SolanaTransactionCreateManyInput | SolanaTransactionCreateManyInput[]
  }

  /**
   * SolanaTransaction update
   */
  export type SolanaTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a SolanaTransaction.
     */
    data: XOR<SolanaTransactionUpdateInput, SolanaTransactionUncheckedUpdateInput>
    /**
     * Choose, which SolanaTransaction to update.
     */
    where: SolanaTransactionWhereUniqueInput
  }

  /**
   * SolanaTransaction updateMany
   */
  export type SolanaTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SolanaTransactions.
     */
    data: XOR<SolanaTransactionUpdateManyMutationInput, SolanaTransactionUncheckedUpdateManyInput>
    /**
     * Filter which SolanaTransactions to update
     */
    where?: SolanaTransactionWhereInput
    /**
     * Limit how many SolanaTransactions to update.
     */
    limit?: number
  }

  /**
   * SolanaTransaction updateManyAndReturn
   */
  export type SolanaTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * The data used to update SolanaTransactions.
     */
    data: XOR<SolanaTransactionUpdateManyMutationInput, SolanaTransactionUncheckedUpdateManyInput>
    /**
     * Filter which SolanaTransactions to update
     */
    where?: SolanaTransactionWhereInput
    /**
     * Limit how many SolanaTransactions to update.
     */
    limit?: number
  }

  /**
   * SolanaTransaction upsert
   */
  export type SolanaTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the SolanaTransaction to update in case it exists.
     */
    where: SolanaTransactionWhereUniqueInput
    /**
     * In case the SolanaTransaction found by the `where` argument doesn't exist, create a new SolanaTransaction with this data.
     */
    create: XOR<SolanaTransactionCreateInput, SolanaTransactionUncheckedCreateInput>
    /**
     * In case the SolanaTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SolanaTransactionUpdateInput, SolanaTransactionUncheckedUpdateInput>
  }

  /**
   * SolanaTransaction delete
   */
  export type SolanaTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
    /**
     * Filter which SolanaTransaction to delete.
     */
    where: SolanaTransactionWhereUniqueInput
  }

  /**
   * SolanaTransaction deleteMany
   */
  export type SolanaTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SolanaTransactions to delete
     */
    where?: SolanaTransactionWhereInput
    /**
     * Limit how many SolanaTransactions to delete.
     */
    limit?: number
  }

  /**
   * SolanaTransaction without action
   */
  export type SolanaTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolanaTransaction
     */
    select?: SolanaTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolanaTransaction
     */
    omit?: SolanaTransactionOmit<ExtArgs> | null
  }


  /**
   * Model TokenMetadata
   */

  export type AggregateTokenMetadata = {
    _count: TokenMetadataCountAggregateOutputType | null
    _avg: TokenMetadataAvgAggregateOutputType | null
    _sum: TokenMetadataSumAggregateOutputType | null
    _min: TokenMetadataMinAggregateOutputType | null
    _max: TokenMetadataMaxAggregateOutputType | null
  }

  export type TokenMetadataAvgAggregateOutputType = {
    decimals: number | null
    totalSupply: number | null
    circulatingSupply: number | null
    price: number | null
    marketCap: number | null
    volume24h: number | null
    priceChange24h: number | null
  }

  export type TokenMetadataSumAggregateOutputType = {
    decimals: number | null
    totalSupply: number | null
    circulatingSupply: number | null
    price: number | null
    marketCap: number | null
    volume24h: number | null
    priceChange24h: number | null
  }

  export type TokenMetadataMinAggregateOutputType = {
    id: string | null
    mintAddress: string | null
    name: string | null
    symbol: string | null
    description: string | null
    logoUri: string | null
    decimals: number | null
    totalSupply: number | null
    circulatingSupply: number | null
    price: number | null
    marketCap: number | null
    volume24h: number | null
    priceChange24h: number | null
    website: string | null
    isActive: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenMetadataMaxAggregateOutputType = {
    id: string | null
    mintAddress: string | null
    name: string | null
    symbol: string | null
    description: string | null
    logoUri: string | null
    decimals: number | null
    totalSupply: number | null
    circulatingSupply: number | null
    price: number | null
    marketCap: number | null
    volume24h: number | null
    priceChange24h: number | null
    website: string | null
    isActive: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenMetadataCountAggregateOutputType = {
    id: number
    mintAddress: number
    name: number
    symbol: number
    description: number
    logoUri: number
    decimals: number
    totalSupply: number
    circulatingSupply: number
    price: number
    marketCap: number
    volume24h: number
    priceChange24h: number
    social: number
    website: number
    isActive: number
    isVerified: number
    tags: number
    extensions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenMetadataAvgAggregateInputType = {
    decimals?: true
    totalSupply?: true
    circulatingSupply?: true
    price?: true
    marketCap?: true
    volume24h?: true
    priceChange24h?: true
  }

  export type TokenMetadataSumAggregateInputType = {
    decimals?: true
    totalSupply?: true
    circulatingSupply?: true
    price?: true
    marketCap?: true
    volume24h?: true
    priceChange24h?: true
  }

  export type TokenMetadataMinAggregateInputType = {
    id?: true
    mintAddress?: true
    name?: true
    symbol?: true
    description?: true
    logoUri?: true
    decimals?: true
    totalSupply?: true
    circulatingSupply?: true
    price?: true
    marketCap?: true
    volume24h?: true
    priceChange24h?: true
    website?: true
    isActive?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenMetadataMaxAggregateInputType = {
    id?: true
    mintAddress?: true
    name?: true
    symbol?: true
    description?: true
    logoUri?: true
    decimals?: true
    totalSupply?: true
    circulatingSupply?: true
    price?: true
    marketCap?: true
    volume24h?: true
    priceChange24h?: true
    website?: true
    isActive?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenMetadataCountAggregateInputType = {
    id?: true
    mintAddress?: true
    name?: true
    symbol?: true
    description?: true
    logoUri?: true
    decimals?: true
    totalSupply?: true
    circulatingSupply?: true
    price?: true
    marketCap?: true
    volume24h?: true
    priceChange24h?: true
    social?: true
    website?: true
    isActive?: true
    isVerified?: true
    tags?: true
    extensions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenMetadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenMetadata to aggregate.
     */
    where?: TokenMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenMetadata to fetch.
     */
    orderBy?: TokenMetadataOrderByWithRelationInput | TokenMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenMetadata
    **/
    _count?: true | TokenMetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenMetadataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenMetadataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMetadataMaxAggregateInputType
  }

  export type GetTokenMetadataAggregateType<T extends TokenMetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenMetadata[P]>
      : GetScalarType<T[P], AggregateTokenMetadata[P]>
  }




  export type TokenMetadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenMetadataWhereInput
    orderBy?: TokenMetadataOrderByWithAggregationInput | TokenMetadataOrderByWithAggregationInput[]
    by: TokenMetadataScalarFieldEnum[] | TokenMetadataScalarFieldEnum
    having?: TokenMetadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenMetadataCountAggregateInputType | true
    _avg?: TokenMetadataAvgAggregateInputType
    _sum?: TokenMetadataSumAggregateInputType
    _min?: TokenMetadataMinAggregateInputType
    _max?: TokenMetadataMaxAggregateInputType
  }

  export type TokenMetadataGroupByOutputType = {
    id: string
    mintAddress: string
    name: string | null
    symbol: string | null
    description: string | null
    logoUri: string | null
    decimals: number
    totalSupply: number | null
    circulatingSupply: number | null
    price: number | null
    marketCap: number | null
    volume24h: number | null
    priceChange24h: number | null
    social: JsonValue | null
    website: string | null
    isActive: boolean
    isVerified: boolean
    tags: JsonValue | null
    extensions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: TokenMetadataCountAggregateOutputType | null
    _avg: TokenMetadataAvgAggregateOutputType | null
    _sum: TokenMetadataSumAggregateOutputType | null
    _min: TokenMetadataMinAggregateOutputType | null
    _max: TokenMetadataMaxAggregateOutputType | null
  }

  type GetTokenMetadataGroupByPayload<T extends TokenMetadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenMetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenMetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenMetadataGroupByOutputType[P]>
            : GetScalarType<T[P], TokenMetadataGroupByOutputType[P]>
        }
      >
    >


  export type TokenMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mintAddress?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    logoUri?: boolean
    decimals?: boolean
    totalSupply?: boolean
    circulatingSupply?: boolean
    price?: boolean
    marketCap?: boolean
    volume24h?: boolean
    priceChange24h?: boolean
    social?: boolean
    website?: boolean
    isActive?: boolean
    isVerified?: boolean
    tags?: boolean
    extensions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tokenMetadata"]>

  export type TokenMetadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mintAddress?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    logoUri?: boolean
    decimals?: boolean
    totalSupply?: boolean
    circulatingSupply?: boolean
    price?: boolean
    marketCap?: boolean
    volume24h?: boolean
    priceChange24h?: boolean
    social?: boolean
    website?: boolean
    isActive?: boolean
    isVerified?: boolean
    tags?: boolean
    extensions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tokenMetadata"]>

  export type TokenMetadataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mintAddress?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    logoUri?: boolean
    decimals?: boolean
    totalSupply?: boolean
    circulatingSupply?: boolean
    price?: boolean
    marketCap?: boolean
    volume24h?: boolean
    priceChange24h?: boolean
    social?: boolean
    website?: boolean
    isActive?: boolean
    isVerified?: boolean
    tags?: boolean
    extensions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tokenMetadata"]>

  export type TokenMetadataSelectScalar = {
    id?: boolean
    mintAddress?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    logoUri?: boolean
    decimals?: boolean
    totalSupply?: boolean
    circulatingSupply?: boolean
    price?: boolean
    marketCap?: boolean
    volume24h?: boolean
    priceChange24h?: boolean
    social?: boolean
    website?: boolean
    isActive?: boolean
    isVerified?: boolean
    tags?: boolean
    extensions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenMetadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mintAddress" | "name" | "symbol" | "description" | "logoUri" | "decimals" | "totalSupply" | "circulatingSupply" | "price" | "marketCap" | "volume24h" | "priceChange24h" | "social" | "website" | "isActive" | "isVerified" | "tags" | "extensions" | "createdAt" | "updatedAt", ExtArgs["result"]["tokenMetadata"]>

  export type $TokenMetadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenMetadata"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mintAddress: string
      name: string | null
      symbol: string | null
      description: string | null
      logoUri: string | null
      decimals: number
      totalSupply: number | null
      circulatingSupply: number | null
      price: number | null
      marketCap: number | null
      volume24h: number | null
      priceChange24h: number | null
      social: Prisma.JsonValue | null
      website: string | null
      isActive: boolean
      isVerified: boolean
      tags: Prisma.JsonValue | null
      extensions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tokenMetadata"]>
    composites: {}
  }

  type TokenMetadataGetPayload<S extends boolean | null | undefined | TokenMetadataDefaultArgs> = $Result.GetResult<Prisma.$TokenMetadataPayload, S>

  type TokenMetadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenMetadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenMetadataCountAggregateInputType | true
    }

  export interface TokenMetadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenMetadata'], meta: { name: 'TokenMetadata' } }
    /**
     * Find zero or one TokenMetadata that matches the filter.
     * @param {TokenMetadataFindUniqueArgs} args - Arguments to find a TokenMetadata
     * @example
     * // Get one TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenMetadataFindUniqueArgs>(args: SelectSubset<T, TokenMetadataFindUniqueArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenMetadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenMetadataFindUniqueOrThrowArgs} args - Arguments to find a TokenMetadata
     * @example
     * // Get one TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenMetadataFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenMetadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataFindFirstArgs} args - Arguments to find a TokenMetadata
     * @example
     * // Get one TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenMetadataFindFirstArgs>(args?: SelectSubset<T, TokenMetadataFindFirstArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenMetadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataFindFirstOrThrowArgs} args - Arguments to find a TokenMetadata
     * @example
     * // Get one TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenMetadataFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenMetadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findMany()
     * 
     * // Get first 10 TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenMetadataWithIdOnly = await prisma.tokenMetadata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenMetadataFindManyArgs>(args?: SelectSubset<T, TokenMetadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenMetadata.
     * @param {TokenMetadataCreateArgs} args - Arguments to create a TokenMetadata.
     * @example
     * // Create one TokenMetadata
     * const TokenMetadata = await prisma.tokenMetadata.create({
     *   data: {
     *     // ... data to create a TokenMetadata
     *   }
     * })
     * 
     */
    create<T extends TokenMetadataCreateArgs>(args: SelectSubset<T, TokenMetadataCreateArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenMetadata.
     * @param {TokenMetadataCreateManyArgs} args - Arguments to create many TokenMetadata.
     * @example
     * // Create many TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenMetadataCreateManyArgs>(args?: SelectSubset<T, TokenMetadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenMetadata and returns the data saved in the database.
     * @param {TokenMetadataCreateManyAndReturnArgs} args - Arguments to create many TokenMetadata.
     * @example
     * // Create many TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenMetadata and only return the `id`
     * const tokenMetadataWithIdOnly = await prisma.tokenMetadata.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenMetadataCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenMetadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenMetadata.
     * @param {TokenMetadataDeleteArgs} args - Arguments to delete one TokenMetadata.
     * @example
     * // Delete one TokenMetadata
     * const TokenMetadata = await prisma.tokenMetadata.delete({
     *   where: {
     *     // ... filter to delete one TokenMetadata
     *   }
     * })
     * 
     */
    delete<T extends TokenMetadataDeleteArgs>(args: SelectSubset<T, TokenMetadataDeleteArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenMetadata.
     * @param {TokenMetadataUpdateArgs} args - Arguments to update one TokenMetadata.
     * @example
     * // Update one TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenMetadataUpdateArgs>(args: SelectSubset<T, TokenMetadataUpdateArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenMetadata.
     * @param {TokenMetadataDeleteManyArgs} args - Arguments to filter TokenMetadata to delete.
     * @example
     * // Delete a few TokenMetadata
     * const { count } = await prisma.tokenMetadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenMetadataDeleteManyArgs>(args?: SelectSubset<T, TokenMetadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenMetadataUpdateManyArgs>(args: SelectSubset<T, TokenMetadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenMetadata and returns the data updated in the database.
     * @param {TokenMetadataUpdateManyAndReturnArgs} args - Arguments to update many TokenMetadata.
     * @example
     * // Update many TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenMetadata and only return the `id`
     * const tokenMetadataWithIdOnly = await prisma.tokenMetadata.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenMetadataUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenMetadataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenMetadata.
     * @param {TokenMetadataUpsertArgs} args - Arguments to update or create a TokenMetadata.
     * @example
     * // Update or create a TokenMetadata
     * const tokenMetadata = await prisma.tokenMetadata.upsert({
     *   create: {
     *     // ... data to create a TokenMetadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenMetadata we want to update
     *   }
     * })
     */
    upsert<T extends TokenMetadataUpsertArgs>(args: SelectSubset<T, TokenMetadataUpsertArgs<ExtArgs>>): Prisma__TokenMetadataClient<$Result.GetResult<Prisma.$TokenMetadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataCountArgs} args - Arguments to filter TokenMetadata to count.
     * @example
     * // Count the number of TokenMetadata
     * const count = await prisma.tokenMetadata.count({
     *   where: {
     *     // ... the filter for the TokenMetadata we want to count
     *   }
     * })
    **/
    count<T extends TokenMetadataCountArgs>(
      args?: Subset<T, TokenMetadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenMetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenMetadataAggregateArgs>(args: Subset<T, TokenMetadataAggregateArgs>): Prisma.PrismaPromise<GetTokenMetadataAggregateType<T>>

    /**
     * Group by TokenMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenMetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenMetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenMetadataGroupByArgs['orderBy'] }
        : { orderBy?: TokenMetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenMetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenMetadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenMetadata model
   */
  readonly fields: TokenMetadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenMetadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenMetadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenMetadata model
   */
  interface TokenMetadataFieldRefs {
    readonly id: FieldRef<"TokenMetadata", 'String'>
    readonly mintAddress: FieldRef<"TokenMetadata", 'String'>
    readonly name: FieldRef<"TokenMetadata", 'String'>
    readonly symbol: FieldRef<"TokenMetadata", 'String'>
    readonly description: FieldRef<"TokenMetadata", 'String'>
    readonly logoUri: FieldRef<"TokenMetadata", 'String'>
    readonly decimals: FieldRef<"TokenMetadata", 'Int'>
    readonly totalSupply: FieldRef<"TokenMetadata", 'Float'>
    readonly circulatingSupply: FieldRef<"TokenMetadata", 'Float'>
    readonly price: FieldRef<"TokenMetadata", 'Float'>
    readonly marketCap: FieldRef<"TokenMetadata", 'Float'>
    readonly volume24h: FieldRef<"TokenMetadata", 'Float'>
    readonly priceChange24h: FieldRef<"TokenMetadata", 'Float'>
    readonly social: FieldRef<"TokenMetadata", 'Json'>
    readonly website: FieldRef<"TokenMetadata", 'String'>
    readonly isActive: FieldRef<"TokenMetadata", 'Boolean'>
    readonly isVerified: FieldRef<"TokenMetadata", 'Boolean'>
    readonly tags: FieldRef<"TokenMetadata", 'Json'>
    readonly extensions: FieldRef<"TokenMetadata", 'Json'>
    readonly createdAt: FieldRef<"TokenMetadata", 'DateTime'>
    readonly updatedAt: FieldRef<"TokenMetadata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenMetadata findUnique
   */
  export type TokenMetadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter, which TokenMetadata to fetch.
     */
    where: TokenMetadataWhereUniqueInput
  }

  /**
   * TokenMetadata findUniqueOrThrow
   */
  export type TokenMetadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter, which TokenMetadata to fetch.
     */
    where: TokenMetadataWhereUniqueInput
  }

  /**
   * TokenMetadata findFirst
   */
  export type TokenMetadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter, which TokenMetadata to fetch.
     */
    where?: TokenMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenMetadata to fetch.
     */
    orderBy?: TokenMetadataOrderByWithRelationInput | TokenMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenMetadata.
     */
    cursor?: TokenMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenMetadata.
     */
    distinct?: TokenMetadataScalarFieldEnum | TokenMetadataScalarFieldEnum[]
  }

  /**
   * TokenMetadata findFirstOrThrow
   */
  export type TokenMetadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter, which TokenMetadata to fetch.
     */
    where?: TokenMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenMetadata to fetch.
     */
    orderBy?: TokenMetadataOrderByWithRelationInput | TokenMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenMetadata.
     */
    cursor?: TokenMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenMetadata.
     */
    distinct?: TokenMetadataScalarFieldEnum | TokenMetadataScalarFieldEnum[]
  }

  /**
   * TokenMetadata findMany
   */
  export type TokenMetadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter, which TokenMetadata to fetch.
     */
    where?: TokenMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenMetadata to fetch.
     */
    orderBy?: TokenMetadataOrderByWithRelationInput | TokenMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenMetadata.
     */
    cursor?: TokenMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenMetadata.
     */
    skip?: number
    distinct?: TokenMetadataScalarFieldEnum | TokenMetadataScalarFieldEnum[]
  }

  /**
   * TokenMetadata create
   */
  export type TokenMetadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * The data needed to create a TokenMetadata.
     */
    data: XOR<TokenMetadataCreateInput, TokenMetadataUncheckedCreateInput>
  }

  /**
   * TokenMetadata createMany
   */
  export type TokenMetadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenMetadata.
     */
    data: TokenMetadataCreateManyInput | TokenMetadataCreateManyInput[]
  }

  /**
   * TokenMetadata createManyAndReturn
   */
  export type TokenMetadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * The data used to create many TokenMetadata.
     */
    data: TokenMetadataCreateManyInput | TokenMetadataCreateManyInput[]
  }

  /**
   * TokenMetadata update
   */
  export type TokenMetadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * The data needed to update a TokenMetadata.
     */
    data: XOR<TokenMetadataUpdateInput, TokenMetadataUncheckedUpdateInput>
    /**
     * Choose, which TokenMetadata to update.
     */
    where: TokenMetadataWhereUniqueInput
  }

  /**
   * TokenMetadata updateMany
   */
  export type TokenMetadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenMetadata.
     */
    data: XOR<TokenMetadataUpdateManyMutationInput, TokenMetadataUncheckedUpdateManyInput>
    /**
     * Filter which TokenMetadata to update
     */
    where?: TokenMetadataWhereInput
    /**
     * Limit how many TokenMetadata to update.
     */
    limit?: number
  }

  /**
   * TokenMetadata updateManyAndReturn
   */
  export type TokenMetadataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * The data used to update TokenMetadata.
     */
    data: XOR<TokenMetadataUpdateManyMutationInput, TokenMetadataUncheckedUpdateManyInput>
    /**
     * Filter which TokenMetadata to update
     */
    where?: TokenMetadataWhereInput
    /**
     * Limit how many TokenMetadata to update.
     */
    limit?: number
  }

  /**
   * TokenMetadata upsert
   */
  export type TokenMetadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * The filter to search for the TokenMetadata to update in case it exists.
     */
    where: TokenMetadataWhereUniqueInput
    /**
     * In case the TokenMetadata found by the `where` argument doesn't exist, create a new TokenMetadata with this data.
     */
    create: XOR<TokenMetadataCreateInput, TokenMetadataUncheckedCreateInput>
    /**
     * In case the TokenMetadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenMetadataUpdateInput, TokenMetadataUncheckedUpdateInput>
  }

  /**
   * TokenMetadata delete
   */
  export type TokenMetadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
    /**
     * Filter which TokenMetadata to delete.
     */
    where: TokenMetadataWhereUniqueInput
  }

  /**
   * TokenMetadata deleteMany
   */
  export type TokenMetadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenMetadata to delete
     */
    where?: TokenMetadataWhereInput
    /**
     * Limit how many TokenMetadata to delete.
     */
    limit?: number
  }

  /**
   * TokenMetadata without action
   */
  export type TokenMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenMetadata
     */
    select?: TokenMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenMetadata
     */
    omit?: TokenMetadataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgentPersonaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    walletAddress: 'walletAddress',
    description: 'description',
    personality: 'personality',
    traits: 'traits',
    avatar: 'avatar',
    merkleRoot: 'merkleRoot',
    evolutionLevel: 'evolutionLevel',
    experiencePoints: 'experiencePoints',
    memoryData: 'memoryData',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentPersonaScalarFieldEnum = (typeof AgentPersonaScalarFieldEnum)[keyof typeof AgentPersonaScalarFieldEnum]


  export const ProofOfActionScalarFieldEnum: {
    id: 'id',
    actionType: 'actionType',
    actionData: 'actionData',
    actionParameters: 'actionParameters',
    transactionHash: 'transactionHash',
    blockNumber: 'blockNumber',
    amount: 'amount',
    tokenAddress: 'tokenAddress',
    result: 'result',
    isSuccessful: 'isSuccessful',
    gasUsed: 'gasUsed',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    personaId: 'personaId'
  };

  export type ProofOfActionScalarFieldEnum = (typeof ProofOfActionScalarFieldEnum)[keyof typeof ProofOfActionScalarFieldEnum]


  export const ProofOfEvidenceScalarFieldEnum: {
    id: 'id',
    evidenceType: 'evidenceType',
    evidenceData: 'evidenceData',
    sourceType: 'sourceType',
    sourceUrl: 'sourceUrl',
    hash: 'hash',
    metadata: 'metadata',
    isVerified: 'isVerified',
    confidenceScore: 'confidenceScore',
    verificationMethod: 'verificationMethod',
    createdAt: 'createdAt',
    personaId: 'personaId'
  };

  export type ProofOfEvidenceScalarFieldEnum = (typeof ProofOfEvidenceScalarFieldEnum)[keyof typeof ProofOfEvidenceScalarFieldEnum]


  export const ProofOfEvolutionScalarFieldEnum: {
    id: 'id',
    evolutionType: 'evolutionType',
    previousState: 'previousState',
    newState: 'newState',
    changes: 'changes',
    reasoning: 'reasoning',
    trigger: 'trigger',
    version: 'version',
    isReversible: 'isReversible',
    impactScore: 'impactScore',
    merkleProof: 'merkleProof',
    createdAt: 'createdAt',
    personaId: 'personaId'
  };

  export type ProofOfEvolutionScalarFieldEnum = (typeof ProofOfEvolutionScalarFieldEnum)[keyof typeof ProofOfEvolutionScalarFieldEnum]


  export const MemorySnapshotScalarFieldEnum: {
    id: 'id',
    snapshotType: 'snapshotType',
    memoryData: 'memoryData',
    merkleRoot: 'merkleRoot',
    merkleProofs: 'merkleProofs',
    nodeCount: 'nodeCount',
    sizeBytes: 'sizeBytes',
    compressionMethod: 'compressionMethod',
    isCompressed: 'isCompressed',
    description: 'description',
    metadata: 'metadata',
    createdAt: 'createdAt',
    personaId: 'personaId'
  };

  export type MemorySnapshotScalarFieldEnum = (typeof MemorySnapshotScalarFieldEnum)[keyof typeof MemorySnapshotScalarFieldEnum]


  export const SolanaTransactionScalarFieldEnum: {
    id: 'id',
    transactionHash: 'transactionHash',
    agentWallet: 'agentWallet',
    blockNumber: 'blockNumber',
    blockTime: 'blockTime',
    slot: 'slot',
    status: 'status',
    confirmations: 'confirmations',
    instructions: 'instructions',
    accountKeys: 'accountKeys',
    fee: 'fee',
    memo: 'memo',
    logs: 'logs',
    errorMessage: 'errorMessage',
    balanceChanges: 'balanceChanges',
    tokenBalanceChanges: 'tokenBalanceChanges',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SolanaTransactionScalarFieldEnum = (typeof SolanaTransactionScalarFieldEnum)[keyof typeof SolanaTransactionScalarFieldEnum]


  export const TokenMetadataScalarFieldEnum: {
    id: 'id',
    mintAddress: 'mintAddress',
    name: 'name',
    symbol: 'symbol',
    description: 'description',
    logoUri: 'logoUri',
    decimals: 'decimals',
    totalSupply: 'totalSupply',
    circulatingSupply: 'circulatingSupply',
    price: 'price',
    marketCap: 'marketCap',
    volume24h: 'volume24h',
    priceChange24h: 'priceChange24h',
    social: 'social',
    website: 'website',
    isActive: 'isActive',
    isVerified: 'isVerified',
    tags: 'tags',
    extensions: 'extensions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenMetadataScalarFieldEnum = (typeof TokenMetadataScalarFieldEnum)[keyof typeof TokenMetadataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    
  /**
   * Deep Input Types
   */


  export type AgentPersonaWhereInput = {
    AND?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    OR?: AgentPersonaWhereInput[]
    NOT?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    id?: StringFilter<"AgentPersona"> | string
    name?: StringFilter<"AgentPersona"> | string
    walletAddress?: StringNullableFilter<"AgentPersona"> | string | null
    description?: StringNullableFilter<"AgentPersona"> | string | null
    personality?: JsonNullableFilter<"AgentPersona">
    traits?: JsonNullableFilter<"AgentPersona">
    avatar?: StringNullableFilter<"AgentPersona"> | string | null
    merkleRoot?: StringNullableFilter<"AgentPersona"> | string | null
    evolutionLevel?: IntFilter<"AgentPersona"> | number
    experiencePoints?: FloatFilter<"AgentPersona"> | number
    memoryData?: JsonNullableFilter<"AgentPersona">
    isActive?: BoolFilter<"AgentPersona"> | boolean
    createdAt?: DateTimeFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeFilter<"AgentPersona"> | Date | string
    proofsOfAction?: ProofOfActionListRelationFilter
    proofsOfEvidence?: ProofOfEvidenceListRelationFilter
    proofsOfEvolution?: ProofOfEvolutionListRelationFilter
    memorySnapshots?: MemorySnapshotListRelationFilter
  }

  export type AgentPersonaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    traits?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    merkleRoot?: SortOrderInput | SortOrder
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
    memoryData?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    proofsOfAction?: ProofOfActionOrderByRelationAggregateInput
    proofsOfEvidence?: ProofOfEvidenceOrderByRelationAggregateInput
    proofsOfEvolution?: ProofOfEvolutionOrderByRelationAggregateInput
    memorySnapshots?: MemorySnapshotOrderByRelationAggregateInput
  }

  export type AgentPersonaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    OR?: AgentPersonaWhereInput[]
    NOT?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    walletAddress?: StringNullableFilter<"AgentPersona"> | string | null
    description?: StringNullableFilter<"AgentPersona"> | string | null
    personality?: JsonNullableFilter<"AgentPersona">
    traits?: JsonNullableFilter<"AgentPersona">
    avatar?: StringNullableFilter<"AgentPersona"> | string | null
    merkleRoot?: StringNullableFilter<"AgentPersona"> | string | null
    evolutionLevel?: IntFilter<"AgentPersona"> | number
    experiencePoints?: FloatFilter<"AgentPersona"> | number
    memoryData?: JsonNullableFilter<"AgentPersona">
    isActive?: BoolFilter<"AgentPersona"> | boolean
    createdAt?: DateTimeFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeFilter<"AgentPersona"> | Date | string
    proofsOfAction?: ProofOfActionListRelationFilter
    proofsOfEvidence?: ProofOfEvidenceListRelationFilter
    proofsOfEvolution?: ProofOfEvolutionListRelationFilter
    memorySnapshots?: MemorySnapshotListRelationFilter
  }, "id" | "name">

  export type AgentPersonaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    traits?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    merkleRoot?: SortOrderInput | SortOrder
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
    memoryData?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentPersonaCountOrderByAggregateInput
    _avg?: AgentPersonaAvgOrderByAggregateInput
    _max?: AgentPersonaMaxOrderByAggregateInput
    _min?: AgentPersonaMinOrderByAggregateInput
    _sum?: AgentPersonaSumOrderByAggregateInput
  }

  export type AgentPersonaScalarWhereWithAggregatesInput = {
    AND?: AgentPersonaScalarWhereWithAggregatesInput | AgentPersonaScalarWhereWithAggregatesInput[]
    OR?: AgentPersonaScalarWhereWithAggregatesInput[]
    NOT?: AgentPersonaScalarWhereWithAggregatesInput | AgentPersonaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentPersona"> | string
    name?: StringWithAggregatesFilter<"AgentPersona"> | string
    walletAddress?: StringNullableWithAggregatesFilter<"AgentPersona"> | string | null
    description?: StringNullableWithAggregatesFilter<"AgentPersona"> | string | null
    personality?: JsonNullableWithAggregatesFilter<"AgentPersona">
    traits?: JsonNullableWithAggregatesFilter<"AgentPersona">
    avatar?: StringNullableWithAggregatesFilter<"AgentPersona"> | string | null
    merkleRoot?: StringNullableWithAggregatesFilter<"AgentPersona"> | string | null
    evolutionLevel?: IntWithAggregatesFilter<"AgentPersona"> | number
    experiencePoints?: FloatWithAggregatesFilter<"AgentPersona"> | number
    memoryData?: JsonNullableWithAggregatesFilter<"AgentPersona">
    isActive?: BoolWithAggregatesFilter<"AgentPersona"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AgentPersona"> | Date | string
  }

  export type ProofOfActionWhereInput = {
    AND?: ProofOfActionWhereInput | ProofOfActionWhereInput[]
    OR?: ProofOfActionWhereInput[]
    NOT?: ProofOfActionWhereInput | ProofOfActionWhereInput[]
    id?: StringFilter<"ProofOfAction"> | string
    actionType?: StringFilter<"ProofOfAction"> | string
    actionData?: StringFilter<"ProofOfAction"> | string
    actionParameters?: JsonNullableFilter<"ProofOfAction">
    transactionHash?: StringNullableFilter<"ProofOfAction"> | string | null
    blockNumber?: StringNullableFilter<"ProofOfAction"> | string | null
    amount?: FloatNullableFilter<"ProofOfAction"> | number | null
    tokenAddress?: StringNullableFilter<"ProofOfAction"> | string | null
    result?: StringNullableFilter<"ProofOfAction"> | string | null
    isSuccessful?: BoolFilter<"ProofOfAction"> | boolean
    gasUsed?: IntNullableFilter<"ProofOfAction"> | number | null
    errorMessage?: StringNullableFilter<"ProofOfAction"> | string | null
    createdAt?: DateTimeFilter<"ProofOfAction"> | Date | string
    personaId?: StringFilter<"ProofOfAction"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }

  export type ProofOfActionOrderByWithRelationInput = {
    id?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    actionParameters?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    tokenAddress?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    isSuccessful?: SortOrder
    gasUsed?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    persona?: AgentPersonaOrderByWithRelationInput
  }

  export type ProofOfActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProofOfActionWhereInput | ProofOfActionWhereInput[]
    OR?: ProofOfActionWhereInput[]
    NOT?: ProofOfActionWhereInput | ProofOfActionWhereInput[]
    actionType?: StringFilter<"ProofOfAction"> | string
    actionData?: StringFilter<"ProofOfAction"> | string
    actionParameters?: JsonNullableFilter<"ProofOfAction">
    transactionHash?: StringNullableFilter<"ProofOfAction"> | string | null
    blockNumber?: StringNullableFilter<"ProofOfAction"> | string | null
    amount?: FloatNullableFilter<"ProofOfAction"> | number | null
    tokenAddress?: StringNullableFilter<"ProofOfAction"> | string | null
    result?: StringNullableFilter<"ProofOfAction"> | string | null
    isSuccessful?: BoolFilter<"ProofOfAction"> | boolean
    gasUsed?: IntNullableFilter<"ProofOfAction"> | number | null
    errorMessage?: StringNullableFilter<"ProofOfAction"> | string | null
    createdAt?: DateTimeFilter<"ProofOfAction"> | Date | string
    personaId?: StringFilter<"ProofOfAction"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }, "id">

  export type ProofOfActionOrderByWithAggregationInput = {
    id?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    actionParameters?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    tokenAddress?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    isSuccessful?: SortOrder
    gasUsed?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    _count?: ProofOfActionCountOrderByAggregateInput
    _avg?: ProofOfActionAvgOrderByAggregateInput
    _max?: ProofOfActionMaxOrderByAggregateInput
    _min?: ProofOfActionMinOrderByAggregateInput
    _sum?: ProofOfActionSumOrderByAggregateInput
  }

  export type ProofOfActionScalarWhereWithAggregatesInput = {
    AND?: ProofOfActionScalarWhereWithAggregatesInput | ProofOfActionScalarWhereWithAggregatesInput[]
    OR?: ProofOfActionScalarWhereWithAggregatesInput[]
    NOT?: ProofOfActionScalarWhereWithAggregatesInput | ProofOfActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProofOfAction"> | string
    actionType?: StringWithAggregatesFilter<"ProofOfAction"> | string
    actionData?: StringWithAggregatesFilter<"ProofOfAction"> | string
    actionParameters?: JsonNullableWithAggregatesFilter<"ProofOfAction">
    transactionHash?: StringNullableWithAggregatesFilter<"ProofOfAction"> | string | null
    blockNumber?: StringNullableWithAggregatesFilter<"ProofOfAction"> | string | null
    amount?: FloatNullableWithAggregatesFilter<"ProofOfAction"> | number | null
    tokenAddress?: StringNullableWithAggregatesFilter<"ProofOfAction"> | string | null
    result?: StringNullableWithAggregatesFilter<"ProofOfAction"> | string | null
    isSuccessful?: BoolWithAggregatesFilter<"ProofOfAction"> | boolean
    gasUsed?: IntNullableWithAggregatesFilter<"ProofOfAction"> | number | null
    errorMessage?: StringNullableWithAggregatesFilter<"ProofOfAction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProofOfAction"> | Date | string
    personaId?: StringWithAggregatesFilter<"ProofOfAction"> | string
  }

  export type ProofOfEvidenceWhereInput = {
    AND?: ProofOfEvidenceWhereInput | ProofOfEvidenceWhereInput[]
    OR?: ProofOfEvidenceWhereInput[]
    NOT?: ProofOfEvidenceWhereInput | ProofOfEvidenceWhereInput[]
    id?: StringFilter<"ProofOfEvidence"> | string
    evidenceType?: StringFilter<"ProofOfEvidence"> | string
    evidenceData?: StringFilter<"ProofOfEvidence"> | string
    sourceType?: StringNullableFilter<"ProofOfEvidence"> | string | null
    sourceUrl?: StringNullableFilter<"ProofOfEvidence"> | string | null
    hash?: StringNullableFilter<"ProofOfEvidence"> | string | null
    metadata?: JsonNullableFilter<"ProofOfEvidence">
    isVerified?: BoolFilter<"ProofOfEvidence"> | boolean
    confidenceScore?: FloatFilter<"ProofOfEvidence"> | number
    verificationMethod?: StringNullableFilter<"ProofOfEvidence"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvidence"> | Date | string
    personaId?: StringFilter<"ProofOfEvidence"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }

  export type ProofOfEvidenceOrderByWithRelationInput = {
    id?: SortOrder
    evidenceType?: SortOrder
    evidenceData?: SortOrder
    sourceType?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    confidenceScore?: SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    persona?: AgentPersonaOrderByWithRelationInput
  }

  export type ProofOfEvidenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProofOfEvidenceWhereInput | ProofOfEvidenceWhereInput[]
    OR?: ProofOfEvidenceWhereInput[]
    NOT?: ProofOfEvidenceWhereInput | ProofOfEvidenceWhereInput[]
    evidenceType?: StringFilter<"ProofOfEvidence"> | string
    evidenceData?: StringFilter<"ProofOfEvidence"> | string
    sourceType?: StringNullableFilter<"ProofOfEvidence"> | string | null
    sourceUrl?: StringNullableFilter<"ProofOfEvidence"> | string | null
    hash?: StringNullableFilter<"ProofOfEvidence"> | string | null
    metadata?: JsonNullableFilter<"ProofOfEvidence">
    isVerified?: BoolFilter<"ProofOfEvidence"> | boolean
    confidenceScore?: FloatFilter<"ProofOfEvidence"> | number
    verificationMethod?: StringNullableFilter<"ProofOfEvidence"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvidence"> | Date | string
    personaId?: StringFilter<"ProofOfEvidence"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }, "id">

  export type ProofOfEvidenceOrderByWithAggregationInput = {
    id?: SortOrder
    evidenceType?: SortOrder
    evidenceData?: SortOrder
    sourceType?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    confidenceScore?: SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    _count?: ProofOfEvidenceCountOrderByAggregateInput
    _avg?: ProofOfEvidenceAvgOrderByAggregateInput
    _max?: ProofOfEvidenceMaxOrderByAggregateInput
    _min?: ProofOfEvidenceMinOrderByAggregateInput
    _sum?: ProofOfEvidenceSumOrderByAggregateInput
  }

  export type ProofOfEvidenceScalarWhereWithAggregatesInput = {
    AND?: ProofOfEvidenceScalarWhereWithAggregatesInput | ProofOfEvidenceScalarWhereWithAggregatesInput[]
    OR?: ProofOfEvidenceScalarWhereWithAggregatesInput[]
    NOT?: ProofOfEvidenceScalarWhereWithAggregatesInput | ProofOfEvidenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProofOfEvidence"> | string
    evidenceType?: StringWithAggregatesFilter<"ProofOfEvidence"> | string
    evidenceData?: StringWithAggregatesFilter<"ProofOfEvidence"> | string
    sourceType?: StringNullableWithAggregatesFilter<"ProofOfEvidence"> | string | null
    sourceUrl?: StringNullableWithAggregatesFilter<"ProofOfEvidence"> | string | null
    hash?: StringNullableWithAggregatesFilter<"ProofOfEvidence"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"ProofOfEvidence">
    isVerified?: BoolWithAggregatesFilter<"ProofOfEvidence"> | boolean
    confidenceScore?: FloatWithAggregatesFilter<"ProofOfEvidence"> | number
    verificationMethod?: StringNullableWithAggregatesFilter<"ProofOfEvidence"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProofOfEvidence"> | Date | string
    personaId?: StringWithAggregatesFilter<"ProofOfEvidence"> | string
  }

  export type ProofOfEvolutionWhereInput = {
    AND?: ProofOfEvolutionWhereInput | ProofOfEvolutionWhereInput[]
    OR?: ProofOfEvolutionWhereInput[]
    NOT?: ProofOfEvolutionWhereInput | ProofOfEvolutionWhereInput[]
    id?: StringFilter<"ProofOfEvolution"> | string
    evolutionType?: StringFilter<"ProofOfEvolution"> | string
    previousState?: JsonFilter<"ProofOfEvolution">
    newState?: JsonFilter<"ProofOfEvolution">
    changes?: JsonFilter<"ProofOfEvolution">
    reasoning?: StringNullableFilter<"ProofOfEvolution"> | string | null
    trigger?: StringNullableFilter<"ProofOfEvolution"> | string | null
    version?: IntFilter<"ProofOfEvolution"> | number
    isReversible?: BoolFilter<"ProofOfEvolution"> | boolean
    impactScore?: FloatFilter<"ProofOfEvolution"> | number
    merkleProof?: StringNullableFilter<"ProofOfEvolution"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvolution"> | Date | string
    personaId?: StringFilter<"ProofOfEvolution"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }

  export type ProofOfEvolutionOrderByWithRelationInput = {
    id?: SortOrder
    evolutionType?: SortOrder
    previousState?: SortOrder
    newState?: SortOrder
    changes?: SortOrder
    reasoning?: SortOrderInput | SortOrder
    trigger?: SortOrderInput | SortOrder
    version?: SortOrder
    isReversible?: SortOrder
    impactScore?: SortOrder
    merkleProof?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    persona?: AgentPersonaOrderByWithRelationInput
  }

  export type ProofOfEvolutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProofOfEvolutionWhereInput | ProofOfEvolutionWhereInput[]
    OR?: ProofOfEvolutionWhereInput[]
    NOT?: ProofOfEvolutionWhereInput | ProofOfEvolutionWhereInput[]
    evolutionType?: StringFilter<"ProofOfEvolution"> | string
    previousState?: JsonFilter<"ProofOfEvolution">
    newState?: JsonFilter<"ProofOfEvolution">
    changes?: JsonFilter<"ProofOfEvolution">
    reasoning?: StringNullableFilter<"ProofOfEvolution"> | string | null
    trigger?: StringNullableFilter<"ProofOfEvolution"> | string | null
    version?: IntFilter<"ProofOfEvolution"> | number
    isReversible?: BoolFilter<"ProofOfEvolution"> | boolean
    impactScore?: FloatFilter<"ProofOfEvolution"> | number
    merkleProof?: StringNullableFilter<"ProofOfEvolution"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvolution"> | Date | string
    personaId?: StringFilter<"ProofOfEvolution"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }, "id">

  export type ProofOfEvolutionOrderByWithAggregationInput = {
    id?: SortOrder
    evolutionType?: SortOrder
    previousState?: SortOrder
    newState?: SortOrder
    changes?: SortOrder
    reasoning?: SortOrderInput | SortOrder
    trigger?: SortOrderInput | SortOrder
    version?: SortOrder
    isReversible?: SortOrder
    impactScore?: SortOrder
    merkleProof?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    _count?: ProofOfEvolutionCountOrderByAggregateInput
    _avg?: ProofOfEvolutionAvgOrderByAggregateInput
    _max?: ProofOfEvolutionMaxOrderByAggregateInput
    _min?: ProofOfEvolutionMinOrderByAggregateInput
    _sum?: ProofOfEvolutionSumOrderByAggregateInput
  }

  export type ProofOfEvolutionScalarWhereWithAggregatesInput = {
    AND?: ProofOfEvolutionScalarWhereWithAggregatesInput | ProofOfEvolutionScalarWhereWithAggregatesInput[]
    OR?: ProofOfEvolutionScalarWhereWithAggregatesInput[]
    NOT?: ProofOfEvolutionScalarWhereWithAggregatesInput | ProofOfEvolutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProofOfEvolution"> | string
    evolutionType?: StringWithAggregatesFilter<"ProofOfEvolution"> | string
    previousState?: JsonWithAggregatesFilter<"ProofOfEvolution">
    newState?: JsonWithAggregatesFilter<"ProofOfEvolution">
    changes?: JsonWithAggregatesFilter<"ProofOfEvolution">
    reasoning?: StringNullableWithAggregatesFilter<"ProofOfEvolution"> | string | null
    trigger?: StringNullableWithAggregatesFilter<"ProofOfEvolution"> | string | null
    version?: IntWithAggregatesFilter<"ProofOfEvolution"> | number
    isReversible?: BoolWithAggregatesFilter<"ProofOfEvolution"> | boolean
    impactScore?: FloatWithAggregatesFilter<"ProofOfEvolution"> | number
    merkleProof?: StringNullableWithAggregatesFilter<"ProofOfEvolution"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProofOfEvolution"> | Date | string
    personaId?: StringWithAggregatesFilter<"ProofOfEvolution"> | string
  }

  export type MemorySnapshotWhereInput = {
    AND?: MemorySnapshotWhereInput | MemorySnapshotWhereInput[]
    OR?: MemorySnapshotWhereInput[]
    NOT?: MemorySnapshotWhereInput | MemorySnapshotWhereInput[]
    id?: StringFilter<"MemorySnapshot"> | string
    snapshotType?: StringFilter<"MemorySnapshot"> | string
    memoryData?: JsonFilter<"MemorySnapshot">
    merkleRoot?: StringFilter<"MemorySnapshot"> | string
    merkleProofs?: JsonNullableFilter<"MemorySnapshot">
    nodeCount?: IntFilter<"MemorySnapshot"> | number
    sizeBytes?: BigIntFilter<"MemorySnapshot"> | bigint | number
    compressionMethod?: StringNullableFilter<"MemorySnapshot"> | string | null
    isCompressed?: BoolFilter<"MemorySnapshot"> | boolean
    description?: StringNullableFilter<"MemorySnapshot"> | string | null
    metadata?: JsonNullableFilter<"MemorySnapshot">
    createdAt?: DateTimeFilter<"MemorySnapshot"> | Date | string
    personaId?: StringFilter<"MemorySnapshot"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }

  export type MemorySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    snapshotType?: SortOrder
    memoryData?: SortOrder
    merkleRoot?: SortOrder
    merkleProofs?: SortOrderInput | SortOrder
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
    compressionMethod?: SortOrderInput | SortOrder
    isCompressed?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    persona?: AgentPersonaOrderByWithRelationInput
  }

  export type MemorySnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemorySnapshotWhereInput | MemorySnapshotWhereInput[]
    OR?: MemorySnapshotWhereInput[]
    NOT?: MemorySnapshotWhereInput | MemorySnapshotWhereInput[]
    snapshotType?: StringFilter<"MemorySnapshot"> | string
    memoryData?: JsonFilter<"MemorySnapshot">
    merkleRoot?: StringFilter<"MemorySnapshot"> | string
    merkleProofs?: JsonNullableFilter<"MemorySnapshot">
    nodeCount?: IntFilter<"MemorySnapshot"> | number
    sizeBytes?: BigIntFilter<"MemorySnapshot"> | bigint | number
    compressionMethod?: StringNullableFilter<"MemorySnapshot"> | string | null
    isCompressed?: BoolFilter<"MemorySnapshot"> | boolean
    description?: StringNullableFilter<"MemorySnapshot"> | string | null
    metadata?: JsonNullableFilter<"MemorySnapshot">
    createdAt?: DateTimeFilter<"MemorySnapshot"> | Date | string
    personaId?: StringFilter<"MemorySnapshot"> | string
    persona?: XOR<AgentPersonaScalarRelationFilter, AgentPersonaWhereInput>
  }, "id">

  export type MemorySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    snapshotType?: SortOrder
    memoryData?: SortOrder
    merkleRoot?: SortOrder
    merkleProofs?: SortOrderInput | SortOrder
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
    compressionMethod?: SortOrderInput | SortOrder
    isCompressed?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
    _count?: MemorySnapshotCountOrderByAggregateInput
    _avg?: MemorySnapshotAvgOrderByAggregateInput
    _max?: MemorySnapshotMaxOrderByAggregateInput
    _min?: MemorySnapshotMinOrderByAggregateInput
    _sum?: MemorySnapshotSumOrderByAggregateInput
  }

  export type MemorySnapshotScalarWhereWithAggregatesInput = {
    AND?: MemorySnapshotScalarWhereWithAggregatesInput | MemorySnapshotScalarWhereWithAggregatesInput[]
    OR?: MemorySnapshotScalarWhereWithAggregatesInput[]
    NOT?: MemorySnapshotScalarWhereWithAggregatesInput | MemorySnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemorySnapshot"> | string
    snapshotType?: StringWithAggregatesFilter<"MemorySnapshot"> | string
    memoryData?: JsonWithAggregatesFilter<"MemorySnapshot">
    merkleRoot?: StringWithAggregatesFilter<"MemorySnapshot"> | string
    merkleProofs?: JsonNullableWithAggregatesFilter<"MemorySnapshot">
    nodeCount?: IntWithAggregatesFilter<"MemorySnapshot"> | number
    sizeBytes?: BigIntWithAggregatesFilter<"MemorySnapshot"> | bigint | number
    compressionMethod?: StringNullableWithAggregatesFilter<"MemorySnapshot"> | string | null
    isCompressed?: BoolWithAggregatesFilter<"MemorySnapshot"> | boolean
    description?: StringNullableWithAggregatesFilter<"MemorySnapshot"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"MemorySnapshot">
    createdAt?: DateTimeWithAggregatesFilter<"MemorySnapshot"> | Date | string
    personaId?: StringWithAggregatesFilter<"MemorySnapshot"> | string
  }

  export type SolanaTransactionWhereInput = {
    AND?: SolanaTransactionWhereInput | SolanaTransactionWhereInput[]
    OR?: SolanaTransactionWhereInput[]
    NOT?: SolanaTransactionWhereInput | SolanaTransactionWhereInput[]
    id?: StringFilter<"SolanaTransaction"> | string
    transactionHash?: StringFilter<"SolanaTransaction"> | string
    agentWallet?: StringNullableFilter<"SolanaTransaction"> | string | null
    blockNumber?: StringNullableFilter<"SolanaTransaction"> | string | null
    blockTime?: DateTimeNullableFilter<"SolanaTransaction"> | Date | string | null
    slot?: IntFilter<"SolanaTransaction"> | number
    status?: StringFilter<"SolanaTransaction"> | string
    confirmations?: IntNullableFilter<"SolanaTransaction"> | number | null
    instructions?: JsonNullableFilter<"SolanaTransaction">
    accountKeys?: JsonNullableFilter<"SolanaTransaction">
    fee?: BigIntFilter<"SolanaTransaction"> | bigint | number
    memo?: StringNullableFilter<"SolanaTransaction"> | string | null
    logs?: JsonNullableFilter<"SolanaTransaction">
    errorMessage?: StringNullableFilter<"SolanaTransaction"> | string | null
    balanceChanges?: JsonNullableFilter<"SolanaTransaction">
    tokenBalanceChanges?: JsonNullableFilter<"SolanaTransaction">
    createdAt?: DateTimeFilter<"SolanaTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"SolanaTransaction"> | Date | string
  }

  export type SolanaTransactionOrderByWithRelationInput = {
    id?: SortOrder
    transactionHash?: SortOrder
    agentWallet?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    blockTime?: SortOrderInput | SortOrder
    slot?: SortOrder
    status?: SortOrder
    confirmations?: SortOrderInput | SortOrder
    instructions?: SortOrderInput | SortOrder
    accountKeys?: SortOrderInput | SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    logs?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    balanceChanges?: SortOrderInput | SortOrder
    tokenBalanceChanges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SolanaTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SolanaTransactionWhereInput | SolanaTransactionWhereInput[]
    OR?: SolanaTransactionWhereInput[]
    NOT?: SolanaTransactionWhereInput | SolanaTransactionWhereInput[]
    transactionHash?: StringFilter<"SolanaTransaction"> | string
    agentWallet?: StringNullableFilter<"SolanaTransaction"> | string | null
    blockNumber?: StringNullableFilter<"SolanaTransaction"> | string | null
    blockTime?: DateTimeNullableFilter<"SolanaTransaction"> | Date | string | null
    slot?: IntFilter<"SolanaTransaction"> | number
    status?: StringFilter<"SolanaTransaction"> | string
    confirmations?: IntNullableFilter<"SolanaTransaction"> | number | null
    instructions?: JsonNullableFilter<"SolanaTransaction">
    accountKeys?: JsonNullableFilter<"SolanaTransaction">
    fee?: BigIntFilter<"SolanaTransaction"> | bigint | number
    memo?: StringNullableFilter<"SolanaTransaction"> | string | null
    logs?: JsonNullableFilter<"SolanaTransaction">
    errorMessage?: StringNullableFilter<"SolanaTransaction"> | string | null
    balanceChanges?: JsonNullableFilter<"SolanaTransaction">
    tokenBalanceChanges?: JsonNullableFilter<"SolanaTransaction">
    createdAt?: DateTimeFilter<"SolanaTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"SolanaTransaction"> | Date | string
  }, "id">

  export type SolanaTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    transactionHash?: SortOrder
    agentWallet?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    blockTime?: SortOrderInput | SortOrder
    slot?: SortOrder
    status?: SortOrder
    confirmations?: SortOrderInput | SortOrder
    instructions?: SortOrderInput | SortOrder
    accountKeys?: SortOrderInput | SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    logs?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    balanceChanges?: SortOrderInput | SortOrder
    tokenBalanceChanges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SolanaTransactionCountOrderByAggregateInput
    _avg?: SolanaTransactionAvgOrderByAggregateInput
    _max?: SolanaTransactionMaxOrderByAggregateInput
    _min?: SolanaTransactionMinOrderByAggregateInput
    _sum?: SolanaTransactionSumOrderByAggregateInput
  }

  export type SolanaTransactionScalarWhereWithAggregatesInput = {
    AND?: SolanaTransactionScalarWhereWithAggregatesInput | SolanaTransactionScalarWhereWithAggregatesInput[]
    OR?: SolanaTransactionScalarWhereWithAggregatesInput[]
    NOT?: SolanaTransactionScalarWhereWithAggregatesInput | SolanaTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SolanaTransaction"> | string
    transactionHash?: StringWithAggregatesFilter<"SolanaTransaction"> | string
    agentWallet?: StringNullableWithAggregatesFilter<"SolanaTransaction"> | string | null
    blockNumber?: StringNullableWithAggregatesFilter<"SolanaTransaction"> | string | null
    blockTime?: DateTimeNullableWithAggregatesFilter<"SolanaTransaction"> | Date | string | null
    slot?: IntWithAggregatesFilter<"SolanaTransaction"> | number
    status?: StringWithAggregatesFilter<"SolanaTransaction"> | string
    confirmations?: IntNullableWithAggregatesFilter<"SolanaTransaction"> | number | null
    instructions?: JsonNullableWithAggregatesFilter<"SolanaTransaction">
    accountKeys?: JsonNullableWithAggregatesFilter<"SolanaTransaction">
    fee?: BigIntWithAggregatesFilter<"SolanaTransaction"> | bigint | number
    memo?: StringNullableWithAggregatesFilter<"SolanaTransaction"> | string | null
    logs?: JsonNullableWithAggregatesFilter<"SolanaTransaction">
    errorMessage?: StringNullableWithAggregatesFilter<"SolanaTransaction"> | string | null
    balanceChanges?: JsonNullableWithAggregatesFilter<"SolanaTransaction">
    tokenBalanceChanges?: JsonNullableWithAggregatesFilter<"SolanaTransaction">
    createdAt?: DateTimeWithAggregatesFilter<"SolanaTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SolanaTransaction"> | Date | string
  }

  export type TokenMetadataWhereInput = {
    AND?: TokenMetadataWhereInput | TokenMetadataWhereInput[]
    OR?: TokenMetadataWhereInput[]
    NOT?: TokenMetadataWhereInput | TokenMetadataWhereInput[]
    id?: StringFilter<"TokenMetadata"> | string
    mintAddress?: StringFilter<"TokenMetadata"> | string
    name?: StringNullableFilter<"TokenMetadata"> | string | null
    symbol?: StringNullableFilter<"TokenMetadata"> | string | null
    description?: StringNullableFilter<"TokenMetadata"> | string | null
    logoUri?: StringNullableFilter<"TokenMetadata"> | string | null
    decimals?: IntFilter<"TokenMetadata"> | number
    totalSupply?: FloatNullableFilter<"TokenMetadata"> | number | null
    circulatingSupply?: FloatNullableFilter<"TokenMetadata"> | number | null
    price?: FloatNullableFilter<"TokenMetadata"> | number | null
    marketCap?: FloatNullableFilter<"TokenMetadata"> | number | null
    volume24h?: FloatNullableFilter<"TokenMetadata"> | number | null
    priceChange24h?: FloatNullableFilter<"TokenMetadata"> | number | null
    social?: JsonNullableFilter<"TokenMetadata">
    website?: StringNullableFilter<"TokenMetadata"> | string | null
    isActive?: BoolFilter<"TokenMetadata"> | boolean
    isVerified?: BoolFilter<"TokenMetadata"> | boolean
    tags?: JsonNullableFilter<"TokenMetadata">
    extensions?: JsonNullableFilter<"TokenMetadata">
    createdAt?: DateTimeFilter<"TokenMetadata"> | Date | string
    updatedAt?: DateTimeFilter<"TokenMetadata"> | Date | string
  }

  export type TokenMetadataOrderByWithRelationInput = {
    id?: SortOrder
    mintAddress?: SortOrder
    name?: SortOrderInput | SortOrder
    symbol?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    decimals?: SortOrder
    totalSupply?: SortOrderInput | SortOrder
    circulatingSupply?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    marketCap?: SortOrderInput | SortOrder
    volume24h?: SortOrderInput | SortOrder
    priceChange24h?: SortOrderInput | SortOrder
    social?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    tags?: SortOrderInput | SortOrder
    extensions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMetadataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mintAddress?: string
    AND?: TokenMetadataWhereInput | TokenMetadataWhereInput[]
    OR?: TokenMetadataWhereInput[]
    NOT?: TokenMetadataWhereInput | TokenMetadataWhereInput[]
    name?: StringNullableFilter<"TokenMetadata"> | string | null
    symbol?: StringNullableFilter<"TokenMetadata"> | string | null
    description?: StringNullableFilter<"TokenMetadata"> | string | null
    logoUri?: StringNullableFilter<"TokenMetadata"> | string | null
    decimals?: IntFilter<"TokenMetadata"> | number
    totalSupply?: FloatNullableFilter<"TokenMetadata"> | number | null
    circulatingSupply?: FloatNullableFilter<"TokenMetadata"> | number | null
    price?: FloatNullableFilter<"TokenMetadata"> | number | null
    marketCap?: FloatNullableFilter<"TokenMetadata"> | number | null
    volume24h?: FloatNullableFilter<"TokenMetadata"> | number | null
    priceChange24h?: FloatNullableFilter<"TokenMetadata"> | number | null
    social?: JsonNullableFilter<"TokenMetadata">
    website?: StringNullableFilter<"TokenMetadata"> | string | null
    isActive?: BoolFilter<"TokenMetadata"> | boolean
    isVerified?: BoolFilter<"TokenMetadata"> | boolean
    tags?: JsonNullableFilter<"TokenMetadata">
    extensions?: JsonNullableFilter<"TokenMetadata">
    createdAt?: DateTimeFilter<"TokenMetadata"> | Date | string
    updatedAt?: DateTimeFilter<"TokenMetadata"> | Date | string
  }, "id" | "mintAddress">

  export type TokenMetadataOrderByWithAggregationInput = {
    id?: SortOrder
    mintAddress?: SortOrder
    name?: SortOrderInput | SortOrder
    symbol?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    decimals?: SortOrder
    totalSupply?: SortOrderInput | SortOrder
    circulatingSupply?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    marketCap?: SortOrderInput | SortOrder
    volume24h?: SortOrderInput | SortOrder
    priceChange24h?: SortOrderInput | SortOrder
    social?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    tags?: SortOrderInput | SortOrder
    extensions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenMetadataCountOrderByAggregateInput
    _avg?: TokenMetadataAvgOrderByAggregateInput
    _max?: TokenMetadataMaxOrderByAggregateInput
    _min?: TokenMetadataMinOrderByAggregateInput
    _sum?: TokenMetadataSumOrderByAggregateInput
  }

  export type TokenMetadataScalarWhereWithAggregatesInput = {
    AND?: TokenMetadataScalarWhereWithAggregatesInput | TokenMetadataScalarWhereWithAggregatesInput[]
    OR?: TokenMetadataScalarWhereWithAggregatesInput[]
    NOT?: TokenMetadataScalarWhereWithAggregatesInput | TokenMetadataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenMetadata"> | string
    mintAddress?: StringWithAggregatesFilter<"TokenMetadata"> | string
    name?: StringNullableWithAggregatesFilter<"TokenMetadata"> | string | null
    symbol?: StringNullableWithAggregatesFilter<"TokenMetadata"> | string | null
    description?: StringNullableWithAggregatesFilter<"TokenMetadata"> | string | null
    logoUri?: StringNullableWithAggregatesFilter<"TokenMetadata"> | string | null
    decimals?: IntWithAggregatesFilter<"TokenMetadata"> | number
    totalSupply?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    circulatingSupply?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    price?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    marketCap?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    volume24h?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    priceChange24h?: FloatNullableWithAggregatesFilter<"TokenMetadata"> | number | null
    social?: JsonNullableWithAggregatesFilter<"TokenMetadata">
    website?: StringNullableWithAggregatesFilter<"TokenMetadata"> | string | null
    isActive?: BoolWithAggregatesFilter<"TokenMetadata"> | boolean
    isVerified?: BoolWithAggregatesFilter<"TokenMetadata"> | boolean
    tags?: JsonNullableWithAggregatesFilter<"TokenMetadata">
    extensions?: JsonNullableWithAggregatesFilter<"TokenMetadata">
    createdAt?: DateTimeWithAggregatesFilter<"TokenMetadata"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TokenMetadata"> | Date | string
  }

  export type AgentPersonaCreateInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaCreateManyInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentPersonaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentPersonaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfActionCreateInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
    persona: AgentPersonaCreateNestedOneWithoutProofsOfActionInput
  }

  export type ProofOfActionUncheckedCreateInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: AgentPersonaUpdateOneRequiredWithoutProofsOfActionNestedInput
  }

  export type ProofOfActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type ProofOfActionCreateManyInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type ProofOfEvidenceCreateInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
    persona: AgentPersonaCreateNestedOneWithoutProofsOfEvidenceInput
  }

  export type ProofOfEvidenceUncheckedCreateInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfEvidenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: AgentPersonaUpdateOneRequiredWithoutProofsOfEvidenceNestedInput
  }

  export type ProofOfEvidenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type ProofOfEvidenceCreateManyInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfEvidenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvidenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type ProofOfEvolutionCreateInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
    persona: AgentPersonaCreateNestedOneWithoutProofsOfEvolutionInput
  }

  export type ProofOfEvolutionUncheckedCreateInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfEvolutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: AgentPersonaUpdateOneRequiredWithoutProofsOfEvolutionNestedInput
  }

  export type ProofOfEvolutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type ProofOfEvolutionCreateManyInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
    personaId: string
  }

  export type ProofOfEvolutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvolutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type MemorySnapshotCreateInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    persona: AgentPersonaCreateNestedOneWithoutMemorySnapshotsInput
  }

  export type MemorySnapshotUncheckedCreateInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    personaId: string
  }

  export type MemorySnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: AgentPersonaUpdateOneRequiredWithoutMemorySnapshotsNestedInput
  }

  export type MemorySnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type MemorySnapshotCreateManyInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    personaId: string
  }

  export type MemorySnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemorySnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: StringFieldUpdateOperationsInput | string
  }

  export type SolanaTransactionCreateInput = {
    id?: string
    transactionHash: string
    agentWallet?: string | null
    blockNumber?: string | null
    blockTime?: Date | string | null
    slot?: number
    status?: string
    confirmations?: number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: bigint | number
    memo?: string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SolanaTransactionUncheckedCreateInput = {
    id?: string
    transactionHash: string
    agentWallet?: string | null
    blockNumber?: string | null
    blockTime?: Date | string | null
    slot?: number
    status?: string
    confirmations?: number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: bigint | number
    memo?: string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SolanaTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    agentWallet?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slot?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmations?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: BigIntFieldUpdateOperationsInput | bigint | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolanaTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    agentWallet?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slot?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmations?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: BigIntFieldUpdateOperationsInput | bigint | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolanaTransactionCreateManyInput = {
    id?: string
    transactionHash: string
    agentWallet?: string | null
    blockNumber?: string | null
    blockTime?: Date | string | null
    slot?: number
    status?: string
    confirmations?: number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: bigint | number
    memo?: string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SolanaTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    agentWallet?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slot?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmations?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: BigIntFieldUpdateOperationsInput | bigint | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolanaTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    agentWallet?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slot?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmations?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: NullableJsonNullValueInput | InputJsonValue
    accountKeys?: NullableJsonNullValueInput | InputJsonValue
    fee?: BigIntFieldUpdateOperationsInput | bigint | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    logs?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    balanceChanges?: NullableJsonNullValueInput | InputJsonValue
    tokenBalanceChanges?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenMetadataCreateInput = {
    id?: string
    mintAddress: string
    name?: string | null
    symbol?: string | null
    description?: string | null
    logoUri?: string | null
    decimals?: number
    totalSupply?: number | null
    circulatingSupply?: number | null
    price?: number | null
    marketCap?: number | null
    volume24h?: number | null
    priceChange24h?: number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: string | null
    isActive?: boolean
    isVerified?: boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenMetadataUncheckedCreateInput = {
    id?: string
    mintAddress: string
    name?: string | null
    symbol?: string | null
    description?: string | null
    logoUri?: string | null
    decimals?: number
    totalSupply?: number | null
    circulatingSupply?: number | null
    price?: number | null
    marketCap?: number | null
    volume24h?: number | null
    priceChange24h?: number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: string | null
    isActive?: boolean
    isVerified?: boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenMetadataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mintAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    volume24h?: NullableFloatFieldUpdateOperationsInput | number | null
    priceChange24h?: NullableFloatFieldUpdateOperationsInput | number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenMetadataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mintAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    volume24h?: NullableFloatFieldUpdateOperationsInput | number | null
    priceChange24h?: NullableFloatFieldUpdateOperationsInput | number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenMetadataCreateManyInput = {
    id?: string
    mintAddress: string
    name?: string | null
    symbol?: string | null
    description?: string | null
    logoUri?: string | null
    decimals?: number
    totalSupply?: number | null
    circulatingSupply?: number | null
    price?: number | null
    marketCap?: number | null
    volume24h?: number | null
    priceChange24h?: number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: string | null
    isActive?: boolean
    isVerified?: boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenMetadataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mintAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    volume24h?: NullableFloatFieldUpdateOperationsInput | number | null
    priceChange24h?: NullableFloatFieldUpdateOperationsInput | number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenMetadataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mintAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    volume24h?: NullableFloatFieldUpdateOperationsInput | number | null
    priceChange24h?: NullableFloatFieldUpdateOperationsInput | number | null
    social?: NullableJsonNullValueInput | InputJsonValue
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableJsonNullValueInput | InputJsonValue
    extensions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProofOfActionListRelationFilter = {
    every?: ProofOfActionWhereInput
    some?: ProofOfActionWhereInput
    none?: ProofOfActionWhereInput
  }

  export type ProofOfEvidenceListRelationFilter = {
    every?: ProofOfEvidenceWhereInput
    some?: ProofOfEvidenceWhereInput
    none?: ProofOfEvidenceWhereInput
  }

  export type ProofOfEvolutionListRelationFilter = {
    every?: ProofOfEvolutionWhereInput
    some?: ProofOfEvolutionWhereInput
    none?: ProofOfEvolutionWhereInput
  }

  export type MemorySnapshotListRelationFilter = {
    every?: MemorySnapshotWhereInput
    some?: MemorySnapshotWhereInput
    none?: MemorySnapshotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProofOfActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProofOfEvidenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProofOfEvolutionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemorySnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentPersonaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    description?: SortOrder
    personality?: SortOrder
    traits?: SortOrder
    avatar?: SortOrder
    merkleRoot?: SortOrder
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
    memoryData?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentPersonaAvgOrderByAggregateInput = {
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
  }

  export type AgentPersonaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    merkleRoot?: SortOrder
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentPersonaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    merkleRoot?: SortOrder
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentPersonaSumOrderByAggregateInput = {
    evolutionLevel?: SortOrder
    experiencePoints?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AgentPersonaScalarRelationFilter = {
    is?: AgentPersonaWhereInput
    isNot?: AgentPersonaWhereInput
  }

  export type ProofOfActionCountOrderByAggregateInput = {
    id?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    actionParameters?: SortOrder
    transactionHash?: SortOrder
    blockNumber?: SortOrder
    amount?: SortOrder
    tokenAddress?: SortOrder
    result?: SortOrder
    isSuccessful?: SortOrder
    gasUsed?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfActionAvgOrderByAggregateInput = {
    amount?: SortOrder
    gasUsed?: SortOrder
  }

  export type ProofOfActionMaxOrderByAggregateInput = {
    id?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    transactionHash?: SortOrder
    blockNumber?: SortOrder
    amount?: SortOrder
    tokenAddress?: SortOrder
    result?: SortOrder
    isSuccessful?: SortOrder
    gasUsed?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfActionMinOrderByAggregateInput = {
    id?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    transactionHash?: SortOrder
    blockNumber?: SortOrder
    amount?: SortOrder
    tokenAddress?: SortOrder
    result?: SortOrder
    isSuccessful?: SortOrder
    gasUsed?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfActionSumOrderByAggregateInput = {
    amount?: SortOrder
    gasUsed?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProofOfEvidenceCountOrderByAggregateInput = {
    id?: SortOrder
    evidenceType?: SortOrder
    evidenceData?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    hash?: SortOrder
    metadata?: SortOrder
    isVerified?: SortOrder
    confidenceScore?: SortOrder
    verificationMethod?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvidenceAvgOrderByAggregateInput = {
    confidenceScore?: SortOrder
  }

  export type ProofOfEvidenceMaxOrderByAggregateInput = {
    id?: SortOrder
    evidenceType?: SortOrder
    evidenceData?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    hash?: SortOrder
    isVerified?: SortOrder
    confidenceScore?: SortOrder
    verificationMethod?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvidenceMinOrderByAggregateInput = {
    id?: SortOrder
    evidenceType?: SortOrder
    evidenceData?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    hash?: SortOrder
    isVerified?: SortOrder
    confidenceScore?: SortOrder
    verificationMethod?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvidenceSumOrderByAggregateInput = {
    confidenceScore?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProofOfEvolutionCountOrderByAggregateInput = {
    id?: SortOrder
    evolutionType?: SortOrder
    previousState?: SortOrder
    newState?: SortOrder
    changes?: SortOrder
    reasoning?: SortOrder
    trigger?: SortOrder
    version?: SortOrder
    isReversible?: SortOrder
    impactScore?: SortOrder
    merkleProof?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvolutionAvgOrderByAggregateInput = {
    version?: SortOrder
    impactScore?: SortOrder
  }

  export type ProofOfEvolutionMaxOrderByAggregateInput = {
    id?: SortOrder
    evolutionType?: SortOrder
    reasoning?: SortOrder
    trigger?: SortOrder
    version?: SortOrder
    isReversible?: SortOrder
    impactScore?: SortOrder
    merkleProof?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvolutionMinOrderByAggregateInput = {
    id?: SortOrder
    evolutionType?: SortOrder
    reasoning?: SortOrder
    trigger?: SortOrder
    version?: SortOrder
    isReversible?: SortOrder
    impactScore?: SortOrder
    merkleProof?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type ProofOfEvolutionSumOrderByAggregateInput = {
    version?: SortOrder
    impactScore?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type MemorySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    snapshotType?: SortOrder
    memoryData?: SortOrder
    merkleRoot?: SortOrder
    merkleProofs?: SortOrder
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
    compressionMethod?: SortOrder
    isCompressed?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type MemorySnapshotAvgOrderByAggregateInput = {
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
  }

  export type MemorySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    snapshotType?: SortOrder
    merkleRoot?: SortOrder
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
    compressionMethod?: SortOrder
    isCompressed?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type MemorySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    snapshotType?: SortOrder
    merkleRoot?: SortOrder
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
    compressionMethod?: SortOrder
    isCompressed?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    personaId?: SortOrder
  }

  export type MemorySnapshotSumOrderByAggregateInput = {
    nodeCount?: SortOrder
    sizeBytes?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SolanaTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    transactionHash?: SortOrder
    agentWallet?: SortOrder
    blockNumber?: SortOrder
    blockTime?: SortOrder
    slot?: SortOrder
    status?: SortOrder
    confirmations?: SortOrder
    instructions?: SortOrder
    accountKeys?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    logs?: SortOrder
    errorMessage?: SortOrder
    balanceChanges?: SortOrder
    tokenBalanceChanges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SolanaTransactionAvgOrderByAggregateInput = {
    slot?: SortOrder
    confirmations?: SortOrder
    fee?: SortOrder
  }

  export type SolanaTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionHash?: SortOrder
    agentWallet?: SortOrder
    blockNumber?: SortOrder
    blockTime?: SortOrder
    slot?: SortOrder
    status?: SortOrder
    confirmations?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SolanaTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    transactionHash?: SortOrder
    agentWallet?: SortOrder
    blockNumber?: SortOrder
    blockTime?: SortOrder
    slot?: SortOrder
    status?: SortOrder
    confirmations?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SolanaTransactionSumOrderByAggregateInput = {
    slot?: SortOrder
    confirmations?: SortOrder
    fee?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TokenMetadataCountOrderByAggregateInput = {
    id?: SortOrder
    mintAddress?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    logoUri?: SortOrder
    decimals?: SortOrder
    totalSupply?: SortOrder
    circulatingSupply?: SortOrder
    price?: SortOrder
    marketCap?: SortOrder
    volume24h?: SortOrder
    priceChange24h?: SortOrder
    social?: SortOrder
    website?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    tags?: SortOrder
    extensions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMetadataAvgOrderByAggregateInput = {
    decimals?: SortOrder
    totalSupply?: SortOrder
    circulatingSupply?: SortOrder
    price?: SortOrder
    marketCap?: SortOrder
    volume24h?: SortOrder
    priceChange24h?: SortOrder
  }

  export type TokenMetadataMaxOrderByAggregateInput = {
    id?: SortOrder
    mintAddress?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    logoUri?: SortOrder
    decimals?: SortOrder
    totalSupply?: SortOrder
    circulatingSupply?: SortOrder
    price?: SortOrder
    marketCap?: SortOrder
    volume24h?: SortOrder
    priceChange24h?: SortOrder
    website?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMetadataMinOrderByAggregateInput = {
    id?: SortOrder
    mintAddress?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    logoUri?: SortOrder
    decimals?: SortOrder
    totalSupply?: SortOrder
    circulatingSupply?: SortOrder
    price?: SortOrder
    marketCap?: SortOrder
    volume24h?: SortOrder
    priceChange24h?: SortOrder
    website?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMetadataSumOrderByAggregateInput = {
    decimals?: SortOrder
    totalSupply?: SortOrder
    circulatingSupply?: SortOrder
    price?: SortOrder
    marketCap?: SortOrder
    volume24h?: SortOrder
    priceChange24h?: SortOrder
  }

  export type ProofOfActionCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput> | ProofOfActionCreateWithoutPersonaInput[] | ProofOfActionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfActionCreateOrConnectWithoutPersonaInput | ProofOfActionCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfActionCreateManyPersonaInputEnvelope
    connect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
  }

  export type ProofOfEvidenceCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput> | ProofOfEvidenceCreateWithoutPersonaInput[] | ProofOfEvidenceUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvidenceCreateOrConnectWithoutPersonaInput | ProofOfEvidenceCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfEvidenceCreateManyPersonaInputEnvelope
    connect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
  }

  export type ProofOfEvolutionCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput> | ProofOfEvolutionCreateWithoutPersonaInput[] | ProofOfEvolutionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvolutionCreateOrConnectWithoutPersonaInput | ProofOfEvolutionCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfEvolutionCreateManyPersonaInputEnvelope
    connect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
  }

  export type MemorySnapshotCreateNestedManyWithoutPersonaInput = {
    create?: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput> | MemorySnapshotCreateWithoutPersonaInput[] | MemorySnapshotUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: MemorySnapshotCreateOrConnectWithoutPersonaInput | MemorySnapshotCreateOrConnectWithoutPersonaInput[]
    createMany?: MemorySnapshotCreateManyPersonaInputEnvelope
    connect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
  }

  export type ProofOfActionUncheckedCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput> | ProofOfActionCreateWithoutPersonaInput[] | ProofOfActionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfActionCreateOrConnectWithoutPersonaInput | ProofOfActionCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfActionCreateManyPersonaInputEnvelope
    connect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
  }

  export type ProofOfEvidenceUncheckedCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput> | ProofOfEvidenceCreateWithoutPersonaInput[] | ProofOfEvidenceUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvidenceCreateOrConnectWithoutPersonaInput | ProofOfEvidenceCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfEvidenceCreateManyPersonaInputEnvelope
    connect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
  }

  export type ProofOfEvolutionUncheckedCreateNestedManyWithoutPersonaInput = {
    create?: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput> | ProofOfEvolutionCreateWithoutPersonaInput[] | ProofOfEvolutionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvolutionCreateOrConnectWithoutPersonaInput | ProofOfEvolutionCreateOrConnectWithoutPersonaInput[]
    createMany?: ProofOfEvolutionCreateManyPersonaInputEnvelope
    connect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
  }

  export type MemorySnapshotUncheckedCreateNestedManyWithoutPersonaInput = {
    create?: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput> | MemorySnapshotCreateWithoutPersonaInput[] | MemorySnapshotUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: MemorySnapshotCreateOrConnectWithoutPersonaInput | MemorySnapshotCreateOrConnectWithoutPersonaInput[]
    createMany?: MemorySnapshotCreateManyPersonaInputEnvelope
    connect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProofOfActionUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput> | ProofOfActionCreateWithoutPersonaInput[] | ProofOfActionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfActionCreateOrConnectWithoutPersonaInput | ProofOfActionCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfActionUpsertWithWhereUniqueWithoutPersonaInput | ProofOfActionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfActionCreateManyPersonaInputEnvelope
    set?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    disconnect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    delete?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    connect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    update?: ProofOfActionUpdateWithWhereUniqueWithoutPersonaInput | ProofOfActionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfActionUpdateManyWithWhereWithoutPersonaInput | ProofOfActionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfActionScalarWhereInput | ProofOfActionScalarWhereInput[]
  }

  export type ProofOfEvidenceUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput> | ProofOfEvidenceCreateWithoutPersonaInput[] | ProofOfEvidenceUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvidenceCreateOrConnectWithoutPersonaInput | ProofOfEvidenceCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfEvidenceUpsertWithWhereUniqueWithoutPersonaInput | ProofOfEvidenceUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfEvidenceCreateManyPersonaInputEnvelope
    set?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    disconnect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    delete?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    connect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    update?: ProofOfEvidenceUpdateWithWhereUniqueWithoutPersonaInput | ProofOfEvidenceUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfEvidenceUpdateManyWithWhereWithoutPersonaInput | ProofOfEvidenceUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfEvidenceScalarWhereInput | ProofOfEvidenceScalarWhereInput[]
  }

  export type ProofOfEvolutionUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput> | ProofOfEvolutionCreateWithoutPersonaInput[] | ProofOfEvolutionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvolutionCreateOrConnectWithoutPersonaInput | ProofOfEvolutionCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfEvolutionUpsertWithWhereUniqueWithoutPersonaInput | ProofOfEvolutionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfEvolutionCreateManyPersonaInputEnvelope
    set?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    disconnect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    delete?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    connect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    update?: ProofOfEvolutionUpdateWithWhereUniqueWithoutPersonaInput | ProofOfEvolutionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfEvolutionUpdateManyWithWhereWithoutPersonaInput | ProofOfEvolutionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfEvolutionScalarWhereInput | ProofOfEvolutionScalarWhereInput[]
  }

  export type MemorySnapshotUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput> | MemorySnapshotCreateWithoutPersonaInput[] | MemorySnapshotUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: MemorySnapshotCreateOrConnectWithoutPersonaInput | MemorySnapshotCreateOrConnectWithoutPersonaInput[]
    upsert?: MemorySnapshotUpsertWithWhereUniqueWithoutPersonaInput | MemorySnapshotUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: MemorySnapshotCreateManyPersonaInputEnvelope
    set?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    disconnect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    delete?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    connect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    update?: MemorySnapshotUpdateWithWhereUniqueWithoutPersonaInput | MemorySnapshotUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: MemorySnapshotUpdateManyWithWhereWithoutPersonaInput | MemorySnapshotUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: MemorySnapshotScalarWhereInput | MemorySnapshotScalarWhereInput[]
  }

  export type ProofOfActionUncheckedUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput> | ProofOfActionCreateWithoutPersonaInput[] | ProofOfActionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfActionCreateOrConnectWithoutPersonaInput | ProofOfActionCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfActionUpsertWithWhereUniqueWithoutPersonaInput | ProofOfActionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfActionCreateManyPersonaInputEnvelope
    set?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    disconnect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    delete?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    connect?: ProofOfActionWhereUniqueInput | ProofOfActionWhereUniqueInput[]
    update?: ProofOfActionUpdateWithWhereUniqueWithoutPersonaInput | ProofOfActionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfActionUpdateManyWithWhereWithoutPersonaInput | ProofOfActionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfActionScalarWhereInput | ProofOfActionScalarWhereInput[]
  }

  export type ProofOfEvidenceUncheckedUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput> | ProofOfEvidenceCreateWithoutPersonaInput[] | ProofOfEvidenceUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvidenceCreateOrConnectWithoutPersonaInput | ProofOfEvidenceCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfEvidenceUpsertWithWhereUniqueWithoutPersonaInput | ProofOfEvidenceUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfEvidenceCreateManyPersonaInputEnvelope
    set?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    disconnect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    delete?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    connect?: ProofOfEvidenceWhereUniqueInput | ProofOfEvidenceWhereUniqueInput[]
    update?: ProofOfEvidenceUpdateWithWhereUniqueWithoutPersonaInput | ProofOfEvidenceUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfEvidenceUpdateManyWithWhereWithoutPersonaInput | ProofOfEvidenceUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfEvidenceScalarWhereInput | ProofOfEvidenceScalarWhereInput[]
  }

  export type ProofOfEvolutionUncheckedUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput> | ProofOfEvolutionCreateWithoutPersonaInput[] | ProofOfEvolutionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: ProofOfEvolutionCreateOrConnectWithoutPersonaInput | ProofOfEvolutionCreateOrConnectWithoutPersonaInput[]
    upsert?: ProofOfEvolutionUpsertWithWhereUniqueWithoutPersonaInput | ProofOfEvolutionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: ProofOfEvolutionCreateManyPersonaInputEnvelope
    set?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    disconnect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    delete?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    connect?: ProofOfEvolutionWhereUniqueInput | ProofOfEvolutionWhereUniqueInput[]
    update?: ProofOfEvolutionUpdateWithWhereUniqueWithoutPersonaInput | ProofOfEvolutionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: ProofOfEvolutionUpdateManyWithWhereWithoutPersonaInput | ProofOfEvolutionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: ProofOfEvolutionScalarWhereInput | ProofOfEvolutionScalarWhereInput[]
  }

  export type MemorySnapshotUncheckedUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput> | MemorySnapshotCreateWithoutPersonaInput[] | MemorySnapshotUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: MemorySnapshotCreateOrConnectWithoutPersonaInput | MemorySnapshotCreateOrConnectWithoutPersonaInput[]
    upsert?: MemorySnapshotUpsertWithWhereUniqueWithoutPersonaInput | MemorySnapshotUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: MemorySnapshotCreateManyPersonaInputEnvelope
    set?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    disconnect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    delete?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    connect?: MemorySnapshotWhereUniqueInput | MemorySnapshotWhereUniqueInput[]
    update?: MemorySnapshotUpdateWithWhereUniqueWithoutPersonaInput | MemorySnapshotUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: MemorySnapshotUpdateManyWithWhereWithoutPersonaInput | MemorySnapshotUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: MemorySnapshotScalarWhereInput | MemorySnapshotScalarWhereInput[]
  }

  export type AgentPersonaCreateNestedOneWithoutProofsOfActionInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfActionInput, AgentPersonaUncheckedCreateWithoutProofsOfActionInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfActionInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgentPersonaUpdateOneRequiredWithoutProofsOfActionNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfActionInput, AgentPersonaUncheckedCreateWithoutProofsOfActionInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfActionInput
    upsert?: AgentPersonaUpsertWithoutProofsOfActionInput
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutProofsOfActionInput, AgentPersonaUpdateWithoutProofsOfActionInput>, AgentPersonaUncheckedUpdateWithoutProofsOfActionInput>
  }

  export type AgentPersonaCreateNestedOneWithoutProofsOfEvidenceInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedCreateWithoutProofsOfEvidenceInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfEvidenceInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type AgentPersonaUpdateOneRequiredWithoutProofsOfEvidenceNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedCreateWithoutProofsOfEvidenceInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfEvidenceInput
    upsert?: AgentPersonaUpsertWithoutProofsOfEvidenceInput
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutProofsOfEvidenceInput, AgentPersonaUpdateWithoutProofsOfEvidenceInput>, AgentPersonaUncheckedUpdateWithoutProofsOfEvidenceInput>
  }

  export type AgentPersonaCreateNestedOneWithoutProofsOfEvolutionInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedCreateWithoutProofsOfEvolutionInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfEvolutionInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type AgentPersonaUpdateOneRequiredWithoutProofsOfEvolutionNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedCreateWithoutProofsOfEvolutionInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutProofsOfEvolutionInput
    upsert?: AgentPersonaUpsertWithoutProofsOfEvolutionInput
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutProofsOfEvolutionInput, AgentPersonaUpdateWithoutProofsOfEvolutionInput>, AgentPersonaUncheckedUpdateWithoutProofsOfEvolutionInput>
  }

  export type AgentPersonaCreateNestedOneWithoutMemorySnapshotsInput = {
    create?: XOR<AgentPersonaCreateWithoutMemorySnapshotsInput, AgentPersonaUncheckedCreateWithoutMemorySnapshotsInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutMemorySnapshotsInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type AgentPersonaUpdateOneRequiredWithoutMemorySnapshotsNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutMemorySnapshotsInput, AgentPersonaUncheckedCreateWithoutMemorySnapshotsInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutMemorySnapshotsInput
    upsert?: AgentPersonaUpsertWithoutMemorySnapshotsInput
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutMemorySnapshotsInput, AgentPersonaUpdateWithoutMemorySnapshotsInput>, AgentPersonaUncheckedUpdateWithoutMemorySnapshotsInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProofOfActionCreateWithoutPersonaInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type ProofOfActionUncheckedCreateWithoutPersonaInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type ProofOfActionCreateOrConnectWithoutPersonaInput = {
    where: ProofOfActionWhereUniqueInput
    create: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfActionCreateManyPersonaInputEnvelope = {
    data: ProofOfActionCreateManyPersonaInput | ProofOfActionCreateManyPersonaInput[]
  }

  export type ProofOfEvidenceCreateWithoutPersonaInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvidenceUncheckedCreateWithoutPersonaInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvidenceCreateOrConnectWithoutPersonaInput = {
    where: ProofOfEvidenceWhereUniqueInput
    create: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfEvidenceCreateManyPersonaInputEnvelope = {
    data: ProofOfEvidenceCreateManyPersonaInput | ProofOfEvidenceCreateManyPersonaInput[]
  }

  export type ProofOfEvolutionCreateWithoutPersonaInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvolutionUncheckedCreateWithoutPersonaInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvolutionCreateOrConnectWithoutPersonaInput = {
    where: ProofOfEvolutionWhereUniqueInput
    create: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfEvolutionCreateManyPersonaInputEnvelope = {
    data: ProofOfEvolutionCreateManyPersonaInput | ProofOfEvolutionCreateManyPersonaInput[]
  }

  export type MemorySnapshotCreateWithoutPersonaInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MemorySnapshotUncheckedCreateWithoutPersonaInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MemorySnapshotCreateOrConnectWithoutPersonaInput = {
    where: MemorySnapshotWhereUniqueInput
    create: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput>
  }

  export type MemorySnapshotCreateManyPersonaInputEnvelope = {
    data: MemorySnapshotCreateManyPersonaInput | MemorySnapshotCreateManyPersonaInput[]
  }

  export type ProofOfActionUpsertWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfActionWhereUniqueInput
    update: XOR<ProofOfActionUpdateWithoutPersonaInput, ProofOfActionUncheckedUpdateWithoutPersonaInput>
    create: XOR<ProofOfActionCreateWithoutPersonaInput, ProofOfActionUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfActionUpdateWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfActionWhereUniqueInput
    data: XOR<ProofOfActionUpdateWithoutPersonaInput, ProofOfActionUncheckedUpdateWithoutPersonaInput>
  }

  export type ProofOfActionUpdateManyWithWhereWithoutPersonaInput = {
    where: ProofOfActionScalarWhereInput
    data: XOR<ProofOfActionUpdateManyMutationInput, ProofOfActionUncheckedUpdateManyWithoutPersonaInput>
  }

  export type ProofOfActionScalarWhereInput = {
    AND?: ProofOfActionScalarWhereInput | ProofOfActionScalarWhereInput[]
    OR?: ProofOfActionScalarWhereInput[]
    NOT?: ProofOfActionScalarWhereInput | ProofOfActionScalarWhereInput[]
    id?: StringFilter<"ProofOfAction"> | string
    actionType?: StringFilter<"ProofOfAction"> | string
    actionData?: StringFilter<"ProofOfAction"> | string
    actionParameters?: JsonNullableFilter<"ProofOfAction">
    transactionHash?: StringNullableFilter<"ProofOfAction"> | string | null
    blockNumber?: StringNullableFilter<"ProofOfAction"> | string | null
    amount?: FloatNullableFilter<"ProofOfAction"> | number | null
    tokenAddress?: StringNullableFilter<"ProofOfAction"> | string | null
    result?: StringNullableFilter<"ProofOfAction"> | string | null
    isSuccessful?: BoolFilter<"ProofOfAction"> | boolean
    gasUsed?: IntNullableFilter<"ProofOfAction"> | number | null
    errorMessage?: StringNullableFilter<"ProofOfAction"> | string | null
    createdAt?: DateTimeFilter<"ProofOfAction"> | Date | string
    personaId?: StringFilter<"ProofOfAction"> | string
  }

  export type ProofOfEvidenceUpsertWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfEvidenceWhereUniqueInput
    update: XOR<ProofOfEvidenceUpdateWithoutPersonaInput, ProofOfEvidenceUncheckedUpdateWithoutPersonaInput>
    create: XOR<ProofOfEvidenceCreateWithoutPersonaInput, ProofOfEvidenceUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfEvidenceUpdateWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfEvidenceWhereUniqueInput
    data: XOR<ProofOfEvidenceUpdateWithoutPersonaInput, ProofOfEvidenceUncheckedUpdateWithoutPersonaInput>
  }

  export type ProofOfEvidenceUpdateManyWithWhereWithoutPersonaInput = {
    where: ProofOfEvidenceScalarWhereInput
    data: XOR<ProofOfEvidenceUpdateManyMutationInput, ProofOfEvidenceUncheckedUpdateManyWithoutPersonaInput>
  }

  export type ProofOfEvidenceScalarWhereInput = {
    AND?: ProofOfEvidenceScalarWhereInput | ProofOfEvidenceScalarWhereInput[]
    OR?: ProofOfEvidenceScalarWhereInput[]
    NOT?: ProofOfEvidenceScalarWhereInput | ProofOfEvidenceScalarWhereInput[]
    id?: StringFilter<"ProofOfEvidence"> | string
    evidenceType?: StringFilter<"ProofOfEvidence"> | string
    evidenceData?: StringFilter<"ProofOfEvidence"> | string
    sourceType?: StringNullableFilter<"ProofOfEvidence"> | string | null
    sourceUrl?: StringNullableFilter<"ProofOfEvidence"> | string | null
    hash?: StringNullableFilter<"ProofOfEvidence"> | string | null
    metadata?: JsonNullableFilter<"ProofOfEvidence">
    isVerified?: BoolFilter<"ProofOfEvidence"> | boolean
    confidenceScore?: FloatFilter<"ProofOfEvidence"> | number
    verificationMethod?: StringNullableFilter<"ProofOfEvidence"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvidence"> | Date | string
    personaId?: StringFilter<"ProofOfEvidence"> | string
  }

  export type ProofOfEvolutionUpsertWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfEvolutionWhereUniqueInput
    update: XOR<ProofOfEvolutionUpdateWithoutPersonaInput, ProofOfEvolutionUncheckedUpdateWithoutPersonaInput>
    create: XOR<ProofOfEvolutionCreateWithoutPersonaInput, ProofOfEvolutionUncheckedCreateWithoutPersonaInput>
  }

  export type ProofOfEvolutionUpdateWithWhereUniqueWithoutPersonaInput = {
    where: ProofOfEvolutionWhereUniqueInput
    data: XOR<ProofOfEvolutionUpdateWithoutPersonaInput, ProofOfEvolutionUncheckedUpdateWithoutPersonaInput>
  }

  export type ProofOfEvolutionUpdateManyWithWhereWithoutPersonaInput = {
    where: ProofOfEvolutionScalarWhereInput
    data: XOR<ProofOfEvolutionUpdateManyMutationInput, ProofOfEvolutionUncheckedUpdateManyWithoutPersonaInput>
  }

  export type ProofOfEvolutionScalarWhereInput = {
    AND?: ProofOfEvolutionScalarWhereInput | ProofOfEvolutionScalarWhereInput[]
    OR?: ProofOfEvolutionScalarWhereInput[]
    NOT?: ProofOfEvolutionScalarWhereInput | ProofOfEvolutionScalarWhereInput[]
    id?: StringFilter<"ProofOfEvolution"> | string
    evolutionType?: StringFilter<"ProofOfEvolution"> | string
    previousState?: JsonFilter<"ProofOfEvolution">
    newState?: JsonFilter<"ProofOfEvolution">
    changes?: JsonFilter<"ProofOfEvolution">
    reasoning?: StringNullableFilter<"ProofOfEvolution"> | string | null
    trigger?: StringNullableFilter<"ProofOfEvolution"> | string | null
    version?: IntFilter<"ProofOfEvolution"> | number
    isReversible?: BoolFilter<"ProofOfEvolution"> | boolean
    impactScore?: FloatFilter<"ProofOfEvolution"> | number
    merkleProof?: StringNullableFilter<"ProofOfEvolution"> | string | null
    createdAt?: DateTimeFilter<"ProofOfEvolution"> | Date | string
    personaId?: StringFilter<"ProofOfEvolution"> | string
  }

  export type MemorySnapshotUpsertWithWhereUniqueWithoutPersonaInput = {
    where: MemorySnapshotWhereUniqueInput
    update: XOR<MemorySnapshotUpdateWithoutPersonaInput, MemorySnapshotUncheckedUpdateWithoutPersonaInput>
    create: XOR<MemorySnapshotCreateWithoutPersonaInput, MemorySnapshotUncheckedCreateWithoutPersonaInput>
  }

  export type MemorySnapshotUpdateWithWhereUniqueWithoutPersonaInput = {
    where: MemorySnapshotWhereUniqueInput
    data: XOR<MemorySnapshotUpdateWithoutPersonaInput, MemorySnapshotUncheckedUpdateWithoutPersonaInput>
  }

  export type MemorySnapshotUpdateManyWithWhereWithoutPersonaInput = {
    where: MemorySnapshotScalarWhereInput
    data: XOR<MemorySnapshotUpdateManyMutationInput, MemorySnapshotUncheckedUpdateManyWithoutPersonaInput>
  }

  export type MemorySnapshotScalarWhereInput = {
    AND?: MemorySnapshotScalarWhereInput | MemorySnapshotScalarWhereInput[]
    OR?: MemorySnapshotScalarWhereInput[]
    NOT?: MemorySnapshotScalarWhereInput | MemorySnapshotScalarWhereInput[]
    id?: StringFilter<"MemorySnapshot"> | string
    snapshotType?: StringFilter<"MemorySnapshot"> | string
    memoryData?: JsonFilter<"MemorySnapshot">
    merkleRoot?: StringFilter<"MemorySnapshot"> | string
    merkleProofs?: JsonNullableFilter<"MemorySnapshot">
    nodeCount?: IntFilter<"MemorySnapshot"> | number
    sizeBytes?: BigIntFilter<"MemorySnapshot"> | bigint | number
    compressionMethod?: StringNullableFilter<"MemorySnapshot"> | string | null
    isCompressed?: BoolFilter<"MemorySnapshot"> | boolean
    description?: StringNullableFilter<"MemorySnapshot"> | string | null
    metadata?: JsonNullableFilter<"MemorySnapshot">
    createdAt?: DateTimeFilter<"MemorySnapshot"> | Date | string
    personaId?: StringFilter<"MemorySnapshot"> | string
  }

  export type AgentPersonaCreateWithoutProofsOfActionInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfEvidence?: ProofOfEvidenceCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateWithoutProofsOfActionInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfEvidence?: ProofOfEvidenceUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaCreateOrConnectWithoutProofsOfActionInput = {
    where: AgentPersonaWhereUniqueInput
    create: XOR<AgentPersonaCreateWithoutProofsOfActionInput, AgentPersonaUncheckedCreateWithoutProofsOfActionInput>
  }

  export type AgentPersonaUpsertWithoutProofsOfActionInput = {
    update: XOR<AgentPersonaUpdateWithoutProofsOfActionInput, AgentPersonaUncheckedUpdateWithoutProofsOfActionInput>
    create: XOR<AgentPersonaCreateWithoutProofsOfActionInput, AgentPersonaUncheckedCreateWithoutProofsOfActionInput>
    where?: AgentPersonaWhereInput
  }

  export type AgentPersonaUpdateToOneWithWhereWithoutProofsOfActionInput = {
    where?: AgentPersonaWhereInput
    data: XOR<AgentPersonaUpdateWithoutProofsOfActionInput, AgentPersonaUncheckedUpdateWithoutProofsOfActionInput>
  }

  export type AgentPersonaUpdateWithoutProofsOfActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfEvidence?: ProofOfEvidenceUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateWithoutProofsOfActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfEvidence?: ProofOfEvidenceUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaCreateWithoutProofsOfEvidenceInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateWithoutProofsOfEvidenceInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaCreateOrConnectWithoutProofsOfEvidenceInput = {
    where: AgentPersonaWhereUniqueInput
    create: XOR<AgentPersonaCreateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedCreateWithoutProofsOfEvidenceInput>
  }

  export type AgentPersonaUpsertWithoutProofsOfEvidenceInput = {
    update: XOR<AgentPersonaUpdateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedUpdateWithoutProofsOfEvidenceInput>
    create: XOR<AgentPersonaCreateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedCreateWithoutProofsOfEvidenceInput>
    where?: AgentPersonaWhereInput
  }

  export type AgentPersonaUpdateToOneWithWhereWithoutProofsOfEvidenceInput = {
    where?: AgentPersonaWhereInput
    data: XOR<AgentPersonaUpdateWithoutProofsOfEvidenceInput, AgentPersonaUncheckedUpdateWithoutProofsOfEvidenceInput>
  }

  export type AgentPersonaUpdateWithoutProofsOfEvidenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateWithoutProofsOfEvidenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaCreateWithoutProofsOfEvolutionInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateWithoutProofsOfEvolutionInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedCreateNestedManyWithoutPersonaInput
    memorySnapshots?: MemorySnapshotUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaCreateOrConnectWithoutProofsOfEvolutionInput = {
    where: AgentPersonaWhereUniqueInput
    create: XOR<AgentPersonaCreateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedCreateWithoutProofsOfEvolutionInput>
  }

  export type AgentPersonaUpsertWithoutProofsOfEvolutionInput = {
    update: XOR<AgentPersonaUpdateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedUpdateWithoutProofsOfEvolutionInput>
    create: XOR<AgentPersonaCreateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedCreateWithoutProofsOfEvolutionInput>
    where?: AgentPersonaWhereInput
  }

  export type AgentPersonaUpdateToOneWithWhereWithoutProofsOfEvolutionInput = {
    where?: AgentPersonaWhereInput
    data: XOR<AgentPersonaUpdateWithoutProofsOfEvolutionInput, AgentPersonaUncheckedUpdateWithoutProofsOfEvolutionInput>
  }

  export type AgentPersonaUpdateWithoutProofsOfEvolutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateWithoutProofsOfEvolutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedUpdateManyWithoutPersonaNestedInput
    memorySnapshots?: MemorySnapshotUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaCreateWithoutMemorySnapshotsInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateWithoutMemorySnapshotsInput = {
    id?: string
    name: string
    walletAddress?: string | null
    description?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: string | null
    merkleRoot?: string | null
    evolutionLevel?: number
    experiencePoints?: number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proofsOfAction?: ProofOfActionUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedCreateNestedManyWithoutPersonaInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type AgentPersonaCreateOrConnectWithoutMemorySnapshotsInput = {
    where: AgentPersonaWhereUniqueInput
    create: XOR<AgentPersonaCreateWithoutMemorySnapshotsInput, AgentPersonaUncheckedCreateWithoutMemorySnapshotsInput>
  }

  export type AgentPersonaUpsertWithoutMemorySnapshotsInput = {
    update: XOR<AgentPersonaUpdateWithoutMemorySnapshotsInput, AgentPersonaUncheckedUpdateWithoutMemorySnapshotsInput>
    create: XOR<AgentPersonaCreateWithoutMemorySnapshotsInput, AgentPersonaUncheckedCreateWithoutMemorySnapshotsInput>
    where?: AgentPersonaWhereInput
  }

  export type AgentPersonaUpdateToOneWithWhereWithoutMemorySnapshotsInput = {
    where?: AgentPersonaWhereInput
    data: XOR<AgentPersonaUpdateWithoutMemorySnapshotsInput, AgentPersonaUncheckedUpdateWithoutMemorySnapshotsInput>
  }

  export type AgentPersonaUpdateWithoutMemorySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUpdateManyWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateWithoutMemorySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    traits?: NullableJsonNullValueInput | InputJsonValue
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    merkleRoot?: NullableStringFieldUpdateOperationsInput | string | null
    evolutionLevel?: IntFieldUpdateOperationsInput | number
    experiencePoints?: FloatFieldUpdateOperationsInput | number
    memoryData?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofsOfAction?: ProofOfActionUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvidence?: ProofOfEvidenceUncheckedUpdateManyWithoutPersonaNestedInput
    proofsOfEvolution?: ProofOfEvolutionUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type ProofOfActionCreateManyPersonaInput = {
    id?: string
    actionType: string
    actionData: string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: string | null
    blockNumber?: string | null
    amount?: number | null
    tokenAddress?: string | null
    result?: string | null
    isSuccessful?: boolean
    gasUsed?: number | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvidenceCreateManyPersonaInput = {
    id?: string
    evidenceType: string
    evidenceData: string
    sourceType?: string | null
    sourceUrl?: string | null
    hash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    confidenceScore?: number
    verificationMethod?: string | null
    createdAt?: Date | string
  }

  export type ProofOfEvolutionCreateManyPersonaInput = {
    id?: string
    evolutionType: string
    previousState: JsonNullValueInput | InputJsonValue
    newState: JsonNullValueInput | InputJsonValue
    changes: JsonNullValueInput | InputJsonValue
    reasoning?: string | null
    trigger?: string | null
    version?: number
    isReversible?: boolean
    impactScore?: number
    merkleProof?: string | null
    createdAt?: Date | string
  }

  export type MemorySnapshotCreateManyPersonaInput = {
    id?: string
    snapshotType: string
    memoryData: JsonNullValueInput | InputJsonValue
    merkleRoot: string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: number
    sizeBytes?: bigint | number
    compressionMethod?: string | null
    isCompressed?: boolean
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProofOfActionUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfActionUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfActionUncheckedUpdateManyWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: StringFieldUpdateOperationsInput | string
    actionParameters?: NullableJsonNullValueInput | InputJsonValue
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    isSuccessful?: BoolFieldUpdateOperationsInput | boolean
    gasUsed?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvidenceUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvidenceUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvidenceUncheckedUpdateManyWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceType?: StringFieldUpdateOperationsInput | string
    evidenceData?: StringFieldUpdateOperationsInput | string
    sourceType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvolutionUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvolutionUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProofOfEvolutionUncheckedUpdateManyWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    evolutionType?: StringFieldUpdateOperationsInput | string
    previousState?: JsonNullValueInput | InputJsonValue
    newState?: JsonNullValueInput | InputJsonValue
    changes?: JsonNullValueInput | InputJsonValue
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    isReversible?: BoolFieldUpdateOperationsInput | boolean
    impactScore?: FloatFieldUpdateOperationsInput | number
    merkleProof?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemorySnapshotUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemorySnapshotUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemorySnapshotUncheckedUpdateManyWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotType?: StringFieldUpdateOperationsInput | string
    memoryData?: JsonNullValueInput | InputJsonValue
    merkleRoot?: StringFieldUpdateOperationsInput | string
    merkleProofs?: NullableJsonNullValueInput | InputJsonValue
    nodeCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    compressionMethod?: NullableStringFieldUpdateOperationsInput | string | null
    isCompressed?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}