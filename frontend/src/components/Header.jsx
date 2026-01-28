import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container, Image, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Header() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

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
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
    }
  }

  return (
    <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
      <Container>
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
            <Nav.Link href="#features"><i className='fas fa-user'></i> Features</Nav.Link>
            <Nav.Link href="#pricing"><i className ='fas fa-shopping-cart'></i> Pricing</Nav.Link>
            <Nav.Link href="#about"><i className="fas fa-info-circle"></i> About</Nav.Link>

            {user ? (
              <NavDropdown title={<><i className='fas fa-user-circle'></i> {user.username}</> } id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="fas fa-user me-2"></i>Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  <i className="fas fa-cog me-2"></i>Settings
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
      </Container>
    </Navbar>
  )
}

export default Header