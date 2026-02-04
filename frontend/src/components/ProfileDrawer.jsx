import React from 'react'
import { Offcanvas, Button, Nav, Badge } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function ProfileDrawer({ show, onHide, user }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    { key: 'thelootshop', label: 'TheLootShop', icon: 'fas fa-home', to: '/codashop' },
    { key: 'rewards', label: 'Rewards', icon: 'fas fa-gift', to: '/rewards' },
    { key: 'lootcash', label: 'LootCash', icon: 'fas fa-coins', to: '/codacash', badge: 'Restricted' },
    { key: 'transactions', label: 'Transaction History', icon: 'fas fa-list', to: '/transactions' },
    { key: 'settings', label: 'Settings', icon: 'fas fa-cog', to: '/settings' },
  ]

  const isActive = (to) => {
    try { return location.pathname.startsWith(to) }
    catch (e) { return false }
  }

  const gradient = { background: 'linear-gradient(180deg,#2b0b3a 0%, #3a0f56 100%)', color: '#fff' }

  return (
    <Offcanvas show={show} onHide={onHide} placement="start" style={{ width: 320 }}>
      <Offcanvas.Header closeButton style={gradient}>
        <Offcanvas.Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#ffffff22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="fas fa-user" />
            </div>
            <div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Hi{user && user.username ? ` ${user.username.split(' ')[0]}` : ''}!</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Welcome back</div>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ padding: '1rem', ...gradient }}>
        <Nav className="flex-column" as="ul">
          {menu.map(m => (
            <Nav.Item as="li" key={m.key} className="mb-2">
              <Button
                as={Link}
                to={m.to}
                variant={isActive(m.to) ? 'light' : 'outline-light'}
                className={`w-100 text-start d-flex align-items-center gap-3 rounded-3`} 
                onClick={() => { onHide(); navigate(m.to) }}
                style={{ background: isActive(m.to) ? '#fff' : 'transparent', color: isActive(m.to) ? '#3a0f56' : '#fff', borderColor: '#ffffff33' }}
              >
                <i className={`${m.icon} me-2`} />
                <div style={{ flexGrow: 1 }}>{m.label}</div>
                {m.badge && <Badge bg="warning" text="dark">{m.badge}</Badge>}
              </Button>
            </Nav.Item>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ProfileDrawer
