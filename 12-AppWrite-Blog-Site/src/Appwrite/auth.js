import config from '../config/config'
import {Client, Account, ID} from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID)

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite auth :: createAccount :: Error", error);
        }
    }

    async login({email, password}) {
    try {
        const session = await this.account.createEmailPasswordSession(email, password);
        console.log('Session created:', session);
        return session;
    } catch (error) {
        console.log("Appwrite auth :: login :: Error", error);
        throw error; // Re-throw to handle elsewhere if needed
    }
}


    async getUserAccount() {
        try {
            const session = await this.account.getSession('current');
            if (session) {
                return await this.account.get();
            } else {
                throw new Error('No active session found');
            }
        } catch (error) {
            console.log("Appwrite auth :: getUserAccount :: Error", error);
            if (error.code === 401) {
                console.log('Unauthorized: Please log in again.');
            }
        }
    
        return null;
    }
    

    async logout() {
        try {
            return await this.account.deleteSessions()
       } catch (error) {
            console.log("Appwrite auth :: logout :: Error", error);
        }
    }

}

const authService = new AuthService;

export default authService;