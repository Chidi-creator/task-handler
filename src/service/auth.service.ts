import passport from "passport";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { AuthenticatedRequest, AuthenticatedUser } from "./types/auth";
import { env } from "@config/env.config";
import { Types } from "mongoose";
import responseManager from "@managers/index";
import { AuthenticationError } from "@managers/error.manager";
import UserUseCase from "@usecases/users.usecase";

export class AuthService {
  private JWT_SECRET: string;
  private opts: StrategyOptions;
  private userUseCase: UserUseCase;

  constructor() {
    this.JWT_SECRET = env.JWT_SECRET;
    this.userUseCase = new UserUseCase();
    this.opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.JWT_SECRET,
    };

    passport.use(
      new JwtStrategy(
        this.opts,
        async (jwtpayload: AuthenticatedUser, done) => {
          try {
            // Verify user exists in database
            const userId = new Types.ObjectId(jwtpayload._id);
            const user = await this.userUseCase.findUserById(userId);
            if (!user) {
              return done(null, false); // User not found
            }
            
            // Return the actual user from database, not just the token payload
            return done(null, {
              _id: user._id,
              email: user.email
            });
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  }

  public auth = (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: AuthenticatedUser) => {
        if (err || !user) {
        return responseManager.authenticationError(res, "Unauthorised user");
        }
        console.log(user)
        authReq.user = user;
        authReq.token = req.headers.authorization?.split(" ")[1] || "";
        next();
      }
    )(req, res, next);
  };

  public generateToken = (user: AuthenticatedUser): string => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },

      this.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  };
}
