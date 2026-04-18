import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export function validate(schema: AnyZodObject): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: Record<string, string> = {};
        for (const issue of err.issues) {
          const key = issue.path.join('.');
          fields[key] = issue.message;
        }
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
