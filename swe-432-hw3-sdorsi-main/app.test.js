const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET /bySong ", () => {

  test("It should respond with songs in alphabetical order", async () => {
    const response = await request(app).get("/bySong");
    expect(response.body[0].name.toString().charAt(0).toUpperCase()).toEqual("A");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /byArtist ", () => {
  test("It should respond with array of 40 songs", async () => {
    const response = await request(app).get("/byArtist");
    expect(response.body.length).toEqual(40);
    expect(response.statusCode).toBe(200);
  });
  test("It should respond with artists in alphabetical order", async () => {
    const response = await request(app).get("/byArtist");
    expect(response.body[0].artist.toString().charAt(0).toUpperCase()).toEqual("A");
    expect(response.statusCode).toBe(200);
  });
});
