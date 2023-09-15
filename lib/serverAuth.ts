/**
 * 服務器端認證函數,確保用戶只有在登入後,才可以訪問或進行某些特定操作
 * 有助於保護身份驗證信息
 * 使用nextauth & getsession 來處理用戶的身份認證和會話管理: 
 * 獲取用戶的會話信息+驗證用戶是否登錄,返回當時用戶的相關信息
 */
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

const serverAuth = async(req:NextApiRequest) =>{
    const session = await getSession({req});
    // 檢查是否有郵箱等信息
    if(!session?.user?.email){
        throw new Error('Not signed in');
    }

    // 如果找到,返回一個用戶數據對象
    const currentUser = await prismadb.user.findUnique({
        where:{
            email:session.user.email,
        }
    })

    if(!currentUser){
        throw new Error('Not signed in');
    }
    return {currentUser}
}

export default serverAuth;