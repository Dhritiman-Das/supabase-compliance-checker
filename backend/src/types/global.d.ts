import { Request } from "express";

export type RequestWithUser = Request & {
  user: {
    sub: string;
    email: string;
    iat: string;
    exp: string;
  };
};
