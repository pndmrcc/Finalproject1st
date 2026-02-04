import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container, Image, Button, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ContactModal from './ContactModal'
import HelpCenterModal from './HelpCenterModal'
import FAQModal from './FAQModal'

function Header() {
  const [user, setUser] = useState(null)
  const [showContact, setShowContact] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const navigate = useNavigate()
  

  const openOnly = (which) => {
    // ensure only one modal is visible at a time
    setShowContact(false)
    setShowHelp(false)
    setShowFAQ(false)
    if (which === 'contact') setShowContact(true)
    if (which === 'help') setShowHelp(true)
    if (which === 'faq') setShowFAQ(true)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error parsing user from storage:', e)
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        await axios.post('http://localhost:8000/api/logout/', {}, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
      }
      // Clear auth and user data and purge inventory on logout
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('inventory')
      setUser(null)
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
      // Ensure local cleanup even if API logout fails
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('inventory')
      setUser(null)
      navigate('/')
    }
  }

  return (
    <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Profile drawer removed - left placeholder for spacing */}
        </div>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image
            src='/images/thelootstoplogo.png'
            alt='TheLootStop Logo'
            style={{ height: '72px', width: 'auto' }}
            className='d-inline-block me-2'
          />
          <span>TheLootStop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/"><i className="fas fa-home"></i> Home</Nav.Link>
            <Nav.Link as={Link} to="/inventory"><i className='fas fa-boxes'></i> Inventory</Nav.Link>
            <Nav.Link as={Link} to="/events"><i className='fas fa-bolt'></i> Sales</Nav.Link>
            <NavDropdown title={<><i className='fas fa-life-ring'></i> Support</>} id="support-dropdown">
              <NavDropdown.Item onClick={(e) => { e.preventDefault(); openOnly('help') }}>Help Center</NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => { e.preventDefault(); openOnly('faq') }}>FAQ</NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => { e.preventDefault(); openOnly('contact') }}>Contact Support</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            {/* Coins UI removed per request */}

            {user ? (
              <NavDropdown title={<><i className='fas fa-user-circle'></i> {user.username}</> } id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="fas fa-user me-2"></i>Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  <i className="fas fa-cog me-2"></i>Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/security">
                  <i className="fas fa-shield-alt me-2"></i>Security & 2FA
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-light" size="sm" className="me-2">
                    <i className="fas fa-sign-in-alt me-1"></i>Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="success" size="sm">
                    <i className="fas fa-user-plus me-1"></i>Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* ProfileDrawer removed */}
        <ContactModal show={showContact} onHide={() => setShowContact(false)} />
        <HelpCenterModal show={showHelp} onHide={() => setShowHelp(false)} />
        <FAQModal show={showFAQ} onHide={() => setShowFAQ(false)} />
      </Container>
    </Navbar>
  )
}

export default Header

// Contact modal instance