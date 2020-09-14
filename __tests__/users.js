const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    //run the seeds programatically before each test to start fresh
    await db.seed.run()
})
afterAll(async () => {
    //close the database connection so the test process doesn't hang or give a warning
    await db.destroy()
})

describe('hobbits integration tests', () => {
    it("GET /Users", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[1].name).toBe("Jailene")
    
    })
    it("GET /Users/:id", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].name).toBe("Kadeem")
    })
    it("POST /Users" , async () => {
        const res = await supertest(server)
            .post("/users")
            .send({ name: "Deem"})
            expect(res.statusCode).toBe(201)
            expect(res.type).toBe("application/json")
            expect(res.body.name).toBe("Deem")
    })
    it("Put /Users/:id", async () => {
        const res = await supertest(server)
            .put("/users")
            expect(res.statusCode).toBe(404)
            expect(res.type).toBe("application/json")

    })
    it("DELETE /:id", async () => {
        const res = await supertest(server).delete("/users/1")
        expect(res.statusCode).toBe(500)
    })
    it("DELETE /user/:id sends error if user not found", async () => {
        const res = await supertest(server).delete("/users/70")
        expect(res.statusCode).toBe(500)
        expect(res.type).toBe("application/json")
    })
    
})
