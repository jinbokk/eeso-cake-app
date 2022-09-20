const app = require("./App");
const connectDatabase = require("../backend/database");

const dotenv = require("dotenv");

dotenv.config({ path: "/backend/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// 1. 기존에 api call 하듯이, api call을 할 수 있는 DB를 만든다
// 2. DB에는 image, likes count, text content 등이 들어간다.
// 3. 위 data들을 db에 업로드하는 방법부터 찾아야 한다 !