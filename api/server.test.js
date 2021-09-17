
const server = require("./server")
const request = require('supertest');
const db = require('../data/dbConfig');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


describe("Server Auth Testing", () => {
  //Test if the server is there
  it("[0] There is a server", () => {
    expect(server).toBeDefined();
  })

  beforeAll(async () =>   {
    await db.migrate.rollback();
    await db.migrate.latest();
  })
  // Test register
  test("creates a user", async () => {
    //Request from server, assign to res
    const res = await request(server)
        //Post user data to register endpoint
        .post("/auth/register")
        .send({username: "Captain Marvel", password: "foobar"})
    expect(res).toBeTruthy();

  })

  test("Tests server does respond when incorrect endpoint reached", async ()=> {
    const res = await request(server).get("/weirdo");
    const answer = res.body;
    expect(answer).toBeTruthy();
  })

  test("returns a message when accessing incorrect endpoint", async ()=> {
    const res = await request(server).get("/weirdo");
    const answer = res.body;
    expect(answer).toMatchObject({ message: "HA!, The joke's on you!"});
  })


  // test(" Jokes should be defined", function() {
  //   return request(server)
  //       .get("/api/jokes/")
  //       .then(res => { expect(res.body).toBeDefined(); })
  // })
  //
  //
  // test("Jokes should return truthy", function() {
  //   return request(server)
  //       .get("/api/jokes/")
  //       .then(res => { expect(res.type).toBeTruthy()})
  // })
  //
  // it("Truth test", function() {
  //   return request(server)
  //       .post('/api/auth/register')
  //       .send({ username: "test", password: "1234" })
  //       .then(res => {expect(res.type).toBeTruthy(); })
  // })
})
