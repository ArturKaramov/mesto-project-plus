import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IRequestWithUser extends Request {
  user?: { _id: string };
}

export interface IRequestWithPayload extends Request {
  user?: string | JwtPayload;
}
