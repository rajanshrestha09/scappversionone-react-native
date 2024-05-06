import {Client, Account, ID} from 'appwrite';
import {APPWRITE_PROJECT_ID, APPWRITE_ENDPOINT} from "@env"

const appwriteClient = new Client();

const APPWRITE_ENDPOINT_LOCAL = APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID_LOCAL = APPWRITE_PROJECT_ID;


type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppWrite {
  account;
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT_LOCAL)
      .setProject(APPWRITE_PROJECT_ID_LOCAL);

    this.account = new Account(appwriteClient);
  }

  async createAccount({email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (!userAccount) {
        return userAccount;
      }
      return this.login({email, password});
    } catch (error) {
      console.log('Error::', error);
    }
  }

  async login({email, password}: LoginUserAccount) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log('Appwrite service:: loginAccount() :: ', error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout() :: ' + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }
}

const appwrite = new AppWrite();

export default appwrite;
