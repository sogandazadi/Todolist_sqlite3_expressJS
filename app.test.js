const request = require("supertest");
const app = require("./app");
const sequelize = require("./database");
const Task = require("./model/todo")

beforeAll(async () => {await sequelize.sync();});
beforeEach(async ()=> {await Task.destroy({where:{}});});

describe("POST /todos" ,() =>{
    it("POST /todos --> created todo" , ()=> {
        return request(app).post("/todos").send({
            todo:"eat",
            priority:"high",
            status:"TO DO"
        }).expect("Content-Type" , /json/).expect(201)
        .then((response) =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    todo:"eat",
                    priority:"high",
                    status:"TO DO"
                }),
            );
        });
    });
});
