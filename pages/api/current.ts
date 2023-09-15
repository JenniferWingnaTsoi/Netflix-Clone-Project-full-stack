import { NextApiRequest,NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    // prevent the code to go any further if not get
    if(req.method!=='GET'){
        return res.status(405).end();
    }

    try{
        //將用戶信息作為JSON數據返回給客戶端
        const{currentUser} = await serverAuth(req);
        return res.status(200).json(currentUser);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}