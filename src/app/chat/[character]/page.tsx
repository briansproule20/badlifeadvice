"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useEcho } from "@merit-systems/echo-next-sdk/client";
import Header from "../../components/header";
import Chat from "../../components/chat";

const characters = {
  "gandalf": { name: "Gandalf", emoji: "🧙‍♂️" },
  "tony-soprano": { name: "Tony Soprano", emoji: "🤵" },
  "yoda": { name: "Master Yoda", emoji: "👽" },
  "tyrion": { name: "Tyrion Lannister", emoji: "🍷" },
  "rick-sanchez": { name: "Rick Sanchez", emoji: "🔬" },
  "gordon-ramsay": { name: "Gordon Ramsay", emoji: "👨‍🍳" },
  "sherlock": { name: "Sherlock Holmes", emoji: "🔍" },
  "deadpool": { name: "Deadpool", emoji: "🦸‍♂️" },
  "obi-wan": { name: "Obi-Wan Kenobi", emoji: "⚔️" }
};

export default function CharacterChat() {
  const params = useParams();
  const characterId = params.character as string;
  const character = characters[characterId as keyof typeof characters];
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const echoClient = useEcho();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isSignedIn={false} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600">You need to be signed in to chat with characters.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isSignedIn={isSignedIn} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Character Not Found</h1>
            <p className="text-gray-600">The character you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSignedIn={isSignedIn} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{character.emoji}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Chat with {character.name}
            </h1>
            <p className="text-gray-600">
              Get advice and wisdom from {character.name}
            </p>
          </div>
          <Chat characterId={characterId} />
        </div>
      </main>
    </div>
  );
}