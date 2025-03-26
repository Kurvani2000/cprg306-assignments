"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleLogin = async () => {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center">
            {!user ? (
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-violet-200 text-violet-900 rounded hover:bg-violet-300"
                >
                    Login with GitHub
                </button>
            ) : (
                <div className="text-center">
                    <p className="mb-4 text-violet-900">
                        Welcome, {user.displayName} ({user.email})
                    </p>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-violet-400 text-violet-900 rounded hover:bg-violet-500 mb-4"
                    >
                        Logout
                    </button>
                    <Link href="./week-9/shopping-list">
                        <p className="px-4 py-2 bg-violet-200 text-violet-900 rounded hover:bg-violet-300">
                            Go to Shopping List
                        </p>
                    </Link>
                </div>
            )}
        </main>
    );
}