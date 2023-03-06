import mongoose from "mongoose";
const schema = mongoose.Schema;

const commentSchema = new schema({
    boardId : String,
    comment: String,
    createDate: String,
    pwd: String,
});


const commentModel = mongoose.model("comment", commentSchema);

export default commentModel
