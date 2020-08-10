let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);


describe('Tasks API', () => {

    /**
     * Test the GET route
     */
        it("It should GET all clients", (done) => {
            chai.request(server)
                .get("/clientes")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array'); 
                    response.headers["content-type"].should.contains('application/json');
                    response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all clients", (done) => {
            chai.request(server)
                .get("/cliente")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });
         /**
     * Test the GET (by id) route
     */
    describe("GET /clientes/:id", () => {
        it("It should GET a task by ID", (done) => {
            const clientId = 3;
            chai.request(server)                
                .get("/clientes/" + clientId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body[0].should.be.a('object');
                    response.body[0].should.have.property('id');
                    response.body[0].should.have.property('name');
                    response.body[0].should.have.property('city');
                    response.body[0].should.have.property('id').eq(3);
                done();
                });
        });

        it("It should NOT GET a task by ID", (done) => {
            const clientId= 123;
            chai.request(server)                
                .get("/clientes/" + clientId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The Client with the provided ID does not exist.");
                done();
                });
        });

    });

        
    /**
     * Test the POST route
     */
    describe("POST /add", () => {
        it("It should POST a new Client", (done) => {
            const cliente = {
                name: "Rodrigo",
                city: "New York"
            };
            chai.request(server)                
                .post("/add")
                .send(cliente)
                .end((err, response) => {
                    response.should.have.status(201);
    
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                name: "Juan",
                city:"Bog"
              
            };
            chai.request(server)                
                .post("/add")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });

        
    /**
     * Test the PUT route
     */
    describe("PUT /update/:id", () => {
        it("It should PUT an existing client", (done) => {
            const clientId = 5;
            const task = {
                name: "Camiloot Cambiado",
                city: "Cucuta"
            };
            chai.request(server)    
                .put("/update/" + clientId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                
                });

                
        });

        it("It should NOT PUT an existing cliente with a city with less than 3 characters", (done) => {
            const clientId = 5;
            const task = {
                name: "Talero",
                city: "Cal"
            };
            chai.request(server)                
                .put("/update/" + clientId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The city should be at least 3 chars long!");
                done();
                });
        });        
    });

        


    
    /**
     * Test the DELETE route
     */
    describe("DELETE /delete/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const clientId = 114;
            chai.request(server)                
                .delete("/delete/" + clientId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

    });


    
    });


