"use client";
import Chat from "./components/chat";
import Header from "./components/header";
import { signIn, useEcho } from "@merit-systems/echo-next-sdk/client";
import { useState, useEffect } from "react";

const characters = [
  {
    id: "gandalf",
    name: "Gandalf",
    emoji: "🧙‍♂️",
    description: "Wise wizard offering guidance through your darkest hours and greatest challenges.",
    category: "Fantasy"
  },
  {
    id: "tony-soprano",
    name: "Tony Soprano", 
    emoji: "🤵",
    description: "Family man with questionable business practices. Take his advice at your own risk.",
    category: "TV Drama"
  },
  {
    id: "yoda",
    name: "Master Yoda",
    emoji: "👽",
    description: "Ancient Jedi Master. Patience and wisdom, he offers. Good advice, you will receive.",
    category: "Sci-Fi"
  },
  {
    id: "tyrion",
    name: "Tyrion Lannister",
    emoji: "🍷", 
    description: "Sharp wit and political cunning. He drinks and he knows things.",
    category: "Fantasy"
  },
  {
    id: "rick-sanchez",
    name: "Rick Sanchez",
    emoji: "🔬",
    description: "Genius scientist with questionable morals. His advice might break reality.",
    category: "Animation"
  },
  {
    id: "gordon-ramsay",
    name: "Gordon Ramsay",
    emoji: "👨‍🍳",
    description: "Passionate chef who will tell you exactly what he thinks. No sugar-coating.",
    category: "Celebrity"
  },
  {
    id: "sherlock",
    name: "Sherlock Holmes",
    emoji: "🔍",
    description: "Master detective with keen observation skills. Elementary problem-solving.",
    category: "Literature"
  },
  {
    id: "deadpool",
    name: "Deadpool",
    emoji: "🦸‍♂️",
    description: "Merc with a mouth. His advice comes with maximum effort and maximum sarcasm.",
    category: "Comics"
  },
  {
    id: "obi-wan",
    name: "Obi-Wan Kenobi",
    emoji: "⚔️",
    description: "Jedi Knight with infinite patience. From a certain point of view, great advice.",
    category: "Sci-Fi"
  }
];

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
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Choose Your Character
                            </h1>
                            <p className="text-xl text-gray-600">
                                Select a character to get personalized advice and chat
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {characters.map((character) => (
                                <div
                                    key={character.id}
                                    onClick={() => window.location.href = `/chat/${character.id}`}
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
                                >
                                    <div className="text-center">
                                        <div className="text-4xl mb-4">{character.emoji}</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {character.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {character.description}
                                        </p>
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {character.category}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}