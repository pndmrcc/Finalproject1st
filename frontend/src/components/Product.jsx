import React, { useState } from 'react'
// Rating removed per request
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutModal from './CheckoutModal'

function Product({product}) {
  const [showCheckout, setShowCheckout] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Card className='product-card my-3 p-3 rounded shadow-xl' bg='primary' border='light'>
              <Link to={`/product/${product._id}`}>
                  <Card.Img src={product.image} variant='top' className='rounded-5' />
              </Link>

              <Card.Body>
                  <Link to={`/product/${product._id}`}>
                      <Card.Title as='div'>
                          <h6><strong>{product.name}</strong></h6>
                      </Card.Title>
                  </Link>
                  <Card.Text as='div'>
                        {/* Rating removed */}
                      <h5 className='my-2'>${product.price}</h5>
                      {product.countInStock === 0 && (
                        <p className='text-danger fw-bold mt-2'>
                          <i className='fas fa-exclamation-circle me-1'></i>Out of Stock
                        </p>
                      )}
                  </Card.Text>
                  <Button 
                    variant={product.countInStock > 0 ? 'success' : 'secondary'} 
                    className='w-100 mt-2'
                    onClick={() => navigate(`/product/${product._id}`)}
                    disabled={product.countInStock === 0}
                  >
                    <i className='fas fa-shopping-cart me-2'></i>{product.countInStock > 0 ? 'Buy Now' : 'Out of Stock'}
                  </Button>
              </Card.Body>
      </Card>

      <CheckoutModal 
        show={showCheckout} 
        onHide={() => setShowCheckout(false)} 
        product={product}
      />
    </>
  )
}

export default Product