import {db} from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import {databases} from "./config";

export default async function getOrCreateDB(){
    try{
        await databases.get(db)
        console.log("Database connection successful")
    } catch (error){
        try{
            await databases.create(db, db)
            console.log("Database created successfully")
        } catch (error){
            console.error("Error creating database", error)
        }
    }

    // Always attempt to verify and create collections
    try {
        await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection(),
        ])
        console.log("Collections verified/created successfully!")
        console.log("Database Connected successfully!")
    } catch (error) {
        console.error("Error verifying or creating collections", error)
    }

    return databases
}
