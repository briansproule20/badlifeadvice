"use client";
import Chat from "./components/chat";
import { signIn, useEcho } from "@merit-systems/echo-next-sdk/client";
import { useState, useEffect } from "react";

export default function Home() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const echoClient = useEcho();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const signedIn = await echoClient.isSignedIn();
                setIsSignedIn(signedIn);
            } catch (error) {
                setIsSignedIn(false);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [echoClient]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <button onClick={() => signIn()}>Sign In</button>
    }
    
    return <Chat />;
}