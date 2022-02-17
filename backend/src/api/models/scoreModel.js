import mongoose from 'mongoose';

export const ScoreModel = mongoose.model('Scores', ScoringSchema, 'Scores');