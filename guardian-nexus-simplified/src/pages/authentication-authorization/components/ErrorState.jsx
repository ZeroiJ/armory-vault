import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ErrorState = ({ error, onRetry, onGoBack }) => {
  const getErrorDetails = (errorType) => {
    switch (errorType) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          message: 'Unable to connect to Bungie.net servers. Please check your internet connection and try again.',
          suggestion: 'Check your network connection'
        };
      case 'auth_failed':
        return {
          icon: 'AlertCircle',
          title: 'Authentication Failed',
          message: 'Unable to authenticate with Bungie.net. Please ensure your account is in good standing.',
          suggestion: 'Verify your Bungie.net account status'
        };
      case 'account_restricted':
        return {
          icon: 'Lock',
          title: 'Account Restricted',
          message: 'Your Bungie.net account has restricted API access. Please contact Bungie support.',
          suggestion: 'Contact Bungie support for assistance'
        };
      case 'maintenance':
        return {
          icon: 'Wrench',
          title: 'Service Maintenance',
          message: 'Bungie.net API is currently undergoing maintenance. Please try again later.',
          suggestion: 'Check Bungie.net status page'
        };
      case 'rate_limit':
        return {
          icon: 'Clock',
          title: 'Too Many Requests',
          message: 'Too many authentication attempts. Please wait a few minutes before trying again.',
          suggestion: 'Wait 5 minutes before retrying'
        };
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication. Please try again.',
          suggestion: 'Try again or contact support'
        };
    }
  };

  const errorDetails = getErrorDetails(error?.type || 'unknown');

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg p-6 text-center">
      {/* Error Icon */}
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name={errorDetails?.icon} size={32} className="text-destructive" />
      </div>
      {/* Error Details */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {errorDetails?.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {errorDetails?.message}
      </p>
      {/* Error Code */}
      {error?.code && (
        <div className="bg-muted rounded-lg p-3 mb-6">
          <div className="text-xs text-muted-foreground mb-1">Error Code</div>
          <div className="text-sm font-mono text-foreground">{error?.code}</div>
        </div>
      )}
      {/* Suggestion */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
        <div className="flex items-start">
          <Icon name="Lightbulb" size={16} className="text-warning mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <div className="text-xs font-medium text-warning mb-1">Suggestion</div>
            <div className="text-xs text-muted-foreground">{errorDetails?.suggestion}</div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onRetry}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Try Again
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={onGoBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Go Back
        </Button>
      </div>
      {/* Help Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs">
          <a
            href="https://help.bungie.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 flex items-center"
          >
            <Icon name="ExternalLink" size={12} className="mr-1" />
            Bungie Help
          </a>
          <span className="text-muted-foreground">•</span>
          <a
            href="https://twitter.com/BungieHelp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 flex items-center"
          >
            <Icon name="ExternalLink" size={12} className="mr-1" />
            Status Updates
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;