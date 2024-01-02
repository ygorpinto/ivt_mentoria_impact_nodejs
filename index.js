const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000

let users = []

 // middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Plataform impact api v 1.0");
})

app.get('/api/v1/users', (req, res) => {
  res.send(users);
})

app.post('/api/v1/users', (req, res) => {

  users.push(req.body);

  res.send({
    status: "success",
    message: req.body
  });
})

app.delete('/api/v1/users/:nome', (req, res) => {

  if (users.find(i => i.name == req.params.nome)) {
    users = users.filter( i => i.name != req.params.nome);

    res.send({
      status: "success",
      message: "Usuario com nome " + req.params.nome + " deletado"
    });
  } else {
    res.send({
      status: "failed",
      message: "Usuario com nome " + req.params.nome + " nao existe"
    });
  }

})

app.put('/api/v1/users/:nome',(req,res) => {
  if (users.find(i => i.name == req.params.nome)) {
    // atualiza!
    let oldUser = users.find( i => i.name == req.params.nome)
    let newUser = req.body
    users = users.filter( i => i.name != oldUser.name);
    users.push(newUser);
    res.send({
      status: "success",
      message: "Usuario com nome " + oldUser.name + " atualizado para " + newUser.name
    });
  } else {
    // se nao dou o erro
    res.send({
      status: "failed",
      message: "Usuario com nome " + req.params.nome + " nao existe"
    });
  }
})

app.listen(port, () => {
  console.log(`API plataforma impact rodando na porta... ${port}`)
})

module.exports = app