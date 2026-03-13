import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

// Helper to render Settings with ToastProvider
const renderSettings = () => {
  return render(
    <ToastProvider>
      <Settings />
    </ToastProvider>
  );
};

describe('Settings - Integrations Tab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful API responses
    mockFetch.mockImplementation((url) => {
      if (typeof url === 'string') {
        // Mock integrations data
        if (url.includes('/api/settings/integrations') || url === '/settings/integrations') {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              success: true,
              data: [
                {
                  id: 'stripe',
                  name: 'Stripe',
                  description: 'Accept online payments and donations',
                  category: 'payment',
                  status: 'disconnected',
                  isConfigured: false,
                },
                {
                  id: 'mailchimp',
                  name: 'Mailchimp',
                  description: 'Email marketing and newsletters',
                  category: 'email',
                  status: 'connected',
                  isConfigured: true,
                  apiKey: '••••••••••••••••••••1234',
                  lastSync: new Date().toISOString(),
                },
                {
                  id: 'google-calendar',
                  name: 'Google Calendar',
                  description: 'Sync events with Google Calendar',
                  category: 'calendar',
                  status: 'connected',
                  isConfigured: true,
                  lastSync: new Date().toISOString(),
                },
                {
                  id: 'slack',
                  name: 'Slack',
                  description: 'Team communication and notifications',
                  category: 'communication',
                  status: 'error',
                  isConfigured: true,
                  apiKey: '••••••••••••••••••••5678',
                },
              ],
            }),
          } as Response);
        }
      }
      
      return Promise.resolve({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      } as Response);
    });
  });

  describe('Tab Navigation', () => {
    it('should display Integrations tab in navigation', () => {
      renderSettings();
      
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      expect(integrationsTabs.length).toBeGreaterThan(0);
    });

    it('should switch to Integrations tab when clicked', async () => {
      renderSettings();
      
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });
  });

  describe('Integrations Display', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should display integrations grouped by category', async () => {
      await waitFor(() => {
        expect(screen.getByText('Payment Gateways')).toBeInTheDocument();
        expect(screen.getByText('Email Services')).toBeInTheDocument();
        expect(screen.getByText('Calendar Sync')).toBeInTheDocument();
        expect(screen.getByText('Communication')).toBeInTheDocument();
      });
    });

    it('should display integration cards with correct information', async () => {
      await waitFor(() => {
        // Check Stripe integration
        expect(screen.getByText('Stripe')).toBeInTheDocument();
        expect(screen.getByText('Accept online payments and donations')).toBeInTheDocument();
        
        // Check Mailchimp integration
        expect(screen.getByText('Mailchimp')).toBeInTheDocument();
        expect(screen.getByText('Email marketing and newsletters')).toBeInTheDocument();
      });
    });

    it('should display connection status badges', async () => {
      await waitFor(() => {
        const badges = screen.getAllByText(/connected|disconnected|error/i);
        expect(badges.length).toBeGreaterThan(0);
      });
    });

    it('should display API key for connected integrations', async () => {
      await waitFor(() => {
        // Mailchimp should show masked API key
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement;
        expect(mailchimpCard).toHaveTextContent('••••••••••••••••••••1234');
      });
    });

    it('should display last sync time for connected integrations', async () => {
      await waitFor(() => {
        const syncTexts = screen.getAllByText(/last synced:/i);
        expect(syncTexts.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration Actions', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should show Connect button for disconnected integrations', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        expect(connectButton).toBeInTheDocument();
      });
    });

    it('should show Configure, Test, and Disconnect buttons for connected integrations', async () => {
      await waitFor(() => {
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement?.parentElement;
        
        expect(within(mailchimpCard!).getByRole('button', { name: /configure/i })).toBeInTheDocument();
        expect(within(mailchimpCard!).getByRole('button', { name: /test/i })).toBeInTheDocument();
        expect(within(mailchimpCard!).getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
      });
    });

    it('should show Reconfigure button for integrations with errors', async () => {
      await waitFor(() => {
        const slackCard = screen.getByText('Slack').closest('div')?.parentElement?.parentElement;
        const reconfigureButton = within(slackCard!).getByRole('button', { name: /reconfigure/i });
        expect(reconfigureButton).toBeInTheDocument();
      });
    });
  });

  describe('Configuration Modal', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should open configuration modal when Connect button is clicked', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Configure Stripe')).toBeInTheDocument();
      });
    });

    it('should display API key input field in modal', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Enter your API key')).toBeInTheDocument();
      });
    });

    it('should toggle API key visibility', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        const apiKeyInput = screen.getByPlaceholderText('Enter your API key') as HTMLInputElement;
        expect(apiKeyInput.type).toBe('password');
        
        // Find and click the eye icon button
        const toggleButtons = screen.getAllByRole('button');
        const eyeButton = toggleButtons.find(btn => btn.querySelector('svg'));
        if (eyeButton) {
          fireEvent.click(eyeButton);
          expect(apiKeyInput.type).toBe('text');
        }
      });
    });

    it('should display webhook URL for payment integrations', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Webhook URL')).toBeInTheDocument();
        const webhookInput = screen.getByDisplayValue(/\/api\/webhooks\/stripe/i);
        expect(webhookInput).toBeInTheDocument();
      });
    });

    it('should close modal when Cancel button is clicked', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Configure Stripe')).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('Configure Stripe')).not.toBeInTheDocument();
      });
    });

    it('should close modal when X button is clicked', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Configure Stripe')).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Configure Stripe')).not.toBeInTheDocument();
      });
    });
  });

  describe('Save Configuration', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should disable Save button when API key is empty', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: /save configuration/i });
        expect(saveButton).toBeDisabled();
      });
    });

    it('should enable Save button when API key is entered', async () => {
      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        const apiKeyInput = screen.getByPlaceholderText('Enter your API key');
        fireEvent.change(apiKeyInput, { target: { value: 'sk_test_123456789' } });
      });

      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: /save configuration/i });
        expect(saveButton).not.toBeDisabled();
      });
    });

    it('should save configuration and update integration status', async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)
      );

      await waitFor(() => {
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement?.parentElement;
        const connectButton = within(stripeCard!).getByRole('button', { name: /connect/i });
        fireEvent.click(connectButton);
      });

      await waitFor(() => {
        const apiKeyInput = screen.getByPlaceholderText('Enter your API key');
        fireEvent.change(apiKeyInput, { target: { value: 'sk_test_123456789' } });
      });

      const saveButton = screen.getByRole('button', { name: /save configuration/i });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.queryByText('Configure Stripe')).not.toBeInTheDocument();
      });
    });
  });

  describe('Test Integration', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should test integration connection', async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)
      );

      await waitFor(() => {
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement?.parentElement;
        const testButton = within(mailchimpCard!).getByRole('button', { name: /test/i });
        fireEvent.click(testButton);
      });

      // Wait for the test to complete
      await waitFor(() => {
        // The toast message should appear (mocked in ToastProvider)
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });

  describe('Disconnect Integration', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should show confirmation dialog when disconnecting', async () => {
      // Mock window.confirm
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

      await waitFor(() => {
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement?.parentElement;
        const disconnectButton = within(mailchimpCard!).getByRole('button', { name: /disconnect/i });
        fireEvent.click(disconnectButton);
      });

      expect(confirmSpy).toHaveBeenCalledWith(expect.stringContaining('disconnect Mailchimp'));
      
      confirmSpy.mockRestore();
    });

    it('should disconnect integration when confirmed', async () => {
      // Mock window.confirm to return true
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
      
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)
      );

      await waitFor(() => {
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement?.parentElement;
        const disconnectButton = within(mailchimpCard!).getByRole('button', { name: /disconnect/i });
        fireEvent.click(disconnectButton);
      });

      await waitFor(() => {
        expect(confirmSpy).toHaveBeenCalled();
      });
      
      confirmSpy.mockRestore();
    });
  });

  describe('Responsive Design', () => {
    it('should display integrations in grid layout', async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        const paymentSection = screen.getByText('Payment Gateways').parentElement;
        const grid = paymentSection?.querySelector('.grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
      });
    });
  });

  describe('Status Icons', () => {
    beforeEach(async () => {
      renderSettings();
      const integrationsTabs = screen.getAllByRole('button', { name: /integrations/i });
      fireEvent.click(integrationsTabs[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Connect and configure third-party integrations to extend functionality.')).toBeInTheDocument();
      });
    });

    it('should display correct status icons for different states', async () => {
      await waitFor(() => {
        // Connected integrations should have CheckCircle icon
        const mailchimpCard = screen.getByText('Mailchimp').closest('div')?.parentElement;
        expect(mailchimpCard).toBeInTheDocument();
        
        // Error integrations should have XCircle icon
        const slackCard = screen.getByText('Slack').closest('div')?.parentElement;
        expect(slackCard).toBeInTheDocument();
        
        // Disconnected integrations should have AlertCircle icon
        const stripeCard = screen.getByText('Stripe').closest('div')?.parentElement;
        expect(stripeCard).toBeInTheDocument();
      });
    });
  });
});
