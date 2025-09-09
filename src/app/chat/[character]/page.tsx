"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useEcho } from "@merit-systems/echo-next-sdk/client";
import Header from "../../components/header";
import Chat from "../../components/chat";

const characters = {
  "nazeem": { name: "Nazeem", avatar: "/avatars/nazeem.png" },
  "adoring-fan": { name: "Adoring Fan", avatar: "/avatars/adoring-fan.png" },
  "angry-shrek": { name: "Angry Shrek", avatar: "/avatars/angry-shrek.png" },
  "democracy-officer": { name: "Democracy Officer", avatar: "/avatars/democracy-officer.png" },
  "dwight-schrute": { name: "Dwight Schrute", avatar: "/avatars/dwight-schrute.png" },
  "madara": { name: "Madara Uchiha", avatar: "/avatars/madara.png" },
  "michael-scott": { name: "Michael Scott", avatar: "/avatars/michael-scott.png" },
  "minecraft-villager": { name: "Minecraft Villager", avatar: "/avatars/minecraft-villager.png" },
  "ron-swanson": { name: "Ron Swanson", avatar: "/avatars/ron-swanson.png" },
  "arthur-morgan": { name: "Arthur Morgan", avatar: "/avatars/arthur-morgan.png" },
  "yennefer": { name: "Yennefer", avatar: "/avatars/yennefer.png" },
  "tommy-shelby": { name: "Tommy Shelby", avatar: "/avatars/tommy-shelby.png" },
  "walter-white": { name: "Walter White", avatar: "/avatars/walter-white.png" }
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
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img src={character.avatar} alt={character.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Chat with {character.name}
            </h1>
            <p className="text-gray-600">
              Get advice and wisdom from {character.name}
            </p>
          </div>
          <Chat characterId={characterId} characterName={character.name} />
        </div>
      </main>
    </div>
  );
}