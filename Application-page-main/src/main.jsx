import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme } from '@cloudscape-design/components/theming'
import '@cloudscape-design/global-styles/index.css'
import './index.css'
import App from './App.jsx'

// Apply Cloudscape Design System theme
applyTheme({
  theme: {
    tokens: {
      colorBackgroundContainerContent: '#ffffff',
      colorBackgroundContainerHeader: '#f9f9f9',
      colorBorderDividerDefault: '#e9ebed',
      colorTextBodyDefault: '#16191f',
      colorTextBodySecondary: '#5f6b7a',
      colorTextHeadingDefault: '#16191f',
      colorTextInteractiveDefault: '#0073bb',
      colorTextInteractiveHover: '#0073bb',
      colorTextInteractiveActive: '#0073bb',
      colorBackgroundButtonPrimaryDefault: '#0073bb',
      colorBackgroundButtonPrimaryHover: '#0073bb',
      colorBackgroundButtonPrimaryActive: '#0073bb',
      colorBackgroundButtonNormalDefault: '#ffffff',
      colorBackgroundButtonNormalHover: '#f2f3f3',
      colorBackgroundButtonNormalActive: '#f2f3f3',
      colorBorderButtonNormalDefault: '#d1d5db',
      colorBorderButtonNormalHover: '#d1d5db',
      colorBorderButtonNormalActive: '#d1d5db',
      colorTextButtonNormalDefault: '#16191f',
      colorTextButtonNormalHover: '#16191f',
      colorTextButtonNormalActive: '#16191f',
      colorTextButtonPrimaryDefault: '#ffffff',
      colorTextButtonPrimaryHover: '#ffffff',
      colorTextButtonPrimaryActive: '#ffffff',
      colorBackgroundStatusSuccess: '#d1eddb',
      colorTextStatusSuccess: '#1d8102',
      colorBackgroundStatusError: '#fce8e6',
      colorTextStatusError: '#d13212',
      colorBackgroundStatusWarning: '#fef7e0',
      colorTextStatusWarning: '#b45309',
      colorBackgroundStatusInfo: '#e3f2fd',
      colorTextStatusInfo: '#0073bb',
      colorBackgroundStatusInProgress: '#e3f2fd',
      colorTextStatusInProgress: '#0073bb',
      colorBackgroundStatusStopped: '#f2f3f3',
      colorTextStatusStopped: '#5f6b7a',
      colorBackgroundStatusPending: '#e3f2fd',
      colorTextStatusPending: '#0073bb',
      colorBackgroundStatusCancelled: '#f2f3f3',
      colorTextStatusCancelled: '#5f6b7a',
      colorBackgroundStatusRunning: '#d1eddb',
      colorTextStatusRunning: '#1d8102',
      colorBackgroundStatusScheduled: '#fef7e0',
      colorTextStatusScheduled: '#b45309',
      colorBackgroundStatusPaused: '#fef7e0',
      colorTextStatusPaused: '#b45309',
      colorBackgroundStatusFailed: '#fce8e6',
      colorTextStatusFailed: '#d13212',
      colorBackgroundStatusCompleted: '#d1eddb',
      colorTextStatusCompleted: '#1d8102'
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
