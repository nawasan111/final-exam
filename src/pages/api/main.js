// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import express from "express";
import route from "../../../app/routes/web";
const app = express();

app.use("/api/", route);

export default app;
