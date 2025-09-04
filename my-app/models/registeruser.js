import mongoose from "mongoose";

const RegisterUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const RegisterUser = mongoose.models.RegisterUser || mongoose.model('RegisterUser', RegisterUserSchema);

export default RegisterUser;