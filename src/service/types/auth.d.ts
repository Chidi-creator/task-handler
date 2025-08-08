import {Request} from 'express'
import mongoose from 'mongoose'

export interface AuthenticatedUser{
    _id: mongoose.Types.ObjectId;
    email: string;
    iat?: number;
     exp?: number;

}

export interface AuthenticatedRequest extends Request{
user: AuthenticatedUser;
token: string
}



