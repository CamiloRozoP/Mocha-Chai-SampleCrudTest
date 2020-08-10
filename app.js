const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3050;

const app = express();
const utils = require('./utils/task-schema.js')
app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node20_mysql",
});

//Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a mi app");
});
//todos los clientes
app.get("/clientes", (req, res) => {
  const sql = "SELECT * from customers";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Sin resultados");
    }
  });

});
//cliente por id
app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE id=${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).send("The Client with the provided ID does not exist.");
      }
    });
  });
//añadir un cliente
app.post("/add", (req, res) => {
  const { error } = utils.validateTask(req.body);
  if(error) return res.status(400).send("The name should be at least 3 chars long!")
    const sql = 'INSERT INTO customers SET ?'
    const clienteObj ={
        name: req.body.name,
        city: req.body.city
    }

    
 connection.query(sql,clienteObj,error=>{
  
  if (error) throw error;
     res.status(201).send('Cliente creado')
 })   

});
//actualizar cliente
app.put("/update/:id", (req, res) => {
  const { error } = utils.validateTask(req.body);
  if(error) return res.status(400).send("The city should be at least 3 chars long!")
    const { id } = req.params;
    const { name, city } = req.body;
    const sql = `UPDATE customers SET name = '${name}', city='${city}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Cliente Actualizado!');
    });
  });

  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Cliente eliminado');
    });
  });



// Check connect
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});


module.exports = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
