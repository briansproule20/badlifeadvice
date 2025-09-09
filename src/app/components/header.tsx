"use client";
import { signOut, useEcho } from "@merit-systems/echo-next-sdk/client";
import { useState, useEffect } from "react";

export default function Header({ isSignedIn }: { isSignedIn: boolean }) {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const echoClient = useEcho();

  useEffect(() => {
    if (isSignedIn) {
      const fetchUserAndBalance = async () => {
        try {
          const userInfo = await echoClient.users.getUserInfo();
          setUser(userInfo);
          
          const balanceInfo = await echoClient.balance.getBalance();
          setBalance(balanceInfo.balance);
        } catch (error) {
          console.log('Failed to fetch user info or balance:', error);
        }
      };
      fetchUserAndBalance();
    }
  }, [isSignedIn, echoClient]);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img src="/npc-chat favicon.png" alt="NPC Chat" className="w-8 h-8" />
              <div className="text-xl font-semibold text-black">
                NPC Chat
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Powered by Echo
              </span>
            </div>
          </div>

          {/* Navigation/User Info */}
          <div className="flex items-center space-x-4">
            {isSignedIn && user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-sm text-gray-600">
                  Welcome, {user.name || user.email}
                </div>
                <div className="text-sm text-gray-500 px-3 py-1 rounded-md border border-gray-300 bg-gray-50">
                  {balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Ready to chat with AI
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}