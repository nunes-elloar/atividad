import express, { response } from "express"
import cors from "cors"
import fs from "node:fs"

const app = express()
const DATABASE_URL = "./database/motorista.json"
const DATABASE_URL2 = "./database/onibus.json"
const PORT = 3333
app.use(express.json())
app.use(cors({
   origin:"*",
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true 
}))

//MOTORISTA
app.get("/motorista", async (res, req) => {
    try{ 
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const motoristas = JSON.parse(data)
        if(motoristas.length === 0){
            res.status(200).json({message:"Não possui motoristas!!!"})
        }
     }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
      }

});
app.post("/motorista", async (res, req) => {
    const {nome, dataNascimento, numeroCart} = req.body;

    if(!nome || typeof nome !== "string" || nome.trim() === ""){
        res.status(400).json({message:"O nome é obrigatório e deve ser em texto!!!"})
        return;
    }
    if(!dataNascimento || typeof dataNascimento !== "string" || dataNascimento.trim() === ""){
        res.status().json({message:"A data de nascimento é obrigatório e deve ser em texto!!"})
        return;
    }
    if(!numeroCart || typeof numeroCart !== "string" || numeroCart.trim() === ""){
        res.status().json({message:"O número da carteira de habilitação e deve ser em texto!"})
        return;
    }
    try{
            const novoMotorista = {
                id: Date.now().toString(),
                nome,
                dataNascimento,
                numeroCart
            }
            
            motorista.push(novoMotorista);
            await fs.writeFile(DATABASE_URL, JSON.stringify(motorista, null, 2))
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Internal server error"})
        }
})
//ÔNIBUS
app.get("/onibus", async (res, req) => {
    try{ 
        const data = await fs.readFile(DATABASE_URL2, 'utf-8')
        const onibus = JSON.parse(data)
        if(onibus.length === 0){
            res.status(200).json({message:"Não possui nenhum ônibus!!!"})
        }
     }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
      }

});
app.post("/onibus", async (res, req) => {
    const {placa, modelo, ano_fabricacao, capacidade} = req.body;

    if(!placa){
        res.status(400).json({message:"Oplaca é obrigatório!!!"})
        return;
    }
    if(!modelo){
        res.status().json({message:"A modelo é obrigatório"})
        return;
    }
    if(!ano_fabricacao){
        res.status().json({message:"A fabicação é obrigatória!"})
        return;
    }
    if(!capacidade){
        res.status().json({message:"A capacidade é obrigatória!"})
        return;
    }
    try{
            const onibus = {
                id: Date.now().toString(),
             placa,
             modelo,
             ano_fabricacao,
             capacidade
            }
            
            onibus2.push(onibus);
            await fs.writeFile(DATABASE_URL, JSON.stringify(onibus2, null, 2))
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Internal server error"})
        }
})


app.listen(PORT, ()=>{
    console.log("Servidor iniciado no portal:", PORT)
})