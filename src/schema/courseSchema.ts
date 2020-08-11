import mongoose, { Schema } from "mongoose";
import Icourse from "../types/Icourse";

const courseScehma: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, requied: true },
  isPublished: { type: Boolean, required: true, default: false },
});

export default mongoose.model<Icourse>("course", courseScehma);
