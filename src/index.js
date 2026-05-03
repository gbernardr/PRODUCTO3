import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";
import { root } from "./resolvers.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API GraphQL Producto 3. Usa /graphql para consultar el servicio.");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

await connectDB();

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}/graphql`);
});
