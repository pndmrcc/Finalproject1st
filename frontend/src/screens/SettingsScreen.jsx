import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './SettingsScreen.css'

function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <Container className="py-5">
      <div className="settings-card shadow-sm">
        <div className="settings-card-inner">
          <div className="settings-card-header">ACCOUNT SETTINGS</div>

          <button
            className="settings-row"
            onClick={() => navigate('/security')}
            aria-label="Open Security Settings"
          >
            <div className="settings-row-left">
              <i className="fas fa-lock settings-icon" aria-hidden="true"></i>
              <div className="settings-text">
                <div className="settings-title">Security</div>
              </div>
            </div>

            <div className="settings-row-right">
              <i className="fas fa-chevron-right chevron-icon" aria-hidden="true"></i>
            </div>
          </button>
        </div>
      </div>
    </Container>
  )
}

export default SettingsScreen
