import { PassportStatic } from 'passport';

declare module 'express' {
    interface Request {
        // @ts-ignore
        // extend express.Request type definition to include logout method from passport.js library
        logout: PassportStatic['logout'];
    }
}
