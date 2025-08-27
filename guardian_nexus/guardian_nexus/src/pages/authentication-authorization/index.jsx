import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthenticationCard from './components/AuthenticationCard';
import TrustSignals from './components/TrustSignals';
import FeaturePreview from './components/FeaturePreview';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import Icon from '../../components/AppIcon';
import { getMembershipData, getCharacterData } from '../../utils/bungieApi';

const AuthenticationAuthorization = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);
  const [guardianData, setGuardianData] = useState(null);

  useEffect(() => {
    const handleBungieCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');

      if (authCode) {
        setAuthState('loading');
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: authCode }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error_description || 'Token exchange failed');
          }

          const tokenData = await response.json();

          // Fetch membership data
          const membershipData = await getMembershipData(tokenData.membership_id);
          const primaryMembership = membershipData.destinyMemberships[0]; // Assuming the first one is the primary

          // Fetch character data
          const characterData = await getCharacterData(primaryMembership.membershipType, primaryMembership.membershipId);

          // Extract relevant guardian data for display
          const characters = Object.values(characterData.characters.data);
          const firstCharacter = characters[0]; // Get the first character for display

          const realGuardianData = {
            name: firstCharacter?.classType === 0 ? 'Titan' : firstCharacter?.classType === 1 ? 'Hunter' : 'Warlock',
            class: firstCharacter?.classType === 0 ? 'Titan' : firstCharacter?.classType === 1 ? 'Hunter' : 'Warlock',
            powerLevel: firstCharacter?.light,
            emblem: `https://www.bungie.net${firstCharacter?.emblemPath}`,
            platform: primaryMembership.crossSaveOverride === 0 ? primaryMembership.membershipType : primaryMembership.crossSaveOverride,
            membershipId: primaryMembership.membershipId,
            membershipType: primaryMembership.membershipType,
            characters: characterData.characters.data,
            profile: characterData.profile.data,
            characterEquipment: characterData.characterEquipment.data,
            characterInventories: characterData.characterInventories.data,
          };

          setGuardianData(realGuardianData);
          setAuthState('success');
          localStorage.setItem('guardian_auth', JSON.stringify({
            authenticated: true,
            accessToken: tokenData.access_token,
            membershipId: tokenData.membership_id,
            timestamp: Date.now(),
            guardianData: realGuardianData, // Store real data
          }));

          setTimeout(() => navigate('/dashboard'), 3000);
        } catch (err) {
          setError({ type: 'token_exchange_failed', message: err.message });
          setAuthState('error');
        }
      }
    };

    if (window.location.pathname === '/auth/callback') {
      try {
        handleBungieCallback();
      } catch (error) {
        console.error('Error in handleBungieCallback:', error);
        setError({ type: 'callback_error', message: error.message });
        setAuthState('error');
      }
    }
  }, [navigate]);

    const handleAuthenticate = async (platform, rememberMe) => {
    // Redirect to Bungie.net for authorization
    const clientId = import.meta.env.VITE_BUNGIE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_BUNGIE_REDIRECT_URI; // Set in .env for local dev
    const bungieAuthUrl = `${import.meta.env.VITE_BUNGIE_OAUTH_URL}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = bungieAuthUrl;
  };

  const handleRetry = () => {
    setAuthState('idle');
    setError(null);
    setGuardianData(null);
  };

  const handleGoBack = () => {
    setAuthState('idle');
    setError(null);
    setGuardianData(null);
  };

  const renderContent = () => {
    switch (authState) {
      case 'loading': case'success':
        return <LoadingState guardianData={guardianData} />;
      case 'error':
        return <ErrorState error={error} onRetry={handleRetry} onGoBack={handleGoBack} />;
      default:
        return <AuthenticationCard onAuthenticate={handleAuthenticate} isLoading={false} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-background via-background to-primary/5 py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Connect Your <span className="text-primary">Guardian</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Securely link your Bungie.net account to unlock comprehensive Destiny 2 data tracking, 
                character management, and optimization tools.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-col xl:flex-row items-start justify-center gap-8 xl:gap-12">
              {/* Trust Signals - Left Side */}
              <TrustSignals />

              {/* Authentication Card - Center */}
              <div className="flex-shrink-0">
                {renderContent()}
              </div>

              {/* Feature Preview - Right Side */}
              <FeaturePreview />
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
};

export default AuthenticationAuthorization;