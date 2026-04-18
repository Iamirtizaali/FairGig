declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: {
        sub: string;
        role: "worker" | "verifier" | "advocate" | "admin";
        email?: string;
      };
    }
  }
}

export {};
