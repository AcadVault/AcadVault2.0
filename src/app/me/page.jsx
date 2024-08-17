"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import { SessionContext } from "@/components/SessionProvider";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { session } = useContext(SessionContext);
    const [newUsername, setNewUsername] = useState(session.user.name);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = async () => {
        try {
            setIsUpdating(true);
            const response = await fetch(`/api/users/updateUserName`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email: session.user.email, username: newUsername, }),
            });
            if (response.ok) {
                const updatedUserData = await response.json();
                console.log("Updated username:", updatedUserData);
                toast.success("Username updated successfully!");
                setIsEditing(false);
            } else {
                console.error("Failed to update username:", response.statusText);
                toast.error("Could not update username");
            }
        } catch (error) {
            console.error("Error updating username:", error);
            toast.error("An error occurred while updating username");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <Helmet>
                <title>Profile | AcadVault2.0</title>
                <meta name="description" content="Your profile page" />
            </Helmet>
            <div className="flex items-center justify-center h-full">
                <div className="mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5">
                    <div className="bg-white bg-opacity-5  backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg transition ease-in-out duration-300 p-3 text-[#ffffff] py-5 px-5">
                        <div className="flex justify-center">
                            <Image src={session.user.image} alt="" width={100} height={100} priority={true} className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                        </div>
                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl mb-2 flex justify-center">
                                Hey, {isEditing ? null : ` ${newUsername}`} {isEditing ? (
                                    <div className="flex text-2xl justify-center">
                                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border bg-transparent border-gray-300 rounded-md mx-2 px-4 w-fit" />
                                        <button onClick={handleUpdateProfile} className={`inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 ${isUpdating ? 'cursor-not-allowed' : ''}`} disabled={isUpdating}><span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">Update</span></button>
                                    </div>
                                ) : (
                                    <span onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}> ✏️ </span>
                                )}
                            </h1>
                            <p className="text-center text-sm text-gray-400 font-medium"> {session.user.email} </p>
                            <div className="flex items-center justify-center mt-3">
                                <button onClick={() => signOut({ callbackUrl: "/login" })} className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                                    <span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">Log out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;