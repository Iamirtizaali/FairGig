
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
 * Model Platform
 * 
 */
export type Platform = $Result.DefaultSelection<Prisma.$PlatformPayload>
/**
 * Model CityZone
 * 
 */
export type CityZone = $Result.DefaultSelection<Prisma.$CityZonePayload>
/**
 * Model Shift
 * 
 */
export type Shift = $Result.DefaultSelection<Prisma.$ShiftPayload>
/**
 * Model Screenshot
 * 
 */
export type Screenshot = $Result.DefaultSelection<Prisma.$ScreenshotPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model AnomalyFlag
 * 
 */
export type AnomalyFlag = $Result.DefaultSelection<Prisma.$AnomalyFlagPayload>
/**
 * Model CsvImport
 * 
 */
export type CsvImport = $Result.DefaultSelection<Prisma.$CsvImportPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Certificate
 * 
 */
export type Certificate = $Result.DefaultSelection<Prisma.$CertificatePayload>
/**
 * Model AuditEvent
 * 
 */
export type AuditEvent = $Result.DefaultSelection<Prisma.$AuditEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShiftSource: {
  manual: 'manual',
  csv: 'csv',
  ocr: 'ocr'
};

export type ShiftSource = (typeof ShiftSource)[keyof typeof ShiftSource]


export const ShiftVerificationStatus: {
  self_attested: 'self_attested',
  pending_review: 'pending_review',
  verified: 'verified',
  discrepancy_flagged: 'discrepancy_flagged',
  unverifiable: 'unverifiable'
};

export type ShiftVerificationStatus = (typeof ShiftVerificationStatus)[keyof typeof ShiftVerificationStatus]


export const VerificationStatus: {
  pending: 'pending',
  confirmed: 'confirmed',
  discrepancy: 'discrepancy',
  unverifiable: 'unverifiable'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const ImportStatus: {
  queued: 'queued',
  processing: 'processing',
  done: 'done',
  failed: 'failed'
};

export type ImportStatus = (typeof ImportStatus)[keyof typeof ImportStatus]

}

export type ShiftSource = $Enums.ShiftSource

export const ShiftSource: typeof $Enums.ShiftSource

export type ShiftVerificationStatus = $Enums.ShiftVerificationStatus

export const ShiftVerificationStatus: typeof $Enums.ShiftVerificationStatus

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type ImportStatus = $Enums.ImportStatus

