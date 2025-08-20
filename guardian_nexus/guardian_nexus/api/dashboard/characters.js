const mockCharacters = [
    {
      id: 1,
      name: 'Guardian Alpha',
      class: 'Titan',
      powerLevel: 1810,
      emblem: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=200&fit=crop',
      equippedExotic: {
        name: 'Thundercrash',
        type: 'Chest Armor'
      },
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Guardian Beta',
      class: 'Hunter',
      powerLevel: 1805,
      emblem: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
      equippedExotic: {
        name: 'Celestial Nighthawk',
        type: 'Helmet'
      },
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Guardian Gamma',
      class: 'Warlock',
      powerLevel: 1798,
      emblem: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      equippedExotic: {
        name: 'Phoenix Protocol',
        type: 'Chest Armor'
      },
      lastActivity: '3 days ago'
    }
  ];

export default function handler(req, res) {
  res.status(200).json(mockCharacters);
}
