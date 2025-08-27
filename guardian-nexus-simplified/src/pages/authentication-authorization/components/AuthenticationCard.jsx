import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthenticationCard = ({ onAuthenticate, isLoading }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const platforms = [
    { id: 'steam', name: 'Steam', icon: 'Monitor', color: 'bg-blue-600' },
    { id: 'playstation', name: 'PlayStation', icon: 'Gamepad2', color: 'bg-blue-800' },
    { id: 'xbox', name: 'Xbox', icon: 'Gamepad', color: 'bg-green-600' },
    { id: 'epic', name: 'Epic Games', icon: 'Zap', color: 'bg-gray-700' }
  ];

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
  };

  const handleAuthenticate = () => {
    if (selectedPlatform) {
      onAuthenticate(selectedPlatform, rememberMe);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your Guardian</h2>
        <p className="text-muted-foreground text-sm">
          Link your Bungie.net account to access your Destiny 2 data
        </p>
      </div>
      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Select Your Gaming Platform
        </label>
        <div className="grid grid-cols-2 gap-3">
          {platforms?.map((platform) => (
            <button
              key={platform?.id}
              onClick={() => handlePlatformSelect(platform?.id)}
              className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selectedPlatform === platform?.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-8 h-8 ${platform?.color} rounded flex items-center justify-center mr-2`}>
                <Icon name={platform?.icon} size={16} color="white" />
              </div>
              <span className="text-sm font-medium text-foreground">{platform?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Remember Me */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e?.target?.checked)}
          className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
        />
        <label htmlFor="rememberMe" className="ml-2 text-sm text-muted-foreground">
          Keep me signed in
        </label>
      </div>
      {/* Authentication Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handleAuthenticate}
        disabled={!selectedPlatform || isLoading}
        loading={isLoading}
        iconName="ExternalLink"
        iconPosition="right"
        className="mb-4"
      >
        {isLoading ? 'Connecting...' : 'Connect to Bungie.net'}
      </Button>
      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Secure OAuth authentication via Bungie.net
        </p>
      </div>
    </div>
  );
};

export default AuthenticationCard;