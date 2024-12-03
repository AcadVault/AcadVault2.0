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
        const updatePromise = fetch(`/api/users/updateUserName`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email, username: newUsername }),
        }).then((response) => {
            if (!response.ok) throw new Error("Failed to update username");
            return response.json();
        });

        toast.promise(updatePromise, {
            loading: "Updating username...",
            success: "Username updated successfully!",
            error: "Could not update username. Please try again.",
        });

        try {
            await updatePromise;
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating username:", err);
        }
    };

    return (
        <div className="left-0 top-0 h-full w-full">
            <Helmet>
                <title>Profile | AcadVault2.0</title>
                <meta name="description" content="Your profile page" />
            </Helmet>
            <div className="flex flex-col items-center justify-center mx-auto w-11/12 sm:w-3/4">
                <div className="bg-white border rounded-lg transition ease-in-out duration-300 p-5 my-8 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-bold text-3xl mb-2 flex justify-center">
                                {isEditing ? null : ` ${newUsername}`}{" "}
                                {isEditing ? (
                                    <div className="flex justify-center">
                                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border-b bg-transparent mx-2 px-4" />
                                        <button onClick={handleUpdateProfile} className="inline-flex items-center justify-center me-2 text-white bg-black hover:bg-gray-900 rounded-lg text-base px-5 py-2.5">Update</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="inline-flex items-center justify-center text-white bg-black hover:bg-gray-900 rounded-lg text-sm px-4 py-2 ml-2">Edit Name</button>
                                )}
                            </h1>
                            <p className="text-sm text-gray-400 font-medium">{session.user.email}</p>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button onClick={() => signOut({ callbackUrl: "/login" })} className="inline-flex items-center justify-center me-2 text-white bg-black hover:bg-gray-900 rounded-lg text-base px-5 py-2.5">Log out</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white border rounded-lg transition ease-in-out duration-300 p-5 mb-8 w-full">
                    <h2 className="text-2xl font-semibold mb-2">Uploaded Materials</h2>
                    {isLoadingFiles ? (
                        <p>Loading...</p>
                    ) : userFiles.length > 0 ? (
                        <div className="flex-col gap-2">
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