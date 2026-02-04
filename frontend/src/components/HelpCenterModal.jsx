import React, { useState } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import guides from '../data/guides.json'

// Basic renderer for guide content: converts simple markdown-like headings (##) and lists (- ) into HTML.
function renderGuideToHtml(text) {
  if (!text) return ''
  // Escape HTML
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const lines = text.split('\n')
  let html = ''
  let inList = false
  lines.forEach((raw) => {
    const line = raw.trim()
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h4>${esc(line.substring(3))}</h4>`
    } else if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true }
      html += `<li>${esc(line.substring(2))}</li>`
    } else if (line.startsWith('**') && line.endsWith('**')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<p><strong>${esc(line.substring(2, line.length-2))}</strong></p>`
    } else if (line === '') {
      if (inList) { html += '</ul>'; inList = false }
      html += '<p></p>'
    } else {
      if (inList) { html += '</ul>'; inList = false }
      html += `<p>${esc(line)}</p>`
    }
  })
  if (inList) html += '</ul>'
  return html
}

function HelpCenterModal({ show, onHide }) {
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  const openGuide = (g) => {
    setSelectedGuide(g)
    setShowGuide(true)
  }

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Help Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            {guides.map(g => (
              <Card key={g.id} className="mb-2">
                <Card.Body>
                  <Card.Title>{g.title}</Card.Title>
                  <Card.Text className="text-muted">{g.summary}</Card.Text>
                  <div className="text-end">
                    <Button variant="outline-primary" size="sm" onClick={() => openGuide(g)}>Read Guide</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGuide} onHide={() => setShowGuide(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGuide?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-muted mb-2">{selectedGuide?.summary}</div>
          <div dangerouslySetInnerHTML={{ __html: renderGuideToHtml(selectedGuide?.content) }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGuide(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HelpCenterModal
