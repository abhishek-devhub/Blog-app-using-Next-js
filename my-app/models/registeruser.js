import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const RegisterUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

RegisterUserSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

RegisterUserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
const RegisterUser = mongoose.models.RegisterUser || mongoose.model('RegisterUser', RegisterUserSchema);

export default RegisterUser;