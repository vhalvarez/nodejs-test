import app from "../src/app";
import request from "supertest";

describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an array", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe("POST /tasks", () => {
    describe("given a title and description", () => {
        const newTask = { title: "test task", description: "desc test" };

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200);
        });

        test("should have a content-type: application/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.header["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });

        test("should respond with an task ID", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe("when title and description is missing", () => {
        const fields = [
            {},
            { title: "task title" },
            { description: "task description" },
        ];

        for (const body of fields) {
            test("should response with a 400 status code", async () => {
                const response = await request(app).post("/tasks").send(body);
                expect(response.statusCode).toBe(400);
            });
        }
    });
});
