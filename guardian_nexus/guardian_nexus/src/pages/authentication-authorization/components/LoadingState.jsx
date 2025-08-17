import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ guardianData }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg p-8 text-center">
      {/* Guardian Emblem */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary">
        <img
          src={guardianData?.emblem || '/assets/images/no_image.png'}
          alt="Guardian Emblem"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
      </div>
      {/* Loading Animation */}
      <div className="mb-6">
        <div className="w-12 h-12 mx-auto mb-4">
          <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome back, {guardianData?.name || 'Guardian'}!
        </h3>
        <p className="text-muted-foreground text-sm">
          Syncing your latest game data...
        </p>
      </div>
      {/* Progress Steps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Icon name="Check" size={16} className="text-success mr-2" />
            <span className="text-muted-foreground">Authentication verified</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Icon name="Check" size={16} className="text-success mr-2" />
            <span className="text-muted-foreground">Account linked successfully</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin mr-2"></div>
            <span className="text-foreground">Loading character data...</span>
          </div>
        </div>
      </div>
      {/* Character Preview */}
      {guardianData && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{guardianData?.powerLevel}</div>
              <div className="text-xs text-muted-foreground">Power Level</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">{guardianData?.class}</div>
              <div className="text-xs text-muted-foreground">Class</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;