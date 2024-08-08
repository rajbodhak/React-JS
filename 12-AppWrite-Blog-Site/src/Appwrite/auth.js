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
            return await this.account.createEmailPasswordSession(email, login)
        } catch (error) {
            console.log("Appwrite auth :: login :: Error", error);
        }
    }

    async getUserAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite auth :: getUserAccount :: Error", error);
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