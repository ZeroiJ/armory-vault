const mockActivities = [
    {
      id: 1,
      type: 'exotic_drop',
      playerName: 'Guardian Alpha',
      description: 'obtained',
      details: {
        item: 'Vex Mythoclast',
        location: 'Vault of Glass'
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      type: 'raid_completion',
      playerName: 'ClanMate_42',
      description: 'completed',
      details: {
        location: "King's Fall",
        score: '285,000'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: 'triumph',
      playerName: 'Guardian Beta',
      description: 'unlocked triumph',
      details: {
        item: 'Flawless Raider'
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: 'clan_activity',
      playerName: 'ClanLeader_99',
      description: 'invited new member',
      details: {
        item: 'DestinyPlayer_123'
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 5,
      type: 'pvp_match',
      playerName: 'Guardian Gamma',
      description: 'achieved',
      details: {
        item: 'We Ran Out of Medals',
        location: 'Trials of Osiris',
        score: '7-0'
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
    }
  ];

export default function handler(req, res) {
  res.status(200).json(mockActivities);
}