export const ImportStatus: typeof $Enums.ImportStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Platforms
 * const platforms = await prisma.platform.findMany()
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
   * // Fetch zero or more Platforms
   * const platforms = await prisma.platform.findMany()
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
   * `prisma.platform`: Exposes CRUD operations for the **Platform** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Platforms
    * const platforms = await prisma.platform.findMany()
    * ```
    */
  get platform(): Prisma.PlatformDelegate<ExtArgs>;

  /**
   * `prisma.cityZone`: Exposes CRUD operations for the **CityZone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityZones
    * const cityZones = await prisma.cityZone.findMany()
    * ```
    */
  get cityZone(): Prisma.CityZoneDelegate<ExtArgs>;

  /**
   * `prisma.shift`: Exposes CRUD operations for the **Shift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shifts
    * const shifts = await prisma.shift.findMany()
    * ```
    */
  get shift(): Prisma.ShiftDelegate<ExtArgs>;

  /**
   * `prisma.screenshot`: Exposes CRUD operations for the **Screenshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Screenshots
    * const screenshots = await prisma.screenshot.findMany()
    * ```
    */
  get screenshot(): Prisma.ScreenshotDelegate<ExtArgs>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs>;

  /**
   * `prisma.anomalyFlag`: Exposes CRUD operations for the **AnomalyFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnomalyFlags
    * const anomalyFlags = await prisma.anomalyFlag.findMany()
    * ```
    */
  get anomalyFlag(): Prisma.AnomalyFlagDelegate<ExtArgs>;

  /**
   * `prisma.csvImport`: Exposes CRUD operations for the **CsvImport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CsvImports
    * const csvImports = await prisma.csvImport.findMany()
    * ```
    */
  get csvImport(): Prisma.CsvImportDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.certificate`: Exposes CRUD operations for the **Certificate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certificates
    * const certificates = await prisma.certificate.findMany()
    * ```
    */
  get certificate(): Prisma.CertificateDelegate<ExtArgs>;

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
    Platform: 'Platform',
    CityZone: 'CityZone',
    Shift: 'Shift',
    Screenshot: 'Screenshot',
    Verification: 'Verification',
    AnomalyFlag: 'AnomalyFlag',
    CsvImport: 'CsvImport',
    Notification: 'Notification',
    Certificate: 'Certificate',
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
      modelProps: "platform" | "cityZone" | "shift" | "screenshot" | "verification" | "anomalyFlag" | "csvImport" | "notification" | "certificate" | "auditEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Platform: {
        payload: Prisma.$PlatformPayload<ExtArgs>
        fields: Prisma.PlatformFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          findFirst: {
            args: Prisma.PlatformFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          findMany: {
            args: Prisma.PlatformFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>[]
          }
          create: {
            args: Prisma.PlatformCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          createMany: {
            args: Prisma.PlatformCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>[]
          }
          delete: {
            args: Prisma.PlatformDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          update: {
            args: Prisma.PlatformUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          deleteMany: {
            args: Prisma.PlatformDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          aggregate: {
            args: Prisma.PlatformAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatform>
          }
          groupBy: {
            args: Prisma.PlatformGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformCountAggregateOutputType> | number
          }
        }
      }
      CityZone: {
        payload: Prisma.$CityZonePayload<ExtArgs>
        fields: Prisma.CityZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CityZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CityZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          findFirst: {
            args: Prisma.CityZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CityZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          findMany: {
            args: Prisma.CityZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>[]
          }
          create: {
            args: Prisma.CityZoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          createMany: {
            args: Prisma.CityZoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CityZoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>[]
          }
          delete: {
            args: Prisma.CityZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          update: {
            args: Prisma.CityZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          deleteMany: {
            args: Prisma.CityZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CityZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CityZoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityZonePayload>
          }
          aggregate: {
            args: Prisma.CityZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCityZone>
          }
          groupBy: {
            args: Prisma.CityZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<CityZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.CityZoneCountArgs<ExtArgs>
            result: $Utils.Optional<CityZoneCountAggregateOutputType> | number
          }
        }
      }
      Shift: {
        payload: Prisma.$ShiftPayload<ExtArgs>
        fields: Prisma.ShiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findFirst: {
            args: Prisma.ShiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findMany: {
            args: Prisma.ShiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          create: {
            args: Prisma.ShiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          createMany: {
            args: Prisma.ShiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          delete: {
            args: Prisma.ShiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          update: {
            args: Prisma.ShiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          deleteMany: {
            args: Prisma.ShiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          aggregate: {
            args: Prisma.ShiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShift>
          }
          groupBy: {
            args: Prisma.ShiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShiftCountArgs<ExtArgs>
            result: $Utils.Optional<ShiftCountAggregateOutputType> | number
          }
        }
      }
      Screenshot: {
        payload: Prisma.$ScreenshotPayload<ExtArgs>
        fields: Prisma.ScreenshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScreenshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScreenshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          findFirst: {
            args: Prisma.ScreenshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScreenshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          findMany: {
            args: Prisma.ScreenshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>[]
          }
          create: {
            args: Prisma.ScreenshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          createMany: {
            args: Prisma.ScreenshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScreenshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>[]
          }
          delete: {
            args: Prisma.ScreenshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          update: {
            args: Prisma.ScreenshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          deleteMany: {
            args: Prisma.ScreenshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScreenshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScreenshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          aggregate: {
            args: Prisma.ScreenshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScreenshot>
          }
          groupBy: {
            args: Prisma.ScreenshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScreenshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScreenshotCountArgs<ExtArgs>
            result: $Utils.Optional<ScreenshotCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      AnomalyFlag: {
        payload: Prisma.$AnomalyFlagPayload<ExtArgs>
        fields: Prisma.AnomalyFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnomalyFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnomalyFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          findFirst: {
            args: Prisma.AnomalyFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnomalyFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          findMany: {
            args: Prisma.AnomalyFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>[]
          }
          create: {
            args: Prisma.AnomalyFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          createMany: {
            args: Prisma.AnomalyFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnomalyFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>[]
          }
          delete: {
            args: Prisma.AnomalyFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          update: {
            args: Prisma.AnomalyFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          deleteMany: {
            args: Prisma.AnomalyFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnomalyFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnomalyFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnomalyFlagPayload>
          }
          aggregate: {
            args: Prisma.AnomalyFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnomalyFlag>
          }
          groupBy: {
            args: Prisma.AnomalyFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnomalyFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnomalyFlagCountArgs<ExtArgs>
            result: $Utils.Optional<AnomalyFlagCountAggregateOutputType> | number
          }
        }
      }
      CsvImport: {
        payload: Prisma.$CsvImportPayload<ExtArgs>
        fields: Prisma.CsvImportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CsvImportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CsvImportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          findFirst: {
            args: Prisma.CsvImportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CsvImportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          findMany: {
            args: Prisma.CsvImportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>[]
          }
          create: {
            args: Prisma.CsvImportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          createMany: {
            args: Prisma.CsvImportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CsvImportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>[]
          }
          delete: {
            args: Prisma.CsvImportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          update: {
            args: Prisma.CsvImportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          deleteMany: {
            args: Prisma.CsvImportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CsvImportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CsvImportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CsvImportPayload>
          }
          aggregate: {
            args: Prisma.CsvImportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCsvImport>
          }
          groupBy: {
            args: Prisma.CsvImportGroupByArgs<ExtArgs>
            result: $Utils.Optional<CsvImportGroupByOutputType>[]
          }
          count: {
            args: Prisma.CsvImportCountArgs<ExtArgs>
            result: $Utils.Optional<CsvImportCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Certificate: {
        payload: Prisma.$CertificatePayload<ExtArgs>
        fields: Prisma.CertificateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findFirst: {
            args: Prisma.CertificateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findMany: {
            args: Prisma.CertificateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          create: {
            args: Prisma.CertificateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          createMany: {
            args: Prisma.CertificateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          delete: {
            args: Prisma.CertificateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          update: {
            args: Prisma.CertificateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          deleteMany: {
            args: Prisma.CertificateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          aggregate: {
            args: Prisma.CertificateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificate>
          }
          groupBy: {
            args: Prisma.CertificateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateCountAggregateOutputType> | number
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
   * Count Type PlatformCountOutputType
   */

  export type PlatformCountOutputType = {
    shifts: number
  }

  export type PlatformCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | PlatformCountOutputTypeCountShiftsArgs
  }

  // Custom InputTypes
  /**
   * PlatformCountOutputType without action
   */
  export type PlatformCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformCountOutputType
     */
    select?: PlatformCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformCountOutputType without action
   */
  export type PlatformCountOutputTypeCountShiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
  }


  /**
   * Count Type CityZoneCountOutputType
   */

  export type CityZoneCountOutputType = {
    shifts: number
  }

  export type CityZoneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | CityZoneCountOutputTypeCountShiftsArgs
  }

  // Custom InputTypes
  /**
   * CityZoneCountOutputType without action
   */
  export type CityZoneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZoneCountOutputType
     */
    select?: CityZoneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CityZoneCountOutputType without action
   */
  export type CityZoneCountOutputTypeCountShiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
  }


  /**
   * Count Type ShiftCountOutputType
   */

  export type ShiftCountOutputType = {
    screenshots: number
    verifications: number
    anomalyFlags: number
  }

  export type ShiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenshots?: boolean | ShiftCountOutputTypeCountScreenshotsArgs
    verifications?: boolean | ShiftCountOutputTypeCountVerificationsArgs
    anomalyFlags?: boolean | ShiftCountOutputTypeCountAnomalyFlagsArgs
  }

  // Custom InputTypes
  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftCountOutputType
     */
    select?: ShiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountScreenshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreenshotWhereInput
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountAnomalyFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnomalyFlagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Platform
   */

  export type AggregatePlatform = {
    _count: PlatformCountAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  export type PlatformMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PlatformMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PlatformCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    logoUrl: number
    active: number
    createdAt: number
    _all: number
  }


  export type PlatformMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    active?: true
    createdAt?: true
  }

  export type PlatformMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    active?: true
    createdAt?: true
  }

  export type PlatformCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type PlatformAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platform to aggregate.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Platforms
    **/
    _count?: true | PlatformCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformMaxAggregateInputType
  }

  export type GetPlatformAggregateType<T extends PlatformAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatform]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatform[P]>
      : GetScalarType<T[P], AggregatePlatform[P]>
  }




  export type PlatformGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformWhereInput
    orderBy?: PlatformOrderByWithAggregationInput | PlatformOrderByWithAggregationInput[]
    by: PlatformScalarFieldEnum[] | PlatformScalarFieldEnum
    having?: PlatformScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformCountAggregateInputType | true
    _min?: PlatformMinAggregateInputType
    _max?: PlatformMaxAggregateInputType
  }

  export type PlatformGroupByOutputType = {
    id: string
    name: string
    slug: string
    logoUrl: string | null
    active: boolean
    createdAt: Date
    _count: PlatformCountAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  type GetPlatformGroupByPayload<T extends PlatformGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformGroupByOutputType[P]>
        }
      >
    >


  export type PlatformSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    active?: boolean
    createdAt?: boolean
    shifts?: boolean | Platform$shiftsArgs<ExtArgs>
    _count?: boolean | PlatformCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platform"]>

  export type PlatformSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["platform"]>

  export type PlatformSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type PlatformInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | Platform$shiftsArgs<ExtArgs>
    _count?: boolean | PlatformCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatformIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlatformPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Platform"
    objects: {
      shifts: Prisma.$ShiftPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      logoUrl: string | null
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["platform"]>
    composites: {}
  }

  type PlatformGetPayload<S extends boolean | null | undefined | PlatformDefaultArgs> = $Result.GetResult<Prisma.$PlatformPayload, S>

  type PlatformCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlatformFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlatformCountAggregateInputType | true
    }

  export interface PlatformDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Platform'], meta: { name: 'Platform' } }
    /**
     * Find zero or one Platform that matches the filter.
     * @param {PlatformFindUniqueArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformFindUniqueArgs>(args: SelectSubset<T, PlatformFindUniqueArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Platform that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlatformFindUniqueOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Platform that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformFindFirstArgs>(args?: SelectSubset<T, PlatformFindFirstArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Platform that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Platforms
     * const platforms = await prisma.platform.findMany()
     * 
     * // Get first 10 Platforms
     * const platforms = await prisma.platform.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformWithIdOnly = await prisma.platform.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformFindManyArgs>(args?: SelectSubset<T, PlatformFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Platform.
     * @param {PlatformCreateArgs} args - Arguments to create a Platform.
     * @example
     * // Create one Platform
     * const Platform = await prisma.platform.create({
     *   data: {
     *     // ... data to create a Platform
     *   }
     * })
     * 
     */
    create<T extends PlatformCreateArgs>(args: SelectSubset<T, PlatformCreateArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Platforms.
     * @param {PlatformCreateManyArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platform = await prisma.platform.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformCreateManyArgs>(args?: SelectSubset<T, PlatformCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Platforms and returns the data saved in the database.
     * @param {PlatformCreateManyAndReturnArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platform = await prisma.platform.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Platforms and only return the `id`
     * const platformWithIdOnly = await prisma.platform.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Platform.
     * @param {PlatformDeleteArgs} args - Arguments to delete one Platform.
     * @example
     * // Delete one Platform
     * const Platform = await prisma.platform.delete({
     *   where: {
     *     // ... filter to delete one Platform
     *   }
     * })
     * 
     */
    delete<T extends PlatformDeleteArgs>(args: SelectSubset<T, PlatformDeleteArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Platform.
     * @param {PlatformUpdateArgs} args - Arguments to update one Platform.
     * @example
     * // Update one Platform
     * const platform = await prisma.platform.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformUpdateArgs>(args: SelectSubset<T, PlatformUpdateArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Platforms.
     * @param {PlatformDeleteManyArgs} args - Arguments to filter Platforms to delete.
     * @example
     * // Delete a few Platforms
     * const { count } = await prisma.platform.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformDeleteManyArgs>(args?: SelectSubset<T, PlatformDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Platforms
     * const platform = await prisma.platform.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformUpdateManyArgs>(args: SelectSubset<T, PlatformUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Platform.
     * @param {PlatformUpsertArgs} args - Arguments to update or create a Platform.
     * @example
     * // Update or create a Platform
     * const platform = await prisma.platform.upsert({
     *   create: {
     *     // ... data to create a Platform
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Platform we want to update
     *   }
     * })
     */
    upsert<T extends PlatformUpsertArgs>(args: SelectSubset<T, PlatformUpsertArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformCountArgs} args - Arguments to filter Platforms to count.
     * @example
     * // Count the number of Platforms
     * const count = await prisma.platform.count({
     *   where: {
     *     // ... the filter for the Platforms we want to count
     *   }
     * })
    **/
    count<T extends PlatformCountArgs>(
      args?: Subset<T, PlatformCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlatformAggregateArgs>(args: Subset<T, PlatformAggregateArgs>): Prisma.PrismaPromise<GetPlatformAggregateType<T>>

    /**
     * Group by Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGroupByArgs} args - Group by arguments.
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
      T extends PlatformGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformGroupByArgs['orderBy'] }
        : { orderBy?: PlatformGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlatformGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Platform model
   */
  readonly fields: PlatformFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Platform.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shifts<T extends Platform$shiftsArgs<ExtArgs> = {}>(args?: Subset<T, Platform$shiftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Platform model
   */ 
  interface PlatformFieldRefs {
    readonly id: FieldRef<"Platform", 'String'>
    readonly name: FieldRef<"Platform", 'String'>
    readonly slug: FieldRef<"Platform", 'String'>
    readonly logoUrl: FieldRef<"Platform", 'String'>
    readonly active: FieldRef<"Platform", 'Boolean'>
    readonly createdAt: FieldRef<"Platform", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Platform findUnique
   */
  export type PlatformFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform findUniqueOrThrow
   */
  export type PlatformFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform findFirst
   */
  export type PlatformFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform findFirstOrThrow
   */
  export type PlatformFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform findMany
   */
  export type PlatformFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platforms to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform create
   */
  export type PlatformCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The data needed to create a Platform.
     */
    data: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
  }

  /**
   * Platform createMany
   */
  export type PlatformCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Platforms.
     */
    data: PlatformCreateManyInput | PlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Platform createManyAndReturn
   */
  export type PlatformCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Platforms.
     */
    data: PlatformCreateManyInput | PlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Platform update
   */
  export type PlatformUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The data needed to update a Platform.
     */
    data: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
    /**
     * Choose, which Platform to update.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform updateMany
   */
  export type PlatformUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Platforms.
     */
    data: XOR<PlatformUpdateManyMutationInput, PlatformUncheckedUpdateManyInput>
    /**
     * Filter which Platforms to update
     */
    where?: PlatformWhereInput
  }

  /**
   * Platform upsert
   */
  export type PlatformUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The filter to search for the Platform to update in case it exists.
     */
    where: PlatformWhereUniqueInput
    /**
     * In case the Platform found by the `where` argument doesn't exist, create a new Platform with this data.
     */
    create: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
    /**
     * In case the Platform was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
  }

  /**
   * Platform delete
   */
  export type PlatformDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter which Platform to delete.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform deleteMany
   */
  export type PlatformDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platforms to delete
     */
    where?: PlatformWhereInput
  }

  /**
   * Platform.shifts
   */
  export type Platform$shiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    cursor?: ShiftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Platform without action
   */
  export type PlatformDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
  }


  /**
   * Model CityZone
   */

  export type AggregateCityZone = {
    _count: CityZoneCountAggregateOutputType | null
    _min: CityZoneMinAggregateOutputType | null
    _max: CityZoneMaxAggregateOutputType | null
  }

  export type CityZoneMinAggregateOutputType = {
    id: string | null
    city: string | null
    zone: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type CityZoneMaxAggregateOutputType = {
    id: string | null
    city: string | null
    zone: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type CityZoneCountAggregateOutputType = {
    id: number
    city: number
    zone: number
    active: number
    createdAt: number
    _all: number
  }


  export type CityZoneMinAggregateInputType = {
    id?: true
    city?: true
    zone?: true
    active?: true
    createdAt?: true
  }

  export type CityZoneMaxAggregateInputType = {
    id?: true
    city?: true
    zone?: true
    active?: true
    createdAt?: true
  }

  export type CityZoneCountAggregateInputType = {
    id?: true
    city?: true
    zone?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type CityZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CityZone to aggregate.
     */
    where?: CityZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityZones to fetch.
     */
    orderBy?: CityZoneOrderByWithRelationInput | CityZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CityZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityZones
    **/
    _count?: true | CityZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityZoneMaxAggregateInputType
  }

  export type GetCityZoneAggregateType<T extends CityZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateCityZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityZone[P]>
      : GetScalarType<T[P], AggregateCityZone[P]>
  }




  export type CityZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CityZoneWhereInput
    orderBy?: CityZoneOrderByWithAggregationInput | CityZoneOrderByWithAggregationInput[]
    by: CityZoneScalarFieldEnum[] | CityZoneScalarFieldEnum
    having?: CityZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityZoneCountAggregateInputType | true
    _min?: CityZoneMinAggregateInputType
    _max?: CityZoneMaxAggregateInputType
  }

  export type CityZoneGroupByOutputType = {
    id: string
    city: string
    zone: string
    active: boolean
    createdAt: Date
    _count: CityZoneCountAggregateOutputType | null
    _min: CityZoneMinAggregateOutputType | null
    _max: CityZoneMaxAggregateOutputType | null
  }

  type GetCityZoneGroupByPayload<T extends CityZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CityZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityZoneGroupByOutputType[P]>
            : GetScalarType<T[P], CityZoneGroupByOutputType[P]>
        }
      >
    >


  export type CityZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    city?: boolean
    zone?: boolean
    active?: boolean
    createdAt?: boolean
    shifts?: boolean | CityZone$shiftsArgs<ExtArgs>
    _count?: boolean | CityZoneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cityZone"]>

  export type CityZoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    city?: boolean
    zone?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cityZone"]>

  export type CityZoneSelectScalar = {
    id?: boolean
    city?: boolean
    zone?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type CityZoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shifts?: boolean | CityZone$shiftsArgs<ExtArgs>
    _count?: boolean | CityZoneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CityZoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CityZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CityZone"
    objects: {
      shifts: Prisma.$ShiftPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      city: string
      zone: string
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["cityZone"]>
    composites: {}
  }

  type CityZoneGetPayload<S extends boolean | null | undefined | CityZoneDefaultArgs> = $Result.GetResult<Prisma.$CityZonePayload, S>

  type CityZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CityZoneFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CityZoneCountAggregateInputType | true
    }

  export interface CityZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CityZone'], meta: { name: 'CityZone' } }
    /**
     * Find zero or one CityZone that matches the filter.
     * @param {CityZoneFindUniqueArgs} args - Arguments to find a CityZone
     * @example
     * // Get one CityZone
     * const cityZone = await prisma.cityZone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CityZoneFindUniqueArgs>(args: SelectSubset<T, CityZoneFindUniqueArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CityZone that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CityZoneFindUniqueOrThrowArgs} args - Arguments to find a CityZone
     * @example
     * // Get one CityZone
     * const cityZone = await prisma.cityZone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CityZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, CityZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CityZone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneFindFirstArgs} args - Arguments to find a CityZone
     * @example
     * // Get one CityZone
     * const cityZone = await prisma.cityZone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CityZoneFindFirstArgs>(args?: SelectSubset<T, CityZoneFindFirstArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CityZone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneFindFirstOrThrowArgs} args - Arguments to find a CityZone
     * @example
     * // Get one CityZone
     * const cityZone = await prisma.cityZone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CityZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, CityZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CityZones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityZones
     * const cityZones = await prisma.cityZone.findMany()
     * 
     * // Get first 10 CityZones
     * const cityZones = await prisma.cityZone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityZoneWithIdOnly = await prisma.cityZone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CityZoneFindManyArgs>(args?: SelectSubset<T, CityZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CityZone.
     * @param {CityZoneCreateArgs} args - Arguments to create a CityZone.
     * @example
     * // Create one CityZone
     * const CityZone = await prisma.cityZone.create({
     *   data: {
     *     // ... data to create a CityZone
     *   }
     * })
     * 
     */
    create<T extends CityZoneCreateArgs>(args: SelectSubset<T, CityZoneCreateArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CityZones.
     * @param {CityZoneCreateManyArgs} args - Arguments to create many CityZones.
     * @example
     * // Create many CityZones
     * const cityZone = await prisma.cityZone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CityZoneCreateManyArgs>(args?: SelectSubset<T, CityZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CityZones and returns the data saved in the database.
     * @param {CityZoneCreateManyAndReturnArgs} args - Arguments to create many CityZones.
     * @example
     * // Create many CityZones
     * const cityZone = await prisma.cityZone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CityZones and only return the `id`
     * const cityZoneWithIdOnly = await prisma.cityZone.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CityZoneCreateManyAndReturnArgs>(args?: SelectSubset<T, CityZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CityZone.
     * @param {CityZoneDeleteArgs} args - Arguments to delete one CityZone.
     * @example
     * // Delete one CityZone
     * const CityZone = await prisma.cityZone.delete({
     *   where: {
     *     // ... filter to delete one CityZone
     *   }
     * })
     * 
     */
    delete<T extends CityZoneDeleteArgs>(args: SelectSubset<T, CityZoneDeleteArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CityZone.
     * @param {CityZoneUpdateArgs} args - Arguments to update one CityZone.
     * @example
     * // Update one CityZone
     * const cityZone = await prisma.cityZone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CityZoneUpdateArgs>(args: SelectSubset<T, CityZoneUpdateArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CityZones.
     * @param {CityZoneDeleteManyArgs} args - Arguments to filter CityZones to delete.
     * @example
     * // Delete a few CityZones
     * const { count } = await prisma.cityZone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CityZoneDeleteManyArgs>(args?: SelectSubset<T, CityZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityZones
     * const cityZone = await prisma.cityZone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CityZoneUpdateManyArgs>(args: SelectSubset<T, CityZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CityZone.
     * @param {CityZoneUpsertArgs} args - Arguments to update or create a CityZone.
     * @example
     * // Update or create a CityZone
     * const cityZone = await prisma.cityZone.upsert({
     *   create: {
     *     // ... data to create a CityZone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityZone we want to update
     *   }
     * })
     */
    upsert<T extends CityZoneUpsertArgs>(args: SelectSubset<T, CityZoneUpsertArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CityZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneCountArgs} args - Arguments to filter CityZones to count.
     * @example
     * // Count the number of CityZones
     * const count = await prisma.cityZone.count({
     *   where: {
     *     // ... the filter for the CityZones we want to count
     *   }
     * })
    **/
    count<T extends CityZoneCountArgs>(
      args?: Subset<T, CityZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CityZoneAggregateArgs>(args: Subset<T, CityZoneAggregateArgs>): Prisma.PrismaPromise<GetCityZoneAggregateType<T>>

    /**
     * Group by CityZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityZoneGroupByArgs} args - Group by arguments.
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
      T extends CityZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityZoneGroupByArgs['orderBy'] }
        : { orderBy?: CityZoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CityZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CityZone model
   */
  readonly fields: CityZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CityZone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CityZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shifts<T extends CityZone$shiftsArgs<ExtArgs> = {}>(args?: Subset<T, CityZone$shiftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the CityZone model
   */ 
  interface CityZoneFieldRefs {
    readonly id: FieldRef<"CityZone", 'String'>
    readonly city: FieldRef<"CityZone", 'String'>
    readonly zone: FieldRef<"CityZone", 'String'>
    readonly active: FieldRef<"CityZone", 'Boolean'>
    readonly createdAt: FieldRef<"CityZone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CityZone findUnique
   */
  export type CityZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter, which CityZone to fetch.
     */
    where: CityZoneWhereUniqueInput
  }

  /**
   * CityZone findUniqueOrThrow
   */
  export type CityZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter, which CityZone to fetch.
     */
    where: CityZoneWhereUniqueInput
  }

  /**
   * CityZone findFirst
   */
  export type CityZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter, which CityZone to fetch.
     */
    where?: CityZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityZones to fetch.
     */
    orderBy?: CityZoneOrderByWithRelationInput | CityZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityZones.
     */
    cursor?: CityZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityZones.
     */
    distinct?: CityZoneScalarFieldEnum | CityZoneScalarFieldEnum[]
  }

  /**
   * CityZone findFirstOrThrow
   */
  export type CityZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter, which CityZone to fetch.
     */
    where?: CityZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityZones to fetch.
     */
    orderBy?: CityZoneOrderByWithRelationInput | CityZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityZones.
     */
    cursor?: CityZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityZones.
     */
    distinct?: CityZoneScalarFieldEnum | CityZoneScalarFieldEnum[]
  }

  /**
   * CityZone findMany
   */
  export type CityZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter, which CityZones to fetch.
     */
    where?: CityZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityZones to fetch.
     */
    orderBy?: CityZoneOrderByWithRelationInput | CityZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityZones.
     */
    cursor?: CityZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityZones.
     */
    skip?: number
    distinct?: CityZoneScalarFieldEnum | CityZoneScalarFieldEnum[]
  }

  /**
   * CityZone create
   */
  export type CityZoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * The data needed to create a CityZone.
     */
    data: XOR<CityZoneCreateInput, CityZoneUncheckedCreateInput>
  }

  /**
   * CityZone createMany
   */
  export type CityZoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CityZones.
     */
    data: CityZoneCreateManyInput | CityZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CityZone createManyAndReturn
   */
  export type CityZoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CityZones.
     */
    data: CityZoneCreateManyInput | CityZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CityZone update
   */
  export type CityZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * The data needed to update a CityZone.
     */
    data: XOR<CityZoneUpdateInput, CityZoneUncheckedUpdateInput>
    /**
     * Choose, which CityZone to update.
     */
    where: CityZoneWhereUniqueInput
  }

  /**
   * CityZone updateMany
   */
  export type CityZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CityZones.
     */
    data: XOR<CityZoneUpdateManyMutationInput, CityZoneUncheckedUpdateManyInput>
    /**
     * Filter which CityZones to update
     */
    where?: CityZoneWhereInput
  }

  /**
   * CityZone upsert
   */
  export type CityZoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * The filter to search for the CityZone to update in case it exists.
     */
    where: CityZoneWhereUniqueInput
    /**
     * In case the CityZone found by the `where` argument doesn't exist, create a new CityZone with this data.
     */
    create: XOR<CityZoneCreateInput, CityZoneUncheckedCreateInput>
    /**
     * In case the CityZone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CityZoneUpdateInput, CityZoneUncheckedUpdateInput>
  }

  /**
   * CityZone delete
   */
  export type CityZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    /**
     * Filter which CityZone to delete.
     */
    where: CityZoneWhereUniqueInput
  }

  /**
   * CityZone deleteMany
   */
  export type CityZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CityZones to delete
     */
    where?: CityZoneWhereInput
  }

  /**
   * CityZone.shifts
   */
  export type CityZone$shiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    cursor?: ShiftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * CityZone without action
   */
  export type CityZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
  }


  /**
   * Model Shift
   */

  export type AggregateShift = {
    _count: ShiftCountAggregateOutputType | null
    _avg: ShiftAvgAggregateOutputType | null
    _sum: ShiftSumAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  export type ShiftAvgAggregateOutputType = {
    hoursWorked: Decimal | null
    grossPay: Decimal | null
    deductions: Decimal | null
    netPay: Decimal | null
  }

  export type ShiftSumAggregateOutputType = {
    hoursWorked: Decimal | null
    grossPay: Decimal | null
    deductions: Decimal | null
    netPay: Decimal | null
  }

  export type ShiftMinAggregateOutputType = {
    id: string | null
    workerId: string | null
    platformId: string | null
    cityZoneId: string | null
    shiftDate: Date | null
    hoursWorked: Decimal | null
    grossPay: Decimal | null
    deductions: Decimal | null
    netPay: Decimal | null
    currency: string | null
    source: $Enums.ShiftSource | null
    verificationStatus: $Enums.ShiftVerificationStatus | null
    notes: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftMaxAggregateOutputType = {
    id: string | null
    workerId: string | null
    platformId: string | null
    cityZoneId: string | null
    shiftDate: Date | null
    hoursWorked: Decimal | null
    grossPay: Decimal | null
    deductions: Decimal | null
    netPay: Decimal | null
    currency: string | null
    source: $Enums.ShiftSource | null
    verificationStatus: $Enums.ShiftVerificationStatus | null
    notes: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShiftCountAggregateOutputType = {
    id: number
    workerId: number
    platformId: number
    cityZoneId: number
    shiftDate: number
    hoursWorked: number
    grossPay: number
    deductions: number
    netPay: number
    currency: number
    source: number
    verificationStatus: number
    notes: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShiftAvgAggregateInputType = {
    hoursWorked?: true
    grossPay?: true
    deductions?: true
    netPay?: true
  }

  export type ShiftSumAggregateInputType = {
    hoursWorked?: true
    grossPay?: true
    deductions?: true
    netPay?: true
  }

  export type ShiftMinAggregateInputType = {
    id?: true
    workerId?: true
    platformId?: true
    cityZoneId?: true
    shiftDate?: true
    hoursWorked?: true
    grossPay?: true
    deductions?: true
    netPay?: true
    currency?: true
    source?: true
    verificationStatus?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShiftMaxAggregateInputType = {
    id?: true
    workerId?: true
    platformId?: true
    cityZoneId?: true
    shiftDate?: true
    hoursWorked?: true
    grossPay?: true
    deductions?: true
    netPay?: true
    currency?: true
    source?: true
    verificationStatus?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShiftCountAggregateInputType = {
    id?: true
    workerId?: true
    platformId?: true
    cityZoneId?: true
    shiftDate?: true
    hoursWorked?: true
    grossPay?: true
    deductions?: true
    netPay?: true
    currency?: true
    source?: true
    verificationStatus?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shift to aggregate.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shifts
    **/
    _count?: true | ShiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShiftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShiftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShiftMaxAggregateInputType
  }

  export type GetShiftAggregateType<T extends ShiftAggregateArgs> = {
        [P in keyof T & keyof AggregateShift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShift[P]>
      : GetScalarType<T[P], AggregateShift[P]>
  }




  export type ShiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithAggregationInput | ShiftOrderByWithAggregationInput[]
    by: ShiftScalarFieldEnum[] | ShiftScalarFieldEnum
    having?: ShiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShiftCountAggregateInputType | true
    _avg?: ShiftAvgAggregateInputType
    _sum?: ShiftSumAggregateInputType
    _min?: ShiftMinAggregateInputType
    _max?: ShiftMaxAggregateInputType
  }

  export type ShiftGroupByOutputType = {
    id: string
    workerId: string
    platformId: string
    cityZoneId: string | null
    shiftDate: Date
    hoursWorked: Decimal
    grossPay: Decimal
    deductions: Decimal
    netPay: Decimal
    currency: string
    source: $Enums.ShiftSource
    verificationStatus: $Enums.ShiftVerificationStatus
    notes: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ShiftCountAggregateOutputType | null
    _avg: ShiftAvgAggregateOutputType | null
    _sum: ShiftSumAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  type GetShiftGroupByPayload<T extends ShiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShiftGroupByOutputType[P]>
            : GetScalarType<T[P], ShiftGroupByOutputType[P]>
        }
      >
    >


  export type ShiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    platformId?: boolean
    cityZoneId?: boolean
    shiftDate?: boolean
    hoursWorked?: boolean
    grossPay?: boolean
    deductions?: boolean
    netPay?: boolean
    currency?: boolean
    source?: boolean
    verificationStatus?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    cityZone?: boolean | Shift$cityZoneArgs<ExtArgs>
    screenshots?: boolean | Shift$screenshotsArgs<ExtArgs>
    verifications?: boolean | Shift$verificationsArgs<ExtArgs>
    anomalyFlags?: boolean | Shift$anomalyFlagsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    platformId?: boolean
    cityZoneId?: boolean
    shiftDate?: boolean
    hoursWorked?: boolean
    grossPay?: boolean
    deductions?: boolean
    netPay?: boolean
    currency?: boolean
    source?: boolean
    verificationStatus?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    cityZone?: boolean | Shift$cityZoneArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectScalar = {
    id?: boolean
    workerId?: boolean
    platformId?: boolean
    cityZoneId?: boolean
    shiftDate?: boolean
    hoursWorked?: boolean
    grossPay?: boolean
    deductions?: boolean
    netPay?: boolean
    currency?: boolean
    source?: boolean
    verificationStatus?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    cityZone?: boolean | Shift$cityZoneArgs<ExtArgs>
    screenshots?: boolean | Shift$screenshotsArgs<ExtArgs>
    verifications?: boolean | Shift$verificationsArgs<ExtArgs>
    anomalyFlags?: boolean | Shift$anomalyFlagsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    cityZone?: boolean | Shift$cityZoneArgs<ExtArgs>
  }

  export type $ShiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shift"
    objects: {
      platform: Prisma.$PlatformPayload<ExtArgs>
      cityZone: Prisma.$CityZonePayload<ExtArgs> | null
      screenshots: Prisma.$ScreenshotPayload<ExtArgs>[]
      verifications: Prisma.$VerificationPayload<ExtArgs>[]
      anomalyFlags: Prisma.$AnomalyFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workerId: string
      platformId: string
      cityZoneId: string | null
      shiftDate: Date
      hoursWorked: Prisma.Decimal
      grossPay: Prisma.Decimal
      deductions: Prisma.Decimal
      netPay: Prisma.Decimal
      currency: string
      source: $Enums.ShiftSource
      verificationStatus: $Enums.ShiftVerificationStatus
      notes: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shift"]>
    composites: {}
  }

  type ShiftGetPayload<S extends boolean | null | undefined | ShiftDefaultArgs> = $Result.GetResult<Prisma.$ShiftPayload, S>

  type ShiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShiftFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShiftCountAggregateInputType | true
    }

  export interface ShiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shift'], meta: { name: 'Shift' } }
    /**
     * Find zero or one Shift that matches the filter.
     * @param {ShiftFindUniqueArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShiftFindUniqueArgs>(args: SelectSubset<T, ShiftFindUniqueArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Shift that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShiftFindUniqueOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShiftFindUniqueOrThrowArgs>(args: SelectSubset<T, ShiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Shift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShiftFindFirstArgs>(args?: SelectSubset<T, ShiftFindFirstArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Shift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShiftFindFirstOrThrowArgs>(args?: SelectSubset<T, ShiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Shifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shifts
     * const shifts = await prisma.shift.findMany()
     * 
     * // Get first 10 Shifts
     * const shifts = await prisma.shift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shiftWithIdOnly = await prisma.shift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShiftFindManyArgs>(args?: SelectSubset<T, ShiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Shift.
     * @param {ShiftCreateArgs} args - Arguments to create a Shift.
     * @example
     * // Create one Shift
     * const Shift = await prisma.shift.create({
     *   data: {
     *     // ... data to create a Shift
     *   }
     * })
     * 
     */
    create<T extends ShiftCreateArgs>(args: SelectSubset<T, ShiftCreateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Shifts.
     * @param {ShiftCreateManyArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShiftCreateManyArgs>(args?: SelectSubset<T, ShiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shifts and returns the data saved in the database.
     * @param {ShiftCreateManyAndReturnArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shifts and only return the `id`
     * const shiftWithIdOnly = await prisma.shift.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShiftCreateManyAndReturnArgs>(args?: SelectSubset<T, ShiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Shift.
     * @param {ShiftDeleteArgs} args - Arguments to delete one Shift.
     * @example
     * // Delete one Shift
     * const Shift = await prisma.shift.delete({
     *   where: {
     *     // ... filter to delete one Shift
     *   }
     * })
     * 
     */
    delete<T extends ShiftDeleteArgs>(args: SelectSubset<T, ShiftDeleteArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Shift.
     * @param {ShiftUpdateArgs} args - Arguments to update one Shift.
     * @example
     * // Update one Shift
     * const shift = await prisma.shift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShiftUpdateArgs>(args: SelectSubset<T, ShiftUpdateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Shifts.
     * @param {ShiftDeleteManyArgs} args - Arguments to filter Shifts to delete.
     * @example
     * // Delete a few Shifts
     * const { count } = await prisma.shift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShiftDeleteManyArgs>(args?: SelectSubset<T, ShiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShiftUpdateManyArgs>(args: SelectSubset<T, ShiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shift.
     * @param {ShiftUpsertArgs} args - Arguments to update or create a Shift.
     * @example
     * // Update or create a Shift
     * const shift = await prisma.shift.upsert({
     *   create: {
     *     // ... data to create a Shift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shift we want to update
     *   }
     * })
     */
    upsert<T extends ShiftUpsertArgs>(args: SelectSubset<T, ShiftUpsertArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftCountArgs} args - Arguments to filter Shifts to count.
     * @example
     * // Count the number of Shifts
     * const count = await prisma.shift.count({
     *   where: {
     *     // ... the filter for the Shifts we want to count
     *   }
     * })
    **/
    count<T extends ShiftCountArgs>(
      args?: Subset<T, ShiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShiftAggregateArgs>(args: Subset<T, ShiftAggregateArgs>): Prisma.PrismaPromise<GetShiftAggregateType<T>>

    /**
     * Group by Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftGroupByArgs} args - Group by arguments.
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
      T extends ShiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShiftGroupByArgs['orderBy'] }
        : { orderBy?: ShiftGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shift model
   */
  readonly fields: ShiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platform<T extends PlatformDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlatformDefaultArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    cityZone<T extends Shift$cityZoneArgs<ExtArgs> = {}>(args?: Subset<T, Shift$cityZoneArgs<ExtArgs>>): Prisma__CityZoneClient<$Result.GetResult<Prisma.$CityZonePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    screenshots<T extends Shift$screenshotsArgs<ExtArgs> = {}>(args?: Subset<T, Shift$screenshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findMany"> | Null>
    verifications<T extends Shift$verificationsArgs<ExtArgs> = {}>(args?: Subset<T, Shift$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany"> | Null>
    anomalyFlags<T extends Shift$anomalyFlagsArgs<ExtArgs> = {}>(args?: Subset<T, Shift$anomalyFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Shift model
   */ 
  interface ShiftFieldRefs {
    readonly id: FieldRef<"Shift", 'String'>
    readonly workerId: FieldRef<"Shift", 'String'>
    readonly platformId: FieldRef<"Shift", 'String'>
    readonly cityZoneId: FieldRef<"Shift", 'String'>
    readonly shiftDate: FieldRef<"Shift", 'DateTime'>
    readonly hoursWorked: FieldRef<"Shift", 'Decimal'>
    readonly grossPay: FieldRef<"Shift", 'Decimal'>
    readonly deductions: FieldRef<"Shift", 'Decimal'>
    readonly netPay: FieldRef<"Shift", 'Decimal'>
    readonly currency: FieldRef<"Shift", 'String'>
    readonly source: FieldRef<"Shift", 'ShiftSource'>
    readonly verificationStatus: FieldRef<"Shift", 'ShiftVerificationStatus'>
    readonly notes: FieldRef<"Shift", 'String'>
    readonly deletedAt: FieldRef<"Shift", 'DateTime'>
    readonly createdAt: FieldRef<"Shift", 'DateTime'>
    readonly updatedAt: FieldRef<"Shift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shift findUnique
   */
  export type ShiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findUniqueOrThrow
   */
  export type ShiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findFirst
   */
  export type ShiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findFirstOrThrow
   */
  export type ShiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findMany
   */
  export type ShiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shifts to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift create
   */
  export type ShiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Shift.
     */
    data: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
  }

  /**
   * Shift createMany
   */
  export type ShiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shift createManyAndReturn
   */
  export type ShiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Shift update
   */
  export type ShiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Shift.
     */
    data: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
    /**
     * Choose, which Shift to update.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift updateMany
   */
  export type ShiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shifts.
     */
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyInput>
    /**
     * Filter which Shifts to update
     */
    where?: ShiftWhereInput
  }

  /**
   * Shift upsert
   */
  export type ShiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Shift to update in case it exists.
     */
    where: ShiftWhereUniqueInput
    /**
     * In case the Shift found by the `where` argument doesn't exist, create a new Shift with this data.
     */
    create: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
    /**
     * In case the Shift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
  }

  /**
   * Shift delete
   */
  export type ShiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter which Shift to delete.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift deleteMany
   */
  export type ShiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shifts to delete
     */
    where?: ShiftWhereInput
  }

  /**
   * Shift.cityZone
   */
  export type Shift$cityZoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityZone
     */
    select?: CityZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityZoneInclude<ExtArgs> | null
    where?: CityZoneWhereInput
  }

  /**
   * Shift.screenshots
   */
  export type Shift$screenshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    where?: ScreenshotWhereInput
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    cursor?: ScreenshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Shift.verifications
   */
  export type Shift$verificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    cursor?: VerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Shift.anomalyFlags
   */
  export type Shift$anomalyFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    where?: AnomalyFlagWhereInput
    orderBy?: AnomalyFlagOrderByWithRelationInput | AnomalyFlagOrderByWithRelationInput[]
    cursor?: AnomalyFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnomalyFlagScalarFieldEnum | AnomalyFlagScalarFieldEnum[]
  }

  /**
   * Shift without action
   */
  export type ShiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
  }


  /**
   * Model Screenshot
   */

  export type AggregateScreenshot = {
    _count: ScreenshotCountAggregateOutputType | null
    _avg: ScreenshotAvgAggregateOutputType | null
    _sum: ScreenshotSumAggregateOutputType | null
    _min: ScreenshotMinAggregateOutputType | null
    _max: ScreenshotMaxAggregateOutputType | null
  }

  export type ScreenshotAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type ScreenshotSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type ScreenshotMinAggregateOutputType = {
    id: string | null
    shiftId: string | null
    storageKey: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedAt: Date | null
    deletedAt: Date | null
  }

  export type ScreenshotMaxAggregateOutputType = {
    id: string | null
    shiftId: string | null
    storageKey: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedAt: Date | null
    deletedAt: Date | null
  }

  export type ScreenshotCountAggregateOutputType = {
    id: number
    shiftId: number
    storageKey: number
    mimeType: number
    sizeBytes: number
    uploadedAt: number
    deletedAt: number
    _all: number
  }


  export type ScreenshotAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type ScreenshotSumAggregateInputType = {
    sizeBytes?: true
  }

  export type ScreenshotMinAggregateInputType = {
    id?: true
    shiftId?: true
    storageKey?: true
    mimeType?: true
    sizeBytes?: true
    uploadedAt?: true
    deletedAt?: true
  }

  export type ScreenshotMaxAggregateInputType = {
    id?: true
    shiftId?: true
    storageKey?: true
    mimeType?: true
    sizeBytes?: true
    uploadedAt?: true
    deletedAt?: true
  }

  export type ScreenshotCountAggregateInputType = {
    id?: true
    shiftId?: true
    storageKey?: true
    mimeType?: true
    sizeBytes?: true
    uploadedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ScreenshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshot to aggregate.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Screenshots
    **/
    _count?: true | ScreenshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScreenshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScreenshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScreenshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScreenshotMaxAggregateInputType
  }

  export type GetScreenshotAggregateType<T extends ScreenshotAggregateArgs> = {
        [P in keyof T & keyof AggregateScreenshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScreenshot[P]>
      : GetScalarType<T[P], AggregateScreenshot[P]>
  }




  export type ScreenshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreenshotWhereInput
    orderBy?: ScreenshotOrderByWithAggregationInput | ScreenshotOrderByWithAggregationInput[]
    by: ScreenshotScalarFieldEnum[] | ScreenshotScalarFieldEnum
    having?: ScreenshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScreenshotCountAggregateInputType | true
    _avg?: ScreenshotAvgAggregateInputType
    _sum?: ScreenshotSumAggregateInputType
    _min?: ScreenshotMinAggregateInputType
    _max?: ScreenshotMaxAggregateInputType
  }

  export type ScreenshotGroupByOutputType = {
    id: string
    shiftId: string
    storageKey: string
    mimeType: string
    sizeBytes: number
    uploadedAt: Date
    deletedAt: Date | null
    _count: ScreenshotCountAggregateOutputType | null
    _avg: ScreenshotAvgAggregateOutputType | null
    _sum: ScreenshotSumAggregateOutputType | null
    _min: ScreenshotMinAggregateOutputType | null
    _max: ScreenshotMaxAggregateOutputType | null
  }

  type GetScreenshotGroupByPayload<T extends ScreenshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScreenshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScreenshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScreenshotGroupByOutputType[P]>
            : GetScalarType<T[P], ScreenshotGroupByOutputType[P]>
        }
      >
    >


  export type ScreenshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    storageKey?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedAt?: boolean
    deletedAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screenshot"]>

  export type ScreenshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    storageKey?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedAt?: boolean
    deletedAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screenshot"]>

  export type ScreenshotSelectScalar = {
    id?: boolean
    shiftId?: boolean
    storageKey?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedAt?: boolean
    deletedAt?: boolean
  }

  export type ScreenshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type ScreenshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }

  export type $ScreenshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Screenshot"
    objects: {
      shift: Prisma.$ShiftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shiftId: string
      storageKey: string
      mimeType: string
      sizeBytes: number
      uploadedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["screenshot"]>
    composites: {}
  }

  type ScreenshotGetPayload<S extends boolean | null | undefined | ScreenshotDefaultArgs> = $Result.GetResult<Prisma.$ScreenshotPayload, S>

  type ScreenshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScreenshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScreenshotCountAggregateInputType | true
    }

  export interface ScreenshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Screenshot'], meta: { name: 'Screenshot' } }
    /**
     * Find zero or one Screenshot that matches the filter.
     * @param {ScreenshotFindUniqueArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreenshotFindUniqueArgs>(args: SelectSubset<T, ScreenshotFindUniqueArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Screenshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScreenshotFindUniqueOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreenshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ScreenshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Screenshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreenshotFindFirstArgs>(args?: SelectSubset<T, ScreenshotFindFirstArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Screenshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreenshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ScreenshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Screenshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Screenshots
     * const screenshots = await prisma.screenshot.findMany()
     * 
     * // Get first 10 Screenshots
     * const screenshots = await prisma.screenshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScreenshotFindManyArgs>(args?: SelectSubset<T, ScreenshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Screenshot.
     * @param {ScreenshotCreateArgs} args - Arguments to create a Screenshot.
     * @example
     * // Create one Screenshot
     * const Screenshot = await prisma.screenshot.create({
     *   data: {
     *     // ... data to create a Screenshot
     *   }
     * })
     * 
     */
    create<T extends ScreenshotCreateArgs>(args: SelectSubset<T, ScreenshotCreateArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Screenshots.
     * @param {ScreenshotCreateManyArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScreenshotCreateManyArgs>(args?: SelectSubset<T, ScreenshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Screenshots and returns the data saved in the database.
     * @param {ScreenshotCreateManyAndReturnArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Screenshots and only return the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScreenshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ScreenshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Screenshot.
     * @param {ScreenshotDeleteArgs} args - Arguments to delete one Screenshot.
     * @example
     * // Delete one Screenshot
     * const Screenshot = await prisma.screenshot.delete({
     *   where: {
     *     // ... filter to delete one Screenshot
     *   }
     * })
     * 
     */
    delete<T extends ScreenshotDeleteArgs>(args: SelectSubset<T, ScreenshotDeleteArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Screenshot.
     * @param {ScreenshotUpdateArgs} args - Arguments to update one Screenshot.
     * @example
     * // Update one Screenshot
     * const screenshot = await prisma.screenshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScreenshotUpdateArgs>(args: SelectSubset<T, ScreenshotUpdateArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Screenshots.
     * @param {ScreenshotDeleteManyArgs} args - Arguments to filter Screenshots to delete.
     * @example
     * // Delete a few Screenshots
     * const { count } = await prisma.screenshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScreenshotDeleteManyArgs>(args?: SelectSubset<T, ScreenshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Screenshots
     * const screenshot = await prisma.screenshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScreenshotUpdateManyArgs>(args: SelectSubset<T, ScreenshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Screenshot.
     * @param {ScreenshotUpsertArgs} args - Arguments to update or create a Screenshot.
     * @example
     * // Update or create a Screenshot
     * const screenshot = await prisma.screenshot.upsert({
     *   create: {
     *     // ... data to create a Screenshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Screenshot we want to update
     *   }
     * })
     */
    upsert<T extends ScreenshotUpsertArgs>(args: SelectSubset<T, ScreenshotUpsertArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotCountArgs} args - Arguments to filter Screenshots to count.
     * @example
     * // Count the number of Screenshots
     * const count = await prisma.screenshot.count({
     *   where: {
     *     // ... the filter for the Screenshots we want to count
     *   }
     * })
    **/
    count<T extends ScreenshotCountArgs>(
      args?: Subset<T, ScreenshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScreenshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScreenshotAggregateArgs>(args: Subset<T, ScreenshotAggregateArgs>): Prisma.PrismaPromise<GetScreenshotAggregateType<T>>

    /**
     * Group by Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotGroupByArgs} args - Group by arguments.
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
      T extends ScreenshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScreenshotGroupByArgs['orderBy'] }
        : { orderBy?: ScreenshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScreenshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreenshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Screenshot model
   */
  readonly fields: ScreenshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Screenshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScreenshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Screenshot model
   */ 
  interface ScreenshotFieldRefs {
    readonly id: FieldRef<"Screenshot", 'String'>
    readonly shiftId: FieldRef<"Screenshot", 'String'>
    readonly storageKey: FieldRef<"Screenshot", 'String'>
    readonly mimeType: FieldRef<"Screenshot", 'String'>
    readonly sizeBytes: FieldRef<"Screenshot", 'Int'>
    readonly uploadedAt: FieldRef<"Screenshot", 'DateTime'>
    readonly deletedAt: FieldRef<"Screenshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Screenshot findUnique
   */
  export type ScreenshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot findUniqueOrThrow
   */
  export type ScreenshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot findFirst
   */
  export type ScreenshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenshots.
     */
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot findFirstOrThrow
   */
  export type ScreenshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenshots.
     */
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot findMany
   */
  export type ScreenshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshots to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot create
   */
  export type ScreenshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The data needed to create a Screenshot.
     */
    data: XOR<ScreenshotCreateInput, ScreenshotUncheckedCreateInput>
  }

  /**
   * Screenshot createMany
   */
  export type ScreenshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Screenshots.
     */
    data: ScreenshotCreateManyInput | ScreenshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Screenshot createManyAndReturn
   */
  export type ScreenshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Screenshots.
     */
    data: ScreenshotCreateManyInput | ScreenshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screenshot update
   */
  export type ScreenshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The data needed to update a Screenshot.
     */
    data: XOR<ScreenshotUpdateInput, ScreenshotUncheckedUpdateInput>
    /**
     * Choose, which Screenshot to update.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot updateMany
   */
  export type ScreenshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Screenshots.
     */
    data: XOR<ScreenshotUpdateManyMutationInput, ScreenshotUncheckedUpdateManyInput>
    /**
     * Filter which Screenshots to update
     */
    where?: ScreenshotWhereInput
  }

  /**
   * Screenshot upsert
   */
  export type ScreenshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The filter to search for the Screenshot to update in case it exists.
     */
    where: ScreenshotWhereUniqueInput
    /**
     * In case the Screenshot found by the `where` argument doesn't exist, create a new Screenshot with this data.
     */
    create: XOR<ScreenshotCreateInput, ScreenshotUncheckedCreateInput>
    /**
     * In case the Screenshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScreenshotUpdateInput, ScreenshotUncheckedUpdateInput>
  }

  /**
   * Screenshot delete
   */
  export type ScreenshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter which Screenshot to delete.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot deleteMany
   */
  export type ScreenshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshots to delete
     */
    where?: ScreenshotWhereInput
  }

  /**
   * Screenshot without action
   */
  export type ScreenshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    shiftId: string | null
    verifierId: string | null
    screenshotId: string | null
    status: $Enums.VerificationStatus | null
    notes: string | null
    decidedAt: Date | null
    createdAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    shiftId: string | null
    verifierId: string | null
    screenshotId: string | null
    status: $Enums.VerificationStatus | null
    notes: string | null
    decidedAt: Date | null
    createdAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    shiftId: number
    verifierId: number
    screenshotId: number
    status: number
    notes: number
    decidedAt: number
    createdAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    shiftId?: true
    verifierId?: true
    screenshotId?: true
    status?: true
    notes?: true
    decidedAt?: true
    createdAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    shiftId?: true
    verifierId?: true
    screenshotId?: true
    status?: true
    notes?: true
    decidedAt?: true
    createdAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    shiftId?: true
    verifierId?: true
    screenshotId?: true
    status?: true
    notes?: true
    decidedAt?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    shiftId: string
    verifierId: string
    screenshotId: string | null
    status: $Enums.VerificationStatus
    notes: string | null
    decidedAt: Date | null
    createdAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    verifierId?: boolean
    screenshotId?: boolean
    status?: boolean
    notes?: boolean
    decidedAt?: boolean
    createdAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    verifierId?: boolean
    screenshotId?: boolean
    status?: boolean
    notes?: boolean
    decidedAt?: boolean
    createdAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    shiftId?: boolean
    verifierId?: boolean
    screenshotId?: boolean
    status?: boolean
    notes?: boolean
    decidedAt?: boolean
    createdAt?: boolean
  }

  export type VerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type VerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {
      shift: Prisma.$ShiftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shiftId: string
      verifierId: string
      screenshotId: string | null
      status: $Enums.VerificationStatus
      notes: string | null
      decidedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Verification model
   */ 
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly shiftId: FieldRef<"Verification", 'String'>
    readonly verifierId: FieldRef<"Verification", 'String'>
    readonly screenshotId: FieldRef<"Verification", 'String'>
    readonly status: FieldRef<"Verification", 'VerificationStatus'>
    readonly notes: FieldRef<"Verification", 'String'>
    readonly decidedAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationInclude<ExtArgs> | null
  }


  /**
   * Model AnomalyFlag
   */

  export type AggregateAnomalyFlag = {
    _count: AnomalyFlagCountAggregateOutputType | null
    _avg: AnomalyFlagAvgAggregateOutputType | null
    _sum: AnomalyFlagSumAggregateOutputType | null
    _min: AnomalyFlagMinAggregateOutputType | null
    _max: AnomalyFlagMaxAggregateOutputType | null
  }

  export type AnomalyFlagAvgAggregateOutputType = {
    score: Decimal | null
  }

  export type AnomalyFlagSumAggregateOutputType = {
    score: Decimal | null
  }

  export type AnomalyFlagMinAggregateOutputType = {
    id: string | null
    shiftId: string | null
    flaggedBy: string | null
    reason: string | null
    score: Decimal | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type AnomalyFlagMaxAggregateOutputType = {
    id: string | null
    shiftId: string | null
    flaggedBy: string | null
    reason: string | null
    score: Decimal | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type AnomalyFlagCountAggregateOutputType = {
    id: number
    shiftId: number
    flaggedBy: number
    reason: number
    score: number
    resolvedAt: number
    createdAt: number
    _all: number
  }


  export type AnomalyFlagAvgAggregateInputType = {
    score?: true
  }

  export type AnomalyFlagSumAggregateInputType = {
    score?: true
  }

  export type AnomalyFlagMinAggregateInputType = {
    id?: true
    shiftId?: true
    flaggedBy?: true
    reason?: true
    score?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type AnomalyFlagMaxAggregateInputType = {
    id?: true
    shiftId?: true
    flaggedBy?: true
    reason?: true
    score?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type AnomalyFlagCountAggregateInputType = {
    id?: true
    shiftId?: true
    flaggedBy?: true
    reason?: true
    score?: true
    resolvedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AnomalyFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnomalyFlag to aggregate.
     */
    where?: AnomalyFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnomalyFlags to fetch.
     */
    orderBy?: AnomalyFlagOrderByWithRelationInput | AnomalyFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnomalyFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnomalyFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnomalyFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnomalyFlags
    **/
    _count?: true | AnomalyFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnomalyFlagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnomalyFlagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnomalyFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnomalyFlagMaxAggregateInputType
  }

  export type GetAnomalyFlagAggregateType<T extends AnomalyFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateAnomalyFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnomalyFlag[P]>
      : GetScalarType<T[P], AggregateAnomalyFlag[P]>
  }




  export type AnomalyFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnomalyFlagWhereInput
    orderBy?: AnomalyFlagOrderByWithAggregationInput | AnomalyFlagOrderByWithAggregationInput[]
    by: AnomalyFlagScalarFieldEnum[] | AnomalyFlagScalarFieldEnum
    having?: AnomalyFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnomalyFlagCountAggregateInputType | true
    _avg?: AnomalyFlagAvgAggregateInputType
    _sum?: AnomalyFlagSumAggregateInputType
    _min?: AnomalyFlagMinAggregateInputType
    _max?: AnomalyFlagMaxAggregateInputType
  }

  export type AnomalyFlagGroupByOutputType = {
    id: string
    shiftId: string
    flaggedBy: string
    reason: string
    score: Decimal | null
    resolvedAt: Date | null
    createdAt: Date
    _count: AnomalyFlagCountAggregateOutputType | null
    _avg: AnomalyFlagAvgAggregateOutputType | null
    _sum: AnomalyFlagSumAggregateOutputType | null
    _min: AnomalyFlagMinAggregateOutputType | null
    _max: AnomalyFlagMaxAggregateOutputType | null
  }

  type GetAnomalyFlagGroupByPayload<T extends AnomalyFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnomalyFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnomalyFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnomalyFlagGroupByOutputType[P]>
            : GetScalarType<T[P], AnomalyFlagGroupByOutputType[P]>
        }
      >
    >


  export type AnomalyFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    flaggedBy?: boolean
    reason?: boolean
    score?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anomalyFlag"]>

  export type AnomalyFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shiftId?: boolean
    flaggedBy?: boolean
    reason?: boolean
    score?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anomalyFlag"]>

  export type AnomalyFlagSelectScalar = {
    id?: boolean
    shiftId?: boolean
    flaggedBy?: boolean
    reason?: boolean
    score?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }

  export type AnomalyFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }
  export type AnomalyFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | ShiftDefaultArgs<ExtArgs>
  }

  export type $AnomalyFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnomalyFlag"
    objects: {
      shift: Prisma.$ShiftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shiftId: string
      flaggedBy: string
      reason: string
      score: Prisma.Decimal | null
      resolvedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["anomalyFlag"]>
    composites: {}
  }

  type AnomalyFlagGetPayload<S extends boolean | null | undefined | AnomalyFlagDefaultArgs> = $Result.GetResult<Prisma.$AnomalyFlagPayload, S>

  type AnomalyFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnomalyFlagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnomalyFlagCountAggregateInputType | true
    }

  export interface AnomalyFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnomalyFlag'], meta: { name: 'AnomalyFlag' } }
    /**
     * Find zero or one AnomalyFlag that matches the filter.
     * @param {AnomalyFlagFindUniqueArgs} args - Arguments to find a AnomalyFlag
     * @example
     * // Get one AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnomalyFlagFindUniqueArgs>(args: SelectSubset<T, AnomalyFlagFindUniqueArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnomalyFlag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnomalyFlagFindUniqueOrThrowArgs} args - Arguments to find a AnomalyFlag
     * @example
     * // Get one AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnomalyFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, AnomalyFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnomalyFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagFindFirstArgs} args - Arguments to find a AnomalyFlag
     * @example
     * // Get one AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnomalyFlagFindFirstArgs>(args?: SelectSubset<T, AnomalyFlagFindFirstArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnomalyFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagFindFirstOrThrowArgs} args - Arguments to find a AnomalyFlag
     * @example
     * // Get one AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnomalyFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, AnomalyFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnomalyFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnomalyFlags
     * const anomalyFlags = await prisma.anomalyFlag.findMany()
     * 
     * // Get first 10 AnomalyFlags
     * const anomalyFlags = await prisma.anomalyFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anomalyFlagWithIdOnly = await prisma.anomalyFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnomalyFlagFindManyArgs>(args?: SelectSubset<T, AnomalyFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnomalyFlag.
     * @param {AnomalyFlagCreateArgs} args - Arguments to create a AnomalyFlag.
     * @example
     * // Create one AnomalyFlag
     * const AnomalyFlag = await prisma.anomalyFlag.create({
     *   data: {
     *     // ... data to create a AnomalyFlag
     *   }
     * })
     * 
     */
    create<T extends AnomalyFlagCreateArgs>(args: SelectSubset<T, AnomalyFlagCreateArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnomalyFlags.
     * @param {AnomalyFlagCreateManyArgs} args - Arguments to create many AnomalyFlags.
     * @example
     * // Create many AnomalyFlags
     * const anomalyFlag = await prisma.anomalyFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnomalyFlagCreateManyArgs>(args?: SelectSubset<T, AnomalyFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnomalyFlags and returns the data saved in the database.
     * @param {AnomalyFlagCreateManyAndReturnArgs} args - Arguments to create many AnomalyFlags.
     * @example
     * // Create many AnomalyFlags
     * const anomalyFlag = await prisma.anomalyFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnomalyFlags and only return the `id`
     * const anomalyFlagWithIdOnly = await prisma.anomalyFlag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnomalyFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, AnomalyFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AnomalyFlag.
     * @param {AnomalyFlagDeleteArgs} args - Arguments to delete one AnomalyFlag.
     * @example
     * // Delete one AnomalyFlag
     * const AnomalyFlag = await prisma.anomalyFlag.delete({
     *   where: {
     *     // ... filter to delete one AnomalyFlag
     *   }
     * })
     * 
     */
    delete<T extends AnomalyFlagDeleteArgs>(args: SelectSubset<T, AnomalyFlagDeleteArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnomalyFlag.
     * @param {AnomalyFlagUpdateArgs} args - Arguments to update one AnomalyFlag.
     * @example
     * // Update one AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnomalyFlagUpdateArgs>(args: SelectSubset<T, AnomalyFlagUpdateArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnomalyFlags.
     * @param {AnomalyFlagDeleteManyArgs} args - Arguments to filter AnomalyFlags to delete.
     * @example
     * // Delete a few AnomalyFlags
     * const { count } = await prisma.anomalyFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnomalyFlagDeleteManyArgs>(args?: SelectSubset<T, AnomalyFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnomalyFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnomalyFlags
     * const anomalyFlag = await prisma.anomalyFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnomalyFlagUpdateManyArgs>(args: SelectSubset<T, AnomalyFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnomalyFlag.
     * @param {AnomalyFlagUpsertArgs} args - Arguments to update or create a AnomalyFlag.
     * @example
     * // Update or create a AnomalyFlag
     * const anomalyFlag = await prisma.anomalyFlag.upsert({
     *   create: {
     *     // ... data to create a AnomalyFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnomalyFlag we want to update
     *   }
     * })
     */
    upsert<T extends AnomalyFlagUpsertArgs>(args: SelectSubset<T, AnomalyFlagUpsertArgs<ExtArgs>>): Prisma__AnomalyFlagClient<$Result.GetResult<Prisma.$AnomalyFlagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnomalyFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagCountArgs} args - Arguments to filter AnomalyFlags to count.
     * @example
     * // Count the number of AnomalyFlags
     * const count = await prisma.anomalyFlag.count({
     *   where: {
     *     // ... the filter for the AnomalyFlags we want to count
     *   }
     * })
    **/
    count<T extends AnomalyFlagCountArgs>(
      args?: Subset<T, AnomalyFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnomalyFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnomalyFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnomalyFlagAggregateArgs>(args: Subset<T, AnomalyFlagAggregateArgs>): Prisma.PrismaPromise<GetAnomalyFlagAggregateType<T>>

    /**
     * Group by AnomalyFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnomalyFlagGroupByArgs} args - Group by arguments.
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
      T extends AnomalyFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnomalyFlagGroupByArgs['orderBy'] }
        : { orderBy?: AnomalyFlagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnomalyFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnomalyFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnomalyFlag model
   */
  readonly fields: AnomalyFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnomalyFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnomalyFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shift<T extends ShiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShiftDefaultArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the AnomalyFlag model
   */ 
  interface AnomalyFlagFieldRefs {
    readonly id: FieldRef<"AnomalyFlag", 'String'>
    readonly shiftId: FieldRef<"AnomalyFlag", 'String'>
    readonly flaggedBy: FieldRef<"AnomalyFlag", 'String'>
    readonly reason: FieldRef<"AnomalyFlag", 'String'>
    readonly score: FieldRef<"AnomalyFlag", 'Decimal'>
    readonly resolvedAt: FieldRef<"AnomalyFlag", 'DateTime'>
    readonly createdAt: FieldRef<"AnomalyFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnomalyFlag findUnique
   */
  export type AnomalyFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter, which AnomalyFlag to fetch.
     */
    where: AnomalyFlagWhereUniqueInput
  }

  /**
   * AnomalyFlag findUniqueOrThrow
   */
  export type AnomalyFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter, which AnomalyFlag to fetch.
     */
    where: AnomalyFlagWhereUniqueInput
  }

  /**
   * AnomalyFlag findFirst
   */
  export type AnomalyFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter, which AnomalyFlag to fetch.
     */
    where?: AnomalyFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnomalyFlags to fetch.
     */
    orderBy?: AnomalyFlagOrderByWithRelationInput | AnomalyFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnomalyFlags.
     */
    cursor?: AnomalyFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnomalyFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnomalyFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnomalyFlags.
     */
    distinct?: AnomalyFlagScalarFieldEnum | AnomalyFlagScalarFieldEnum[]
  }

  /**
   * AnomalyFlag findFirstOrThrow
   */
  export type AnomalyFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter, which AnomalyFlag to fetch.
     */
    where?: AnomalyFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnomalyFlags to fetch.
     */
    orderBy?: AnomalyFlagOrderByWithRelationInput | AnomalyFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnomalyFlags.
     */
    cursor?: AnomalyFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnomalyFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnomalyFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnomalyFlags.
     */
    distinct?: AnomalyFlagScalarFieldEnum | AnomalyFlagScalarFieldEnum[]
  }

  /**
   * AnomalyFlag findMany
   */
  export type AnomalyFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter, which AnomalyFlags to fetch.
     */
    where?: AnomalyFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnomalyFlags to fetch.
     */
    orderBy?: AnomalyFlagOrderByWithRelationInput | AnomalyFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnomalyFlags.
     */
    cursor?: AnomalyFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnomalyFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnomalyFlags.
     */
    skip?: number
    distinct?: AnomalyFlagScalarFieldEnum | AnomalyFlagScalarFieldEnum[]
  }

  /**
   * AnomalyFlag create
   */
  export type AnomalyFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a AnomalyFlag.
     */
    data: XOR<AnomalyFlagCreateInput, AnomalyFlagUncheckedCreateInput>
  }

  /**
   * AnomalyFlag createMany
   */
  export type AnomalyFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnomalyFlags.
     */
    data: AnomalyFlagCreateManyInput | AnomalyFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnomalyFlag createManyAndReturn
   */
  export type AnomalyFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AnomalyFlags.
     */
    data: AnomalyFlagCreateManyInput | AnomalyFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnomalyFlag update
   */
  export type AnomalyFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a AnomalyFlag.
     */
    data: XOR<AnomalyFlagUpdateInput, AnomalyFlagUncheckedUpdateInput>
    /**
     * Choose, which AnomalyFlag to update.
     */
    where: AnomalyFlagWhereUniqueInput
  }

  /**
   * AnomalyFlag updateMany
   */
  export type AnomalyFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnomalyFlags.
     */
    data: XOR<AnomalyFlagUpdateManyMutationInput, AnomalyFlagUncheckedUpdateManyInput>
    /**
     * Filter which AnomalyFlags to update
     */
    where?: AnomalyFlagWhereInput
  }

  /**
   * AnomalyFlag upsert
   */
  export type AnomalyFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the AnomalyFlag to update in case it exists.
     */
    where: AnomalyFlagWhereUniqueInput
    /**
     * In case the AnomalyFlag found by the `where` argument doesn't exist, create a new AnomalyFlag with this data.
     */
    create: XOR<AnomalyFlagCreateInput, AnomalyFlagUncheckedCreateInput>
    /**
     * In case the AnomalyFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnomalyFlagUpdateInput, AnomalyFlagUncheckedUpdateInput>
  }

  /**
   * AnomalyFlag delete
   */
  export type AnomalyFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
    /**
     * Filter which AnomalyFlag to delete.
     */
    where: AnomalyFlagWhereUniqueInput
  }

  /**
   * AnomalyFlag deleteMany
   */
  export type AnomalyFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnomalyFlags to delete
     */
    where?: AnomalyFlagWhereInput
  }

  /**
   * AnomalyFlag without action
   */
  export type AnomalyFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnomalyFlag
     */
    select?: AnomalyFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnomalyFlagInclude<ExtArgs> | null
  }


  /**
   * Model CsvImport
   */

  export type AggregateCsvImport = {
    _count: CsvImportCountAggregateOutputType | null
    _avg: CsvImportAvgAggregateOutputType | null
    _sum: CsvImportSumAggregateOutputType | null
    _min: CsvImportMinAggregateOutputType | null
    _max: CsvImportMaxAggregateOutputType | null
  }

  export type CsvImportAvgAggregateOutputType = {
    rowsTotal: number | null
    rowsOk: number | null
    rowsFailed: number | null
  }

  export type CsvImportSumAggregateOutputType = {
    rowsTotal: number | null
    rowsOk: number | null
    rowsFailed: number | null
  }

  export type CsvImportMinAggregateOutputType = {
    id: string | null
    workerId: string | null
    storageKey: string | null
    status: $Enums.ImportStatus | null
    rowsTotal: number | null
    rowsOk: number | null
    rowsFailed: number | null
    errorCsvKey: string | null
    jobId: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type CsvImportMaxAggregateOutputType = {
    id: string | null
    workerId: string | null
    storageKey: string | null
    status: $Enums.ImportStatus | null
    rowsTotal: number | null
    rowsOk: number | null
    rowsFailed: number | null
    errorCsvKey: string | null
    jobId: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type CsvImportCountAggregateOutputType = {
    id: number
    workerId: number
    storageKey: number
    status: number
    rowsTotal: number
    rowsOk: number
    rowsFailed: number
    errorLog: number
    errorCsvKey: number
    jobId: number
    startedAt: number
    finishedAt: number
    createdAt: number
    _all: number
  }


  export type CsvImportAvgAggregateInputType = {
    rowsTotal?: true
    rowsOk?: true
    rowsFailed?: true
  }

  export type CsvImportSumAggregateInputType = {
    rowsTotal?: true
    rowsOk?: true
    rowsFailed?: true
  }

  export type CsvImportMinAggregateInputType = {
    id?: true
    workerId?: true
    storageKey?: true
    status?: true
    rowsTotal?: true
    rowsOk?: true
    rowsFailed?: true
    errorCsvKey?: true
    jobId?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type CsvImportMaxAggregateInputType = {
    id?: true
    workerId?: true
    storageKey?: true
    status?: true
    rowsTotal?: true
    rowsOk?: true
    rowsFailed?: true
    errorCsvKey?: true
    jobId?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type CsvImportCountAggregateInputType = {
    id?: true
    workerId?: true
    storageKey?: true
    status?: true
    rowsTotal?: true
    rowsOk?: true
    rowsFailed?: true
    errorLog?: true
    errorCsvKey?: true
    jobId?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CsvImportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CsvImport to aggregate.
     */
    where?: CsvImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CsvImports to fetch.
     */
    orderBy?: CsvImportOrderByWithRelationInput | CsvImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CsvImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CsvImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CsvImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CsvImports
    **/
    _count?: true | CsvImportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CsvImportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CsvImportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CsvImportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CsvImportMaxAggregateInputType
  }

  export type GetCsvImportAggregateType<T extends CsvImportAggregateArgs> = {
        [P in keyof T & keyof AggregateCsvImport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCsvImport[P]>
      : GetScalarType<T[P], AggregateCsvImport[P]>
  }




  export type CsvImportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CsvImportWhereInput
    orderBy?: CsvImportOrderByWithAggregationInput | CsvImportOrderByWithAggregationInput[]
    by: CsvImportScalarFieldEnum[] | CsvImportScalarFieldEnum
    having?: CsvImportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CsvImportCountAggregateInputType | true
    _avg?: CsvImportAvgAggregateInputType
    _sum?: CsvImportSumAggregateInputType
    _min?: CsvImportMinAggregateInputType
    _max?: CsvImportMaxAggregateInputType
  }

  export type CsvImportGroupByOutputType = {
    id: string
    workerId: string
    storageKey: string
    status: $Enums.ImportStatus
    rowsTotal: number
    rowsOk: number
    rowsFailed: number
    errorLog: JsonValue | null
    errorCsvKey: string | null
    jobId: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date
    _count: CsvImportCountAggregateOutputType | null
    _avg: CsvImportAvgAggregateOutputType | null
    _sum: CsvImportSumAggregateOutputType | null
    _min: CsvImportMinAggregateOutputType | null
    _max: CsvImportMaxAggregateOutputType | null
  }

  type GetCsvImportGroupByPayload<T extends CsvImportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CsvImportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CsvImportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CsvImportGroupByOutputType[P]>
            : GetScalarType<T[P], CsvImportGroupByOutputType[P]>
        }
      >
    >


  export type CsvImportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    storageKey?: boolean
    status?: boolean
    rowsTotal?: boolean
    rowsOk?: boolean
    rowsFailed?: boolean
    errorLog?: boolean
    errorCsvKey?: boolean
    jobId?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["csvImport"]>

  export type CsvImportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    storageKey?: boolean
    status?: boolean
    rowsTotal?: boolean
    rowsOk?: boolean
    rowsFailed?: boolean
    errorLog?: boolean
    errorCsvKey?: boolean
    jobId?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["csvImport"]>

  export type CsvImportSelectScalar = {
    id?: boolean
    workerId?: boolean
    storageKey?: boolean
    status?: boolean
    rowsTotal?: boolean
    rowsOk?: boolean
    rowsFailed?: boolean
    errorLog?: boolean
    errorCsvKey?: boolean
    jobId?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }


  export type $CsvImportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CsvImport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workerId: string
      storageKey: string
      status: $Enums.ImportStatus
      rowsTotal: number
      rowsOk: number
      rowsFailed: number
      errorLog: Prisma.JsonValue | null
      errorCsvKey: string | null
      jobId: string | null
      startedAt: Date | null
      finishedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["csvImport"]>
    composites: {}
  }

  type CsvImportGetPayload<S extends boolean | null | undefined | CsvImportDefaultArgs> = $Result.GetResult<Prisma.$CsvImportPayload, S>

  type CsvImportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CsvImportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CsvImportCountAggregateInputType | true
    }

  export interface CsvImportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CsvImport'], meta: { name: 'CsvImport' } }
    /**
     * Find zero or one CsvImport that matches the filter.
     * @param {CsvImportFindUniqueArgs} args - Arguments to find a CsvImport
     * @example
     * // Get one CsvImport
     * const csvImport = await prisma.csvImport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CsvImportFindUniqueArgs>(args: SelectSubset<T, CsvImportFindUniqueArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CsvImport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CsvImportFindUniqueOrThrowArgs} args - Arguments to find a CsvImport
     * @example
     * // Get one CsvImport
     * const csvImport = await prisma.csvImport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CsvImportFindUniqueOrThrowArgs>(args: SelectSubset<T, CsvImportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CsvImport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportFindFirstArgs} args - Arguments to find a CsvImport
     * @example
     * // Get one CsvImport
     * const csvImport = await prisma.csvImport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CsvImportFindFirstArgs>(args?: SelectSubset<T, CsvImportFindFirstArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CsvImport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportFindFirstOrThrowArgs} args - Arguments to find a CsvImport
     * @example
     * // Get one CsvImport
     * const csvImport = await prisma.csvImport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CsvImportFindFirstOrThrowArgs>(args?: SelectSubset<T, CsvImportFindFirstOrThrowArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CsvImports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CsvImports
     * const csvImports = await prisma.csvImport.findMany()
     * 
     * // Get first 10 CsvImports
     * const csvImports = await prisma.csvImport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const csvImportWithIdOnly = await prisma.csvImport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CsvImportFindManyArgs>(args?: SelectSubset<T, CsvImportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CsvImport.
     * @param {CsvImportCreateArgs} args - Arguments to create a CsvImport.
     * @example
     * // Create one CsvImport
     * const CsvImport = await prisma.csvImport.create({
     *   data: {
     *     // ... data to create a CsvImport
     *   }
     * })
     * 
     */
    create<T extends CsvImportCreateArgs>(args: SelectSubset<T, CsvImportCreateArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CsvImports.
     * @param {CsvImportCreateManyArgs} args - Arguments to create many CsvImports.
     * @example
     * // Create many CsvImports
     * const csvImport = await prisma.csvImport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CsvImportCreateManyArgs>(args?: SelectSubset<T, CsvImportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CsvImports and returns the data saved in the database.
     * @param {CsvImportCreateManyAndReturnArgs} args - Arguments to create many CsvImports.
     * @example
     * // Create many CsvImports
     * const csvImport = await prisma.csvImport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CsvImports and only return the `id`
     * const csvImportWithIdOnly = await prisma.csvImport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CsvImportCreateManyAndReturnArgs>(args?: SelectSubset<T, CsvImportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CsvImport.
     * @param {CsvImportDeleteArgs} args - Arguments to delete one CsvImport.
     * @example
     * // Delete one CsvImport
     * const CsvImport = await prisma.csvImport.delete({
     *   where: {
     *     // ... filter to delete one CsvImport
     *   }
     * })
     * 
     */
    delete<T extends CsvImportDeleteArgs>(args: SelectSubset<T, CsvImportDeleteArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CsvImport.
     * @param {CsvImportUpdateArgs} args - Arguments to update one CsvImport.
     * @example
     * // Update one CsvImport
     * const csvImport = await prisma.csvImport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CsvImportUpdateArgs>(args: SelectSubset<T, CsvImportUpdateArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CsvImports.
     * @param {CsvImportDeleteManyArgs} args - Arguments to filter CsvImports to delete.
     * @example
     * // Delete a few CsvImports
     * const { count } = await prisma.csvImport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CsvImportDeleteManyArgs>(args?: SelectSubset<T, CsvImportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CsvImports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CsvImports
     * const csvImport = await prisma.csvImport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CsvImportUpdateManyArgs>(args: SelectSubset<T, CsvImportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CsvImport.
     * @param {CsvImportUpsertArgs} args - Arguments to update or create a CsvImport.
     * @example
     * // Update or create a CsvImport
     * const csvImport = await prisma.csvImport.upsert({
     *   create: {
     *     // ... data to create a CsvImport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CsvImport we want to update
     *   }
     * })
     */
    upsert<T extends CsvImportUpsertArgs>(args: SelectSubset<T, CsvImportUpsertArgs<ExtArgs>>): Prisma__CsvImportClient<$Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CsvImports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportCountArgs} args - Arguments to filter CsvImports to count.
     * @example
     * // Count the number of CsvImports
     * const count = await prisma.csvImport.count({
     *   where: {
     *     // ... the filter for the CsvImports we want to count
     *   }
     * })
    **/
    count<T extends CsvImportCountArgs>(
      args?: Subset<T, CsvImportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CsvImportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CsvImport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CsvImportAggregateArgs>(args: Subset<T, CsvImportAggregateArgs>): Prisma.PrismaPromise<GetCsvImportAggregateType<T>>

    /**
     * Group by CsvImport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CsvImportGroupByArgs} args - Group by arguments.
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
      T extends CsvImportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CsvImportGroupByArgs['orderBy'] }
        : { orderBy?: CsvImportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CsvImportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCsvImportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CsvImport model
   */
  readonly fields: CsvImportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CsvImport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CsvImportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CsvImport model
   */ 
  interface CsvImportFieldRefs {
    readonly id: FieldRef<"CsvImport", 'String'>
    readonly workerId: FieldRef<"CsvImport", 'String'>
    readonly storageKey: FieldRef<"CsvImport", 'String'>
    readonly status: FieldRef<"CsvImport", 'ImportStatus'>
    readonly rowsTotal: FieldRef<"CsvImport", 'Int'>
    readonly rowsOk: FieldRef<"CsvImport", 'Int'>
    readonly rowsFailed: FieldRef<"CsvImport", 'Int'>
    readonly errorLog: FieldRef<"CsvImport", 'Json'>
    readonly errorCsvKey: FieldRef<"CsvImport", 'String'>
    readonly jobId: FieldRef<"CsvImport", 'String'>
    readonly startedAt: FieldRef<"CsvImport", 'DateTime'>
    readonly finishedAt: FieldRef<"CsvImport", 'DateTime'>
    readonly createdAt: FieldRef<"CsvImport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CsvImport findUnique
   */
  export type CsvImportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter, which CsvImport to fetch.
     */
    where: CsvImportWhereUniqueInput
  }

  /**
   * CsvImport findUniqueOrThrow
   */
  export type CsvImportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter, which CsvImport to fetch.
     */
    where: CsvImportWhereUniqueInput
  }

  /**
   * CsvImport findFirst
   */
  export type CsvImportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter, which CsvImport to fetch.
     */
    where?: CsvImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CsvImports to fetch.
     */
    orderBy?: CsvImportOrderByWithRelationInput | CsvImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CsvImports.
     */
    cursor?: CsvImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CsvImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CsvImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CsvImports.
     */
    distinct?: CsvImportScalarFieldEnum | CsvImportScalarFieldEnum[]
  }

  /**
   * CsvImport findFirstOrThrow
   */
  export type CsvImportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter, which CsvImport to fetch.
     */
    where?: CsvImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CsvImports to fetch.
     */
    orderBy?: CsvImportOrderByWithRelationInput | CsvImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CsvImports.
     */
    cursor?: CsvImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CsvImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CsvImports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CsvImports.
     */
    distinct?: CsvImportScalarFieldEnum | CsvImportScalarFieldEnum[]
  }

  /**
   * CsvImport findMany
   */
  export type CsvImportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter, which CsvImports to fetch.
     */
    where?: CsvImportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CsvImports to fetch.
     */
    orderBy?: CsvImportOrderByWithRelationInput | CsvImportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CsvImports.
     */
    cursor?: CsvImportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CsvImports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CsvImports.
     */
    skip?: number
    distinct?: CsvImportScalarFieldEnum | CsvImportScalarFieldEnum[]
  }

  /**
   * CsvImport create
   */
  export type CsvImportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * The data needed to create a CsvImport.
     */
    data: XOR<CsvImportCreateInput, CsvImportUncheckedCreateInput>
  }

  /**
   * CsvImport createMany
   */
  export type CsvImportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CsvImports.
     */
    data: CsvImportCreateManyInput | CsvImportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CsvImport createManyAndReturn
   */
  export type CsvImportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CsvImports.
     */
    data: CsvImportCreateManyInput | CsvImportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CsvImport update
   */
  export type CsvImportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * The data needed to update a CsvImport.
     */
    data: XOR<CsvImportUpdateInput, CsvImportUncheckedUpdateInput>
    /**
     * Choose, which CsvImport to update.
     */
    where: CsvImportWhereUniqueInput
  }

  /**
   * CsvImport updateMany
   */
  export type CsvImportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CsvImports.
     */
    data: XOR<CsvImportUpdateManyMutationInput, CsvImportUncheckedUpdateManyInput>
    /**
     * Filter which CsvImports to update
     */
    where?: CsvImportWhereInput
  }

  /**
   * CsvImport upsert
   */
  export type CsvImportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * The filter to search for the CsvImport to update in case it exists.
     */
    where: CsvImportWhereUniqueInput
    /**
     * In case the CsvImport found by the `where` argument doesn't exist, create a new CsvImport with this data.
     */
    create: XOR<CsvImportCreateInput, CsvImportUncheckedCreateInput>
    /**
     * In case the CsvImport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CsvImportUpdateInput, CsvImportUncheckedUpdateInput>
  }

  /**
   * CsvImport delete
   */
  export type CsvImportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
    /**
     * Filter which CsvImport to delete.
     */
    where: CsvImportWhereUniqueInput
  }

  /**
   * CsvImport deleteMany
   */
  export type CsvImportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CsvImports to delete
     */
    where?: CsvImportWhereInput
  }

  /**
   * CsvImport without action
   */
  export type CsvImportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CsvImport
     */
    select?: CsvImportSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    body: string | null
    link: string | null
    readAt: Date | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    body: string | null
    link: string | null
    readAt: Date | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    body: number
    link: number
    readAt: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    link?: true
    readAt?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    link?: true
    readAt?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    link?: true
    readAt?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    body: string
    link: string | null
    readAt: Date | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    readAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    readAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    readAt?: boolean
    createdAt?: boolean
  }


  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      body: string
      link: string | null
      readAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly readAt: FieldRef<"Notification", 'DateTime'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
  }


  /**
   * Model Certificate
   */

  export type AggregateCertificate = {
    _count: CertificateCountAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  export type CertificateMinAggregateOutputType = {
    id: string | null
    workerId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    shareToken: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    issuedAt: Date | null
  }

  export type CertificateMaxAggregateOutputType = {
    id: string | null
    workerId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    shareToken: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    issuedAt: Date | null
  }

  export type CertificateCountAggregateOutputType = {
    id: number
    workerId: number
    periodStart: number
    periodEnd: number
    shareToken: number
    expiresAt: number
    revokedAt: number
    issuedAt: number
    _all: number
  }


  export type CertificateMinAggregateInputType = {
    id?: true
    workerId?: true
    periodStart?: true
    periodEnd?: true
    shareToken?: true
    expiresAt?: true
    revokedAt?: true
    issuedAt?: true
  }

  export type CertificateMaxAggregateInputType = {
    id?: true
    workerId?: true
    periodStart?: true
    periodEnd?: true
    shareToken?: true
    expiresAt?: true
    revokedAt?: true
    issuedAt?: true
  }

  export type CertificateCountAggregateInputType = {
    id?: true
    workerId?: true
    periodStart?: true
    periodEnd?: true
    shareToken?: true
    expiresAt?: true
    revokedAt?: true
    issuedAt?: true
    _all?: true
  }

  export type CertificateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificate to aggregate.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certificates
    **/
    _count?: true | CertificateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateMaxAggregateInputType
  }

  export type GetCertificateAggregateType<T extends CertificateAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificate[P]>
      : GetScalarType<T[P], AggregateCertificate[P]>
  }




  export type CertificateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateWhereInput
    orderBy?: CertificateOrderByWithAggregationInput | CertificateOrderByWithAggregationInput[]
    by: CertificateScalarFieldEnum[] | CertificateScalarFieldEnum
    having?: CertificateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateCountAggregateInputType | true
    _min?: CertificateMinAggregateInputType
    _max?: CertificateMaxAggregateInputType
  }

  export type CertificateGroupByOutputType = {
    id: string
    workerId: string
    periodStart: Date
    periodEnd: Date
    shareToken: string
    expiresAt: Date
    revokedAt: Date | null
    issuedAt: Date
    _count: CertificateCountAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  type GetCertificateGroupByPayload<T extends CertificateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateGroupByOutputType[P]>
        }
      >
    >


  export type CertificateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    shareToken?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    issuedAt?: boolean
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    shareToken?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    issuedAt?: boolean
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectScalar = {
    id?: boolean
    workerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    shareToken?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    issuedAt?: boolean
  }


  export type $CertificatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certificate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workerId: string
      periodStart: Date
      periodEnd: Date
      shareToken: string
      expiresAt: Date
      revokedAt: Date | null
      issuedAt: Date
    }, ExtArgs["result"]["certificate"]>
    composites: {}
  }

  type CertificateGetPayload<S extends boolean | null | undefined | CertificateDefaultArgs> = $Result.GetResult<Prisma.$CertificatePayload, S>

  type CertificateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CertificateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CertificateCountAggregateInputType | true
    }

  export interface CertificateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certificate'], meta: { name: 'Certificate' } }
    /**
     * Find zero or one Certificate that matches the filter.
     * @param {CertificateFindUniqueArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateFindUniqueArgs>(args: SelectSubset<T, CertificateFindUniqueArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Certificate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CertificateFindUniqueOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Certificate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateFindFirstArgs>(args?: SelectSubset<T, CertificateFindFirstArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Certificate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Certificates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certificates
     * const certificates = await prisma.certificate.findMany()
     * 
     * // Get first 10 Certificates
     * const certificates = await prisma.certificate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateWithIdOnly = await prisma.certificate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateFindManyArgs>(args?: SelectSubset<T, CertificateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Certificate.
     * @param {CertificateCreateArgs} args - Arguments to create a Certificate.
     * @example
     * // Create one Certificate
     * const Certificate = await prisma.certificate.create({
     *   data: {
     *     // ... data to create a Certificate
     *   }
     * })
     * 
     */
    create<T extends CertificateCreateArgs>(args: SelectSubset<T, CertificateCreateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Certificates.
     * @param {CertificateCreateManyArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateCreateManyArgs>(args?: SelectSubset<T, CertificateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Certificates and returns the data saved in the database.
     * @param {CertificateCreateManyAndReturnArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Certificates and only return the `id`
     * const certificateWithIdOnly = await prisma.certificate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Certificate.
     * @param {CertificateDeleteArgs} args - Arguments to delete one Certificate.
     * @example
     * // Delete one Certificate
     * const Certificate = await prisma.certificate.delete({
     *   where: {
     *     // ... filter to delete one Certificate
     *   }
     * })
     * 
     */
    delete<T extends CertificateDeleteArgs>(args: SelectSubset<T, CertificateDeleteArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Certificate.
     * @param {CertificateUpdateArgs} args - Arguments to update one Certificate.
     * @example
     * // Update one Certificate
     * const certificate = await prisma.certificate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateUpdateArgs>(args: SelectSubset<T, CertificateUpdateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Certificates.
     * @param {CertificateDeleteManyArgs} args - Arguments to filter Certificates to delete.
     * @example
     * // Delete a few Certificates
     * const { count } = await prisma.certificate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateDeleteManyArgs>(args?: SelectSubset<T, CertificateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certificates
     * const certificate = await prisma.certificate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateUpdateManyArgs>(args: SelectSubset<T, CertificateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Certificate.
     * @param {CertificateUpsertArgs} args - Arguments to update or create a Certificate.
     * @example
     * // Update or create a Certificate
     * const certificate = await prisma.certificate.upsert({
     *   create: {
     *     // ... data to create a Certificate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certificate we want to update
     *   }
     * })
     */
    upsert<T extends CertificateUpsertArgs>(args: SelectSubset<T, CertificateUpsertArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateCountArgs} args - Arguments to filter Certificates to count.
     * @example
     * // Count the number of Certificates
     * const count = await prisma.certificate.count({
     *   where: {
     *     // ... the filter for the Certificates we want to count
     *   }
     * })
    **/
    count<T extends CertificateCountArgs>(
      args?: Subset<T, CertificateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CertificateAggregateArgs>(args: Subset<T, CertificateAggregateArgs>): Prisma.PrismaPromise<GetCertificateAggregateType<T>>

    /**
     * Group by Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateGroupByArgs} args - Group by arguments.
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
      T extends CertificateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateGroupByArgs['orderBy'] }
        : { orderBy?: CertificateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CertificateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certificate model
   */
  readonly fields: CertificateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certificate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Certificate model
   */ 
  interface CertificateFieldRefs {
    readonly id: FieldRef<"Certificate", 'String'>
    readonly workerId: FieldRef<"Certificate", 'String'>
    readonly periodStart: FieldRef<"Certificate", 'DateTime'>
    readonly periodEnd: FieldRef<"Certificate", 'DateTime'>
    readonly shareToken: FieldRef<"Certificate", 'String'>
    readonly expiresAt: FieldRef<"Certificate", 'DateTime'>
    readonly revokedAt: FieldRef<"Certificate", 'DateTime'>
    readonly issuedAt: FieldRef<"Certificate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Certificate findUnique
   */
  export type CertificateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findUniqueOrThrow
   */
  export type CertificateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findFirst
   */
  export type CertificateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findFirstOrThrow
   */
  export type CertificateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findMany
   */
  export type CertificateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter, which Certificates to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate create
   */
  export type CertificateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * The data needed to create a Certificate.
     */
    data: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
  }

  /**
   * Certificate createMany
   */
  export type CertificateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificate createManyAndReturn
   */
  export type CertificateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificate update
   */
  export type CertificateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * The data needed to update a Certificate.
     */
    data: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
    /**
     * Choose, which Certificate to update.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate updateMany
   */
  export type CertificateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certificates.
     */
    data: XOR<CertificateUpdateManyMutationInput, CertificateUncheckedUpdateManyInput>
    /**
     * Filter which Certificates to update
     */
    where?: CertificateWhereInput
  }

  /**
   * Certificate upsert
   */
  export type CertificateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * The filter to search for the Certificate to update in case it exists.
     */
    where: CertificateWhereUniqueInput
    /**
     * In case the Certificate found by the `where` argument doesn't exist, create a new Certificate with this data.
     */
    create: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
    /**
     * In case the Certificate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
  }

  /**
   * Certificate delete
   */
  export type CertificateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Filter which Certificate to delete.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate deleteMany
   */
  export type CertificateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificates to delete
     */
    where?: CertificateWhereInput
  }

  /**
   * Certificate without action
   */
  export type CertificateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
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


  export const PlatformScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    logoUrl: 'logoUrl',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type PlatformScalarFieldEnum = (typeof PlatformScalarFieldEnum)[keyof typeof PlatformScalarFieldEnum]


  export const CityZoneScalarFieldEnum: {
    id: 'id',
    city: 'city',
    zone: 'zone',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type CityZoneScalarFieldEnum = (typeof CityZoneScalarFieldEnum)[keyof typeof CityZoneScalarFieldEnum]


  export const ShiftScalarFieldEnum: {
    id: 'id',
    workerId: 'workerId',
    platformId: 'platformId',
    cityZoneId: 'cityZoneId',
    shiftDate: 'shiftDate',
    hoursWorked: 'hoursWorked',
    grossPay: 'grossPay',
    deductions: 'deductions',
    netPay: 'netPay',
    currency: 'currency',
    source: 'source',
    verificationStatus: 'verificationStatus',
    notes: 'notes',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShiftScalarFieldEnum = (typeof ShiftScalarFieldEnum)[keyof typeof ShiftScalarFieldEnum]


  export const ScreenshotScalarFieldEnum: {
    id: 'id',
    shiftId: 'shiftId',
    storageKey: 'storageKey',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    uploadedAt: 'uploadedAt',
    deletedAt: 'deletedAt'
  };

  export type ScreenshotScalarFieldEnum = (typeof ScreenshotScalarFieldEnum)[keyof typeof ScreenshotScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    shiftId: 'shiftId',
    verifierId: 'verifierId',
    screenshotId: 'screenshotId',
    status: 'status',
    notes: 'notes',
    decidedAt: 'decidedAt',
    createdAt: 'createdAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const AnomalyFlagScalarFieldEnum: {
    id: 'id',
    shiftId: 'shiftId',
    flaggedBy: 'flaggedBy',
    reason: 'reason',
    score: 'score',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
  };

  export type AnomalyFlagScalarFieldEnum = (typeof AnomalyFlagScalarFieldEnum)[keyof typeof AnomalyFlagScalarFieldEnum]


  export const CsvImportScalarFieldEnum: {
    id: 'id',
    workerId: 'workerId',
    storageKey: 'storageKey',
    status: 'status',
    rowsTotal: 'rowsTotal',
    rowsOk: 'rowsOk',
    rowsFailed: 'rowsFailed',
    errorLog: 'errorLog',
    errorCsvKey: 'errorCsvKey',
    jobId: 'jobId',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    createdAt: 'createdAt'
  };

  export type CsvImportScalarFieldEnum = (typeof CsvImportScalarFieldEnum)[keyof typeof CsvImportScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    body: 'body',
    link: 'link',
    readAt: 'readAt',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const CertificateScalarFieldEnum: {
    id: 'id',
    workerId: 'workerId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    shareToken: 'shareToken',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    issuedAt: 'issuedAt'
  };

  export type CertificateScalarFieldEnum = (typeof CertificateScalarFieldEnum)[keyof typeof CertificateScalarFieldEnum]


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


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ShiftSource'
   */
  export type EnumShiftSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftSource'>
    


  /**
   * Reference to a field of type 'ShiftSource[]'
   */
  export type ListEnumShiftSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftSource[]'>
    


  /**
   * Reference to a field of type 'ShiftVerificationStatus'
   */
  export type EnumShiftVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftVerificationStatus'>
    


  /**
   * Reference to a field of type 'ShiftVerificationStatus[]'
   */
  export type ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftVerificationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'ImportStatus'
   */
  export type EnumImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportStatus'>
    


  /**
   * Reference to a field of type 'ImportStatus[]'
   */
  export type ListEnumImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlatformWhereInput = {
    AND?: PlatformWhereInput | PlatformWhereInput[]
    OR?: PlatformWhereInput[]
    NOT?: PlatformWhereInput | PlatformWhereInput[]
    id?: StringFilter<"Platform"> | string
    name?: StringFilter<"Platform"> | string
    slug?: StringFilter<"Platform"> | string
    logoUrl?: StringNullableFilter<"Platform"> | string | null
    active?: BoolFilter<"Platform"> | boolean
    createdAt?: DateTimeFilter<"Platform"> | Date | string
    shifts?: ShiftListRelationFilter
  }

  export type PlatformOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    shifts?: ShiftOrderByRelationAggregateInput
  }

  export type PlatformWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: PlatformWhereInput | PlatformWhereInput[]
    OR?: PlatformWhereInput[]
    NOT?: PlatformWhereInput | PlatformWhereInput[]
    logoUrl?: StringNullableFilter<"Platform"> | string | null
    active?: BoolFilter<"Platform"> | boolean
    createdAt?: DateTimeFilter<"Platform"> | Date | string
    shifts?: ShiftListRelationFilter
  }, "id" | "name" | "slug">

  export type PlatformOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: PlatformCountOrderByAggregateInput
    _max?: PlatformMaxOrderByAggregateInput
    _min?: PlatformMinOrderByAggregateInput
  }

  export type PlatformScalarWhereWithAggregatesInput = {
    AND?: PlatformScalarWhereWithAggregatesInput | PlatformScalarWhereWithAggregatesInput[]
    OR?: PlatformScalarWhereWithAggregatesInput[]
    NOT?: PlatformScalarWhereWithAggregatesInput | PlatformScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Platform"> | string
    name?: StringWithAggregatesFilter<"Platform"> | string
    slug?: StringWithAggregatesFilter<"Platform"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Platform"> | string | null
    active?: BoolWithAggregatesFilter<"Platform"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Platform"> | Date | string
  }

  export type CityZoneWhereInput = {
    AND?: CityZoneWhereInput | CityZoneWhereInput[]
    OR?: CityZoneWhereInput[]
    NOT?: CityZoneWhereInput | CityZoneWhereInput[]
    id?: StringFilter<"CityZone"> | string
    city?: StringFilter<"CityZone"> | string
    zone?: StringFilter<"CityZone"> | string
    active?: BoolFilter<"CityZone"> | boolean
    createdAt?: DateTimeFilter<"CityZone"> | Date | string
    shifts?: ShiftListRelationFilter
  }

  export type CityZoneOrderByWithRelationInput = {
    id?: SortOrder
    city?: SortOrder
    zone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    shifts?: ShiftOrderByRelationAggregateInput
  }

  export type CityZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    city_zone?: CityZoneCityZoneCompoundUniqueInput
    AND?: CityZoneWhereInput | CityZoneWhereInput[]
    OR?: CityZoneWhereInput[]
    NOT?: CityZoneWhereInput | CityZoneWhereInput[]
    city?: StringFilter<"CityZone"> | string
    zone?: StringFilter<"CityZone"> | string
    active?: BoolFilter<"CityZone"> | boolean
    createdAt?: DateTimeFilter<"CityZone"> | Date | string
    shifts?: ShiftListRelationFilter
  }, "id" | "city_zone">

  export type CityZoneOrderByWithAggregationInput = {
    id?: SortOrder
    city?: SortOrder
    zone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: CityZoneCountOrderByAggregateInput
    _max?: CityZoneMaxOrderByAggregateInput
    _min?: CityZoneMinOrderByAggregateInput
  }

  export type CityZoneScalarWhereWithAggregatesInput = {
    AND?: CityZoneScalarWhereWithAggregatesInput | CityZoneScalarWhereWithAggregatesInput[]
    OR?: CityZoneScalarWhereWithAggregatesInput[]
    NOT?: CityZoneScalarWhereWithAggregatesInput | CityZoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CityZone"> | string
    city?: StringWithAggregatesFilter<"CityZone"> | string
    zone?: StringWithAggregatesFilter<"CityZone"> | string
    active?: BoolWithAggregatesFilter<"CityZone"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CityZone"> | Date | string
  }

  export type ShiftWhereInput = {
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    id?: StringFilter<"Shift"> | string
    workerId?: StringFilter<"Shift"> | string
    platformId?: StringFilter<"Shift"> | string
    cityZoneId?: StringNullableFilter<"Shift"> | string | null
    shiftDate?: DateTimeFilter<"Shift"> | Date | string
    hoursWorked?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Shift"> | string
    source?: EnumShiftSourceFilter<"Shift"> | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFilter<"Shift"> | $Enums.ShiftVerificationStatus
    notes?: StringNullableFilter<"Shift"> | string | null
    deletedAt?: DateTimeNullableFilter<"Shift"> | Date | string | null
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
    platform?: XOR<PlatformRelationFilter, PlatformWhereInput>
    cityZone?: XOR<CityZoneNullableRelationFilter, CityZoneWhereInput> | null
    screenshots?: ScreenshotListRelationFilter
    verifications?: VerificationListRelationFilter
    anomalyFlags?: AnomalyFlagListRelationFilter
  }

  export type ShiftOrderByWithRelationInput = {
    id?: SortOrder
    workerId?: SortOrder
    platformId?: SortOrder
    cityZoneId?: SortOrderInput | SortOrder
    shiftDate?: SortOrder
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
    currency?: SortOrder
    source?: SortOrder
    verificationStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    platform?: PlatformOrderByWithRelationInput
    cityZone?: CityZoneOrderByWithRelationInput
    screenshots?: ScreenshotOrderByRelationAggregateInput
    verifications?: VerificationOrderByRelationAggregateInput
    anomalyFlags?: AnomalyFlagOrderByRelationAggregateInput
  }

  export type ShiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    workerId?: StringFilter<"Shift"> | string
    platformId?: StringFilter<"Shift"> | string
    cityZoneId?: StringNullableFilter<"Shift"> | string | null
    shiftDate?: DateTimeFilter<"Shift"> | Date | string
    hoursWorked?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Shift"> | string
    source?: EnumShiftSourceFilter<"Shift"> | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFilter<"Shift"> | $Enums.ShiftVerificationStatus
    notes?: StringNullableFilter<"Shift"> | string | null
    deletedAt?: DateTimeNullableFilter<"Shift"> | Date | string | null
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
    platform?: XOR<PlatformRelationFilter, PlatformWhereInput>
    cityZone?: XOR<CityZoneNullableRelationFilter, CityZoneWhereInput> | null
    screenshots?: ScreenshotListRelationFilter
    verifications?: VerificationListRelationFilter
    anomalyFlags?: AnomalyFlagListRelationFilter
  }, "id">

  export type ShiftOrderByWithAggregationInput = {
    id?: SortOrder
    workerId?: SortOrder
    platformId?: SortOrder
    cityZoneId?: SortOrderInput | SortOrder
    shiftDate?: SortOrder
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
    currency?: SortOrder
    source?: SortOrder
    verificationStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShiftCountOrderByAggregateInput
    _avg?: ShiftAvgOrderByAggregateInput
    _max?: ShiftMaxOrderByAggregateInput
    _min?: ShiftMinOrderByAggregateInput
    _sum?: ShiftSumOrderByAggregateInput
  }

  export type ShiftScalarWhereWithAggregatesInput = {
    AND?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    OR?: ShiftScalarWhereWithAggregatesInput[]
    NOT?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shift"> | string
    workerId?: StringWithAggregatesFilter<"Shift"> | string
    platformId?: StringWithAggregatesFilter<"Shift"> | string
    cityZoneId?: StringNullableWithAggregatesFilter<"Shift"> | string | null
    shiftDate?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    hoursWorked?: DecimalWithAggregatesFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalWithAggregatesFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    deductions?: DecimalWithAggregatesFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalWithAggregatesFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Shift"> | string
    source?: EnumShiftSourceWithAggregatesFilter<"Shift"> | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusWithAggregatesFilter<"Shift"> | $Enums.ShiftVerificationStatus
    notes?: StringNullableWithAggregatesFilter<"Shift"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Shift"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
  }

  export type ScreenshotWhereInput = {
    AND?: ScreenshotWhereInput | ScreenshotWhereInput[]
    OR?: ScreenshotWhereInput[]
    NOT?: ScreenshotWhereInput | ScreenshotWhereInput[]
    id?: StringFilter<"Screenshot"> | string
    shiftId?: StringFilter<"Screenshot"> | string
    storageKey?: StringFilter<"Screenshot"> | string
    mimeType?: StringFilter<"Screenshot"> | string
    sizeBytes?: IntFilter<"Screenshot"> | number
    uploadedAt?: DateTimeFilter<"Screenshot"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screenshot"> | Date | string | null
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }

  export type ScreenshotOrderByWithRelationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    storageKey?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    shift?: ShiftOrderByWithRelationInput
  }

  export type ScreenshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storageKey?: string
    AND?: ScreenshotWhereInput | ScreenshotWhereInput[]
    OR?: ScreenshotWhereInput[]
    NOT?: ScreenshotWhereInput | ScreenshotWhereInput[]
    shiftId?: StringFilter<"Screenshot"> | string
    mimeType?: StringFilter<"Screenshot"> | string
    sizeBytes?: IntFilter<"Screenshot"> | number
    uploadedAt?: DateTimeFilter<"Screenshot"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screenshot"> | Date | string | null
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }, "id" | "storageKey">

  export type ScreenshotOrderByWithAggregationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    storageKey?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ScreenshotCountOrderByAggregateInput
    _avg?: ScreenshotAvgOrderByAggregateInput
    _max?: ScreenshotMaxOrderByAggregateInput
    _min?: ScreenshotMinOrderByAggregateInput
    _sum?: ScreenshotSumOrderByAggregateInput
  }

  export type ScreenshotScalarWhereWithAggregatesInput = {
    AND?: ScreenshotScalarWhereWithAggregatesInput | ScreenshotScalarWhereWithAggregatesInput[]
    OR?: ScreenshotScalarWhereWithAggregatesInput[]
    NOT?: ScreenshotScalarWhereWithAggregatesInput | ScreenshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Screenshot"> | string
    shiftId?: StringWithAggregatesFilter<"Screenshot"> | string
    storageKey?: StringWithAggregatesFilter<"Screenshot"> | string
    mimeType?: StringWithAggregatesFilter<"Screenshot"> | string
    sizeBytes?: IntWithAggregatesFilter<"Screenshot"> | number
    uploadedAt?: DateTimeWithAggregatesFilter<"Screenshot"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Screenshot"> | Date | string | null
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    shiftId?: StringFilter<"Verification"> | string
    verifierId?: StringFilter<"Verification"> | string
    screenshotId?: StringNullableFilter<"Verification"> | string | null
    status?: EnumVerificationStatusFilter<"Verification"> | $Enums.VerificationStatus
    notes?: StringNullableFilter<"Verification"> | string | null
    decidedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    verifierId?: SortOrder
    screenshotId?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    decidedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shift?: ShiftOrderByWithRelationInput
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    shiftId?: StringFilter<"Verification"> | string
    verifierId?: StringFilter<"Verification"> | string
    screenshotId?: StringNullableFilter<"Verification"> | string | null
    status?: EnumVerificationStatusFilter<"Verification"> | $Enums.VerificationStatus
    notes?: StringNullableFilter<"Verification"> | string | null
    decidedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    verifierId?: SortOrder
    screenshotId?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    decidedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    shiftId?: StringWithAggregatesFilter<"Verification"> | string
    verifierId?: StringWithAggregatesFilter<"Verification"> | string
    screenshotId?: StringNullableWithAggregatesFilter<"Verification"> | string | null
    status?: EnumVerificationStatusWithAggregatesFilter<"Verification"> | $Enums.VerificationStatus
    notes?: StringNullableWithAggregatesFilter<"Verification"> | string | null
    decidedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type AnomalyFlagWhereInput = {
    AND?: AnomalyFlagWhereInput | AnomalyFlagWhereInput[]
    OR?: AnomalyFlagWhereInput[]
    NOT?: AnomalyFlagWhereInput | AnomalyFlagWhereInput[]
    id?: StringFilter<"AnomalyFlag"> | string
    shiftId?: StringFilter<"AnomalyFlag"> | string
    flaggedBy?: StringFilter<"AnomalyFlag"> | string
    reason?: StringFilter<"AnomalyFlag"> | string
    score?: DecimalNullableFilter<"AnomalyFlag"> | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: DateTimeNullableFilter<"AnomalyFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"AnomalyFlag"> | Date | string
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }

  export type AnomalyFlagOrderByWithRelationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    flaggedBy?: SortOrder
    reason?: SortOrder
    score?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shift?: ShiftOrderByWithRelationInput
  }

  export type AnomalyFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnomalyFlagWhereInput | AnomalyFlagWhereInput[]
    OR?: AnomalyFlagWhereInput[]
    NOT?: AnomalyFlagWhereInput | AnomalyFlagWhereInput[]
    shiftId?: StringFilter<"AnomalyFlag"> | string
    flaggedBy?: StringFilter<"AnomalyFlag"> | string
    reason?: StringFilter<"AnomalyFlag"> | string
    score?: DecimalNullableFilter<"AnomalyFlag"> | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: DateTimeNullableFilter<"AnomalyFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"AnomalyFlag"> | Date | string
    shift?: XOR<ShiftRelationFilter, ShiftWhereInput>
  }, "id">

  export type AnomalyFlagOrderByWithAggregationInput = {
    id?: SortOrder
    shiftId?: SortOrder
    flaggedBy?: SortOrder
    reason?: SortOrder
    score?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AnomalyFlagCountOrderByAggregateInput
    _avg?: AnomalyFlagAvgOrderByAggregateInput
    _max?: AnomalyFlagMaxOrderByAggregateInput
    _min?: AnomalyFlagMinOrderByAggregateInput
    _sum?: AnomalyFlagSumOrderByAggregateInput
  }

  export type AnomalyFlagScalarWhereWithAggregatesInput = {
    AND?: AnomalyFlagScalarWhereWithAggregatesInput | AnomalyFlagScalarWhereWithAggregatesInput[]
    OR?: AnomalyFlagScalarWhereWithAggregatesInput[]
    NOT?: AnomalyFlagScalarWhereWithAggregatesInput | AnomalyFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnomalyFlag"> | string
    shiftId?: StringWithAggregatesFilter<"AnomalyFlag"> | string
    flaggedBy?: StringWithAggregatesFilter<"AnomalyFlag"> | string
    reason?: StringWithAggregatesFilter<"AnomalyFlag"> | string
    score?: DecimalNullableWithAggregatesFilter<"AnomalyFlag"> | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AnomalyFlag"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AnomalyFlag"> | Date | string
  }

  export type CsvImportWhereInput = {
    AND?: CsvImportWhereInput | CsvImportWhereInput[]
    OR?: CsvImportWhereInput[]
    NOT?: CsvImportWhereInput | CsvImportWhereInput[]
    id?: StringFilter<"CsvImport"> | string
    workerId?: StringFilter<"CsvImport"> | string
    storageKey?: StringFilter<"CsvImport"> | string
    status?: EnumImportStatusFilter<"CsvImport"> | $Enums.ImportStatus
    rowsTotal?: IntFilter<"CsvImport"> | number
    rowsOk?: IntFilter<"CsvImport"> | number
    rowsFailed?: IntFilter<"CsvImport"> | number
    errorLog?: JsonNullableFilter<"CsvImport">
    errorCsvKey?: StringNullableFilter<"CsvImport"> | string | null
    jobId?: StringNullableFilter<"CsvImport"> | string | null
    startedAt?: DateTimeNullableFilter<"CsvImport"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"CsvImport"> | Date | string | null
    createdAt?: DateTimeFilter<"CsvImport"> | Date | string
  }

  export type CsvImportOrderByWithRelationInput = {
    id?: SortOrder
    workerId?: SortOrder
    storageKey?: SortOrder
    status?: SortOrder
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
    errorLog?: SortOrderInput | SortOrder
    errorCsvKey?: SortOrderInput | SortOrder
    jobId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type CsvImportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CsvImportWhereInput | CsvImportWhereInput[]
    OR?: CsvImportWhereInput[]
    NOT?: CsvImportWhereInput | CsvImportWhereInput[]
    workerId?: StringFilter<"CsvImport"> | string
    storageKey?: StringFilter<"CsvImport"> | string
    status?: EnumImportStatusFilter<"CsvImport"> | $Enums.ImportStatus
    rowsTotal?: IntFilter<"CsvImport"> | number
    rowsOk?: IntFilter<"CsvImport"> | number
    rowsFailed?: IntFilter<"CsvImport"> | number
    errorLog?: JsonNullableFilter<"CsvImport">
    errorCsvKey?: StringNullableFilter<"CsvImport"> | string | null
    jobId?: StringNullableFilter<"CsvImport"> | string | null
    startedAt?: DateTimeNullableFilter<"CsvImport"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"CsvImport"> | Date | string | null
    createdAt?: DateTimeFilter<"CsvImport"> | Date | string
  }, "id">

  export type CsvImportOrderByWithAggregationInput = {
    id?: SortOrder
    workerId?: SortOrder
    storageKey?: SortOrder
    status?: SortOrder
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
    errorLog?: SortOrderInput | SortOrder
    errorCsvKey?: SortOrderInput | SortOrder
    jobId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CsvImportCountOrderByAggregateInput
    _avg?: CsvImportAvgOrderByAggregateInput
    _max?: CsvImportMaxOrderByAggregateInput
    _min?: CsvImportMinOrderByAggregateInput
    _sum?: CsvImportSumOrderByAggregateInput
  }

  export type CsvImportScalarWhereWithAggregatesInput = {
    AND?: CsvImportScalarWhereWithAggregatesInput | CsvImportScalarWhereWithAggregatesInput[]
    OR?: CsvImportScalarWhereWithAggregatesInput[]
    NOT?: CsvImportScalarWhereWithAggregatesInput | CsvImportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CsvImport"> | string
    workerId?: StringWithAggregatesFilter<"CsvImport"> | string
    storageKey?: StringWithAggregatesFilter<"CsvImport"> | string
    status?: EnumImportStatusWithAggregatesFilter<"CsvImport"> | $Enums.ImportStatus
    rowsTotal?: IntWithAggregatesFilter<"CsvImport"> | number
    rowsOk?: IntWithAggregatesFilter<"CsvImport"> | number
    rowsFailed?: IntWithAggregatesFilter<"CsvImport"> | number
    errorLog?: JsonNullableWithAggregatesFilter<"CsvImport">
    errorCsvKey?: StringNullableWithAggregatesFilter<"CsvImport"> | string | null
    jobId?: StringNullableWithAggregatesFilter<"CsvImport"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"CsvImport"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"CsvImport"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CsvImport"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringWithAggregatesFilter<"Notification"> | string
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    readAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type CertificateWhereInput = {
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    id?: StringFilter<"Certificate"> | string
    workerId?: StringFilter<"Certificate"> | string
    periodStart?: DateTimeFilter<"Certificate"> | Date | string
    periodEnd?: DateTimeFilter<"Certificate"> | Date | string
    shareToken?: StringFilter<"Certificate"> | string
    expiresAt?: DateTimeFilter<"Certificate"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Certificate"> | Date | string | null
    issuedAt?: DateTimeFilter<"Certificate"> | Date | string
  }

  export type CertificateOrderByWithRelationInput = {
    id?: SortOrder
    workerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    shareToken?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    issuedAt?: SortOrder
  }

  export type CertificateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    workerId?: StringFilter<"Certificate"> | string
    periodStart?: DateTimeFilter<"Certificate"> | Date | string
    periodEnd?: DateTimeFilter<"Certificate"> | Date | string
    expiresAt?: DateTimeFilter<"Certificate"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Certificate"> | Date | string | null
    issuedAt?: DateTimeFilter<"Certificate"> | Date | string
  }, "id" | "shareToken">

  export type CertificateOrderByWithAggregationInput = {
    id?: SortOrder
    workerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    shareToken?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    issuedAt?: SortOrder
    _count?: CertificateCountOrderByAggregateInput
    _max?: CertificateMaxOrderByAggregateInput
    _min?: CertificateMinOrderByAggregateInput
  }

  export type CertificateScalarWhereWithAggregatesInput = {
    AND?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    OR?: CertificateScalarWhereWithAggregatesInput[]
    NOT?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certificate"> | string
    workerId?: StringWithAggregatesFilter<"Certificate"> | string
    periodStart?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    shareToken?: StringWithAggregatesFilter<"Certificate"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Certificate"> | Date | string | null
    issuedAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
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

  export type PlatformCreateInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutPlatformInput
  }

  export type PlatformUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutPlatformInput
  }

  export type PlatformUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutPlatformNestedInput
  }

  export type PlatformUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutPlatformNestedInput
  }

  export type PlatformCreateManyInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
  }

  export type PlatformUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityZoneCreateInput = {
    id?: string
    city: string
    zone: string
    active?: boolean
    createdAt?: Date | string
    shifts?: ShiftCreateNestedManyWithoutCityZoneInput
  }

  export type CityZoneUncheckedCreateInput = {
    id?: string
    city: string
    zone: string
    active?: boolean
    createdAt?: Date | string
    shifts?: ShiftUncheckedCreateNestedManyWithoutCityZoneInput
  }

  export type CityZoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUpdateManyWithoutCityZoneNestedInput
  }

  export type CityZoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shifts?: ShiftUncheckedUpdateManyWithoutCityZoneNestedInput
  }

  export type CityZoneCreateManyInput = {
    id?: string
    city: string
    zone: string
    active?: boolean
    createdAt?: Date | string
  }

  export type CityZoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityZoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftCreateInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    platform: PlatformCreateNestedOneWithoutShiftsInput
    cityZone?: CityZoneCreateNestedOneWithoutShiftsInput
    screenshots?: ScreenshotCreateNestedManyWithoutShiftInput
    verifications?: VerificationCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateInput = {
    id?: string
    workerId: string
    platformId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutShiftInput
    verifications?: VerificationUncheckedCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platform?: PlatformUpdateOneRequiredWithoutShiftsNestedInput
    cityZone?: CityZoneUpdateOneWithoutShiftsNestedInput
    screenshots?: ScreenshotUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUncheckedUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateManyInput = {
    id?: string
    workerId: string
    platformId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreenshotCreateInput = {
    id?: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
    shift: ShiftCreateNestedOneWithoutScreenshotsInput
  }

  export type ScreenshotUncheckedCreateInput = {
    id?: string
    shiftId: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreenshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shift?: ShiftUpdateOneRequiredWithoutScreenshotsNestedInput
  }

  export type ScreenshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreenshotCreateManyInput = {
    id?: string
    shiftId: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreenshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreenshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateInput = {
    id?: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
    shift: ShiftCreateNestedOneWithoutVerificationsInput
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    shiftId: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: ShiftUpdateOneRequiredWithoutVerificationsNestedInput
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    shiftId: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagCreateInput = {
    id?: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    shift: ShiftCreateNestedOneWithoutAnomalyFlagsInput
  }

  export type AnomalyFlagUncheckedCreateInput = {
    id?: string
    shiftId: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AnomalyFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: ShiftUpdateOneRequiredWithoutAnomalyFlagsNestedInput
  }

  export type AnomalyFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagCreateManyInput = {
    id?: string
    shiftId: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AnomalyFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shiftId?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CsvImportCreateInput = {
    id?: string
    workerId: string
    storageKey: string
    status?: $Enums.ImportStatus
    rowsTotal?: number
    rowsOk?: number
    rowsFailed?: number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: string | null
    jobId?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CsvImportUncheckedCreateInput = {
    id?: string
    workerId: string
    storageKey: string
    status?: $Enums.ImportStatus
    rowsTotal?: number
    rowsOk?: number
    rowsFailed?: number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: string | null
    jobId?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CsvImportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    rowsTotal?: IntFieldUpdateOperationsInput | number
    rowsOk?: IntFieldUpdateOperationsInput | number
    rowsFailed?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CsvImportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    rowsTotal?: IntFieldUpdateOperationsInput | number
    rowsOk?: IntFieldUpdateOperationsInput | number
    rowsFailed?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CsvImportCreateManyInput = {
    id?: string
    workerId: string
    storageKey: string
    status?: $Enums.ImportStatus
    rowsTotal?: number
    rowsOk?: number
    rowsFailed?: number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: string | null
    jobId?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CsvImportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    rowsTotal?: IntFieldUpdateOperationsInput | number
    rowsOk?: IntFieldUpdateOperationsInput | number
    rowsFailed?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CsvImportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    status?: EnumImportStatusFieldUpdateOperationsInput | $Enums.ImportStatus
    rowsTotal?: IntFieldUpdateOperationsInput | number
    rowsOk?: IntFieldUpdateOperationsInput | number
    rowsFailed?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableJsonNullValueInput | InputJsonValue
    errorCsvKey?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    title: string
    body: string
    link?: string | null
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    body: string
    link?: string | null
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    body: string
    link?: string | null
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateCreateInput = {
    id?: string
    workerId: string
    periodStart: Date | string
    periodEnd: Date | string
    shareToken?: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    issuedAt?: Date | string
  }

  export type CertificateUncheckedCreateInput = {
    id?: string
    workerId: string
    periodStart: Date | string
    periodEnd: Date | string
    shareToken?: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    issuedAt?: Date | string
  }

  export type CertificateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateCreateManyInput = {
    id?: string
    workerId: string
    periodStart: Date | string
    periodEnd: Date | string
    shareToken?: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    issuedAt?: Date | string
  }

  export type CertificateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type ShiftListRelationFilter = {
    every?: ShiftWhereInput
    some?: ShiftWhereInput
    none?: ShiftWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShiftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlatformCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type CityZoneCityZoneCompoundUniqueInput = {
    city: string
    zone: string
  }

  export type CityZoneCountOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    zone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type CityZoneMaxOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    zone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type CityZoneMinOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    zone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumShiftSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftSource | EnumShiftSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftSourceFilter<$PrismaModel> | $Enums.ShiftSource
  }

  export type EnumShiftVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftVerificationStatus | EnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftVerificationStatusFilter<$PrismaModel> | $Enums.ShiftVerificationStatus
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

  export type PlatformRelationFilter = {
    is?: PlatformWhereInput
    isNot?: PlatformWhereInput
  }

  export type CityZoneNullableRelationFilter = {
    is?: CityZoneWhereInput | null
    isNot?: CityZoneWhereInput | null
  }

  export type ScreenshotListRelationFilter = {
    every?: ScreenshotWhereInput
    some?: ScreenshotWhereInput
    none?: ScreenshotWhereInput
  }

  export type VerificationListRelationFilter = {
    every?: VerificationWhereInput
    some?: VerificationWhereInput
    none?: VerificationWhereInput
  }

  export type AnomalyFlagListRelationFilter = {
    every?: AnomalyFlagWhereInput
    some?: AnomalyFlagWhereInput
    none?: AnomalyFlagWhereInput
  }

  export type ScreenshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnomalyFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShiftCountOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    platformId?: SortOrder
    cityZoneId?: SortOrder
    shiftDate?: SortOrder
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
    currency?: SortOrder
    source?: SortOrder
    verificationStatus?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftAvgOrderByAggregateInput = {
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
  }

  export type ShiftMaxOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    platformId?: SortOrder
    cityZoneId?: SortOrder
    shiftDate?: SortOrder
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
    currency?: SortOrder
    source?: SortOrder
    verificationStatus?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftMinOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    platformId?: SortOrder
    cityZoneId?: SortOrder
    shiftDate?: SortOrder
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
    currency?: SortOrder
    source?: SortOrder
    verificationStatus?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShiftSumOrderByAggregateInput = {
    hoursWorked?: SortOrder
    grossPay?: SortOrder
    deductions?: SortOrder
    netPay?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumShiftSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftSource | EnumShiftSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftSourceWithAggregatesFilter<$PrismaModel> | $Enums.ShiftSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftSourceFilter<$PrismaModel>
    _max?: NestedEnumShiftSourceFilter<$PrismaModel>
  }

  export type EnumShiftVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftVerificationStatus | EnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftVerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftVerificationStatusFilter<$PrismaModel>
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ShiftRelationFilter = {
    is?: ShiftWhereInput
    isNot?: ShiftWhereInput
  }

  export type ScreenshotCountOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    storageKey?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ScreenshotAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type ScreenshotMaxOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    storageKey?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ScreenshotMinOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    storageKey?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ScreenshotSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    verifierId?: SortOrder
    screenshotId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    decidedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    verifierId?: SortOrder
    screenshotId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    decidedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    verifierId?: SortOrder
    screenshotId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    decidedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type AnomalyFlagCountOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    flaggedBy?: SortOrder
    reason?: SortOrder
    score?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AnomalyFlagAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type AnomalyFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    flaggedBy?: SortOrder
    reason?: SortOrder
    score?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AnomalyFlagMinOrderByAggregateInput = {
    id?: SortOrder
    shiftId?: SortOrder
    flaggedBy?: SortOrder
    reason?: SortOrder
    score?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AnomalyFlagSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusFilter<$PrismaModel> | $Enums.ImportStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type CsvImportCountOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    storageKey?: SortOrder
    status?: SortOrder
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
    errorLog?: SortOrder
    errorCsvKey?: SortOrder
    jobId?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CsvImportAvgOrderByAggregateInput = {
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
  }

  export type CsvImportMaxOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    storageKey?: SortOrder
    status?: SortOrder
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
    errorCsvKey?: SortOrder
    jobId?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CsvImportMinOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    storageKey?: SortOrder
    status?: SortOrder
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
    errorCsvKey?: SortOrder
    jobId?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CsvImportSumOrderByAggregateInput = {
    rowsTotal?: SortOrder
    rowsOk?: SortOrder
    rowsFailed?: SortOrder
  }

  export type EnumImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImportStatusFilter<$PrismaModel>
    _max?: NestedEnumImportStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CertificateCountOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    shareToken?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    issuedAt?: SortOrder
  }

  export type CertificateMaxOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    shareToken?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    issuedAt?: SortOrder
  }

  export type CertificateMinOrderByAggregateInput = {
    id?: SortOrder
    workerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    shareToken?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    issuedAt?: SortOrder
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

  export type ShiftCreateNestedManyWithoutPlatformInput = {
    create?: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput> | ShiftCreateWithoutPlatformInput[] | ShiftUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutPlatformInput | ShiftCreateOrConnectWithoutPlatformInput[]
    createMany?: ShiftCreateManyPlatformInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type ShiftUncheckedCreateNestedManyWithoutPlatformInput = {
    create?: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput> | ShiftCreateWithoutPlatformInput[] | ShiftUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutPlatformInput | ShiftCreateOrConnectWithoutPlatformInput[]
    createMany?: ShiftCreateManyPlatformInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ShiftUpdateManyWithoutPlatformNestedInput = {
    create?: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput> | ShiftCreateWithoutPlatformInput[] | ShiftUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutPlatformInput | ShiftCreateOrConnectWithoutPlatformInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutPlatformInput | ShiftUpsertWithWhereUniqueWithoutPlatformInput[]
    createMany?: ShiftCreateManyPlatformInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutPlatformInput | ShiftUpdateWithWhereUniqueWithoutPlatformInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutPlatformInput | ShiftUpdateManyWithWhereWithoutPlatformInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type ShiftUncheckedUpdateManyWithoutPlatformNestedInput = {
    create?: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput> | ShiftCreateWithoutPlatformInput[] | ShiftUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutPlatformInput | ShiftCreateOrConnectWithoutPlatformInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutPlatformInput | ShiftUpsertWithWhereUniqueWithoutPlatformInput[]
    createMany?: ShiftCreateManyPlatformInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutPlatformInput | ShiftUpdateWithWhereUniqueWithoutPlatformInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutPlatformInput | ShiftUpdateManyWithWhereWithoutPlatformInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type ShiftCreateNestedManyWithoutCityZoneInput = {
    create?: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput> | ShiftCreateWithoutCityZoneInput[] | ShiftUncheckedCreateWithoutCityZoneInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutCityZoneInput | ShiftCreateOrConnectWithoutCityZoneInput[]
    createMany?: ShiftCreateManyCityZoneInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type ShiftUncheckedCreateNestedManyWithoutCityZoneInput = {
    create?: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput> | ShiftCreateWithoutCityZoneInput[] | ShiftUncheckedCreateWithoutCityZoneInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutCityZoneInput | ShiftCreateOrConnectWithoutCityZoneInput[]
    createMany?: ShiftCreateManyCityZoneInputEnvelope
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
  }

  export type ShiftUpdateManyWithoutCityZoneNestedInput = {
    create?: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput> | ShiftCreateWithoutCityZoneInput[] | ShiftUncheckedCreateWithoutCityZoneInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutCityZoneInput | ShiftCreateOrConnectWithoutCityZoneInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutCityZoneInput | ShiftUpsertWithWhereUniqueWithoutCityZoneInput[]
    createMany?: ShiftCreateManyCityZoneInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutCityZoneInput | ShiftUpdateWithWhereUniqueWithoutCityZoneInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutCityZoneInput | ShiftUpdateManyWithWhereWithoutCityZoneInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type ShiftUncheckedUpdateManyWithoutCityZoneNestedInput = {
    create?: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput> | ShiftCreateWithoutCityZoneInput[] | ShiftUncheckedCreateWithoutCityZoneInput[]
    connectOrCreate?: ShiftCreateOrConnectWithoutCityZoneInput | ShiftCreateOrConnectWithoutCityZoneInput[]
    upsert?: ShiftUpsertWithWhereUniqueWithoutCityZoneInput | ShiftUpsertWithWhereUniqueWithoutCityZoneInput[]
    createMany?: ShiftCreateManyCityZoneInputEnvelope
    set?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    disconnect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    delete?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    connect?: ShiftWhereUniqueInput | ShiftWhereUniqueInput[]
    update?: ShiftUpdateWithWhereUniqueWithoutCityZoneInput | ShiftUpdateWithWhereUniqueWithoutCityZoneInput[]
    updateMany?: ShiftUpdateManyWithWhereWithoutCityZoneInput | ShiftUpdateManyWithWhereWithoutCityZoneInput[]
    deleteMany?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
  }

  export type PlatformCreateNestedOneWithoutShiftsInput = {
    create?: XOR<PlatformCreateWithoutShiftsInput, PlatformUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: PlatformCreateOrConnectWithoutShiftsInput
    connect?: PlatformWhereUniqueInput
  }

  export type CityZoneCreateNestedOneWithoutShiftsInput = {
    create?: XOR<CityZoneCreateWithoutShiftsInput, CityZoneUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: CityZoneCreateOrConnectWithoutShiftsInput
    connect?: CityZoneWhereUniqueInput
  }

  export type ScreenshotCreateNestedManyWithoutShiftInput = {
    create?: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput> | ScreenshotCreateWithoutShiftInput[] | ScreenshotUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutShiftInput | ScreenshotCreateOrConnectWithoutShiftInput[]
    createMany?: ScreenshotCreateManyShiftInputEnvelope
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
  }

  export type VerificationCreateNestedManyWithoutShiftInput = {
    create?: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput> | VerificationCreateWithoutShiftInput[] | VerificationUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: VerificationCreateOrConnectWithoutShiftInput | VerificationCreateOrConnectWithoutShiftInput[]
    createMany?: VerificationCreateManyShiftInputEnvelope
    connect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
  }

  export type AnomalyFlagCreateNestedManyWithoutShiftInput = {
    create?: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput> | AnomalyFlagCreateWithoutShiftInput[] | AnomalyFlagUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AnomalyFlagCreateOrConnectWithoutShiftInput | AnomalyFlagCreateOrConnectWithoutShiftInput[]
    createMany?: AnomalyFlagCreateManyShiftInputEnvelope
    connect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
  }

  export type ScreenshotUncheckedCreateNestedManyWithoutShiftInput = {
    create?: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput> | ScreenshotCreateWithoutShiftInput[] | ScreenshotUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutShiftInput | ScreenshotCreateOrConnectWithoutShiftInput[]
    createMany?: ScreenshotCreateManyShiftInputEnvelope
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
  }

  export type VerificationUncheckedCreateNestedManyWithoutShiftInput = {
    create?: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput> | VerificationCreateWithoutShiftInput[] | VerificationUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: VerificationCreateOrConnectWithoutShiftInput | VerificationCreateOrConnectWithoutShiftInput[]
    createMany?: VerificationCreateManyShiftInputEnvelope
    connect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
  }

  export type AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput = {
    create?: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput> | AnomalyFlagCreateWithoutShiftInput[] | AnomalyFlagUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AnomalyFlagCreateOrConnectWithoutShiftInput | AnomalyFlagCreateOrConnectWithoutShiftInput[]
    createMany?: AnomalyFlagCreateManyShiftInputEnvelope
    connect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumShiftSourceFieldUpdateOperationsInput = {
    set?: $Enums.ShiftSource
  }

  export type EnumShiftVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShiftVerificationStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PlatformUpdateOneRequiredWithoutShiftsNestedInput = {
    create?: XOR<PlatformCreateWithoutShiftsInput, PlatformUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: PlatformCreateOrConnectWithoutShiftsInput
    upsert?: PlatformUpsertWithoutShiftsInput
    connect?: PlatformWhereUniqueInput
    update?: XOR<XOR<PlatformUpdateToOneWithWhereWithoutShiftsInput, PlatformUpdateWithoutShiftsInput>, PlatformUncheckedUpdateWithoutShiftsInput>
  }

  export type CityZoneUpdateOneWithoutShiftsNestedInput = {
    create?: XOR<CityZoneCreateWithoutShiftsInput, CityZoneUncheckedCreateWithoutShiftsInput>
    connectOrCreate?: CityZoneCreateOrConnectWithoutShiftsInput
    upsert?: CityZoneUpsertWithoutShiftsInput
    disconnect?: CityZoneWhereInput | boolean
    delete?: CityZoneWhereInput | boolean
    connect?: CityZoneWhereUniqueInput
    update?: XOR<XOR<CityZoneUpdateToOneWithWhereWithoutShiftsInput, CityZoneUpdateWithoutShiftsInput>, CityZoneUncheckedUpdateWithoutShiftsInput>
  }

  export type ScreenshotUpdateManyWithoutShiftNestedInput = {
    create?: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput> | ScreenshotCreateWithoutShiftInput[] | ScreenshotUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutShiftInput | ScreenshotCreateOrConnectWithoutShiftInput[]
    upsert?: ScreenshotUpsertWithWhereUniqueWithoutShiftInput | ScreenshotUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: ScreenshotCreateManyShiftInputEnvelope
    set?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    disconnect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    delete?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    update?: ScreenshotUpdateWithWhereUniqueWithoutShiftInput | ScreenshotUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: ScreenshotUpdateManyWithWhereWithoutShiftInput | ScreenshotUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
  }

  export type VerificationUpdateManyWithoutShiftNestedInput = {
    create?: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput> | VerificationCreateWithoutShiftInput[] | VerificationUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: VerificationCreateOrConnectWithoutShiftInput | VerificationCreateOrConnectWithoutShiftInput[]
    upsert?: VerificationUpsertWithWhereUniqueWithoutShiftInput | VerificationUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: VerificationCreateManyShiftInputEnvelope
    set?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    disconnect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    delete?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    connect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    update?: VerificationUpdateWithWhereUniqueWithoutShiftInput | VerificationUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: VerificationUpdateManyWithWhereWithoutShiftInput | VerificationUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: VerificationScalarWhereInput | VerificationScalarWhereInput[]
  }

  export type AnomalyFlagUpdateManyWithoutShiftNestedInput = {
    create?: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput> | AnomalyFlagCreateWithoutShiftInput[] | AnomalyFlagUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AnomalyFlagCreateOrConnectWithoutShiftInput | AnomalyFlagCreateOrConnectWithoutShiftInput[]
    upsert?: AnomalyFlagUpsertWithWhereUniqueWithoutShiftInput | AnomalyFlagUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: AnomalyFlagCreateManyShiftInputEnvelope
    set?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    disconnect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    delete?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    connect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    update?: AnomalyFlagUpdateWithWhereUniqueWithoutShiftInput | AnomalyFlagUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: AnomalyFlagUpdateManyWithWhereWithoutShiftInput | AnomalyFlagUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: AnomalyFlagScalarWhereInput | AnomalyFlagScalarWhereInput[]
  }

  export type ScreenshotUncheckedUpdateManyWithoutShiftNestedInput = {
    create?: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput> | ScreenshotCreateWithoutShiftInput[] | ScreenshotUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutShiftInput | ScreenshotCreateOrConnectWithoutShiftInput[]
    upsert?: ScreenshotUpsertWithWhereUniqueWithoutShiftInput | ScreenshotUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: ScreenshotCreateManyShiftInputEnvelope
    set?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    disconnect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    delete?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    update?: ScreenshotUpdateWithWhereUniqueWithoutShiftInput | ScreenshotUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: ScreenshotUpdateManyWithWhereWithoutShiftInput | ScreenshotUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
  }

  export type VerificationUncheckedUpdateManyWithoutShiftNestedInput = {
    create?: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput> | VerificationCreateWithoutShiftInput[] | VerificationUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: VerificationCreateOrConnectWithoutShiftInput | VerificationCreateOrConnectWithoutShiftInput[]
    upsert?: VerificationUpsertWithWhereUniqueWithoutShiftInput | VerificationUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: VerificationCreateManyShiftInputEnvelope
    set?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    disconnect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    delete?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    connect?: VerificationWhereUniqueInput | VerificationWhereUniqueInput[]
    update?: VerificationUpdateWithWhereUniqueWithoutShiftInput | VerificationUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: VerificationUpdateManyWithWhereWithoutShiftInput | VerificationUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: VerificationScalarWhereInput | VerificationScalarWhereInput[]
  }

  export type AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput = {
    create?: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput> | AnomalyFlagCreateWithoutShiftInput[] | AnomalyFlagUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AnomalyFlagCreateOrConnectWithoutShiftInput | AnomalyFlagCreateOrConnectWithoutShiftInput[]
    upsert?: AnomalyFlagUpsertWithWhereUniqueWithoutShiftInput | AnomalyFlagUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: AnomalyFlagCreateManyShiftInputEnvelope
    set?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    disconnect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    delete?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    connect?: AnomalyFlagWhereUniqueInput | AnomalyFlagWhereUniqueInput[]
    update?: AnomalyFlagUpdateWithWhereUniqueWithoutShiftInput | AnomalyFlagUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: AnomalyFlagUpdateManyWithWhereWithoutShiftInput | AnomalyFlagUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: AnomalyFlagScalarWhereInput | AnomalyFlagScalarWhereInput[]
  }

  export type ShiftCreateNestedOneWithoutScreenshotsInput = {
    create?: XOR<ShiftCreateWithoutScreenshotsInput, ShiftUncheckedCreateWithoutScreenshotsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutScreenshotsInput
    connect?: ShiftWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShiftUpdateOneRequiredWithoutScreenshotsNestedInput = {
    create?: XOR<ShiftCreateWithoutScreenshotsInput, ShiftUncheckedCreateWithoutScreenshotsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutScreenshotsInput
    upsert?: ShiftUpsertWithoutScreenshotsInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutScreenshotsInput, ShiftUpdateWithoutScreenshotsInput>, ShiftUncheckedUpdateWithoutScreenshotsInput>
  }

  export type ShiftCreateNestedOneWithoutVerificationsInput = {
    create?: XOR<ShiftCreateWithoutVerificationsInput, ShiftUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutVerificationsInput
    connect?: ShiftWhereUniqueInput
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type ShiftUpdateOneRequiredWithoutVerificationsNestedInput = {
    create?: XOR<ShiftCreateWithoutVerificationsInput, ShiftUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutVerificationsInput
    upsert?: ShiftUpsertWithoutVerificationsInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutVerificationsInput, ShiftUpdateWithoutVerificationsInput>, ShiftUncheckedUpdateWithoutVerificationsInput>
  }

  export type ShiftCreateNestedOneWithoutAnomalyFlagsInput = {
    create?: XOR<ShiftCreateWithoutAnomalyFlagsInput, ShiftUncheckedCreateWithoutAnomalyFlagsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutAnomalyFlagsInput
    connect?: ShiftWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ShiftUpdateOneRequiredWithoutAnomalyFlagsNestedInput = {
    create?: XOR<ShiftCreateWithoutAnomalyFlagsInput, ShiftUncheckedCreateWithoutAnomalyFlagsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutAnomalyFlagsInput
    upsert?: ShiftUpsertWithoutAnomalyFlagsInput
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutAnomalyFlagsInput, ShiftUpdateWithoutAnomalyFlagsInput>, ShiftUncheckedUpdateWithoutAnomalyFlagsInput>
  }

  export type EnumImportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ImportStatus
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumShiftSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftSource | EnumShiftSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftSourceFilter<$PrismaModel> | $Enums.ShiftSource
  }

  export type NestedEnumShiftVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftVerificationStatus | EnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftVerificationStatusFilter<$PrismaModel> | $Enums.ShiftVerificationStatus
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumShiftSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftSource | EnumShiftSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftSource[] | ListEnumShiftSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftSourceWithAggregatesFilter<$PrismaModel> | $Enums.ShiftSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftSourceFilter<$PrismaModel>
    _max?: NestedEnumShiftSourceFilter<$PrismaModel>
  }

  export type NestedEnumShiftVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftVerificationStatus | EnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftVerificationStatus[] | ListEnumShiftVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftVerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftVerificationStatusFilter<$PrismaModel>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusFilter<$PrismaModel> | $Enums.ImportStatus
  }

  export type NestedEnumImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportStatus | EnumImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImportStatus[] | ListEnumImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImportStatusFilter<$PrismaModel>
    _max?: NestedEnumImportStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type ShiftCreateWithoutPlatformInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cityZone?: CityZoneCreateNestedOneWithoutShiftsInput
    screenshots?: ScreenshotCreateNestedManyWithoutShiftInput
    verifications?: VerificationCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutPlatformInput = {
    id?: string
    workerId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutShiftInput
    verifications?: VerificationUncheckedCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutPlatformInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput>
  }

  export type ShiftCreateManyPlatformInputEnvelope = {
    data: ShiftCreateManyPlatformInput | ShiftCreateManyPlatformInput[]
    skipDuplicates?: boolean
  }

  export type ShiftUpsertWithWhereUniqueWithoutPlatformInput = {
    where: ShiftWhereUniqueInput
    update: XOR<ShiftUpdateWithoutPlatformInput, ShiftUncheckedUpdateWithoutPlatformInput>
    create: XOR<ShiftCreateWithoutPlatformInput, ShiftUncheckedCreateWithoutPlatformInput>
  }

  export type ShiftUpdateWithWhereUniqueWithoutPlatformInput = {
    where: ShiftWhereUniqueInput
    data: XOR<ShiftUpdateWithoutPlatformInput, ShiftUncheckedUpdateWithoutPlatformInput>
  }

  export type ShiftUpdateManyWithWhereWithoutPlatformInput = {
    where: ShiftScalarWhereInput
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyWithoutPlatformInput>
  }

  export type ShiftScalarWhereInput = {
    AND?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
    OR?: ShiftScalarWhereInput[]
    NOT?: ShiftScalarWhereInput | ShiftScalarWhereInput[]
    id?: StringFilter<"Shift"> | string
    workerId?: StringFilter<"Shift"> | string
    platformId?: StringFilter<"Shift"> | string
    cityZoneId?: StringNullableFilter<"Shift"> | string | null
    shiftDate?: DateTimeFilter<"Shift"> | Date | string
    hoursWorked?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFilter<"Shift"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Shift"> | string
    source?: EnumShiftSourceFilter<"Shift"> | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFilter<"Shift"> | $Enums.ShiftVerificationStatus
    notes?: StringNullableFilter<"Shift"> | string | null
    deletedAt?: DateTimeNullableFilter<"Shift"> | Date | string | null
    createdAt?: DateTimeFilter<"Shift"> | Date | string
    updatedAt?: DateTimeFilter<"Shift"> | Date | string
  }

  export type ShiftCreateWithoutCityZoneInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    platform: PlatformCreateNestedOneWithoutShiftsInput
    screenshots?: ScreenshotCreateNestedManyWithoutShiftInput
    verifications?: VerificationCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutCityZoneInput = {
    id?: string
    workerId: string
    platformId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutShiftInput
    verifications?: VerificationUncheckedCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutCityZoneInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput>
  }

  export type ShiftCreateManyCityZoneInputEnvelope = {
    data: ShiftCreateManyCityZoneInput | ShiftCreateManyCityZoneInput[]
    skipDuplicates?: boolean
  }

  export type ShiftUpsertWithWhereUniqueWithoutCityZoneInput = {
    where: ShiftWhereUniqueInput
    update: XOR<ShiftUpdateWithoutCityZoneInput, ShiftUncheckedUpdateWithoutCityZoneInput>
    create: XOR<ShiftCreateWithoutCityZoneInput, ShiftUncheckedCreateWithoutCityZoneInput>
  }

  export type ShiftUpdateWithWhereUniqueWithoutCityZoneInput = {
    where: ShiftWhereUniqueInput
    data: XOR<ShiftUpdateWithoutCityZoneInput, ShiftUncheckedUpdateWithoutCityZoneInput>
  }

  export type ShiftUpdateManyWithWhereWithoutCityZoneInput = {
    where: ShiftScalarWhereInput
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyWithoutCityZoneInput>
  }

  export type PlatformCreateWithoutShiftsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
  }

  export type PlatformUncheckedCreateWithoutShiftsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
  }

  export type PlatformCreateOrConnectWithoutShiftsInput = {
    where: PlatformWhereUniqueInput
    create: XOR<PlatformCreateWithoutShiftsInput, PlatformUncheckedCreateWithoutShiftsInput>
  }

  export type CityZoneCreateWithoutShiftsInput = {
    id?: string
    city: string
    zone: string
    active?: boolean
    createdAt?: Date | string
  }

  export type CityZoneUncheckedCreateWithoutShiftsInput = {
    id?: string
    city: string
    zone: string
    active?: boolean
    createdAt?: Date | string
  }

  export type CityZoneCreateOrConnectWithoutShiftsInput = {
    where: CityZoneWhereUniqueInput
    create: XOR<CityZoneCreateWithoutShiftsInput, CityZoneUncheckedCreateWithoutShiftsInput>
  }

  export type ScreenshotCreateWithoutShiftInput = {
    id?: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreenshotUncheckedCreateWithoutShiftInput = {
    id?: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreenshotCreateOrConnectWithoutShiftInput = {
    where: ScreenshotWhereUniqueInput
    create: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput>
  }

  export type ScreenshotCreateManyShiftInputEnvelope = {
    data: ScreenshotCreateManyShiftInput | ScreenshotCreateManyShiftInput[]
    skipDuplicates?: boolean
  }

  export type VerificationCreateWithoutShiftInput = {
    id?: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationUncheckedCreateWithoutShiftInput = {
    id?: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationCreateOrConnectWithoutShiftInput = {
    where: VerificationWhereUniqueInput
    create: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput>
  }

  export type VerificationCreateManyShiftInputEnvelope = {
    data: VerificationCreateManyShiftInput | VerificationCreateManyShiftInput[]
    skipDuplicates?: boolean
  }

  export type AnomalyFlagCreateWithoutShiftInput = {
    id?: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AnomalyFlagUncheckedCreateWithoutShiftInput = {
    id?: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AnomalyFlagCreateOrConnectWithoutShiftInput = {
    where: AnomalyFlagWhereUniqueInput
    create: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput>
  }

  export type AnomalyFlagCreateManyShiftInputEnvelope = {
    data: AnomalyFlagCreateManyShiftInput | AnomalyFlagCreateManyShiftInput[]
    skipDuplicates?: boolean
  }

  export type PlatformUpsertWithoutShiftsInput = {
    update: XOR<PlatformUpdateWithoutShiftsInput, PlatformUncheckedUpdateWithoutShiftsInput>
    create: XOR<PlatformCreateWithoutShiftsInput, PlatformUncheckedCreateWithoutShiftsInput>
    where?: PlatformWhereInput
  }

  export type PlatformUpdateToOneWithWhereWithoutShiftsInput = {
    where?: PlatformWhereInput
    data: XOR<PlatformUpdateWithoutShiftsInput, PlatformUncheckedUpdateWithoutShiftsInput>
  }

  export type PlatformUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformUncheckedUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityZoneUpsertWithoutShiftsInput = {
    update: XOR<CityZoneUpdateWithoutShiftsInput, CityZoneUncheckedUpdateWithoutShiftsInput>
    create: XOR<CityZoneCreateWithoutShiftsInput, CityZoneUncheckedCreateWithoutShiftsInput>
    where?: CityZoneWhereInput
  }

  export type CityZoneUpdateToOneWithWhereWithoutShiftsInput = {
    where?: CityZoneWhereInput
    data: XOR<CityZoneUpdateWithoutShiftsInput, CityZoneUncheckedUpdateWithoutShiftsInput>
  }

  export type CityZoneUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityZoneUncheckedUpdateWithoutShiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreenshotUpsertWithWhereUniqueWithoutShiftInput = {
    where: ScreenshotWhereUniqueInput
    update: XOR<ScreenshotUpdateWithoutShiftInput, ScreenshotUncheckedUpdateWithoutShiftInput>
    create: XOR<ScreenshotCreateWithoutShiftInput, ScreenshotUncheckedCreateWithoutShiftInput>
  }

  export type ScreenshotUpdateWithWhereUniqueWithoutShiftInput = {
    where: ScreenshotWhereUniqueInput
    data: XOR<ScreenshotUpdateWithoutShiftInput, ScreenshotUncheckedUpdateWithoutShiftInput>
  }

  export type ScreenshotUpdateManyWithWhereWithoutShiftInput = {
    where: ScreenshotScalarWhereInput
    data: XOR<ScreenshotUpdateManyMutationInput, ScreenshotUncheckedUpdateManyWithoutShiftInput>
  }

  export type ScreenshotScalarWhereInput = {
    AND?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
    OR?: ScreenshotScalarWhereInput[]
    NOT?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
    id?: StringFilter<"Screenshot"> | string
    shiftId?: StringFilter<"Screenshot"> | string
    storageKey?: StringFilter<"Screenshot"> | string
    mimeType?: StringFilter<"Screenshot"> | string
    sizeBytes?: IntFilter<"Screenshot"> | number
    uploadedAt?: DateTimeFilter<"Screenshot"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screenshot"> | Date | string | null
  }

  export type VerificationUpsertWithWhereUniqueWithoutShiftInput = {
    where: VerificationWhereUniqueInput
    update: XOR<VerificationUpdateWithoutShiftInput, VerificationUncheckedUpdateWithoutShiftInput>
    create: XOR<VerificationCreateWithoutShiftInput, VerificationUncheckedCreateWithoutShiftInput>
  }

  export type VerificationUpdateWithWhereUniqueWithoutShiftInput = {
    where: VerificationWhereUniqueInput
    data: XOR<VerificationUpdateWithoutShiftInput, VerificationUncheckedUpdateWithoutShiftInput>
  }

  export type VerificationUpdateManyWithWhereWithoutShiftInput = {
    where: VerificationScalarWhereInput
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyWithoutShiftInput>
  }

  export type VerificationScalarWhereInput = {
    AND?: VerificationScalarWhereInput | VerificationScalarWhereInput[]
    OR?: VerificationScalarWhereInput[]
    NOT?: VerificationScalarWhereInput | VerificationScalarWhereInput[]
    id?: StringFilter<"Verification"> | string
    shiftId?: StringFilter<"Verification"> | string
    verifierId?: StringFilter<"Verification"> | string
    screenshotId?: StringNullableFilter<"Verification"> | string | null
    status?: EnumVerificationStatusFilter<"Verification"> | $Enums.VerificationStatus
    notes?: StringNullableFilter<"Verification"> | string | null
    decidedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    createdAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type AnomalyFlagUpsertWithWhereUniqueWithoutShiftInput = {
    where: AnomalyFlagWhereUniqueInput
    update: XOR<AnomalyFlagUpdateWithoutShiftInput, AnomalyFlagUncheckedUpdateWithoutShiftInput>
    create: XOR<AnomalyFlagCreateWithoutShiftInput, AnomalyFlagUncheckedCreateWithoutShiftInput>
  }

  export type AnomalyFlagUpdateWithWhereUniqueWithoutShiftInput = {
    where: AnomalyFlagWhereUniqueInput
    data: XOR<AnomalyFlagUpdateWithoutShiftInput, AnomalyFlagUncheckedUpdateWithoutShiftInput>
  }

  export type AnomalyFlagUpdateManyWithWhereWithoutShiftInput = {
    where: AnomalyFlagScalarWhereInput
    data: XOR<AnomalyFlagUpdateManyMutationInput, AnomalyFlagUncheckedUpdateManyWithoutShiftInput>
  }

  export type AnomalyFlagScalarWhereInput = {
    AND?: AnomalyFlagScalarWhereInput | AnomalyFlagScalarWhereInput[]
    OR?: AnomalyFlagScalarWhereInput[]
    NOT?: AnomalyFlagScalarWhereInput | AnomalyFlagScalarWhereInput[]
    id?: StringFilter<"AnomalyFlag"> | string
    shiftId?: StringFilter<"AnomalyFlag"> | string
    flaggedBy?: StringFilter<"AnomalyFlag"> | string
    reason?: StringFilter<"AnomalyFlag"> | string
    score?: DecimalNullableFilter<"AnomalyFlag"> | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: DateTimeNullableFilter<"AnomalyFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"AnomalyFlag"> | Date | string
  }

  export type ShiftCreateWithoutScreenshotsInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    platform: PlatformCreateNestedOneWithoutShiftsInput
    cityZone?: CityZoneCreateNestedOneWithoutShiftsInput
    verifications?: VerificationCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutScreenshotsInput = {
    id?: string
    workerId: string
    platformId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    verifications?: VerificationUncheckedCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutScreenshotsInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutScreenshotsInput, ShiftUncheckedCreateWithoutScreenshotsInput>
  }

  export type ShiftUpsertWithoutScreenshotsInput = {
    update: XOR<ShiftUpdateWithoutScreenshotsInput, ShiftUncheckedUpdateWithoutScreenshotsInput>
    create: XOR<ShiftCreateWithoutScreenshotsInput, ShiftUncheckedCreateWithoutScreenshotsInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutScreenshotsInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutScreenshotsInput, ShiftUncheckedUpdateWithoutScreenshotsInput>
  }

  export type ShiftUpdateWithoutScreenshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platform?: PlatformUpdateOneRequiredWithoutShiftsNestedInput
    cityZone?: CityZoneUpdateOneWithoutShiftsNestedInput
    verifications?: VerificationUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutScreenshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: VerificationUncheckedUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateWithoutVerificationsInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    platform: PlatformCreateNestedOneWithoutShiftsInput
    cityZone?: CityZoneCreateNestedOneWithoutShiftsInput
    screenshots?: ScreenshotCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutVerificationsInput = {
    id?: string
    workerId: string
    platformId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutShiftInput
    anomalyFlags?: AnomalyFlagUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutVerificationsInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutVerificationsInput, ShiftUncheckedCreateWithoutVerificationsInput>
  }

  export type ShiftUpsertWithoutVerificationsInput = {
    update: XOR<ShiftUpdateWithoutVerificationsInput, ShiftUncheckedUpdateWithoutVerificationsInput>
    create: XOR<ShiftCreateWithoutVerificationsInput, ShiftUncheckedCreateWithoutVerificationsInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutVerificationsInput, ShiftUncheckedUpdateWithoutVerificationsInput>
  }

  export type ShiftUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platform?: PlatformUpdateOneRequiredWithoutShiftsNestedInput
    cityZone?: CityZoneUpdateOneWithoutShiftsNestedInput
    screenshots?: ScreenshotUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateWithoutAnomalyFlagsInput = {
    id?: string
    workerId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    platform: PlatformCreateNestedOneWithoutShiftsInput
    cityZone?: CityZoneCreateNestedOneWithoutShiftsInput
    screenshots?: ScreenshotCreateNestedManyWithoutShiftInput
    verifications?: VerificationCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateWithoutAnomalyFlagsInput = {
    id?: string
    workerId: string
    platformId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutShiftInput
    verifications?: VerificationUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftCreateOrConnectWithoutAnomalyFlagsInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutAnomalyFlagsInput, ShiftUncheckedCreateWithoutAnomalyFlagsInput>
  }

  export type ShiftUpsertWithoutAnomalyFlagsInput = {
    update: XOR<ShiftUpdateWithoutAnomalyFlagsInput, ShiftUncheckedUpdateWithoutAnomalyFlagsInput>
    create: XOR<ShiftCreateWithoutAnomalyFlagsInput, ShiftUncheckedCreateWithoutAnomalyFlagsInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutAnomalyFlagsInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutAnomalyFlagsInput, ShiftUncheckedUpdateWithoutAnomalyFlagsInput>
  }

  export type ShiftUpdateWithoutAnomalyFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platform?: PlatformUpdateOneRequiredWithoutShiftsNestedInput
    cityZone?: CityZoneUpdateOneWithoutShiftsNestedInput
    screenshots?: ScreenshotUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutAnomalyFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateManyPlatformInput = {
    id?: string
    workerId: string
    cityZoneId?: string | null
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftUpdateWithoutPlatformInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityZone?: CityZoneUpdateOneWithoutShiftsNestedInput
    screenshots?: ScreenshotUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutPlatformInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUncheckedUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateManyWithoutPlatformInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    cityZoneId?: NullableStringFieldUpdateOperationsInput | string | null
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftCreateManyCityZoneInput = {
    id?: string
    workerId: string
    platformId: string
    shiftDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    grossPay: Decimal | DecimalJsLike | number | string
    deductions?: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    currency?: string
    source?: $Enums.ShiftSource
    verificationStatus?: $Enums.ShiftVerificationStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShiftUpdateWithoutCityZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platform?: PlatformUpdateOneRequiredWithoutShiftsNestedInput
    screenshots?: ScreenshotUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateWithoutCityZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutShiftNestedInput
    verifications?: VerificationUncheckedUpdateManyWithoutShiftNestedInput
    anomalyFlags?: AnomalyFlagUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateManyWithoutCityZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    shiftDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grossPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deductions?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    source?: EnumShiftSourceFieldUpdateOperationsInput | $Enums.ShiftSource
    verificationStatus?: EnumShiftVerificationStatusFieldUpdateOperationsInput | $Enums.ShiftVerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreenshotCreateManyShiftInput = {
    id?: string
    storageKey: string
    mimeType?: string
    sizeBytes: number
    uploadedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type VerificationCreateManyShiftInput = {
    id?: string
    verifierId: string
    screenshotId?: string | null
    status?: $Enums.VerificationStatus
    notes?: string | null
    decidedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AnomalyFlagCreateManyShiftInput = {
    id?: string
    flaggedBy?: string
    reason: string
    score?: Decimal | DecimalJsLike | number | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ScreenshotUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreenshotUncheckedUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreenshotUncheckedUpdateManyWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifierId?: StringFieldUpdateOperationsInput | string
    screenshotId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagUncheckedUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnomalyFlagUncheckedUpdateManyWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PlatformCountOutputTypeDefaultArgs instead
     */
    export type PlatformCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CityZoneCountOutputTypeDefaultArgs instead
     */
    export type CityZoneCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CityZoneCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShiftCountOutputTypeDefaultArgs instead
     */
    export type ShiftCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShiftCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlatformDefaultArgs instead
     */
    export type PlatformArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CityZoneDefaultArgs instead
     */
    export type CityZoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CityZoneDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShiftDefaultArgs instead
     */
    export type ShiftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShiftDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScreenshotDefaultArgs instead
     */
    export type ScreenshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScreenshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationDefaultArgs instead
     */
    export type VerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnomalyFlagDefaultArgs instead
     */
    export type AnomalyFlagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnomalyFlagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CsvImportDefaultArgs instead
     */
    export type CsvImportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CsvImportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateDefaultArgs instead
     */
    export type CertificateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateDefaultArgs<ExtArgs>
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