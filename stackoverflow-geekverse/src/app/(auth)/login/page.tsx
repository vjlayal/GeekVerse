"use client";

import { useAuthStore } from "@/store/Auth";
import React from "react";

function LoginPage(){
    const {login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect data
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        //validate data
        if (!email || !password){
            setError('Please fill in all fields')
            return;
        }




        //call store (login =>store)
        setError(() => '')
        setIsLoading(() => true)
        const result = await login(email.toString(), password.toString())
        setIsLoading(() => false)

        if (result.error){
            console.log("Login failed",result.error)
            setError(() => result.error!.message)
        }
    }
    return (
        <div>LoginPage</div>
    )
}