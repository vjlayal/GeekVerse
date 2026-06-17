import {Permission} from "node-appwrite"
import {voteCollection, db} from "../name"
import { databases } from "./config"

export default async function createVoteCollection () {
    try {
        await databases.getCollection(db, voteCollection)
        console.log("Vote Collection already exists.")
    } catch (error) {
        //Creating Collection
        await databases.createCollection(db, voteCollection, voteCollection, [
            Permission.create("users"),
            Permission.read("any"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Vote Collection Created Successfully!")

        //creating Attributes
        await Promise.all([
            databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
            databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
            databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
            databases.createEnumAttribute(db, voteCollection, "type", ["answer", "question"], true),
        ])
        console.log("Vote Attributes Created Successfully!")
    }
}