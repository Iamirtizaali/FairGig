
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
 * Model Complaint
 * 
 */
export type Complaint = $Result.DefaultSelection<Prisma.$ComplaintPayload>
/**
 * Model ComplaintTag
 * 
 */
export type ComplaintTag = $Result.DefaultSelection<Prisma.$ComplaintTagPayload>
/**
 * Model Cluster
 * 
 */
export type Cluster = $Result.DefaultSelection<Prisma.$ClusterPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model AuditEvent
 * 
 */
export type AuditEvent = $Result.DefaultSelection<Prisma.$AuditEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ComplaintVisibility: {
  public_anon: 'public_anon',
  internal: 'internal'
};

export type ComplaintVisibility = (typeof ComplaintVisibility)[keyof typeof ComplaintVisibility]


export const ComplaintStatus: {
  open: 'open',
  under_review: 'under_review',
  escalated: 'escalated',
  resolved: 'resolved',
  hidden: 'hidden'
};

export type ComplaintStatus = (typeof ComplaintStatus)[keyof typeof ComplaintStatus]

}

export type ComplaintVisibility = $Enums.ComplaintVisibility

export const ComplaintVisibility: typeof $Enums.ComplaintVisibility

export type ComplaintStatus = $Enums.ComplaintStatus

export const ComplaintStatus: typeof $Enums.ComplaintStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Complaints
 * const complaints = await prisma.complaint.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Complaints
   * const complaints = await prisma.complaint.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.complaint`: Exposes CRUD operations for the **Complaint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Complaints
    * const complaints = await prisma.complaint.findMany()
    * ```
    */
  get complaint(): Prisma.ComplaintDelegate<ExtArgs>;

  /**
   * `prisma.complaintTag`: Exposes CRUD operations for the **ComplaintTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintTags
    * const complaintTags = await prisma.complaintTag.findMany()
    * ```
    */
  get complaintTag(): Prisma.ComplaintTagDelegate<ExtArgs>;

  /**
   * `prisma.cluster`: Exposes CRUD operations for the **Cluster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clusters
    * const clusters = await prisma.cluster.findMany()
    * ```
    */
  get cluster(): Prisma.ClusterDelegate<ExtArgs>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs>;

  /**
   * `prisma.auditEvent`: Exposes CRUD operations for the **AuditEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEvents
    * const auditEvents = await prisma.auditEvent.findMany()
    * ```
    */
  get auditEvent(): Prisma.AuditEventDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Complaint: 'Complaint',
    ComplaintTag: 'ComplaintTag',
    Cluster: 'Cluster',
    Comment: 'Comment',
    Report: 'Report',
    AuditEvent: 'AuditEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "complaint" | "complaintTag" | "cluster" | "comment" | "report" | "auditEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Complaint: {
        payload: Prisma.$ComplaintPayload<ExtArgs>
        fields: Prisma.ComplaintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findFirst: {
            args: Prisma.ComplaintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findMany: {
            args: Prisma.ComplaintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          create: {
            args: Prisma.ComplaintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          createMany: {
            args: Prisma.ComplaintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          delete: {
            args: Prisma.ComplaintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          update: {
            args: Prisma.ComplaintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplaintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaint>
          }
          groupBy: {
            args: Prisma.ComplaintGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintCountAggregateOutputType> | number
          }
        }
      }
      ComplaintTag: {
        payload: Prisma.$ComplaintTagPayload<ExtArgs>
        fields: Prisma.ComplaintTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          findFirst: {
            args: Prisma.ComplaintTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          findMany: {
            args: Prisma.ComplaintTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>[]
          }
          create: {
            args: Prisma.ComplaintTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          createMany: {
            args: Prisma.ComplaintTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>[]
          }
          delete: {
            args: Prisma.ComplaintTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          update: {
            args: Prisma.ComplaintTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplaintTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintTagPayload>
          }
          aggregate: {
            args: Prisma.ComplaintTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintTag>
          }
          groupBy: {
            args: Prisma.ComplaintTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintTagCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintTagCountAggregateOutputType> | number
          }
        }
      }
      Cluster: {
        payload: Prisma.$ClusterPayload<ExtArgs>
        fields: Prisma.ClusterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClusterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClusterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          findFirst: {
            args: Prisma.ClusterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClusterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          findMany: {
            args: Prisma.ClusterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>[]
          }
          create: {
            args: Prisma.ClusterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          createMany: {
            args: Prisma.ClusterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClusterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>[]
          }
          delete: {
            args: Prisma.ClusterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          update: {
            args: Prisma.ClusterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          deleteMany: {
            args: Prisma.ClusterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClusterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClusterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          aggregate: {
            args: Prisma.ClusterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCluster>
          }
          groupBy: {
            args: Prisma.ClusterGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClusterGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClusterCountArgs<ExtArgs>
            result: $Utils.Optional<ClusterCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      AuditEvent: {
        payload: Prisma.$AuditEventPayload<ExtArgs>
        fields: Prisma.AuditEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findFirst: {
            args: Prisma.AuditEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findMany: {
            args: Prisma.AuditEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          create: {
            args: Prisma.AuditEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          createMany: {
            args: Prisma.AuditEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          delete: {
            args: Prisma.AuditEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          update: {
            args: Prisma.AuditEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          deleteMany: {
            args: Prisma.AuditEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          aggregate: {
            args: Prisma.AuditEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEvent>
          }
          groupBy: {
            args: Prisma.AuditEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEventCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEventCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type ComplaintCountOutputType
   */

  export type ComplaintCountOutputType = {
    tags: number
    comments: number
    reports: number
  }

  export type ComplaintCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ComplaintCountOutputTypeCountTagsArgs
    comments?: boolean | ComplaintCountOutputTypeCountCommentsArgs
    reports?: boolean | ComplaintCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes
  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintCountOutputType
     */
    select?: ComplaintCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintTagWhereInput
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type ClusterCountOutputType
   */

  export type ClusterCountOutputType = {
    complaints: number
  }

  export type ClusterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaints?: boolean | ClusterCountOutputTypeCountComplaintsArgs
  }

  // Custom InputTypes
  /**
   * ClusterCountOutputType without action
   */
  export type ClusterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClusterCountOutputType
     */
    select?: ClusterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClusterCountOutputType without action
   */
  export type ClusterCountOutputTypeCountComplaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Complaint
   */

  export type AggregateComplaint = {
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  export type ComplaintMinAggregateOutputType = {
    id: string | null
    authorId: string | null
    platform: string | null
    category: string | null
    title: string | null
    description: string | null
    visibility: $Enums.ComplaintVisibility | null
    status: $Enums.ComplaintStatus | null
    clusterId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplaintMaxAggregateOutputType = {
    id: string | null
    authorId: string | null
    platform: string | null
    category: string | null
    title: string | null
    description: string | null
    visibility: $Enums.ComplaintVisibility | null
    status: $Enums.ComplaintStatus | null
    clusterId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplaintCountAggregateOutputType = {
    id: number
    authorId: number
    platform: number
    category: number
    title: number
    description: number
    visibility: number
    status: number
    clusterId: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComplaintMinAggregateInputType = {
    id?: true
    authorId?: true
    platform?: true
    category?: true
    title?: true
    description?: true
    visibility?: true
    status?: true
    clusterId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplaintMaxAggregateInputType = {
    id?: true
    authorId?: true
    platform?: true
    category?: true
    title?: true
    description?: true
    visibility?: true
    status?: true
    clusterId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplaintCountAggregateInputType = {
    id?: true
    authorId?: true
    platform?: true
    category?: true
    title?: true
    description?: true
    visibility?: true
    status?: true
    clusterId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComplaintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaint to aggregate.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Complaints
    **/
    _count?: true | ComplaintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintMaxAggregateInputType
  }

  export type GetComplaintAggregateType<T extends ComplaintAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaint[P]>
      : GetScalarType<T[P], AggregateComplaint[P]>
  }




  export type ComplaintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithAggregationInput | ComplaintOrderByWithAggregationInput[]
    by: ComplaintScalarFieldEnum[] | ComplaintScalarFieldEnum
    having?: ComplaintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintCountAggregateInputType | true
    _min?: ComplaintMinAggregateInputType
    _max?: ComplaintMaxAggregateInputType
  }

  export type ComplaintGroupByOutputType = {
    id: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility: $Enums.ComplaintVisibility
    status: $Enums.ComplaintStatus
    clusterId: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  type GetComplaintGroupByPayload<T extends ComplaintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    platform?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    visibility?: boolean
    status?: boolean
    clusterId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean | Complaint$tagsArgs<ExtArgs>
    comments?: boolean | Complaint$commentsArgs<ExtArgs>
    reports?: boolean | Complaint$reportsArgs<ExtArgs>
    cluster?: boolean | Complaint$clusterArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    platform?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    visibility?: boolean
    status?: boolean
    clusterId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cluster?: boolean | Complaint$clusterArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectScalar = {
    id?: boolean
    authorId?: boolean
    platform?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    visibility?: boolean
    status?: boolean
    clusterId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComplaintInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Complaint$tagsArgs<ExtArgs>
    comments?: boolean | Complaint$commentsArgs<ExtArgs>
    reports?: boolean | Complaint$reportsArgs<ExtArgs>
    cluster?: boolean | Complaint$clusterArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComplaintIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cluster?: boolean | Complaint$clusterArgs<ExtArgs>
  }

  export type $ComplaintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Complaint"
    objects: {
      tags: Prisma.$ComplaintTagPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
      cluster: Prisma.$ClusterPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authorId: string
      platform: string
      category: string
      title: string
      description: string
      visibility: $Enums.ComplaintVisibility
      status: $Enums.ComplaintStatus
      clusterId: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["complaint"]>
    composites: {}
  }

  type ComplaintGetPayload<S extends boolean | null | undefined | ComplaintDefaultArgs> = $Result.GetResult<Prisma.$ComplaintPayload, S>

  type ComplaintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplaintFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplaintCountAggregateInputType | true
    }

  export interface ComplaintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Complaint'], meta: { name: 'Complaint' } }
    /**
     * Find zero or one Complaint that matches the filter.
     * @param {ComplaintFindUniqueArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintFindUniqueArgs>(args: SelectSubset<T, ComplaintFindUniqueArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Complaint that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplaintFindUniqueOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Complaint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintFindFirstArgs>(args?: SelectSubset<T, ComplaintFindFirstArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Complaint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Complaints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Complaints
     * const complaints = await prisma.complaint.findMany()
     * 
     * // Get first 10 Complaints
     * const complaints = await prisma.complaint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintWithIdOnly = await prisma.complaint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintFindManyArgs>(args?: SelectSubset<T, ComplaintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Complaint.
     * @param {ComplaintCreateArgs} args - Arguments to create a Complaint.
     * @example
     * // Create one Complaint
     * const Complaint = await prisma.complaint.create({
     *   data: {
     *     // ... data to create a Complaint
     *   }
     * })
     * 
     */
    create<T extends ComplaintCreateArgs>(args: SelectSubset<T, ComplaintCreateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Complaints.
     * @param {ComplaintCreateManyArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintCreateManyArgs>(args?: SelectSubset<T, ComplaintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Complaints and returns the data saved in the database.
     * @param {ComplaintCreateManyAndReturnArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Complaint.
     * @param {ComplaintDeleteArgs} args - Arguments to delete one Complaint.
     * @example
     * // Delete one Complaint
     * const Complaint = await prisma.complaint.delete({
     *   where: {
     *     // ... filter to delete one Complaint
     *   }
     * })
     * 
     */
    delete<T extends ComplaintDeleteArgs>(args: SelectSubset<T, ComplaintDeleteArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Complaint.
     * @param {ComplaintUpdateArgs} args - Arguments to update one Complaint.
     * @example
     * // Update one Complaint
     * const complaint = await prisma.complaint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintUpdateArgs>(args: SelectSubset<T, ComplaintUpdateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Complaints.
     * @param {ComplaintDeleteManyArgs} args - Arguments to filter Complaints to delete.
     * @example
     * // Delete a few Complaints
     * const { count } = await prisma.complaint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintDeleteManyArgs>(args?: SelectSubset<T, ComplaintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintUpdateManyArgs>(args: SelectSubset<T, ComplaintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Complaint.
     * @param {ComplaintUpsertArgs} args - Arguments to update or create a Complaint.
     * @example
     * // Update or create a Complaint
     * const complaint = await prisma.complaint.upsert({
     *   create: {
     *     // ... data to create a Complaint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Complaint we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintUpsertArgs>(args: SelectSubset<T, ComplaintUpsertArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintCountArgs} args - Arguments to filter Complaints to count.
     * @example
     * // Count the number of Complaints
     * const count = await prisma.complaint.count({
     *   where: {
     *     // ... the filter for the Complaints we want to count
     *   }
     * })
    **/
    count<T extends ComplaintCountArgs>(
      args?: Subset<T, ComplaintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplaintAggregateArgs>(args: Subset<T, ComplaintAggregateArgs>): Prisma.PrismaPromise<GetComplaintAggregateType<T>>

    /**
     * Group by Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintGroupByArgs} args - Group by arguments.
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
      T extends ComplaintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplaintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Complaint model
   */
  readonly fields: ComplaintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Complaint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Complaint$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findMany"> | Null>
    comments<T extends Complaint$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    reports<T extends Complaint$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany"> | Null>
    cluster<T extends Complaint$clusterArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$clusterArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Complaint model
   */ 
  interface ComplaintFieldRefs {
    readonly id: FieldRef<"Complaint", 'String'>
    readonly authorId: FieldRef<"Complaint", 'String'>
    readonly platform: FieldRef<"Complaint", 'String'>
    readonly category: FieldRef<"Complaint", 'String'>
    readonly title: FieldRef<"Complaint", 'String'>
    readonly description: FieldRef<"Complaint", 'String'>
    readonly visibility: FieldRef<"Complaint", 'ComplaintVisibility'>
    readonly status: FieldRef<"Complaint", 'ComplaintStatus'>
    readonly clusterId: FieldRef<"Complaint", 'String'>
    readonly deletedAt: FieldRef<"Complaint", 'DateTime'>
    readonly createdAt: FieldRef<"Complaint", 'DateTime'>
    readonly updatedAt: FieldRef<"Complaint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Complaint findUnique
   */
  export type ComplaintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findUniqueOrThrow
   */
  export type ComplaintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findFirst
   */
  export type ComplaintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findFirstOrThrow
   */
  export type ComplaintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findMany
   */
  export type ComplaintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaints to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint create
   */
  export type ComplaintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to create a Complaint.
     */
    data: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
  }

  /**
   * Complaint createMany
   */
  export type ComplaintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Complaint createManyAndReturn
   */
  export type ComplaintCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Complaint update
   */
  export type ComplaintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to update a Complaint.
     */
    data: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
    /**
     * Choose, which Complaint to update.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint updateMany
   */
  export type ComplaintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
  }

  /**
   * Complaint upsert
   */
  export type ComplaintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The filter to search for the Complaint to update in case it exists.
     */
    where: ComplaintWhereUniqueInput
    /**
     * In case the Complaint found by the `where` argument doesn't exist, create a new Complaint with this data.
     */
    create: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
    /**
     * In case the Complaint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
  }

  /**
   * Complaint delete
   */
  export type ComplaintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter which Complaint to delete.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint deleteMany
   */
  export type ComplaintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaints to delete
     */
    where?: ComplaintWhereInput
  }

  /**
   * Complaint.tags
   */
  export type Complaint$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    where?: ComplaintTagWhereInput
    orderBy?: ComplaintTagOrderByWithRelationInput | ComplaintTagOrderByWithRelationInput[]
    cursor?: ComplaintTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintTagScalarFieldEnum | ComplaintTagScalarFieldEnum[]
  }

  /**
   * Complaint.comments
   */
  export type Complaint$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Complaint.reports
   */
  export type Complaint$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Complaint.cluster
   */
  export type Complaint$clusterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    where?: ClusterWhereInput
  }

  /**
   * Complaint without action
   */
  export type ComplaintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintTag
   */

  export type AggregateComplaintTag = {
    _count: ComplaintTagCountAggregateOutputType | null
    _min: ComplaintTagMinAggregateOutputType | null
    _max: ComplaintTagMaxAggregateOutputType | null
  }

  export type ComplaintTagMinAggregateOutputType = {
    id: string | null
    complaintId: string | null
    label: string | null
    addedBy: string | null
    createdAt: Date | null
  }

  export type ComplaintTagMaxAggregateOutputType = {
    id: string | null
    complaintId: string | null
    label: string | null
    addedBy: string | null
    createdAt: Date | null
  }

  export type ComplaintTagCountAggregateOutputType = {
    id: number
    complaintId: number
    label: number
    addedBy: number
    createdAt: number
    _all: number
  }


  export type ComplaintTagMinAggregateInputType = {
    id?: true
    complaintId?: true
    label?: true
    addedBy?: true
    createdAt?: true
  }

  export type ComplaintTagMaxAggregateInputType = {
    id?: true
    complaintId?: true
    label?: true
    addedBy?: true
    createdAt?: true
  }

  export type ComplaintTagCountAggregateInputType = {
    id?: true
    complaintId?: true
    label?: true
    addedBy?: true
    createdAt?: true
    _all?: true
  }

  export type ComplaintTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintTag to aggregate.
     */
    where?: ComplaintTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintTags to fetch.
     */
    orderBy?: ComplaintTagOrderByWithRelationInput | ComplaintTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintTags
    **/
    _count?: true | ComplaintTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintTagMaxAggregateInputType
  }

  export type GetComplaintTagAggregateType<T extends ComplaintTagAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintTag[P]>
      : GetScalarType<T[P], AggregateComplaintTag[P]>
  }




  export type ComplaintTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintTagWhereInput
    orderBy?: ComplaintTagOrderByWithAggregationInput | ComplaintTagOrderByWithAggregationInput[]
    by: ComplaintTagScalarFieldEnum[] | ComplaintTagScalarFieldEnum
    having?: ComplaintTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintTagCountAggregateInputType | true
    _min?: ComplaintTagMinAggregateInputType
    _max?: ComplaintTagMaxAggregateInputType
  }

  export type ComplaintTagGroupByOutputType = {
    id: string
    complaintId: string
    label: string
    addedBy: string
    createdAt: Date
    _count: ComplaintTagCountAggregateOutputType | null
    _min: ComplaintTagMinAggregateOutputType | null
    _max: ComplaintTagMaxAggregateOutputType | null
  }

  type GetComplaintTagGroupByPayload<T extends ComplaintTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintTagGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintTagGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    label?: boolean
    addedBy?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintTag"]>

  export type ComplaintTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    label?: boolean
    addedBy?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintTag"]>

  export type ComplaintTagSelectScalar = {
    id?: boolean
    complaintId?: boolean
    label?: boolean
    addedBy?: boolean
    createdAt?: boolean
  }

  export type ComplaintTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ComplaintTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintTag"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      complaintId: string
      label: string
      addedBy: string
      createdAt: Date
    }, ExtArgs["result"]["complaintTag"]>
    composites: {}
  }

  type ComplaintTagGetPayload<S extends boolean | null | undefined | ComplaintTagDefaultArgs> = $Result.GetResult<Prisma.$ComplaintTagPayload, S>

  type ComplaintTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplaintTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplaintTagCountAggregateInputType | true
    }

  export interface ComplaintTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintTag'], meta: { name: 'ComplaintTag' } }
    /**
     * Find zero or one ComplaintTag that matches the filter.
     * @param {ComplaintTagFindUniqueArgs} args - Arguments to find a ComplaintTag
     * @example
     * // Get one ComplaintTag
     * const complaintTag = await prisma.complaintTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintTagFindUniqueArgs>(args: SelectSubset<T, ComplaintTagFindUniqueArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplaintTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplaintTagFindUniqueOrThrowArgs} args - Arguments to find a ComplaintTag
     * @example
     * // Get one ComplaintTag
     * const complaintTag = await prisma.complaintTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplaintTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagFindFirstArgs} args - Arguments to find a ComplaintTag
     * @example
     * // Get one ComplaintTag
     * const complaintTag = await prisma.complaintTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintTagFindFirstArgs>(args?: SelectSubset<T, ComplaintTagFindFirstArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplaintTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagFindFirstOrThrowArgs} args - Arguments to find a ComplaintTag
     * @example
     * // Get one ComplaintTag
     * const complaintTag = await prisma.complaintTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplaintTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintTags
     * const complaintTags = await prisma.complaintTag.findMany()
     * 
     * // Get first 10 ComplaintTags
     * const complaintTags = await prisma.complaintTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintTagWithIdOnly = await prisma.complaintTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintTagFindManyArgs>(args?: SelectSubset<T, ComplaintTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplaintTag.
     * @param {ComplaintTagCreateArgs} args - Arguments to create a ComplaintTag.
     * @example
     * // Create one ComplaintTag
     * const ComplaintTag = await prisma.complaintTag.create({
     *   data: {
     *     // ... data to create a ComplaintTag
     *   }
     * })
     * 
     */
    create<T extends ComplaintTagCreateArgs>(args: SelectSubset<T, ComplaintTagCreateArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplaintTags.
     * @param {ComplaintTagCreateManyArgs} args - Arguments to create many ComplaintTags.
     * @example
     * // Create many ComplaintTags
     * const complaintTag = await prisma.complaintTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintTagCreateManyArgs>(args?: SelectSubset<T, ComplaintTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintTags and returns the data saved in the database.
     * @param {ComplaintTagCreateManyAndReturnArgs} args - Arguments to create many ComplaintTags.
     * @example
     * // Create many ComplaintTags
     * const complaintTag = await prisma.complaintTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintTags and only return the `id`
     * const complaintTagWithIdOnly = await prisma.complaintTag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplaintTag.
     * @param {ComplaintTagDeleteArgs} args - Arguments to delete one ComplaintTag.
     * @example
     * // Delete one ComplaintTag
     * const ComplaintTag = await prisma.complaintTag.delete({
     *   where: {
     *     // ... filter to delete one ComplaintTag
     *   }
     * })
     * 
     */
    delete<T extends ComplaintTagDeleteArgs>(args: SelectSubset<T, ComplaintTagDeleteArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplaintTag.
     * @param {ComplaintTagUpdateArgs} args - Arguments to update one ComplaintTag.
     * @example
     * // Update one ComplaintTag
     * const complaintTag = await prisma.complaintTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintTagUpdateArgs>(args: SelectSubset<T, ComplaintTagUpdateArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplaintTags.
     * @param {ComplaintTagDeleteManyArgs} args - Arguments to filter ComplaintTags to delete.
     * @example
     * // Delete a few ComplaintTags
     * const { count } = await prisma.complaintTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintTagDeleteManyArgs>(args?: SelectSubset<T, ComplaintTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintTags
     * const complaintTag = await prisma.complaintTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintTagUpdateManyArgs>(args: SelectSubset<T, ComplaintTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplaintTag.
     * @param {ComplaintTagUpsertArgs} args - Arguments to update or create a ComplaintTag.
     * @example
     * // Update or create a ComplaintTag
     * const complaintTag = await prisma.complaintTag.upsert({
     *   create: {
     *     // ... data to create a ComplaintTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintTag we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintTagUpsertArgs>(args: SelectSubset<T, ComplaintTagUpsertArgs<ExtArgs>>): Prisma__ComplaintTagClient<$Result.GetResult<Prisma.$ComplaintTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplaintTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagCountArgs} args - Arguments to filter ComplaintTags to count.
     * @example
     * // Count the number of ComplaintTags
     * const count = await prisma.complaintTag.count({
     *   where: {
     *     // ... the filter for the ComplaintTags we want to count
     *   }
     * })
    **/
    count<T extends ComplaintTagCountArgs>(
      args?: Subset<T, ComplaintTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplaintTagAggregateArgs>(args: Subset<T, ComplaintTagAggregateArgs>): Prisma.PrismaPromise<GetComplaintTagAggregateType<T>>

    /**
     * Group by ComplaintTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintTagGroupByArgs} args - Group by arguments.
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
      T extends ComplaintTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintTagGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintTagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplaintTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintTag model
   */
  readonly fields: ComplaintTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ComplaintTag model
   */ 
  interface ComplaintTagFieldRefs {
    readonly id: FieldRef<"ComplaintTag", 'String'>
    readonly complaintId: FieldRef<"ComplaintTag", 'String'>
    readonly label: FieldRef<"ComplaintTag", 'String'>
    readonly addedBy: FieldRef<"ComplaintTag", 'String'>
    readonly createdAt: FieldRef<"ComplaintTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintTag findUnique
   */
  export type ComplaintTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintTag to fetch.
     */
    where: ComplaintTagWhereUniqueInput
  }

  /**
   * ComplaintTag findUniqueOrThrow
   */
  export type ComplaintTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintTag to fetch.
     */
    where: ComplaintTagWhereUniqueInput
  }

  /**
   * ComplaintTag findFirst
   */
  export type ComplaintTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintTag to fetch.
     */
    where?: ComplaintTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintTags to fetch.
     */
    orderBy?: ComplaintTagOrderByWithRelationInput | ComplaintTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintTags.
     */
    cursor?: ComplaintTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintTags.
     */
    distinct?: ComplaintTagScalarFieldEnum | ComplaintTagScalarFieldEnum[]
  }

  /**
   * ComplaintTag findFirstOrThrow
   */
  export type ComplaintTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintTag to fetch.
     */
    where?: ComplaintTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintTags to fetch.
     */
    orderBy?: ComplaintTagOrderByWithRelationInput | ComplaintTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintTags.
     */
    cursor?: ComplaintTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintTags.
     */
    distinct?: ComplaintTagScalarFieldEnum | ComplaintTagScalarFieldEnum[]
  }

  /**
   * ComplaintTag findMany
   */
  export type ComplaintTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintTags to fetch.
     */
    where?: ComplaintTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintTags to fetch.
     */
    orderBy?: ComplaintTagOrderByWithRelationInput | ComplaintTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintTags.
     */
    cursor?: ComplaintTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintTags.
     */
    skip?: number
    distinct?: ComplaintTagScalarFieldEnum | ComplaintTagScalarFieldEnum[]
  }

  /**
   * ComplaintTag create
   */
  export type ComplaintTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintTag.
     */
    data: XOR<ComplaintTagCreateInput, ComplaintTagUncheckedCreateInput>
  }

  /**
   * ComplaintTag createMany
   */
  export type ComplaintTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintTags.
     */
    data: ComplaintTagCreateManyInput | ComplaintTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplaintTag createManyAndReturn
   */
  export type ComplaintTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplaintTags.
     */
    data: ComplaintTagCreateManyInput | ComplaintTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintTag update
   */
  export type ComplaintTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintTag.
     */
    data: XOR<ComplaintTagUpdateInput, ComplaintTagUncheckedUpdateInput>
    /**
     * Choose, which ComplaintTag to update.
     */
    where: ComplaintTagWhereUniqueInput
  }

  /**
   * ComplaintTag updateMany
   */
  export type ComplaintTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintTags.
     */
    data: XOR<ComplaintTagUpdateManyMutationInput, ComplaintTagUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintTags to update
     */
    where?: ComplaintTagWhereInput
  }

  /**
   * ComplaintTag upsert
   */
  export type ComplaintTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintTag to update in case it exists.
     */
    where: ComplaintTagWhereUniqueInput
    /**
     * In case the ComplaintTag found by the `where` argument doesn't exist, create a new ComplaintTag with this data.
     */
    create: XOR<ComplaintTagCreateInput, ComplaintTagUncheckedCreateInput>
    /**
     * In case the ComplaintTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintTagUpdateInput, ComplaintTagUncheckedUpdateInput>
  }

  /**
   * ComplaintTag delete
   */
  export type ComplaintTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
    /**
     * Filter which ComplaintTag to delete.
     */
    where: ComplaintTagWhereUniqueInput
  }

  /**
   * ComplaintTag deleteMany
   */
  export type ComplaintTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintTags to delete
     */
    where?: ComplaintTagWhereInput
  }

  /**
   * ComplaintTag without action
   */
  export type ComplaintTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintTag
     */
    select?: ComplaintTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintTagInclude<ExtArgs> | null
  }


  /**
   * Model Cluster
   */

  export type AggregateCluster = {
    _count: ClusterCountAggregateOutputType | null
    _min: ClusterMinAggregateOutputType | null
    _max: ClusterMaxAggregateOutputType | null
  }

  export type ClusterMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClusterMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClusterCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClusterMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClusterMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClusterCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClusterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cluster to aggregate.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clusters
    **/
    _count?: true | ClusterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClusterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClusterMaxAggregateInputType
  }

  export type GetClusterAggregateType<T extends ClusterAggregateArgs> = {
        [P in keyof T & keyof AggregateCluster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCluster[P]>
      : GetScalarType<T[P], AggregateCluster[P]>
  }




  export type ClusterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClusterWhereInput
    orderBy?: ClusterOrderByWithAggregationInput | ClusterOrderByWithAggregationInput[]
    by: ClusterScalarFieldEnum[] | ClusterScalarFieldEnum
    having?: ClusterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClusterCountAggregateInputType | true
    _min?: ClusterMinAggregateInputType
    _max?: ClusterMaxAggregateInputType
  }

  export type ClusterGroupByOutputType = {
    id: string
    title: string
    description: string | null
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: ClusterCountAggregateOutputType | null
    _min: ClusterMinAggregateOutputType | null
    _max: ClusterMaxAggregateOutputType | null
  }

  type GetClusterGroupByPayload<T extends ClusterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClusterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClusterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClusterGroupByOutputType[P]>
            : GetScalarType<T[P], ClusterGroupByOutputType[P]>
        }
      >
    >


  export type ClusterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    complaints?: boolean | Cluster$complaintsArgs<ExtArgs>
    _count?: boolean | ClusterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cluster"]>

  export type ClusterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cluster"]>

  export type ClusterSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClusterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaints?: boolean | Cluster$complaintsArgs<ExtArgs>
    _count?: boolean | ClusterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClusterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClusterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cluster"
    objects: {
      complaints: Prisma.$ComplaintPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cluster"]>
    composites: {}
  }

  type ClusterGetPayload<S extends boolean | null | undefined | ClusterDefaultArgs> = $Result.GetResult<Prisma.$ClusterPayload, S>

  type ClusterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClusterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClusterCountAggregateInputType | true
    }

  export interface ClusterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cluster'], meta: { name: 'Cluster' } }
    /**
     * Find zero or one Cluster that matches the filter.
     * @param {ClusterFindUniqueArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClusterFindUniqueArgs>(args: SelectSubset<T, ClusterFindUniqueArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cluster that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClusterFindUniqueOrThrowArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClusterFindUniqueOrThrowArgs>(args: SelectSubset<T, ClusterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cluster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindFirstArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClusterFindFirstArgs>(args?: SelectSubset<T, ClusterFindFirstArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cluster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindFirstOrThrowArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClusterFindFirstOrThrowArgs>(args?: SelectSubset<T, ClusterFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clusters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clusters
     * const clusters = await prisma.cluster.findMany()
     * 
     * // Get first 10 Clusters
     * const clusters = await prisma.cluster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clusterWithIdOnly = await prisma.cluster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClusterFindManyArgs>(args?: SelectSubset<T, ClusterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cluster.
     * @param {ClusterCreateArgs} args - Arguments to create a Cluster.
     * @example
     * // Create one Cluster
     * const Cluster = await prisma.cluster.create({
     *   data: {
     *     // ... data to create a Cluster
     *   }
     * })
     * 
     */
    create<T extends ClusterCreateArgs>(args: SelectSubset<T, ClusterCreateArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clusters.
     * @param {ClusterCreateManyArgs} args - Arguments to create many Clusters.
     * @example
     * // Create many Clusters
     * const cluster = await prisma.cluster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClusterCreateManyArgs>(args?: SelectSubset<T, ClusterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clusters and returns the data saved in the database.
     * @param {ClusterCreateManyAndReturnArgs} args - Arguments to create many Clusters.
     * @example
     * // Create many Clusters
     * const cluster = await prisma.cluster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clusters and only return the `id`
     * const clusterWithIdOnly = await prisma.cluster.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClusterCreateManyAndReturnArgs>(args?: SelectSubset<T, ClusterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cluster.
     * @param {ClusterDeleteArgs} args - Arguments to delete one Cluster.
     * @example
     * // Delete one Cluster
     * const Cluster = await prisma.cluster.delete({
     *   where: {
     *     // ... filter to delete one Cluster
     *   }
     * })
     * 
     */
    delete<T extends ClusterDeleteArgs>(args: SelectSubset<T, ClusterDeleteArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cluster.
     * @param {ClusterUpdateArgs} args - Arguments to update one Cluster.
     * @example
     * // Update one Cluster
     * const cluster = await prisma.cluster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClusterUpdateArgs>(args: SelectSubset<T, ClusterUpdateArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clusters.
     * @param {ClusterDeleteManyArgs} args - Arguments to filter Clusters to delete.
     * @example
     * // Delete a few Clusters
     * const { count } = await prisma.cluster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClusterDeleteManyArgs>(args?: SelectSubset<T, ClusterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clusters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clusters
     * const cluster = await prisma.cluster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClusterUpdateManyArgs>(args: SelectSubset<T, ClusterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cluster.
     * @param {ClusterUpsertArgs} args - Arguments to update or create a Cluster.
     * @example
     * // Update or create a Cluster
     * const cluster = await prisma.cluster.upsert({
     *   create: {
     *     // ... data to create a Cluster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cluster we want to update
     *   }
     * })
     */
    upsert<T extends ClusterUpsertArgs>(args: SelectSubset<T, ClusterUpsertArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clusters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterCountArgs} args - Arguments to filter Clusters to count.
     * @example
     * // Count the number of Clusters
     * const count = await prisma.cluster.count({
     *   where: {
     *     // ... the filter for the Clusters we want to count
     *   }
     * })
    **/
    count<T extends ClusterCountArgs>(
      args?: Subset<T, ClusterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClusterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cluster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClusterAggregateArgs>(args: Subset<T, ClusterAggregateArgs>): Prisma.PrismaPromise<GetClusterAggregateType<T>>

    /**
     * Group by Cluster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterGroupByArgs} args - Group by arguments.
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
      T extends ClusterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClusterGroupByArgs['orderBy'] }
        : { orderBy?: ClusterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClusterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClusterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cluster model
   */
  readonly fields: ClusterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cluster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClusterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaints<T extends Cluster$complaintsArgs<ExtArgs> = {}>(args?: Subset<T, Cluster$complaintsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Cluster model
   */ 
  interface ClusterFieldRefs {
    readonly id: FieldRef<"Cluster", 'String'>
    readonly title: FieldRef<"Cluster", 'String'>
    readonly description: FieldRef<"Cluster", 'String'>
    readonly createdBy: FieldRef<"Cluster", 'String'>
    readonly createdAt: FieldRef<"Cluster", 'DateTime'>
    readonly updatedAt: FieldRef<"Cluster", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cluster findUnique
   */
  export type ClusterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster findUniqueOrThrow
   */
  export type ClusterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster findFirst
   */
  export type ClusterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clusters.
     */
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster findFirstOrThrow
   */
  export type ClusterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clusters.
     */
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster findMany
   */
  export type ClusterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter, which Clusters to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster create
   */
  export type ClusterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * The data needed to create a Cluster.
     */
    data: XOR<ClusterCreateInput, ClusterUncheckedCreateInput>
  }

  /**
   * Cluster createMany
   */
  export type ClusterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clusters.
     */
    data: ClusterCreateManyInput | ClusterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cluster createManyAndReturn
   */
  export type ClusterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Clusters.
     */
    data: ClusterCreateManyInput | ClusterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cluster update
   */
  export type ClusterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * The data needed to update a Cluster.
     */
    data: XOR<ClusterUpdateInput, ClusterUncheckedUpdateInput>
    /**
     * Choose, which Cluster to update.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster updateMany
   */
  export type ClusterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clusters.
     */
    data: XOR<ClusterUpdateManyMutationInput, ClusterUncheckedUpdateManyInput>
    /**
     * Filter which Clusters to update
     */
    where?: ClusterWhereInput
  }

  /**
   * Cluster upsert
   */
  export type ClusterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * The filter to search for the Cluster to update in case it exists.
     */
    where: ClusterWhereUniqueInput
    /**
     * In case the Cluster found by the `where` argument doesn't exist, create a new Cluster with this data.
     */
    create: XOR<ClusterCreateInput, ClusterUncheckedCreateInput>
    /**
     * In case the Cluster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClusterUpdateInput, ClusterUncheckedUpdateInput>
  }

  /**
   * Cluster delete
   */
  export type ClusterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
    /**
     * Filter which Cluster to delete.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster deleteMany
   */
  export type ClusterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clusters to delete
     */
    where?: ClusterWhereInput
  }

  /**
   * Cluster.complaints
   */
  export type Cluster$complaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    cursor?: ComplaintWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Cluster without action
   */
  export type ClusterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClusterInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    complaintId: string | null
    authorId: string | null
    body: string | null
    deletedAt: Date | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    complaintId: string | null
    authorId: string | null
    body: string | null
    deletedAt: Date | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    complaintId: number
    authorId: number
    body: number
    deletedAt: number
    createdAt: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    complaintId?: true
    authorId?: true
    body?: true
    deletedAt?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    complaintId?: true
    authorId?: true
    body?: true
    deletedAt?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    complaintId?: true
    authorId?: true
    body?: true
    deletedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    complaintId: string
    authorId: string
    body: string
    deletedAt: Date | null
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    authorId?: boolean
    body?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    authorId?: boolean
    body?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    complaintId?: boolean
    authorId?: boolean
    body?: boolean
    deletedAt?: boolean
    createdAt?: boolean
  }

  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      complaintId: string
      authorId: string
      body: string
      deletedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
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
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Comment model
   */ 
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly complaintId: FieldRef<"Comment", 'String'>
    readonly authorId: FieldRef<"Comment", 'String'>
    readonly body: FieldRef<"Comment", 'String'>
    readonly deletedAt: FieldRef<"Comment", 'DateTime'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    complaintId: string | null
    reporterId: string | null
    reason: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    complaintId: string | null
    reporterId: string | null
    reason: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    complaintId: number
    reporterId: number
    reason: number
    resolvedAt: number
    createdAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    complaintId?: true
    reporterId?: true
    reason?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    complaintId?: true
    reporterId?: true
    reason?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    complaintId?: true
    reporterId?: true
    reason?: true
    resolvedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    complaintId: string
    reporterId: string
    reason: string
    resolvedAt: Date | null
    createdAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    reporterId?: boolean
    reason?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    reporterId?: boolean
    reason?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    complaintId?: boolean
    reporterId?: boolean
    reason?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      complaintId: string
      reporterId: string
      reason: string
      resolvedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
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
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Report model
   */ 
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly complaintId: FieldRef<"Report", 'String'>
    readonly reporterId: FieldRef<"Report", 'String'>
    readonly reason: FieldRef<"Report", 'String'>
    readonly resolvedAt: FieldRef<"Report", 'DateTime'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model AuditEvent
   */

  export type AggregateAuditEvent = {
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  export type AuditEventMinAggregateOutputType = {
    id: string | null
    actorId: string | null
    actorRole: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ip: string | null
    ua: string | null
    createdAt: Date | null
  }

  export type AuditEventMaxAggregateOutputType = {
    id: string | null
    actorId: string | null
    actorRole: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ip: string | null
    ua: string | null
    createdAt: Date | null
  }

  export type AuditEventCountAggregateOutputType = {
    id: number
    actorId: number
    actorRole: number
    action: number
    entity: number
    entityId: number
    diff: number
    ip: number
    ua: number
    createdAt: number
    _all: number
  }


  export type AuditEventMinAggregateInputType = {
    id?: true
    actorId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    ip?: true
    ua?: true
    createdAt?: true
  }

  export type AuditEventMaxAggregateInputType = {
    id?: true
    actorId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    ip?: true
    ua?: true
    createdAt?: true
  }

  export type AuditEventCountAggregateInputType = {
    id?: true
    actorId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    diff?: true
    ip?: true
    ua?: true
    createdAt?: true
    _all?: true
  }

  export type AuditEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvent to aggregate.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEvents
    **/
    _count?: true | AuditEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEventMaxAggregateInputType
  }

  export type GetAuditEventAggregateType<T extends AuditEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEvent[P]>
      : GetScalarType<T[P], AggregateAuditEvent[P]>
  }




  export type AuditEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithAggregationInput | AuditEventOrderByWithAggregationInput[]
    by: AuditEventScalarFieldEnum[] | AuditEventScalarFieldEnum
    having?: AuditEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEventCountAggregateInputType | true
    _min?: AuditEventMinAggregateInputType
    _max?: AuditEventMaxAggregateInputType
  }

  export type AuditEventGroupByOutputType = {
    id: string
    actorId: string | null
    actorRole: string | null
    action: string
    entity: string
    entityId: string
    diff: JsonValue
    ip: string | null
    ua: string | null
    createdAt: Date
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  type GetAuditEventGroupByPayload<T extends AuditEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
        }
      >
    >


  export type AuditEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    ip?: boolean
    ua?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    ip?: boolean
    ua?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectScalar = {
    id?: boolean
    actorId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    ip?: boolean
    ua?: boolean
    createdAt?: boolean
  }


  export type $AuditEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorId: string | null
      actorRole: string | null
      action: string
      entity: string
      entityId: string
      diff: Prisma.JsonValue
      ip: string | null
      ua: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditEvent"]>
    composites: {}
  }

  type AuditEventGetPayload<S extends boolean | null | undefined | AuditEventDefaultArgs> = $Result.GetResult<Prisma.$AuditEventPayload, S>

  type AuditEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditEventCountAggregateInputType | true
    }

  export interface AuditEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEvent'], meta: { name: 'AuditEvent' } }
    /**
     * Find zero or one AuditEvent that matches the filter.
     * @param {AuditEventFindUniqueArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEventFindUniqueArgs>(args: SelectSubset<T, AuditEventFindUniqueArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditEventFindUniqueOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEventFindFirstArgs>(args?: SelectSubset<T, AuditEventFindFirstArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany()
     * 
     * // Get first 10 AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEventFindManyArgs>(args?: SelectSubset<T, AuditEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditEvent.
     * @param {AuditEventCreateArgs} args - Arguments to create a AuditEvent.
     * @example
     * // Create one AuditEvent
     * const AuditEvent = await prisma.auditEvent.create({
     *   data: {
     *     // ... data to create a AuditEvent
     *   }
     * })
     * 
     */
    create<T extends AuditEventCreateArgs>(args: SelectSubset<T, AuditEventCreateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditEvents.
     * @param {AuditEventCreateManyArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEventCreateManyArgs>(args?: SelectSubset<T, AuditEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEvents and returns the data saved in the database.
     * @param {AuditEventCreateManyAndReturnArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditEvent.
     * @param {AuditEventDeleteArgs} args - Arguments to delete one AuditEvent.
     * @example
     * // Delete one AuditEvent
     * const AuditEvent = await prisma.auditEvent.delete({
     *   where: {
     *     // ... filter to delete one AuditEvent
     *   }
     * })
     * 
     */
    delete<T extends AuditEventDeleteArgs>(args: SelectSubset<T, AuditEventDeleteArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditEvent.
     * @param {AuditEventUpdateArgs} args - Arguments to update one AuditEvent.
     * @example
     * // Update one AuditEvent
     * const auditEvent = await prisma.auditEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEventUpdateArgs>(args: SelectSubset<T, AuditEventUpdateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditEvents.
     * @param {AuditEventDeleteManyArgs} args - Arguments to filter AuditEvents to delete.
     * @example
     * // Delete a few AuditEvents
     * const { count } = await prisma.auditEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEventDeleteManyArgs>(args?: SelectSubset<T, AuditEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEventUpdateManyArgs>(args: SelectSubset<T, AuditEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditEvent.
     * @param {AuditEventUpsertArgs} args - Arguments to update or create a AuditEvent.
     * @example
     * // Update or create a AuditEvent
     * const auditEvent = await prisma.auditEvent.upsert({
     *   create: {
     *     // ... data to create a AuditEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEvent we want to update
     *   }
     * })
     */
    upsert<T extends AuditEventUpsertArgs>(args: SelectSubset<T, AuditEventUpsertArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventCountArgs} args - Arguments to filter AuditEvents to count.
     * @example
     * // Count the number of AuditEvents
     * const count = await prisma.auditEvent.count({
     *   where: {
     *     // ... the filter for the AuditEvents we want to count
     *   }
     * })
    **/
    count<T extends AuditEventCountArgs>(
      args?: Subset<T, AuditEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditEventAggregateArgs>(args: Subset<T, AuditEventAggregateArgs>): Prisma.PrismaPromise<GetAuditEventAggregateType<T>>

    /**
     * Group by AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventGroupByArgs} args - Group by arguments.
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
      T extends AuditEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEventGroupByArgs['orderBy'] }
        : { orderBy?: AuditEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEvent model
   */
  readonly fields: AuditEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditEvent model
   */ 
  interface AuditEventFieldRefs {
    readonly id: FieldRef<"AuditEvent", 'String'>
    readonly actorId: FieldRef<"AuditEvent", 'String'>
    readonly actorRole: FieldRef<"AuditEvent", 'String'>
    readonly action: FieldRef<"AuditEvent", 'String'>
    readonly entity: FieldRef<"AuditEvent", 'String'>
    readonly entityId: FieldRef<"AuditEvent", 'String'>
    readonly diff: FieldRef<"AuditEvent", 'Json'>
    readonly ip: FieldRef<"AuditEvent", 'String'>
    readonly ua: FieldRef<"AuditEvent", 'String'>
    readonly createdAt: FieldRef<"AuditEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEvent findUnique
   */
  export type AuditEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findUniqueOrThrow
   */
  export type AuditEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findFirst
   */
  export type AuditEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findFirstOrThrow
   */
  export type AuditEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findMany
   */
  export type AuditEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter, which AuditEvents to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent create
   */
  export type AuditEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditEvent.
     */
    data: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
  }

  /**
   * AuditEvent createMany
   */
  export type AuditEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent createManyAndReturn
   */
  export type AuditEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent update
   */
  export type AuditEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditEvent.
     */
    data: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
    /**
     * Choose, which AuditEvent to update.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent updateMany
   */
  export type AuditEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
  }

  /**
   * AuditEvent upsert
   */
  export type AuditEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditEvent to update in case it exists.
     */
    where: AuditEventWhereUniqueInput
    /**
     * In case the AuditEvent found by the `where` argument doesn't exist, create a new AuditEvent with this data.
     */
    create: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
    /**
     * In case the AuditEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
  }

  /**
   * AuditEvent delete
   */
  export type AuditEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Filter which AuditEvent to delete.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent deleteMany
   */
  export type AuditEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvents to delete
     */
    where?: AuditEventWhereInput
  }

  /**
   * AuditEvent without action
   */
  export type AuditEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ComplaintScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    platform: 'platform',
    category: 'category',
    title: 'title',
    description: 'description',
    visibility: 'visibility',
    status: 'status',
    clusterId: 'clusterId',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComplaintScalarFieldEnum = (typeof ComplaintScalarFieldEnum)[keyof typeof ComplaintScalarFieldEnum]


  export const ComplaintTagScalarFieldEnum: {
    id: 'id',
    complaintId: 'complaintId',
    label: 'label',
    addedBy: 'addedBy',
    createdAt: 'createdAt'
  };

  export type ComplaintTagScalarFieldEnum = (typeof ComplaintTagScalarFieldEnum)[keyof typeof ComplaintTagScalarFieldEnum]


  export const ClusterScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClusterScalarFieldEnum = (typeof ClusterScalarFieldEnum)[keyof typeof ClusterScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    complaintId: 'complaintId',
    authorId: 'authorId',
    body: 'body',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    complaintId: 'complaintId',
    reporterId: 'reporterId',
    reason: 'reason',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const AuditEventScalarFieldEnum: {
    id: 'id',
    actorId: 'actorId',
    actorRole: 'actorRole',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    diff: 'diff',
    ip: 'ip',
    ua: 'ua',
    createdAt: 'createdAt'
  };

  export type AuditEventScalarFieldEnum = (typeof AuditEventScalarFieldEnum)[keyof typeof AuditEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ComplaintVisibility'
   */
  export type EnumComplaintVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintVisibility'>
    


  /**
   * Reference to a field of type 'ComplaintVisibility[]'
   */
  export type ListEnumComplaintVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintVisibility[]'>
    


  /**
   * Reference to a field of type 'ComplaintStatus'
   */
  export type EnumComplaintStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintStatus'>
    


  /**
   * Reference to a field of type 'ComplaintStatus[]'
   */
  export type ListEnumComplaintStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ComplaintWhereInput = {
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    id?: StringFilter<"Complaint"> | string
    authorId?: StringFilter<"Complaint"> | string
    platform?: StringFilter<"Complaint"> | string
    category?: StringFilter<"Complaint"> | string
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    visibility?: EnumComplaintVisibilityFilter<"Complaint"> | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    clusterId?: StringNullableFilter<"Complaint"> | string | null
    deletedAt?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    tags?: ComplaintTagListRelationFilter
    comments?: CommentListRelationFilter
    reports?: ReportListRelationFilter
    cluster?: XOR<ClusterNullableRelationFilter, ClusterWhereInput> | null
  }

  export type ComplaintOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    platform?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    clusterId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: ComplaintTagOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    cluster?: ClusterOrderByWithRelationInput
  }

  export type ComplaintWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    authorId?: StringFilter<"Complaint"> | string
    platform?: StringFilter<"Complaint"> | string
    category?: StringFilter<"Complaint"> | string
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    visibility?: EnumComplaintVisibilityFilter<"Complaint"> | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    clusterId?: StringNullableFilter<"Complaint"> | string | null
    deletedAt?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    tags?: ComplaintTagListRelationFilter
    comments?: CommentListRelationFilter
    reports?: ReportListRelationFilter
    cluster?: XOR<ClusterNullableRelationFilter, ClusterWhereInput> | null
  }, "id">

  export type ComplaintOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    platform?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    clusterId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComplaintCountOrderByAggregateInput
    _max?: ComplaintMaxOrderByAggregateInput
    _min?: ComplaintMinOrderByAggregateInput
  }

  export type ComplaintScalarWhereWithAggregatesInput = {
    AND?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    OR?: ComplaintScalarWhereWithAggregatesInput[]
    NOT?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Complaint"> | string
    authorId?: StringWithAggregatesFilter<"Complaint"> | string
    platform?: StringWithAggregatesFilter<"Complaint"> | string
    category?: StringWithAggregatesFilter<"Complaint"> | string
    title?: StringWithAggregatesFilter<"Complaint"> | string
    description?: StringWithAggregatesFilter<"Complaint"> | string
    visibility?: EnumComplaintVisibilityWithAggregatesFilter<"Complaint"> | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusWithAggregatesFilter<"Complaint"> | $Enums.ComplaintStatus
    clusterId?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Complaint"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
  }

  export type ComplaintTagWhereInput = {
    AND?: ComplaintTagWhereInput | ComplaintTagWhereInput[]
    OR?: ComplaintTagWhereInput[]
    NOT?: ComplaintTagWhereInput | ComplaintTagWhereInput[]
    id?: StringFilter<"ComplaintTag"> | string
    complaintId?: StringFilter<"ComplaintTag"> | string
    label?: StringFilter<"ComplaintTag"> | string
    addedBy?: StringFilter<"ComplaintTag"> | string
    createdAt?: DateTimeFilter<"ComplaintTag"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }

  export type ComplaintTagOrderByWithRelationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    label?: SortOrder
    addedBy?: SortOrder
    createdAt?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ComplaintTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintTagWhereInput | ComplaintTagWhereInput[]
    OR?: ComplaintTagWhereInput[]
    NOT?: ComplaintTagWhereInput | ComplaintTagWhereInput[]
    complaintId?: StringFilter<"ComplaintTag"> | string
    label?: StringFilter<"ComplaintTag"> | string
    addedBy?: StringFilter<"ComplaintTag"> | string
    createdAt?: DateTimeFilter<"ComplaintTag"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }, "id">

  export type ComplaintTagOrderByWithAggregationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    label?: SortOrder
    addedBy?: SortOrder
    createdAt?: SortOrder
    _count?: ComplaintTagCountOrderByAggregateInput
    _max?: ComplaintTagMaxOrderByAggregateInput
    _min?: ComplaintTagMinOrderByAggregateInput
  }

  export type ComplaintTagScalarWhereWithAggregatesInput = {
    AND?: ComplaintTagScalarWhereWithAggregatesInput | ComplaintTagScalarWhereWithAggregatesInput[]
    OR?: ComplaintTagScalarWhereWithAggregatesInput[]
    NOT?: ComplaintTagScalarWhereWithAggregatesInput | ComplaintTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintTag"> | string
    complaintId?: StringWithAggregatesFilter<"ComplaintTag"> | string
    label?: StringWithAggregatesFilter<"ComplaintTag"> | string
    addedBy?: StringWithAggregatesFilter<"ComplaintTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintTag"> | Date | string
  }

  export type ClusterWhereInput = {
    AND?: ClusterWhereInput | ClusterWhereInput[]
    OR?: ClusterWhereInput[]
    NOT?: ClusterWhereInput | ClusterWhereInput[]
    id?: StringFilter<"Cluster"> | string
    title?: StringFilter<"Cluster"> | string
    description?: StringNullableFilter<"Cluster"> | string | null
    createdBy?: StringFilter<"Cluster"> | string
    createdAt?: DateTimeFilter<"Cluster"> | Date | string
    updatedAt?: DateTimeFilter<"Cluster"> | Date | string
    complaints?: ComplaintListRelationFilter
  }

  export type ClusterOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    complaints?: ComplaintOrderByRelationAggregateInput
  }

  export type ClusterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClusterWhereInput | ClusterWhereInput[]
    OR?: ClusterWhereInput[]
    NOT?: ClusterWhereInput | ClusterWhereInput[]
    title?: StringFilter<"Cluster"> | string
    description?: StringNullableFilter<"Cluster"> | string | null
    createdBy?: StringFilter<"Cluster"> | string
    createdAt?: DateTimeFilter<"Cluster"> | Date | string
    updatedAt?: DateTimeFilter<"Cluster"> | Date | string
    complaints?: ComplaintListRelationFilter
  }, "id">

  export type ClusterOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClusterCountOrderByAggregateInput
    _max?: ClusterMaxOrderByAggregateInput
    _min?: ClusterMinOrderByAggregateInput
  }

  export type ClusterScalarWhereWithAggregatesInput = {
    AND?: ClusterScalarWhereWithAggregatesInput | ClusterScalarWhereWithAggregatesInput[]
    OR?: ClusterScalarWhereWithAggregatesInput[]
    NOT?: ClusterScalarWhereWithAggregatesInput | ClusterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cluster"> | string
    title?: StringWithAggregatesFilter<"Cluster"> | string
    description?: StringNullableWithAggregatesFilter<"Cluster"> | string | null
    createdBy?: StringWithAggregatesFilter<"Cluster"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cluster"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cluster"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    complaintId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    body?: StringFilter<"Comment"> | string
    deletedAt?: DateTimeNullableFilter<"Comment"> | Date | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    authorId?: SortOrder
    body?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    complaintId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    body?: StringFilter<"Comment"> | string
    deletedAt?: DateTimeNullableFilter<"Comment"> | Date | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    authorId?: SortOrder
    body?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    complaintId?: StringWithAggregatesFilter<"Comment"> | string
    authorId?: StringWithAggregatesFilter<"Comment"> | string
    body?: StringWithAggregatesFilter<"Comment"> | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Comment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    complaintId?: StringFilter<"Report"> | string
    reporterId?: StringFilter<"Report"> | string
    reason?: StringFilter<"Report"> | string
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    reporterId?: SortOrder
    reason?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    complaintId?: StringFilter<"Report"> | string
    reporterId?: StringFilter<"Report"> | string
    reason?: StringFilter<"Report"> | string
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    complaint?: XOR<ComplaintRelationFilter, ComplaintWhereInput>
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    reporterId?: SortOrder
    reason?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    complaintId?: StringWithAggregatesFilter<"Report"> | string
    reporterId?: StringWithAggregatesFilter<"Report"> | string
    reason?: StringWithAggregatesFilter<"Report"> | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type AuditEventWhereInput = {
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    id?: StringFilter<"AuditEvent"> | string
    actorId?: StringNullableFilter<"AuditEvent"> | string | null
    actorRole?: StringNullableFilter<"AuditEvent"> | string | null
    action?: StringFilter<"AuditEvent"> | string
    entity?: StringFilter<"AuditEvent"> | string
    entityId?: StringFilter<"AuditEvent"> | string
    diff?: JsonFilter<"AuditEvent">
    ip?: StringNullableFilter<"AuditEvent"> | string | null
    ua?: StringNullableFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
  }

  export type AuditEventOrderByWithRelationInput = {
    id?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorRole?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    ip?: SortOrderInput | SortOrder
    ua?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    actorId?: StringNullableFilter<"AuditEvent"> | string | null
    actorRole?: StringNullableFilter<"AuditEvent"> | string | null
    action?: StringFilter<"AuditEvent"> | string
    entity?: StringFilter<"AuditEvent"> | string
    entityId?: StringFilter<"AuditEvent"> | string
    diff?: JsonFilter<"AuditEvent">
    ip?: StringNullableFilter<"AuditEvent"> | string | null
    ua?: StringNullableFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
  }, "id">

  export type AuditEventOrderByWithAggregationInput = {
    id?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorRole?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    ip?: SortOrderInput | SortOrder
    ua?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditEventCountOrderByAggregateInput
    _max?: AuditEventMaxOrderByAggregateInput
    _min?: AuditEventMinOrderByAggregateInput
  }

  export type AuditEventScalarWhereWithAggregatesInput = {
    AND?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    OR?: AuditEventScalarWhereWithAggregatesInput[]
    NOT?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditEvent"> | string
    actorId?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    actorRole?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    action?: StringWithAggregatesFilter<"AuditEvent"> | string
    entity?: StringWithAggregatesFilter<"AuditEvent"> | string
    entityId?: StringWithAggregatesFilter<"AuditEvent"> | string
    diff?: JsonWithAggregatesFilter<"AuditEvent">
    ip?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    ua?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditEvent"> | Date | string
  }

  export type ComplaintCreateInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagCreateNestedManyWithoutComplaintInput
    comments?: CommentCreateNestedManyWithoutComplaintInput
    reports?: ReportCreateNestedManyWithoutComplaintInput
    cluster?: ClusterCreateNestedOneWithoutComplaintsInput
  }

  export type ComplaintUncheckedCreateInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    clusterId?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagUncheckedCreateNestedManyWithoutComplaintInput
    comments?: CommentUncheckedCreateNestedManyWithoutComplaintInput
    reports?: ReportUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUpdateManyWithoutComplaintNestedInput
    comments?: CommentUpdateManyWithoutComplaintNestedInput
    reports?: ReportUpdateManyWithoutComplaintNestedInput
    cluster?: ClusterUpdateOneWithoutComplaintsNestedInput
  }

  export type ComplaintUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    clusterId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUncheckedUpdateManyWithoutComplaintNestedInput
    comments?: CommentUncheckedUpdateManyWithoutComplaintNestedInput
    reports?: ReportUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateManyInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    clusterId?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplaintUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    clusterId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintTagCreateInput = {
    id?: string
    label: string
    addedBy: string
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutTagsInput
  }

  export type ComplaintTagUncheckedCreateInput = {
    id?: string
    complaintId: string
    label: string
    addedBy: string
    createdAt?: Date | string
  }

  export type ComplaintTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ComplaintTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintTagCreateManyInput = {
    id?: string
    complaintId: string
    label: string
    addedBy: string
    createdAt?: Date | string
  }

  export type ComplaintTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClusterCreateInput = {
    id?: string
    title: string
    description?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    complaints?: ComplaintCreateNestedManyWithoutClusterInput
  }

  export type ClusterUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    complaints?: ComplaintUncheckedCreateNestedManyWithoutClusterInput
  }

  export type ClusterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaints?: ComplaintUpdateManyWithoutClusterNestedInput
  }

  export type ClusterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaints?: ComplaintUncheckedUpdateManyWithoutClusterNestedInput
  }

  export type ClusterCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClusterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClusterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    id?: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    complaintId: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    complaintId: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    complaintId: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: string
    complaintId: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateInput = {
    id?: string
    actorId?: string | null
    actorRole?: string | null
    action: string
    entity: string
    entityId: string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: string | null
    ua?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUncheckedCreateInput = {
    id?: string
    actorId?: string | null
    actorRole?: string | null
    action: string
    entity: string
    entityId: string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: string | null
    ua?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    ua?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    ua?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateManyInput = {
    id?: string
    actorId?: string | null
    actorRole?: string | null
    action: string
    entity: string
    entityId: string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: string | null
    ua?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    ua?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: JsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    ua?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumComplaintVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintVisibility | EnumComplaintVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintVisibilityFilter<$PrismaModel> | $Enums.ComplaintVisibility
  }

  export type EnumComplaintStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusFilter<$PrismaModel> | $Enums.ComplaintStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ComplaintTagListRelationFilter = {
    every?: ComplaintTagWhereInput
    some?: ComplaintTagWhereInput
    none?: ComplaintTagWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type ClusterNullableRelationFilter = {
    is?: ClusterWhereInput | null
    isNot?: ClusterWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ComplaintTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    platform?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    clusterId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    platform?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    clusterId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    platform?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    clusterId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumComplaintVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintVisibility | EnumComplaintVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintVisibilityFilter<$PrismaModel>
    _max?: NestedEnumComplaintVisibilityFilter<$PrismaModel>
  }

  export type EnumComplaintStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintStatusFilter<$PrismaModel>
    _max?: NestedEnumComplaintStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ComplaintRelationFilter = {
    is?: ComplaintWhereInput
    isNot?: ComplaintWhereInput
  }

  export type ComplaintTagCountOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    label?: SortOrder
    addedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintTagMaxOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    label?: SortOrder
    addedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintTagMinOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    label?: SortOrder
    addedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintListRelationFilter = {
    every?: ComplaintWhereInput
    some?: ComplaintWhereInput
    none?: ComplaintWhereInput
  }

  export type ComplaintOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClusterCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClusterMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClusterMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    authorId?: SortOrder
    body?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    authorId?: SortOrder
    body?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    authorId?: SortOrder
    body?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    reporterId?: SortOrder
    reason?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    reporterId?: SortOrder
    reason?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    reporterId?: SortOrder
    reason?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditEventCountOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    ip?: SortOrder
    ua?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventMaxOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ip?: SortOrder
    ua?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventMinOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ip?: SortOrder
    ua?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ComplaintTagCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput> | ComplaintTagCreateWithoutComplaintInput[] | ComplaintTagUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintTagCreateOrConnectWithoutComplaintInput | ComplaintTagCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintTagCreateManyComplaintInputEnvelope
    connect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutComplaintInput = {
    create?: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput> | CommentCreateWithoutComplaintInput[] | CommentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutComplaintInput | CommentCreateOrConnectWithoutComplaintInput[]
    createMany?: CommentCreateManyComplaintInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput> | ReportCreateWithoutComplaintInput[] | ReportUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutComplaintInput | ReportCreateOrConnectWithoutComplaintInput[]
    createMany?: ReportCreateManyComplaintInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ClusterCreateNestedOneWithoutComplaintsInput = {
    create?: XOR<ClusterCreateWithoutComplaintsInput, ClusterUncheckedCreateWithoutComplaintsInput>
    connectOrCreate?: ClusterCreateOrConnectWithoutComplaintsInput
    connect?: ClusterWhereUniqueInput
  }

  export type ComplaintTagUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput> | ComplaintTagCreateWithoutComplaintInput[] | ComplaintTagUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintTagCreateOrConnectWithoutComplaintInput | ComplaintTagCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintTagCreateManyComplaintInputEnvelope
    connect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput> | CommentCreateWithoutComplaintInput[] | CommentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutComplaintInput | CommentCreateOrConnectWithoutComplaintInput[]
    createMany?: CommentCreateManyComplaintInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput> | ReportCreateWithoutComplaintInput[] | ReportUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutComplaintInput | ReportCreateOrConnectWithoutComplaintInput[]
    createMany?: ReportCreateManyComplaintInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumComplaintVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.ComplaintVisibility
  }

  export type EnumComplaintStatusFieldUpdateOperationsInput = {
    set?: $Enums.ComplaintStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ComplaintTagUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput> | ComplaintTagCreateWithoutComplaintInput[] | ComplaintTagUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintTagCreateOrConnectWithoutComplaintInput | ComplaintTagCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintTagUpsertWithWhereUniqueWithoutComplaintInput | ComplaintTagUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintTagCreateManyComplaintInputEnvelope
    set?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    disconnect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    delete?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    connect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    update?: ComplaintTagUpdateWithWhereUniqueWithoutComplaintInput | ComplaintTagUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintTagUpdateManyWithWhereWithoutComplaintInput | ComplaintTagUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintTagScalarWhereInput | ComplaintTagScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput> | CommentCreateWithoutComplaintInput[] | CommentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutComplaintInput | CommentCreateOrConnectWithoutComplaintInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutComplaintInput | CommentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: CommentCreateManyComplaintInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutComplaintInput | CommentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutComplaintInput | CommentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput> | ReportCreateWithoutComplaintInput[] | ReportUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutComplaintInput | ReportCreateOrConnectWithoutComplaintInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutComplaintInput | ReportUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ReportCreateManyComplaintInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutComplaintInput | ReportUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutComplaintInput | ReportUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ClusterUpdateOneWithoutComplaintsNestedInput = {
    create?: XOR<ClusterCreateWithoutComplaintsInput, ClusterUncheckedCreateWithoutComplaintsInput>
    connectOrCreate?: ClusterCreateOrConnectWithoutComplaintsInput
    upsert?: ClusterUpsertWithoutComplaintsInput
    disconnect?: ClusterWhereInput | boolean
    delete?: ClusterWhereInput | boolean
    connect?: ClusterWhereUniqueInput
    update?: XOR<XOR<ClusterUpdateToOneWithWhereWithoutComplaintsInput, ClusterUpdateWithoutComplaintsInput>, ClusterUncheckedUpdateWithoutComplaintsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ComplaintTagUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput> | ComplaintTagCreateWithoutComplaintInput[] | ComplaintTagUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintTagCreateOrConnectWithoutComplaintInput | ComplaintTagCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintTagUpsertWithWhereUniqueWithoutComplaintInput | ComplaintTagUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintTagCreateManyComplaintInputEnvelope
    set?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    disconnect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    delete?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    connect?: ComplaintTagWhereUniqueInput | ComplaintTagWhereUniqueInput[]
    update?: ComplaintTagUpdateWithWhereUniqueWithoutComplaintInput | ComplaintTagUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintTagUpdateManyWithWhereWithoutComplaintInput | ComplaintTagUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintTagScalarWhereInput | ComplaintTagScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput> | CommentCreateWithoutComplaintInput[] | CommentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutComplaintInput | CommentCreateOrConnectWithoutComplaintInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutComplaintInput | CommentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: CommentCreateManyComplaintInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutComplaintInput | CommentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutComplaintInput | CommentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput> | ReportCreateWithoutComplaintInput[] | ReportUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutComplaintInput | ReportCreateOrConnectWithoutComplaintInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutComplaintInput | ReportUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ReportCreateManyComplaintInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutComplaintInput | ReportUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutComplaintInput | ReportUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ComplaintCreateNestedOneWithoutTagsInput = {
    create?: XOR<ComplaintCreateWithoutTagsInput, ComplaintUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutTagsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ComplaintCreateWithoutTagsInput, ComplaintUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutTagsInput
    upsert?: ComplaintUpsertWithoutTagsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutTagsInput, ComplaintUpdateWithoutTagsInput>, ComplaintUncheckedUpdateWithoutTagsInput>
  }

  export type ComplaintCreateNestedManyWithoutClusterInput = {
    create?: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput> | ComplaintCreateWithoutClusterInput[] | ComplaintUncheckedCreateWithoutClusterInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutClusterInput | ComplaintCreateOrConnectWithoutClusterInput[]
    createMany?: ComplaintCreateManyClusterInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintUncheckedCreateNestedManyWithoutClusterInput = {
    create?: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput> | ComplaintCreateWithoutClusterInput[] | ComplaintUncheckedCreateWithoutClusterInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutClusterInput | ComplaintCreateOrConnectWithoutClusterInput[]
    createMany?: ComplaintCreateManyClusterInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintUpdateManyWithoutClusterNestedInput = {
    create?: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput> | ComplaintCreateWithoutClusterInput[] | ComplaintUncheckedCreateWithoutClusterInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutClusterInput | ComplaintCreateOrConnectWithoutClusterInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutClusterInput | ComplaintUpsertWithWhereUniqueWithoutClusterInput[]
    createMany?: ComplaintCreateManyClusterInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutClusterInput | ComplaintUpdateWithWhereUniqueWithoutClusterInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutClusterInput | ComplaintUpdateManyWithWhereWithoutClusterInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintUncheckedUpdateManyWithoutClusterNestedInput = {
    create?: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput> | ComplaintCreateWithoutClusterInput[] | ComplaintUncheckedCreateWithoutClusterInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutClusterInput | ComplaintCreateOrConnectWithoutClusterInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutClusterInput | ComplaintUpsertWithWhereUniqueWithoutClusterInput[]
    createMany?: ComplaintCreateManyClusterInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutClusterInput | ComplaintUpdateWithWhereUniqueWithoutClusterInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutClusterInput | ComplaintUpdateManyWithWhereWithoutClusterInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ComplaintCreateWithoutCommentsInput, ComplaintUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutCommentsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ComplaintCreateWithoutCommentsInput, ComplaintUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutCommentsInput
    upsert?: ComplaintUpsertWithoutCommentsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutCommentsInput, ComplaintUpdateWithoutCommentsInput>, ComplaintUncheckedUpdateWithoutCommentsInput>
  }

  export type ComplaintCreateNestedOneWithoutReportsInput = {
    create?: XOR<ComplaintCreateWithoutReportsInput, ComplaintUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutReportsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<ComplaintCreateWithoutReportsInput, ComplaintUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutReportsInput
    upsert?: ComplaintUpsertWithoutReportsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutReportsInput, ComplaintUpdateWithoutReportsInput>, ComplaintUncheckedUpdateWithoutReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumComplaintVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintVisibility | EnumComplaintVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintVisibilityFilter<$PrismaModel> | $Enums.ComplaintVisibility
  }

  export type NestedEnumComplaintStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusFilter<$PrismaModel> | $Enums.ComplaintStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumComplaintVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintVisibility | EnumComplaintVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintVisibility[] | ListEnumComplaintVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintVisibilityFilter<$PrismaModel>
    _max?: NestedEnumComplaintVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintStatusFilter<$PrismaModel>
    _max?: NestedEnumComplaintStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ComplaintTagCreateWithoutComplaintInput = {
    id?: string
    label: string
    addedBy: string
    createdAt?: Date | string
  }

  export type ComplaintTagUncheckedCreateWithoutComplaintInput = {
    id?: string
    label: string
    addedBy: string
    createdAt?: Date | string
  }

  export type ComplaintTagCreateOrConnectWithoutComplaintInput = {
    where: ComplaintTagWhereUniqueInput
    create: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintTagCreateManyComplaintInputEnvelope = {
    data: ComplaintTagCreateManyComplaintInput | ComplaintTagCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutComplaintInput = {
    id?: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommentUncheckedCreateWithoutComplaintInput = {
    id?: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutComplaintInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput>
  }

  export type CommentCreateManyComplaintInputEnvelope = {
    data: CommentCreateManyComplaintInput | CommentCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutComplaintInput = {
    id?: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReportUncheckedCreateWithoutComplaintInput = {
    id?: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutComplaintInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput>
  }

  export type ReportCreateManyComplaintInputEnvelope = {
    data: ReportCreateManyComplaintInput | ReportCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type ClusterCreateWithoutComplaintsInput = {
    id?: string
    title: string
    description?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClusterUncheckedCreateWithoutComplaintsInput = {
    id?: string
    title: string
    description?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClusterCreateOrConnectWithoutComplaintsInput = {
    where: ClusterWhereUniqueInput
    create: XOR<ClusterCreateWithoutComplaintsInput, ClusterUncheckedCreateWithoutComplaintsInput>
  }

  export type ComplaintTagUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintTagWhereUniqueInput
    update: XOR<ComplaintTagUpdateWithoutComplaintInput, ComplaintTagUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintTagCreateWithoutComplaintInput, ComplaintTagUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintTagUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintTagWhereUniqueInput
    data: XOR<ComplaintTagUpdateWithoutComplaintInput, ComplaintTagUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintTagUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintTagScalarWhereInput
    data: XOR<ComplaintTagUpdateManyMutationInput, ComplaintTagUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintTagScalarWhereInput = {
    AND?: ComplaintTagScalarWhereInput | ComplaintTagScalarWhereInput[]
    OR?: ComplaintTagScalarWhereInput[]
    NOT?: ComplaintTagScalarWhereInput | ComplaintTagScalarWhereInput[]
    id?: StringFilter<"ComplaintTag"> | string
    complaintId?: StringFilter<"ComplaintTag"> | string
    label?: StringFilter<"ComplaintTag"> | string
    addedBy?: StringFilter<"ComplaintTag"> | string
    createdAt?: DateTimeFilter<"ComplaintTag"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutComplaintInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutComplaintInput, CommentUncheckedUpdateWithoutComplaintInput>
    create: XOR<CommentCreateWithoutComplaintInput, CommentUncheckedCreateWithoutComplaintInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutComplaintInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutComplaintInput, CommentUncheckedUpdateWithoutComplaintInput>
  }

  export type CommentUpdateManyWithWhereWithoutComplaintInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutComplaintInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    complaintId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    body?: StringFilter<"Comment"> | string
    deletedAt?: DateTimeNullableFilter<"Comment"> | Date | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutComplaintInput, ReportUncheckedUpdateWithoutComplaintInput>
    create: XOR<ReportCreateWithoutComplaintInput, ReportUncheckedCreateWithoutComplaintInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutComplaintInput, ReportUncheckedUpdateWithoutComplaintInput>
  }

  export type ReportUpdateManyWithWhereWithoutComplaintInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    complaintId?: StringFilter<"Report"> | string
    reporterId?: StringFilter<"Report"> | string
    reason?: StringFilter<"Report"> | string
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type ClusterUpsertWithoutComplaintsInput = {
    update: XOR<ClusterUpdateWithoutComplaintsInput, ClusterUncheckedUpdateWithoutComplaintsInput>
    create: XOR<ClusterCreateWithoutComplaintsInput, ClusterUncheckedCreateWithoutComplaintsInput>
    where?: ClusterWhereInput
  }

  export type ClusterUpdateToOneWithWhereWithoutComplaintsInput = {
    where?: ClusterWhereInput
    data: XOR<ClusterUpdateWithoutComplaintsInput, ClusterUncheckedUpdateWithoutComplaintsInput>
  }

  export type ClusterUpdateWithoutComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClusterUncheckedUpdateWithoutComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintCreateWithoutTagsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutComplaintInput
    reports?: ReportCreateNestedManyWithoutComplaintInput
    cluster?: ClusterCreateNestedOneWithoutComplaintsInput
  }

  export type ComplaintUncheckedCreateWithoutTagsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    clusterId?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutComplaintInput
    reports?: ReportUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutTagsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutTagsInput, ComplaintUncheckedCreateWithoutTagsInput>
  }

  export type ComplaintUpsertWithoutTagsInput = {
    update: XOR<ComplaintUpdateWithoutTagsInput, ComplaintUncheckedUpdateWithoutTagsInput>
    create: XOR<ComplaintCreateWithoutTagsInput, ComplaintUncheckedCreateWithoutTagsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutTagsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutTagsInput, ComplaintUncheckedUpdateWithoutTagsInput>
  }

  export type ComplaintUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutComplaintNestedInput
    reports?: ReportUpdateManyWithoutComplaintNestedInput
    cluster?: ClusterUpdateOneWithoutComplaintsNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    clusterId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutComplaintNestedInput
    reports?: ReportUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateWithoutClusterInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagCreateNestedManyWithoutComplaintInput
    comments?: CommentCreateNestedManyWithoutComplaintInput
    reports?: ReportCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutClusterInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagUncheckedCreateNestedManyWithoutComplaintInput
    comments?: CommentUncheckedCreateNestedManyWithoutComplaintInput
    reports?: ReportUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutClusterInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput>
  }

  export type ComplaintCreateManyClusterInputEnvelope = {
    data: ComplaintCreateManyClusterInput | ComplaintCreateManyClusterInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintUpsertWithWhereUniqueWithoutClusterInput = {
    where: ComplaintWhereUniqueInput
    update: XOR<ComplaintUpdateWithoutClusterInput, ComplaintUncheckedUpdateWithoutClusterInput>
    create: XOR<ComplaintCreateWithoutClusterInput, ComplaintUncheckedCreateWithoutClusterInput>
  }

  export type ComplaintUpdateWithWhereUniqueWithoutClusterInput = {
    where: ComplaintWhereUniqueInput
    data: XOR<ComplaintUpdateWithoutClusterInput, ComplaintUncheckedUpdateWithoutClusterInput>
  }

  export type ComplaintUpdateManyWithWhereWithoutClusterInput = {
    where: ComplaintScalarWhereInput
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyWithoutClusterInput>
  }

  export type ComplaintScalarWhereInput = {
    AND?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
    OR?: ComplaintScalarWhereInput[]
    NOT?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
    id?: StringFilter<"Complaint"> | string
    authorId?: StringFilter<"Complaint"> | string
    platform?: StringFilter<"Complaint"> | string
    category?: StringFilter<"Complaint"> | string
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    visibility?: EnumComplaintVisibilityFilter<"Complaint"> | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    clusterId?: StringNullableFilter<"Complaint"> | string | null
    deletedAt?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
  }

  export type ComplaintCreateWithoutCommentsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagCreateNestedManyWithoutComplaintInput
    reports?: ReportCreateNestedManyWithoutComplaintInput
    cluster?: ClusterCreateNestedOneWithoutComplaintsInput
  }

  export type ComplaintUncheckedCreateWithoutCommentsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    clusterId?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagUncheckedCreateNestedManyWithoutComplaintInput
    reports?: ReportUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutCommentsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutCommentsInput, ComplaintUncheckedCreateWithoutCommentsInput>
  }

  export type ComplaintUpsertWithoutCommentsInput = {
    update: XOR<ComplaintUpdateWithoutCommentsInput, ComplaintUncheckedUpdateWithoutCommentsInput>
    create: XOR<ComplaintCreateWithoutCommentsInput, ComplaintUncheckedCreateWithoutCommentsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutCommentsInput, ComplaintUncheckedUpdateWithoutCommentsInput>
  }

  export type ComplaintUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUpdateManyWithoutComplaintNestedInput
    reports?: ReportUpdateManyWithoutComplaintNestedInput
    cluster?: ClusterUpdateOneWithoutComplaintsNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    clusterId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUncheckedUpdateManyWithoutComplaintNestedInput
    reports?: ReportUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateWithoutReportsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagCreateNestedManyWithoutComplaintInput
    comments?: CommentCreateNestedManyWithoutComplaintInput
    cluster?: ClusterCreateNestedOneWithoutComplaintsInput
  }

  export type ComplaintUncheckedCreateWithoutReportsInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    clusterId?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ComplaintTagUncheckedCreateNestedManyWithoutComplaintInput
    comments?: CommentUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutReportsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutReportsInput, ComplaintUncheckedCreateWithoutReportsInput>
  }

  export type ComplaintUpsertWithoutReportsInput = {
    update: XOR<ComplaintUpdateWithoutReportsInput, ComplaintUncheckedUpdateWithoutReportsInput>
    create: XOR<ComplaintCreateWithoutReportsInput, ComplaintUncheckedCreateWithoutReportsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutReportsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutReportsInput, ComplaintUncheckedUpdateWithoutReportsInput>
  }

  export type ComplaintUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUpdateManyWithoutComplaintNestedInput
    comments?: CommentUpdateManyWithoutComplaintNestedInput
    cluster?: ClusterUpdateOneWithoutComplaintsNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    clusterId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUncheckedUpdateManyWithoutComplaintNestedInput
    comments?: CommentUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintTagCreateManyComplaintInput = {
    id?: string
    label: string
    addedBy: string
    createdAt?: Date | string
  }

  export type CommentCreateManyComplaintInput = {
    id?: string
    authorId: string
    body: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReportCreateManyComplaintInput = {
    id?: string
    reporterId: string
    reason: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ComplaintTagUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintTagUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintTagUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    addedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintCreateManyClusterInput = {
    id?: string
    authorId: string
    platform: string
    category: string
    title: string
    description: string
    visibility?: $Enums.ComplaintVisibility
    status?: $Enums.ComplaintStatus
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplaintUpdateWithoutClusterInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUpdateManyWithoutComplaintNestedInput
    comments?: CommentUpdateManyWithoutComplaintNestedInput
    reports?: ReportUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutClusterInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ComplaintTagUncheckedUpdateManyWithoutComplaintNestedInput
    comments?: CommentUncheckedUpdateManyWithoutComplaintNestedInput
    reports?: ReportUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateManyWithoutClusterInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    visibility?: EnumComplaintVisibilityFieldUpdateOperationsInput | $Enums.ComplaintVisibility
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ComplaintCountOutputTypeDefaultArgs instead
     */
    export type ComplaintCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplaintCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClusterCountOutputTypeDefaultArgs instead
     */
    export type ClusterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClusterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplaintDefaultArgs instead
     */
    export type ComplaintArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplaintDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplaintTagDefaultArgs instead
     */
    export type ComplaintTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplaintTagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClusterDefaultArgs instead
     */
    export type ClusterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClusterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommentDefaultArgs instead
     */
    export type CommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportDefaultArgs instead
     */
    export type ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditEventDefaultArgs instead
     */
    export type AuditEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditEventDefaultArgs<ExtArgs>

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