import Middleware from "./middleware";
import express from "express";
import cors from "cors";
import passport from "passport";
import userRoute from "@routes/auth.route";
import taskRoute from "@routes/task.routes";

const middleware = new Middleware(express());

const setUpRoutes = (middleware: Middleware) => {
  middleware.addMiddleware("/auth", userRoute);
  middleware.addMiddleware("/tasks", taskRoute);
};

const setUpMiddlewares = () => {

  middleware.addMiddleware(cors());
  middleware.addMiddleware(express.json());
  middleware.addMiddleware(passport.initialize());


  middleware.addMiddleware("/healtcheck", (req, res) => {
    res.send("ok");
  });

  setUpRoutes(middleware);
};

setUpMiddlewares();

export default middleware;
