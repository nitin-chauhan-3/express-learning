import express from 'express';


const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let games = []
let gameId = 1


// add games
app.post('/games', (req, res) => {

  const {name, price} = req.body
  const newGame = {id: gameId++, name, price}
  games.push(newGame)
  res.status(201).send(newGame)
})

// get games
app.get('/games', (req, res) => {
  res.status(200).send(games);
})

// get games with id
app.get('/games/:id', (req,res) => {
  const Games = games.find(g => g.id === parseInt(req.params.id))
  if(!Games){
    res.status(404).send("Game not found")
  }
  res.status(200).send(Games)
})

//update games
app.put('/games/:id', (req, res) => {
  const gameId = games.find(g => g.id === parseInt(req.params.id))

  if(!gameId){
    res.status(404).send("Game not found")
  }
  const {name, price} = req.body
  gameId.name = name
  gameId.price = price
  res.status(200).send(gameId)
})


// delete game
app.delete('/games/:id', (req, res) => {
  const index = games.findIndex(g => g.id === parseInt(req.params.id))

  if(index === 1){
    return res.status(404).send("Game not found")
  }
  games.splice(index,1)
  return res.status(204).send("Deleted")
})


app.listen(port, () => {
  console.log(`This server is running at port: ${port}.... `);
  
});