import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    blogIds: [{ type: String }]
});

export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);
