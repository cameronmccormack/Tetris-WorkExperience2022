// This is a stub endpoint created to test pulling data through from the front end
export const leaderboardEndpoint = (req, res) => {
    return {
        scores: [
            { name: 'Best Player', score: 125000 },
            { name: 'Another Player', score: 110000 },
            { name: 'Player 3', score: 98000 },
            { name: 'Fourth Person', score: 50000 },
            { name: 'Final Player', score: 40000 }
        ]
    };
}
