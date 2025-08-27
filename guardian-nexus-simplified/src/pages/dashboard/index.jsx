import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterData, getMilestones, getVendors, getActivities, getSeasonData } from '../../utils/bungieApi'; // Import Bungie API functions
import Header from '../../components/ui/Header';
import CharacterCard from './components/CharacterCard';
import MilestoneCard from './components/MilestoneCard';
import VendorCard from './components/VendorCard';
import ActivityFeed from './components/ActivityFeed';
import SeasonalProgress from './components/SeasonalProgress';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // State for our data
  const [characters, setCharacters] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem('guardian_auth'));
      if (!authData || !authData.authenticated) {
        // Handle not authenticated state, maybe redirect to login
        setLoading(false);
        return;
      }

      const { membershipId, membershipType, guardianData } = authData;

      // Use characters from guardianData stored during authentication
      const charactersArray = Object.values(guardianData.characters);
      setCharacters(charactersArray);
      if (charactersArray.length > 0) {
        setSelectedCharacter(charactersArray[0]);
      }

      // Fetch other data using Bungie API functions
      const [milestonesRes, vendorsRes, activitiesRes, seasonRes] = await Promise.all([
        getMilestones(membershipType, membershipId),
        getVendors(membershipType, membershipId),
        getActivities(membershipType, membershipId),
        getSeasonData(membershipType, membershipId),
      ]);

      setMilestones(milestonesRes);
      setVendors(vendorsRes);
      setActivities(activitiesRes);
      setSeasonData(seasonRes);

    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      // Handle error state in UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleTransferItems = () => {
    console.log('Transfer items clicked');
  };

  const handleVaultAccess = () => {
    console.log('Vault access clicked');
  };

  const handleLoadoutSwitch = () => {
    console.log('Loadout switch clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" className="animate-spin h-12 w-12 text-primary mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, Guardian
                </h1>
                <p className="text-muted-foreground">
                  Your Destiny 2 overview and quick access to game features
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
                
                <Link to="/character-management">
                  <Button
                    variant="default"
                    iconName="Users"
                    iconPosition="left"
                  >
                    Manage Characters
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Characters & Milestones */}
            <div className="lg:col-span-8 space-y-6">
              {/* Characters Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Characters
                  </h2>
                  <Link 
                    to="/character-management"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {characters?.map((character) => (
                    <CharacterCard
                      key={character?.id}
                      character={character}
                      isActive={selectedCharacter?.id === character?.id}
                      onClick={setSelectedCharacter}
                    />
                  ))}
                </div>
              </div>

              {/* Weekly Milestones */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Weekly Milestones
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Resets in 2d 14h
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {milestones?.map((milestone) => (
                    <MilestoneCard
                      key={milestone?.id}
                      milestone={milestone}
                    />
                  ))}
                </div>
              </div>

              {/* Vendor Rotation */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Vendor Rotation
                  </h2>
                  <Link 
                    to="/weapon-armor-database"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View All Vendors
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vendors?.map((vendor) => (
                    <VendorCard
                      key={vendor?.id}
                      vendor={vendor}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activity Feed & Quick Actions */}
            <div className="lg:col-span-4 space-y-6">
              {/* Seasonal Progress */}
              <SeasonalProgress seasonData={seasonData} />

              {/* Quick Actions */}
              <QuickActions
                onTransferItems={handleTransferItems}
                onVaultAccess={handleVaultAccess}
                onLoadoutSwitch={handleLoadoutSwitch}
              />

              {/* Activity Feed */}
              <ActivityFeed activities={activities} />
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Navigation
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/weapon-armor-database"
                className="flex flex-col items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name="Database" size={24} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Database</span>
                <span className="text-xs text-muted-foreground text-center">Weapons & Armor</span>
              </Link>
              
              <Link
                to="/loadout-builder-optimizer"
                className="flex flex-col items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name="Settings" size={24} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Builder</span>
                <span className="text-xs text-muted-foreground text-center">Loadout Optimizer</span>
              </Link>
              
              <Link
                to="/collections-triumphs"
                className="flex flex-col items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name="Trophy" size={24} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Collections</span>
                <span className="text-xs text-muted-foreground text-center">Triumphs</span>
              </Link>
              
              <Link
                to="/character-management"
                className="flex flex-col items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name="Users" size={24} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Characters</span>
                <span className="text-xs text-muted-foreground text-center">Management</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
