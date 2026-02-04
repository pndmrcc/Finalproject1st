import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap'

const coinPackages = [
  { id: 'c1', name: 'Small Pack', coins: 500, price: 4.99, bonus: 0, popular: false },
  { id: 'c2', name: 'Medium Pack', coins: 1200, price: 9.99, bonus: 50, popular: true },
  { id: 'c3', name: 'Large Pack', coins: 3000, price: 19.99, bonus: 200, popular: false },
  { id: 'c4', name: 'Mega Pack', coins: 10000, price: 49.99, bonus: 1000, popular: false },
  { id: 'c5', name: 'Ultra Pack', coins: 25000, price: 99.99, bonus: 3000, popular: false },
  { id: 'c6', name: 'Insane Pack', coins: 100000, price: 299.99, bonus: 15000, popular: false },
]

function CoinsScreen() {
  const [coinBalance, setCoinBalance] = useState(() => Number(localStorage.getItem('coinBalance') || 0))
  const [inventory, setInventory] = useState(() => JSON.parse(localStorage.getItem('inventory') || '[]'))
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    localStorage.setItem('coinBalance', String(coinBalance))
  }, [coinBalance])

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory))
  }, [inventory])

  // Determine best value (lowest price per coin)
  const bestValueId = useMemo(() => {
    let best = null
    let bestRatio = Infinity
    coinPackages.forEach(p => {
      const ratio = p.price / p.coins
      if (ratio < bestRatio) {
        bestRatio = ratio
        best = p.id
      }
    })
    return best
  }, [])

  const buyPackage = (pkg) => {
    // Simulate purchase (replace with real payment flow)
    setCoinBalance((b) => b + pkg.coins + (pkg.bonus || 0))
    const purchase = { id: pkg.id + '-' + Date.now(), type: 'coin', name: pkg.name, coins: pkg.coins, bonus: pkg.bonus || 0, price: pkg.price, date: new Date().toISOString() }
    setInventory((inv) => [...inv, purchase])
    setModalContent({ title: 'Purchase Complete', body: `Added ${pkg.coins + (pkg.bonus || 0)} coins to your balance.` })
    setShowModal(true)
  }

  return (
    <Container>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 py-3">
        <div>
          <h2 className="mb-1">Coin Bundles</h2>
          <p className="text-muted mb-0">Choose a bundle that fits you. Clear prices, bonuses and recommended tags make it easy.</p>
        </div>
        <div className="text-md-end">
          <div className="small text-muted">Your balance</div>
          <div className="h5 fw-bold">{coinBalance.toLocaleString()} coins</div>
        </div>
      </div>

      <Row xs={1} sm={2} md={3} lg={3} className="g-3">
        {coinPackages.map((p) => {
          const pricePerCoin = (p.price / p.coins)
          const isBest = p.id === bestValueId
          return (
            <Col key={p.id}>
              <Card className={`h-100 shadow-sm ${p.popular ? 'border-primary' : ''}`}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <Card.Title className="mb-0">{p.name}</Card.Title>
                      <div className="text-muted small">{p.coins.toLocaleString()} coins</div>
                    </div>
                    <div className="text-end">
                      {p.popular && <Badge bg="primary" className="mb-1">Most Popular</Badge>}
                      {isBest && <Badge bg="success" className="mb-1 ms-1">Best Value</Badge>}
                      <div className="fw-bold mt-1">${p.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    {p.bonus > 0 ? (
                      <Badge bg="warning" text="dark">+{p.bonus.toLocaleString()} bonus</Badge>
                    ) : (
                      <Badge bg="light" text="dark">No bonus</Badge>
                    )}
                    <div className="small text-muted mt-2">${pricePerCoin.toFixed(4)} / coin</div>
                  </div>

                  <div className="mt-auto d-flex gap-2">
                    <Button variant="primary" className="flex-grow-1" onClick={() => buyPackage(p)}>Buy</Button>
                    <Button variant="outline-secondary" className="" onClick={() => (setModalContent({ title: p.name, body: `${p.coins.toLocaleString()} coins for $${p.price.toFixed(2)}${p.bonus ? ' (+ ' + p.bonus + ' bonus)' : ''}` }), setShowModal(true))}>Details</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent?.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CoinsScreen
