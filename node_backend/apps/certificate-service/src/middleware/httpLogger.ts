import pinoHttp from 'pino-http';
import { logger } from '../utils/logger';

export const httpLogger = pinoHttp({
  logger,
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage(_req, res) {
    return `${res.statusCode}`;
  },
  customErrorMessage(_req, res) {
    return `${res.statusCode}`;
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return { statusCode: res.statusCode };
    },
  },
  customAttributeKeys: {
    req: 'req',
    res: 'res',
    err: 'err',
    responseTime: 'ms',
  },
  redact: ['req.headers', 'res.headers'],
});
