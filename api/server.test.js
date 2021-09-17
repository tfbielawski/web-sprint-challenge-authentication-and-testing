const server = require('./server');
const request= require('supertest');

// Write your tests here
test('sanity', () => {expect(true).toBe(true);})

//There is a server
describe("Server tests", () => {
  test("The server runs", () => {  expect(server).toBeDefined();  })

  test("Get returns a server message", async ()=> {
    const res = await request(server).get('/');
    const answer = res.body;
    expect(answer).toBeTruthy();
    expect(answer).toMatchObject({  message: "HERE BE JOKES"});
  })

  test("Tests server does respond when incorrect endpoint reached", async () => {
    const res = await request(server).get("/weirdo");
    const answer = res.body;
    expect(answer).toMatchObject({  message: "HA!, The joke's on you!" })
  })
  
  test("Jokes should return truthy", function() {
    return request(server)
        .get("/api/jokes/")
        .then(res => { expect(res.type).toBeTruthy()})
  })
})
