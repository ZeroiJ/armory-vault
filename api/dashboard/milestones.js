const mockMilestones = [
    {
      id: 1,
      name: 'Vow of the Disciple',
      type: 'Raid',
      progress: 4,
      total: 6,
      completed: false,
      rewards: ['Pinnacle Gear', 'Raid Weapons'],
      powerfulReward: '1810'
    },
    {
      id: 2,
      name: 'Grandmaster Nightfall',
      type: 'Nightfall',
      progress: 3,
      total: 3,
      completed: true,
      rewards: ['Adept Weapons', 'Ascendant Shards'],
      powerfulReward: '1810'
    },
    {
      id: 3,
      name: 'Crucible Playlist',
      type: 'Crucible',
      progress: 5,
      total: 8,
      completed: false,
      rewards: ['Powerful Gear'],
      powerfulReward: '1807'
    },
    {
      id: 4,
      name: 'Seasonal Challenges',
      type: 'Seasonal',
      progress: 12,
      total: 15,
      completed: false,
      rewards: ['Bright Dust', 'XP'],
      powerfulReward: '1805'
    }
  ];

export default function handler(req, res) {
  res.status(200).json(mockMilestones);
}
