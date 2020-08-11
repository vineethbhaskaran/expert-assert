import { Document } from "mongoose";

export default interface Icourse extends Document {
  name: String;
  code: String;
  description: String;
  isPublished: Boolean;
}
