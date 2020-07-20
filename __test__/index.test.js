const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("jokes tests", () => {
  it("POST /register", () => {
    return supertest(server)
      .post("/api/auth/register")

      .send({ username: "HenryFinnished", password: "password" })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.headers["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("POST /login", () => {
    return supertest(server)
      .post("/api/auth/login")
      .send({ username: "Henry25", password: "password" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome Henry25!");

        // expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("GET /jokes", () => {
    return supertest(server)
      .post("/api/auth/login")
      .send({ username: "Henry25", password: "password" })
      .then((res) => {
        const token = res.body.token;
        return supertest(server)
          .get("/api/jokes/")
          .set({ token })
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(res.headers["content-type"]).toBe(
              "application/json; charset=utf-8"
            );
          });

        // expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // it("Get/ Jokes", async () => {
  //   const res = await supertest(server).get("/api/jokes/");
  //   expect(res.statusCode).toBe(200);
  //   expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  // });
});
