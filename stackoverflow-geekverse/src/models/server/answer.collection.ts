import {Permission} from "node-appwrite"
import {answerCollection, db} from "../name"
import { databases } from "./config"

export default async function createAnswerCollection () {
    try {
        await databases.getCollection(db, answerCollection)
        console.log("Answer Collection already exists.")
    } catch (error) {
        //Creating Collection
        await databases.createCollection(db, answerCollection, answerCollection, [
            Permission.create("users"),
            Permission.read("any"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Answer Collection Created Successfully!")

        //creating Attributes
        await Promise.all([
            databases.createStringAttribute(db, answerCollection, "content", 10000, true),
            databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
            databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        ])
        console.log("Answer Attributes Created Successfully!")
    }
}