import express, { response } from "express"
import cors from "cors"
import {promises as fs} from "node:fs"

const DATA_BASE = "./database/base_dados.json"
const PORT = 3333
const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
)


app.get("/instrutores", async (response, request) => {

    try{
        const data = await fs.readFile(DATA_BASE, "utf-8")
        const dataBase = await JSON.parse(data)

    
        const instrutor = dataBase.usuarios.filter((u) => u.tipo === "instrutor")

        console.log(instrutor)
        if(!instrutor){
            response.status(404).json({menssage: "Instrutores não encontrados"})
            return
        }

        response.status(200).json(instrutor)
    } catch(error){
        console.log(error)
        response.status(500).json({menssage:"Internal server error"})
        
    }
})
// app.get("/cursos/com-muitos-comentario?min=3",  async(response, request) => {})
// app.get("/usuarios/:id/cursos ",  async (response, request) => {})
// app.get("/usuarios/com-progresso-acima?min=80", async (response, request) => {})
// app.get("/usuarios/:id/comentarios ", async (response, request) => {})
// app.get("/cursos/:id/media-progresso", async (response, request) => {})
// app.get("/cursos/:id/media-nota ", async (response, request) => {})
// app.get("/cursos/:id/duracao-total ",  async (response, request) => {})
// app.get("/instrutores/:id/quantidade-cursos", (response, request) => {})
// app.get("/certificados/por-curso", async (response, request) => {})
// app.get("/usuarios/agrupados-por-tipo ", async (response, request) => {})
// app.get("/cursos/ordenados-por-nota",  async (response, request) => {})
// app.get("/usuarios/com-multiplos-certificados", (response, request) => {})
// app.get("/cursos/:id/alunos-progresso-alto?min=90",  async (response, request) => {})
// app.get("/usuarios/:id/status-cursos", async (response, request) => {})

// app.patch("/usuarios/:id/progresso/:cursoId", async (response, request) => {})
// app.post("/cursos", async (response, request) => {})
// app.post("/cursos/:id/comentarios", async (response, request) => {})
// app.post("/certificados", async (response, request) => {})
// app.delete("/cursos/sem-comentarios", async (response, request) => {})

app.listen(PORT, () =>{
    console.log("Servidor iniciado na porta:", PORT)
})