import app from "./app";
import connectDB from "./config/database";

const port = process.env.PORT || 3333;
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
