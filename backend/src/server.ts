import express from "express";
import wiktionaryRouter from "./routes/wiktionaryRoutes"


const app = express()
const PORT = 3010

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend server for wiktionary-app is running...')

})

app.use('/', wiktionaryRouter)

app.listen(PORT, () => {
    console.log(
        `Server for wiktionary-app running on http://localhost:${PORT}`
    )
})