const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
import { Request,Response } from "express";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:3001`);
});
    
app.get('/jobs', async(req:any, res:any) => {
    try{
        const jobs = await prisma.Job.findMany()
        
        res.status(200).json(jobs)
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({msg: "Internal Server Error"})
    }
})

app.get('/jobs/:id', async(req:any, res:any) => {
    try{
        const id = parseInt(req.params.id)
        const job = await prisma.Job.findUnique({
            where: {id: id}
        })

        res.status(200).json(job)
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({msg: "Internal Server Error"})
    }
})