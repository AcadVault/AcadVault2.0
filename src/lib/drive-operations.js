import { Readable } from "stream";
import { getDrive } from "./gdrive.config"
import { ROOT_FOLDER_ID, MATERIALS_FOLDER_ID, REQUESTS_FOLDER_ID } from "@/lib/constants";

export const searchFolder = async (folderName, parentFolderName) => {
    if (folderName === 'ROOT') return ROOT_FOLDER_ID;
    if (folderName === 'Materials') return MATERIALS_FOLDER_ID;
    if (folderName === 'Requests') return REQUESTS_FOLDER_ID;

    let parentFilter = '';
    if (parentFolderName) {
        const parentFolderID = await searchFolder(parentFolderName);
        parentFilter = parentFolderName ? `and '${parentFolderID}' in parents` : '';
    }
    const drive = getDrive();
    try {
        const res = await drive.files.list({ q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${folderName}' ${parentFilter}`, fields: 'files(id)' },);
        if (res.data.files.length > 0) return res.data.files[0].id;
        else throw { message: 'folder-not-found: ' + folderName };
    } catch (err) {
        throw err;
    }
}

export const uploadFile = async (fileObject, folderName, fileName) => {
    const drive = getDrive();
    const folderID = await searchFolder(folderName);
    const bytes = await fileObject.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data } = await drive.files.create({
        requestBody: {
            name: fileName || fileObject.name,
            parents: [folderID],
        },
        media: {
            mimeType: fileObject.mimeType,
            body: Readable.from(buffer),
        },
        fields: 'id, name, webViewLink',
    });
    return data;
}

export const createFolder = async (folderName, parentFolderName) => {
    if (!['ROOT', 'Materials', 'Requests'].includes(parentFolderName)) {
        throw { message: "outside allowed directories" }
    };
    const drive = getDrive();
    const parentFolderID = await searchFolder(parentFolderName);
    try {
        const { data } = await drive.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [parentFolderID],
            },
            fields: 'id',
        });
        return data;
    } catch (err) {
        throw err;
    }
}

export const listAllFolders = async (parentFolderName) => {
    if (!['ROOT', 'Materials', 'Requests'].includes(parentFolderName)) {
        throw { message: "outside allowed directories" }
    };
    const parentFolderID = await searchFolder(parentFolderName);
    const drive = getDrive();
    try {
        const res = await drive.files.list({ q: `mimeType='application/vnd.google-apps.folder' and trashed=false and '${parentFolderID}' in parents`, fields: 'files(id, name)' },);
        if (res.data.files) return res.data.files;
        else throw { message: 'folder-not-found' };
    } catch (err) {
        throw err;
    }
}

export const downloadFile = async (fileID) => {
    const drive = getDrive();
    const res = await drive.files.get({ fileId: fileID, alt: 'media', }, { responseType: 'stream' },);
    return res.data;
}

export const allowAccess = async (email) => {
    const drive = getDrive();
    const res = await drive.permissions.create({
        fileId: ROOT_FOLDER_ID,
        requestBody: {
            role: 'reader',
            type: 'user',
            emailAddress: email,
        },
    });
    return res.data;
}

export const denyAccess = async (email) => {
    const drive = getDrive();
    const res = await drive.permissions.delete({
        fileId: ROOT_FOLDER_ID,
        permissionId: email,
    });
    return res.data;
}

export const moveFile = async (fileID, fromFolderName, toFolderName) => {
    const drive = getDrive();
    const fromFolderID = await searchFolder(fromFolderName);
    const toFolderID = await searchFolder(toFolderName);
    const res = await drive.files.update({
        fileId: fileID,
        addParents: toFolderID,
        removeParents: fromFolderID,
        fields: 'id, parents',
    });
    return res.data;
}

export const deleteFile = async (fileID) => {
    const drive = getDrive();
    try {
        await drive.files.delete({
            fileId: fileID,
        });
    } catch (error) {
        throw error;
    }
};