"use client";

import { useAuthStore } from "@/store/Auth";
import React from "react";

function RegisterPage(){
    const {createAccount, login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect data from form
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        //validate inputs
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        //call the store
        setError('');
        setIsLoading(true);
        const result = await createAccount(`${firstName} ${lastName}`, email?.toString(), password?.toString());
        setIsLoading(false);
        if (result.error){
            setError (() => result.error!.message)
        }else{
            const loginResponse = await login(email.toString(),
            password.toString()
        )
        if (loginResponse.error){
            setError (() => loginResponse.error!.message)
        }
        }
        setIsLoading(() => false)
    }

    return (
        <div>
            {error && (
                <p className="error">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage