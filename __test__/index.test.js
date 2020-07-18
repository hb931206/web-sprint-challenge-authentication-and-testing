const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("jokes tests", () => {
  it("POST /register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "Jay", password: "Z" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
  it(" Broken POST /login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "Lambda", password: "School" });
    expect(res.statusCode).toBe(500);
    expect(res.body.id).toBeUndefined();
    // expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
});
