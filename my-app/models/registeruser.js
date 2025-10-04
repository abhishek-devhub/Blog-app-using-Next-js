import mongoose from "mongoose";
import bcrypt from "bcrypt";

const RegisterUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash the password before saving the user
RegisterUserSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        return next(err);
    }
})
// comparing the hashed password
RegisterUserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
const RegisterUser = mongoose.models.RegisterUser || mongoose.model('RegisterUser', RegisterUserSchema);

export default RegisterUser;