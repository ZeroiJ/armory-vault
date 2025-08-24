const mockVendors = [
    {
      id: 1,
      name: 'Xur',
      location: 'Tower Hangar',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=100&h=100&fit=crop',
      resetTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      featuredItems: [
        {
          name: 'Gjallarhorn',
          type: 'Exotic Rocket Launcher',
          rarity: 'Exotic',
          cost: '29',
          icon: 'Rocket'
        },
        {
          name: 'Orpheus Rig',
          type: 'Hunter Leg Armor',
          rarity: 'Exotic',
          cost: '23',
          icon: 'Shield'
        }
      ]
    },
    {
      id: 2,
      name: 'Ada-1',
      location: 'Tower Annex',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=100&h=100&fit=crop',
      resetTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
      featuredItems: [
        {
          name: 'Protective Light',
          type: 'Combat Style Mod',
          rarity: 'Legendary',
          cost: '10',
          icon: 'Shield'
        },
        {
          name: 'Charged with Light',
          type: 'Combat Style Mod',
          rarity: 'Legendary',
          cost: '10',
          icon: 'Zap'
        }
      ]
    }
  ];

export default function handler(req, res) {
  res.status(200).json(mockVendors);
}
