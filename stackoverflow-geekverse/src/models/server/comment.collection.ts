import {Permission} from "node-appwrite"
import {commentCollection, db} from "../name"
import { databases } from "./config"

export default async function createCommentCollection () {
    try {
        await databases.getCollection(db, commentCollection)
        console.log("Comment Collection already exists.")
    } catch (error) {
        //Creating Collection
        await databases.createCollection(db, commentCollection, commentCollection, [
            Permission.create("users"),
            Permission.read("any"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Comment Collection Created Successfully!")

        //creating Attributes
        await Promise.all([
            databases.createStringAttribute(db, commentCollection, "content", 10000, true),
            databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
            databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
            databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        ])
        console.log("Comment Attributes Created Successfully!")
    }
}