import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthenticationCard from './components/AuthenticationCard';
import TrustSignals from './components/TrustSignals';
import FeaturePreview from './components/FeaturePreview';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import Icon from '../../components/AppIcon';

const AuthenticationAuthorization = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);
  const [guardianData, setGuardianData] = useState(null);

  // Mock authentication flow
  // New handler for Bungie API callback
  useEffect(() => {
    const handleBungieCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');

      if (authCode) {
        setAuthState('loading');
        try {
          // Simulate exchanging auth code for an access token
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock successful token exchange
          const mockGuardianData = {
            name: 'Guardian_Beta',
            class: 'Warlock',
            powerLevel: 1810,
            emblem: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=80&h=80&fit=crop',
            platform: 'bungie'
          };

          setGuardianData(mockGuardianData);
          setAuthState('success');
          localStorage.setItem('guardian_auth', JSON.stringify({
            authenticated: true,
            guardianData: mockGuardianData,
            timestamp: Date.now()
          }));

          setTimeout(() => navigate('/dashboard'), 3000);
        } catch (err) {
          setError({ type: 'token_exchange_failed', message: err.message });
          setAuthState('error');
        }
      }
    };

    if (window.location.pathname === '/auth/callback') {
      handleBungieCallback();
    }
  }, [navigate]);

  const handleAuthenticate = async (platform, rememberMe) => {
    setAuthState('loading');
    setError(null);

    // Redirect to Bungie.net for authorization
    const clientId = 'YOUR_BUNGIE_CLIENT_ID'; // Replace with your actual Client ID
    const redirectUri = 'https://zeroij.github.io/destiny2-companion-app/auth/callback';
    const bungieAuthUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = bungieAuthUrl;

    // The original mock flow is now replaced by the Bungie OAuth redirect.
    // The rest of this function will not be executed after the redirect.


    // Simulate authentication process
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock random success/failure for demonstration
      const shouldSucceed = Math.random() > 0.3; // 70% success rate

      if (shouldSucceed) {
        // Mock successful authentication
        const mockGuardianData = {
          name: 'Guardian_Alpha',
          class: 'Titan',
          powerLevel: 1810,
          emblem: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=80&h=80&fit=crop',
          platform: platform
        };

        setGuardianData(mockGuardianData);
        setAuthState('success');

        // Store authentication data if remember me is checked
        if (rememberMe) {
          localStorage.setItem('guardian_auth', JSON.stringify({
            authenticated: true,
            platform: platform,
            guardianData: mockGuardianData,
            timestamp: Date.now()
          }));
        }

        // Redirect to dashboard after successful authentication
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        // Mock authentication failure
        const errorTypes = ['network', 'auth_failed', 'account_restricted', 'maintenance', 'rate_limit'];
        const randomError = errorTypes?.[Math.floor(Math.random() * errorTypes?.length)];
        
        throw new Error(randomError);
      }
    } catch (err) {
      setError({
        type: err?.message,
        code: `BNG-${Math.floor(Math.random() * 9000) + 1000}`,
        timestamp: new Date()?.toISOString()
      });
      setAuthState('error');
    }
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

  // Check for existing authentication on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('guardian_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        const isExpired = Date.now() - authData?.timestamp > 7 * 24 * 60 * 60 * 1000; // 7 days

        if (authData?.authenticated && !isExpired) {
          // Auto-redirect if already authenticated
          navigate('/dashboard');
        } else {
          // Clear expired authentication
          localStorage.removeItem('guardian_auth');
        }
      } catch (err) {
        localStorage.removeItem('guardian_auth');
      }
    }
  }, [navigate]);

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

        {/* Security & Privacy Section */}
        <div className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Your Data is <span className="text-primary">Secure</span>
                </h2>
                <p className="text-muted-foreground">
                  We use official Bungie.net OAuth authentication to ensure your account remains safe and secure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Official API</h3>
                  <p className="text-sm text-muted-foreground">
                    Direct integration with Bungie's official API ensures authentic and up-to-date game data.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Lock" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">OAuth Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry-standard OAuth 2.0 authentication protects your credentials and personal information.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Eye" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Read-Only Access</h3>
                  <p className="text-sm text-muted-foreground">
                    We only request read permissions to view your game data - we cannot modify anything.
                  </p>
                </div>
              </div>

              {/* Data Access Permissions */}
              <div className="mt-12 bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Info" size={20} className="mr-2 text-primary" />
                  Data Access Permissions
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Character profiles and statistics
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Inventory and equipment data
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Triumph and collection progress
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Activity history and match data
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Clan membership information
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      Seasonal progress tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationAuthorization;