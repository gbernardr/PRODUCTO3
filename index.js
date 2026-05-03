import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";
import { root } from "./resolvers.js";
import { connectDB } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor disponible en http://localhost:${process.env.PORT}/graphql`);
});