import express, { response } from "express"
import cors from "cors"
import {promises as fs} from "node:fs"

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

    if(!nome){
        res.status(404).json({message:"O nome é obrigatório e deve ser em texto!!!"})
        return;
    }
    if(!dataNascimento ){
        res.status(404).json({message:"A data de nascimento é obrigatório e deve ser em texto!!"})
        return;
    }
    if(!numeroCart){
        res.status(404).json({message:"O número da carteira de habilitação e deve ser em texto!"})
        return;
    }
    const novoMotorista = {
            id_motorista: Date.now().toString(),
            nome,
            dataNascimento,
            numeroCart,
            id_onibus: 0,
        };
        
    try{
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const motorista = await JSON.parse(data)

            motorista.motoristas.push(novoMotorista)

            await fs.writeFile(DATABASE_URL, JSON.stringify(motorista, null, 2))

            res.status(201).json({message:"Motorista cadastrado!"})

        }catch(err){
            console.log(err)
            res.status(500).json({message:"Internal server error"})
        }
});
//ÔNIBUS
app.get("/onibus", async (res, req) => {
    try{ 
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
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
        const data = await fs.readFile(DATABASE_URL, 'utf-8')
        const onibusX = JSON.parse(data)

            const onibus = {
                id: Date.now().toString(),
             placa,
             modelo,
             ano_fabricacao,
             capacidade
            }
            
            onibusX.onibus.push(onibus);
            await fs.writeFile(DATABASE_URL, JSON.stringify(onibusX, null, 2))
            res.status(200).json({message:"Ônibus cadastrado!"})
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Internal server error"})
        }
})


app.listen(PORT, ()=>{
    console.log("Servidor iniciado no portal:", PORT)
})