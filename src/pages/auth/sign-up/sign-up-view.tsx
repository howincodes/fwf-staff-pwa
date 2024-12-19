import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";


export const SignUpView = () => {
const navigate=useNavigate()
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    {console.log("hello")}
    navigate("/")
}
  return (
    <div className="flex  justify-center">
      <div className="text-center p-5">
        <h1 className="text-2xl mt-10">{("Your name & email")}</h1>
        <p className=" p-5 text-zinc-500 leading-tight ">{("Please provide your full name as well as your email address.")}</p>
        <form id="StaffInfo" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder={("Enter your name")}
            className="bg-input text-input-foreground text-md  rounded-xl p-8 mt-8 w-full"

          />
        

            <>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-input text-input-foreground text-md  rounded-xl p-8 mt-4 w-full"
              />
            </>
          
        </form>
        <Button className="mt-10 w-full px-6 py-5" type="submit" onClick={()=>navigate("/")}>
                SignUp
        </Button>
      </div>
    </div>
  );
};
