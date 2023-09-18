import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// useState 鉤子用於函數組件中創建和管理的狀態
//Auth: 代表登錄頁面的整體結構
// Input讓用戶輸入個人資料
const Auth = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => {
                    setName(ev.target.value);
                  }}
                  id="name"
                  type="name"
                  value={name}
                />
              )}
              <Input
                //標籤文本,顯示在輸入字段的上方,告訴用戶要輸入的東西
                label="Email"
                //回調函數,當輸入的字段值發生變化是,新值會傳遞給setEmail,更新email的值, 實現實時更新反映用戶的輸入
                onChange={(ev: any) => {
                  setEmail(ev.target.value);
                }}
                id="email"
                //告訴瀏覽器,用戶輸入時進行基於郵件格式的驗證
                type="email"
                //表示輸入字段當前的值
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => {
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition"
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition"
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
