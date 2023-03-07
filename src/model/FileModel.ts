import mongoose from "mongoose";

const schema = mongoose.Schema;

const fileSchema = new schema({
    fileName: String,
    createDate: String,
    author: String,
});


const fileModel = mongoose.model("file", fileSchema);

export default fileModel
