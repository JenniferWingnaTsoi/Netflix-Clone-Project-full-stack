//如果不登錄 無法回到主頁,只能在登錄頁面
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  //檢查用戶是否登錄
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false, // broswer不會緩存
      },
    };
  }
  //如果用戶已經登錄,返回一個空的props
  return {
    props: {},
  };
}

export default function Home() {
  const {data:user} = useCurrentUser();

  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix Clone</h1>
      <p className="text-white">Logged in as :{user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Log out
      </button>
    </>
  );
}
