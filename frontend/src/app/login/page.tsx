"use client"
import Button from "@/components/button";
import React, {ChangeEvent, useState} from "react";
import {signIn,useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';

let stompClient = null;
 const login = ()=>{
     const router = useRouter();
    const { data: session } = useSession()
    const [userData,setUserData] = useState({
        email:"",
        password:"",

    })
     if(session){
         router.push('/message');
     }
    function handleUserName(e:ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setUserData({...userData,[name]:value})
    }

    async function handleSubmit(){
        console.log(userData);
        await signIn("credentials",{
            email:userData.email,
            password:userData.password,
            redirect:true,
            callbackUrl:"/message"
        })
    }

    async function handleGoogleRequest(){
        await signIn('google')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }


    return (
        <>
            <div className={"w-full h-screen flex justify-center items-center"}>
                <div className={"w-2/5 h-[300px] border-2 border-black "}>
                    <div className={"w-full h-1/4 border-black border flex justify-center items-center"}>
                        <h1 className="text-center text-2xl font-bold">Login</h1>
                    </div>
                    <div className={"w-full h-3/4 flex  flex-col justify-center items-center gap-y-3"}>
                        <input type={"text"}
                               name={"email"}
                               value={userData.email}
                               onChange={handleUserName}
                               placeholder={"Enter your Name"}
                               className={"w-3/5 h-[40px] border border-black px-3"}
                        />
                        <input type={"password"}
                               name={"password"}
                               value={userData.password}
                               onChange={handleUserName}
                               placeholder={"Enter Password"}
                               className={"w-3/5 h-[40px] border border-black px-3"}
                        />
                        <Button text={"Login"} onClick={handleSubmit}/>
                        <Button text={"Sign In with Google"} onClick={handleGoogleRequest} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default login;