import mongoose from "mongoose";
const schema = mongoose.Schema;

const testSchema = new schema({
    testId : String,
    comment: String,
    title: String,
    pwd: String,
});


const testModel = mongoose.model("test", testSchema);

export default testModel
