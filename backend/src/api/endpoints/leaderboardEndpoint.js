import ScoreModel from '../models/scoreModel.js';

export const leaderboardEndpoint = async (req) => {
    const allScores = await ScoreModel.find({});
    return {
        scores: allScores
    };
}
