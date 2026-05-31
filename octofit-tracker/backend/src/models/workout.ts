import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  exercises: { name: string; durationMinutes: number; calories?: number }[];
  createdAt: Date;
}

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number },
});

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String },
    exercises: { type: [ExerciseSchema], default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
