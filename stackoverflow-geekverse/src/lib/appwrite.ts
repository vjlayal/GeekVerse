import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6a313a3a0029e3d9aa78");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
