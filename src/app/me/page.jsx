"use client";

import { useState, useEffect, useContext } from "react";
import { signOut } from "next-auth/react";
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
                <div className="bg-neutral-950 border border-gray-300 rounded-lg transition ease-in-out duration-300 p-5 my-8 w-full">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
                        <div>
                            <h1 className="font-bold text-2xl lg:text-3xl mb-2 flex items-center gap-2">
                                {isEditing ? null : ` ${newUsername}`}{" "}
                                {isEditing ? (
                                    <div className="flex flex-col lg:flex-row gap-2">
                                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border-b bg-transparent" />
                                        <button onClick={handleUpdateProfile} className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-base px-4 py-2">Update</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-base px-4 py-2">Edit</button>
                                )}
                            </h1>
                            <p className="text-sm text-gray-200 font-medium">{session.user.email}</p>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: "/login" })} className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-base px-4 py-2">Log out</button>
                    </div>
                </div>
                <div className="bg-neutral-950 border border-gray-300 rounded-lg transition ease-in-out duration-300 p-5 mb-8 w-full">
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