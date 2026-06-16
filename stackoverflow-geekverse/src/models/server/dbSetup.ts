import {db} from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import {databases} from "./config";

export default async function getOrCreateDB(){
    try{
        await databases.get(db)
        console.log("Databsae connection")
    } catch (error){
        try{
            await databases.create(db, db)
            console.log("database ceated")

            //create Collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ])
            console.log("Collection created successfully!")
            console.log("Database Connected successfully!")
        } catch (error){
            console.error("Error creating database or collections", error)
        }
    }
    return databases
}
