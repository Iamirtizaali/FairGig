import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validate(schema: AnyZodObject): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: Record<string, string> = {};
        err.errors.forEach((e) => {
          fields[e.path.join('.')] = e.message;
        });
        res.status(422).json({
          data: null,
          meta: {},
          error: { code: 'VALIDATION_ERROR', message: 'Validation failed', fields },
        });
        return;
      }
      next(err);
    }
  };
}
