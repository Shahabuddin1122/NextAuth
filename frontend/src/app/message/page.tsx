"use client"
import {Conversation} from "@/components/Conversation";
import Button from "@/components/button";
import {MessageBox} from "@/components/MessageBox";
import {signOut, useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';

const message = ()=>{
    const router = useRouter();
    const {data} = useSession();
    if(!data){
        router.push("/login")
    }
    return (
        <>
            <Button text={"SIgnOut"} onClick={()=> signOut()} />
            <div className="w-full h-screen border border-black flex justify-center items-center">
                <div className="w-4/5 h-2/3 flex flex-row gap-x-2 shadow-2xl">
                    <div className={"w-1/4 h-full"}>
                        <Conversation text={"Hridoy"}/>
                        <Conversation text={"Nafees"}/>
                        <Conversation text={"Nafees"}/>
                    </div>
                    <div className={"w-3/4 h-full border border-black relative"}>
                        <div className={"w-full h-[90%] flex flex-col overflow-y-scroll"}>
                            <MessageBox name={"Shahabuddin"} text={"Hello Everyone"}/>
                            <MessageBox name={"Hridoy"} text={"Hello"}/>

                        </div>
                        <div className={"w-full h-10 absolute bottom-0 flex flex-row gap-x-2"}>
                            <input type={"text"} placeholder={"send message.........."} className={"w-4/5 h-full border border-black px-2"}/>
                            <Button text={"Send"} onClick={()=>{}} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default message;
