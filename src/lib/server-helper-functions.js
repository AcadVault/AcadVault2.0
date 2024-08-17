import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const generateFilename = ({ courseName, materialType, year, exam, number, referenceBookName }) => {
    if (referenceBookName) return referenceBookName;
    if (exam) {
        return `${courseName} ${exam} ${year} ${materialType.split(" ")[1]} ${materialType.split(" ")[2]}`;
    } else {
        return `${courseName} Assignment-${number} ${materialType.split(" ")[1]} ${year}`
    }
}

export const getExtention = (fileName) => {
    const arr = fileName.split(".");
    return arr[arr.length - 1];
}

export const getSession = async () => {
    const session = await getServerSession(authOptions);
    return session;
}

export const getCurrentUser = async () => {
    const session = await getSession();
    if (!session) return null;
    return session.user;
}

export const isResourceManager = async (id) => {
    if (!id) return false;
    return process.env.RESOURCE_MANAGERS.includes(id);
}