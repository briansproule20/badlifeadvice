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
                // Try to get user info - if it succeeds, we're signed in
                const userInfo = await echoClient.users.getUserInfo();
                setIsSignedIn(!!userInfo);
            } catch (error) {
                console.log('Auth check failed:', error);
                setIsSignedIn(false);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [echoClient]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {!isSignedIn ? (
                <button onClick={() => signIn()}>Sign In</button>
            ) : (
                <div>
                    <p>Monetization Activated 📈</p>
                    <Chat />
                </div>
            )}
        </div>
    );
}