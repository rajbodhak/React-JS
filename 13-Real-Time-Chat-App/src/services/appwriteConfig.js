
import {Client, Account, Databases} from "appwrite"

export const APPWRITE_ENDPOINT_URL = String(import.meta.env.VITE_APPWRITE_ENDPOINT_URL);
export const PROJECT_ID = String(import.meta.env.VITE_APPWRITE_PROJECT_ID);
export const DATABASE_ID = String(import.meta.env.VITE_APPWRITE_DATABASE_ID);
export const MESSAGES_COLLECTION_ID = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID);
export const ROOMS_COLLECTION_ID = String(import.meta.env.VITE_APPWRITE_ROOMS_COLLECTION_ID);


export const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT_URL)
    .setProject(PROJECT_ID);

export const account = new Account(client);

export const databases = new Databases(client);

export default client