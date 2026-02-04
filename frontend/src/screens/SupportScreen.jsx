import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Accordion, Form, Alert } from 'react-bootstrap'
import faqs from '../data/faqs.json'
import guides from '../data/guides.json'
import { Modal } from 'react-bootstrap'

function SupportScreen() {
  const [query, setQuery] = useState('')
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)
  const [ticketSuccess, setTicketSuccess] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) return setFilteredFaqs(faqs)
    setFilteredFaqs(faqs.filter(f => (f.question + ' ' + f.answer).toLowerCase().includes(q)))
  }, [query])

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
      id: 't-' + Date.now(),
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
      date: new Date().toISOString(),
      status: 'open'
    }
    const existing = JSON.parse(localStorage.getItem('supportTickets') || '[]')
    localStorage.setItem('supportTickets', JSON.stringify([data, ...existing]))
    setTicketSuccess(true)
    form.reset()
    setTimeout(() => setTicketSuccess(false), 2000)
  }

  return (
    <Container>
      <div className="py-4">
        <h2>Support & Help</h2>
        <p className="text-muted">Guides, FAQs and direct contact for issues with payments, purchases and account problems.</p>
      </div>

      <Row className="g-3">
        <Col md={6} lg={4}>
          <h5>Help Center</h5>
          {guides.map(g => (
            <Card key={g.id} className="mb-2">
              <Card.Body>
                <Card.Title>{g.title}</Card.Title>
                <Card.Text className="text-muted">{g.summary}</Card.Text>
                <Button size="sm" variant="outline-primary" onClick={() => { setSelectedGuide(g); setShowGuide(true) }}>Read Guide</Button>
              </Card.Body>
            </Card>
          ))}
          <Modal show={showGuide} onHide={() => setShowGuide(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedGuide?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-muted mb-2">{selectedGuide?.summary}</div>
              <div dangerouslySetInnerHTML={{ __html: (function(text){
                if (!text) return '<p>No additional content available.</p>'
                const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                const lines = text.split('\n')
                let html = ''
                let inList = false
                lines.forEach((raw) => {
                  const line = raw.trim()
                  if (line.startsWith('## ')) { if (inList) { html += '</ul>'; inList = false } html += `<h4>${esc(line.substring(3))}</h4>` }
                  else if (line.startsWith('- ')) { if (!inList) { html += '<ul>'; inList = true } html += `<li>${esc(line.substring(2))}</li>` }
                  else if (line.startsWith('**') && line.endsWith('**')) { if (inList) { html += '</ul>'; inList = false } html += `<p><strong>${esc(line.substring(2, line.length-2))}</strong></p>` }
                  else if (line === '') { if (inList) { html += '</ul>'; inList = false } html += '<p></p>' }
                  else { if (inList) { html += '</ul>'; inList = false } html += `<p>${esc(line)}</p>` }
                })
                if (inList) html += '</ul>'
                return html
              })(selectedGuide?.content || '') }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowGuide(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col md={6} lg={4}>
          <h5>FAQ</h5>
          <Form className="mb-2">
            <Form.Control placeholder="Search FAQs..." value={query} onChange={e => setQuery(e.target.value)} />
          </Form>
          <Accordion defaultActiveKey="0">
            {filteredFaqs.map((f, i) => (
              <Accordion.Item eventKey={String(i)} key={f.id}>
                <Accordion.Header>{f.question}</Accordion.Header>
                <Accordion.Body>{f.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>

        <Col md={12} lg={4}>
          <h5 id="contact">Contact Support</h5>
          {ticketSuccess && <Alert variant="success">Support ticket submitted. We'll contact you soon.</Alert>}
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmitTicket}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control name="subject" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Message</Form.Label>
                  <Form.Control name="message" as="textarea" rows={4} required />
                </Form.Group>
                <div className="text-end">
                  <Button type="submit">Send</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SupportScreen

