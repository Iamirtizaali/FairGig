import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

type Source = 'body' | 'query';

export function validate(schema: AnyZodObject, source: Source = 'body'): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(source === 'query' ? req.query : req.body);
      if (source === 'body') req.body = parsed;
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
