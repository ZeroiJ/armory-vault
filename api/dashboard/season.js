const mockSeasonData = {
    name: 'Season of the Witch',
    currentRank: 127,
    maxRank: 200,
    currentXP: 75000,
    nextLevelXP: 100000,
    daysRemaining: 45,
    availableRewards: 8,
    nextReward: {
      name: 'Exotic Engram',
      rank: 130
    },
    weeklyChallenges: {
      completed: 7,
      total: 10
    }
  };

export default function handler(req, res) {
  res.status(200).json(mockSeasonData);
}
