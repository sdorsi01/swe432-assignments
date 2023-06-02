const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET /songs/:search ", () => {
  test("Returns a list of 20 songs with similar title to :search", async () => {
    const response = await request(app).get("/songs/Whiplash");
    jsonObj =(response.body);
    for(song of jsonObj)
    {
      let containsSearch = song.name.toLowerCase().includes("whiplash") || song.artist.toLowerCase().includes("whiplash");
      expect(containsSearch).toEqual(true);
    }
    
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /songs/:search with invalid param and no matches", () => {
  test("Invalid search with the string \"wftghfgh\"", async () => {
    const response = await request(app).get("/songs/wftghfgh");
    expect({}).toEqual(response.body);
  });
});

describe("GET /artist/:artistName ", () => {
  test("partial searches for the same artist should be cached accordingly", async () => {
    const response = await request(app).get("/artist/metallica");
    expect(response.body.length).toBeLessThan(11);
    firstObj = response.body;
    secondCall = await request(app).get("/artist/metall");
    for(index in firstObj)
    {
      expect(firstObj[index].name_id).toEqual(secondCall.body[index].name_id);
    }
  });
});

describe("GET an artist name that does not exist", () => {
  test("Should return an empty list on error", async () => {
    const response = await request(app).get("/artist/asdewrqsa");
    expect({}).toEqual(response.body);
  });
});

describe("GET /:title/tabs to get url of a page", () => {
  test("URL for a default tab page of AC/DC's Highway to Hell", async () => {
    const response = await request(app).get("/\"highway to hell\"/tabs");
    expect(response.body).toEqual("http://www.songsterr.com/a/wa/song?id=289");
  });
});

describe("GET /:title/tabs with query to drum part", () => {
  test("Get url for drum part with /\"highway to hell\"/tabs?part=drum", async () => {
    const response = await request(app).get("/\"highway to hell\"/tabs?part=drum");
    expect(response.body).toEqual("https://www.songsterr.com/a/wsa/ac/dc-highway to hell-drum-tab-s289");
  });
});


describe("GET /:title/tabs with query to unregistered part", () => {
  test("Query a part that does not exist, should return default guitar part", async () => {
    const response = await request(app).get("/\"highway to hell\"/tabs");
    expect(response.body).toEqual("http://www.songsterr.com/a/wa/song?id=289");

  });
});

describe("GET /recent cache of songs that user looked at tabs for", () => {
  test("Make sure the cache of recent songs reflects what was recently looked at", async () => {
    const response = await request(app).get("/recent");
    expect(response.body[0].name_id).toEqual(289);
    expect(response.body.length).toEqual(1);
    await request(app).get("/test/tabs");
    second = await request(app).get("/recent");
    expect(second.body.length).toEqual(2);
  });
});

describe("GET a list of recommended based on default", () => {
  test("", async () => {
    const response = await request(app).get("/recommended");
    expect(response.body.length).toEqual(40);
  });
});

describe("POST a list that you want similar songs to be recommended", () => {
  test("On blank list given through post, do the same as get default", async () => {
    const response = await request(app).post("/recommended");
    const get_response =await request(app).get("/recommended");
    expect(get_response.body).toEqual(response.body);
  });
});

describe("GET favorite list", () => {
  test("List should be empty until frontend implemented", async () => {
    const response = await request(app).get("/favorites");
    expect(response.body).toEqual([]);
  });
});

describe("POST favorite song", () => {
  test("Should throw an error without a proper favorite list", async () => {
    const response = await request(app).get("/favorites");
    expect(response.body).toEqual([]);
  });
});
