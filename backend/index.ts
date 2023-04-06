import cors from "cors";
import express from "express";
import { UserRouter } from "./routers/users";

// express
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (_, res) => {
  res.json({ msg: "HI :^)" });
});

app.use("/users", UserRouter);

app.listen(PORT, () => console.log(`🌞🌞🌞 Listening on ${PORT} 🌞🌞🌞`));
