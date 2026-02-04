import React, { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'

function ContactModal({ show, onHide }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setError('Please fill in name, email and message')
      return
    }
    setError(null)

    const ticket = {
      id: 't-' + Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      status: 'open'
    }
    // Store locally; backend integration can be added later
    const existing = JSON.parse(localStorage.getItem('supportTickets') || '[]')
    localStorage.setItem('supportTickets', JSON.stringify([ticket, ...existing]))
    setSuccess(true)
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')

    setTimeout(() => {
      setSuccess(false)
      onHide()
    }, 1200)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Message sent — our team will contact you soon.</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Subject</Form.Label>
            <Form.Control value={subject} onChange={e => setSubject(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} value={message} onChange={e => setMessage(e.target.value)} />
          </Form.Group>
          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">Cancel</Button>
            <Button variant="primary" type="submit">Send</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ContactModal
