import bcrypt from "bcrypt"; //用於密碼哈希操作
import { NextApiRequest, NextApiResponse } from "next"; //處理api REQ & RES
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") { //如果不為POST
    return res.status(405).end(); //405: method not allowed
  }

  try {
    const { email, name, password } = req.body; //從請求主體結構出用戶註冊的數據

    //使用db查詢特定email的現有用戶是否存在
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }
    //對密碼進行哈希處理,並存儲在在此變量,增加安全性
    const hashedPassword = await bcrypt.hash(password,12);
    const user = await prismadb.user.create({
        data:{
            email,
            name,
            hashedPassword,
            image:'',
            emailVerified:new Date(),
        }
    })
    //註冊成功返回200
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
  //如果發生任何錯誤或無效請求,返回400(BAD REQ)
  return res.status(400).end();
}
