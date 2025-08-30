import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    "Name": {type: String, required: true},
    "Email": {type: String, required: true},
    "Message": {type: String, required: true}
})

export default mongoose.models.ContactUsSchema|| mongoose.model('ContactUsers', ContactUsSchema);