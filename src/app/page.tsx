"use client";
import Chat from "./components/chat";
import Header from "./components/header";
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
        return (
            <div className="min-h-screen bg-gray-50">
                <Header isSignedIn={false} />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isSignedIn={isSignedIn} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {!isSignedIn ? (
                    <div className="text-center">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                                NPC Chat
                            </h1>
                            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                                Get life advice from your favorite characters and NPCs. Be warned, some of these individuals have not made good life choices.
                            </p>
                            <div className="mt-10">
                                <button
                                    onClick={() => signIn()}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    Sign In with Echo
                                </button>
                            </div>
                            <div className="mt-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    🚀 Powered by Echo & Merit Systems
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Chat with AI
                            </h1>
                            <p className="text-gray-600">
                                💰 Monetization Activated - Every message is tracked and monetized through Echo
                            </p>
                        </div>
                        <Chat />
                    </div>
                )}
            </main>
        </div>
    );
}