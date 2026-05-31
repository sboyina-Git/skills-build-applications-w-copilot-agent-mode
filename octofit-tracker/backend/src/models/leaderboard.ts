import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
