"use client";

import { useState, useEffect, useContext } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { SessionContext } from "@/components/(layout)/SessionProvider";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import UserFileCard from "@/components/(me)/UserFileCard";

const ProfilePage = () => {
    const { session } = useContext(SessionContext);
    const [newUsername, setNewUsername] = useState(session.user.name);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userFiles, setUserFiles] = useState([]);
    const [isLoadingFiles, setIsLoadingFiles] = useState(true);

    useEffect(() => {
        const fetchUserFiles = async () => {
            try {
                const response = await fetch(`/api/users/getUserFiles?email=${session.user.email}`);
                const data = await response.json();

                if (data.success) {
                    setUserFiles(data.data);
                } else {
                    console.error("Failed to fetch user files:", data.error);
                }
            } catch (err) {
                console.error("Error fetching user files:", err);
            } finally {
                setIsLoadingFiles(false);
            }
        };

        fetchUserFiles();
    }, [session.user.email]);

    const handleUpdateProfile = async () => {
        try {
            setIsUpdating(true);
            const response = await fetch(`/api/users/updateUserName`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session.user.email, username: newUsername }),
            });
            if (response.ok) {
                const updatedUserData = await response.json();
                toast.success("Username updated successfully!");
                setIsEditing(false);
            } else {
                toast.error("Could not update username");
            }
        } catch (error) {
            toast.error("An error occurred while updating username");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="left-0 top-0 h-full w-full">
            <Helmet>
                <title>Profile | AcadVault2.0</title>
                <meta name="description" content="Your profile page" />
            </Helmet>
            <div className="flex flex-col items-center justify-center mx-auto w-11/12 sm:w-3/4 md:w-2/3">
                <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg transition ease-in-out duration-300 p-3 text-[#ffffff] py-5 px-5 mt-32 lg:w-3/5">
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
                <div className="mt-5 text-white text-center">
                    <h2 className="text-2xl font-semibold mb-2">Uploaded Materials:</h2>
                    {isLoadingFiles ? (
                        <p>Loading...</p>
                    ) : userFiles.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
                            {userFiles.map((file) => (
                                <UserFileCard key={file._id} file={file} />
                            ))}
                        </div>
                    ) : (
                        <p>No uploaded materials found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;