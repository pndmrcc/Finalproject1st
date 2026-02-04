import React from 'react'
import { Modal, Accordion, Button } from 'react-bootstrap'
import faqs from '../data/faqs.json'

function FAQModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Frequently Asked Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion>
          {faqs.map((f, i) => (
            <Accordion.Item eventKey={String(i)} key={f.id}>
              <Accordion.Header>{f.question}</Accordion.Header>
              <Accordion.Body>{f.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FAQModal
