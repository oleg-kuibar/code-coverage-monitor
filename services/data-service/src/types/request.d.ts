import { Request } from 'express';
interface RequestWithUser extends Request {
    user: { [key: string]: any };
}

export default RequestWithUser;
