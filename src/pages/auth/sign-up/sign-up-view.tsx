import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/store/api/authApi";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const SignUpView = () => {
const navigate=useNavigate()
const [registerUser] =useRegisterMutation();
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const location =useLocation();
  const phoneNumber = location.state.phone;
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await registerUser({
      name,
      email,
      phone: phoneNumber,
    }).unwrap();
    // successToast("Registered Successfully");
    navigate("/");
  } catch {
    // errorToast("Registration Failed", );
  }
};
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
            onChange={(e) => setName(e.target.value)}
          />
        

            <>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-input text-input-foreground text-md  rounded-xl p-8 mt-4 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          
        </form>
        <Button className="mt-10 w-full px-6 py-6 font-bold text-md" type="submit" form="StaffInfo">
                SignUp
        </Button>
      </div>
    </div>
  );
};
