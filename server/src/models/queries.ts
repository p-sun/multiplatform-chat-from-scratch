import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: String,
    stars: Number,
  },
  {
    query: {
      byName(name: string) {
        return this.find({ name });
      },
    },
  }
);
const ProjectModel = model('Project', ProjectSchema);
