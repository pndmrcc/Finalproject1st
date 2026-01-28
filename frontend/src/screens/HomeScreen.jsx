import React, {useState, useEffect} from 'react'
import {Row, Col, Alert} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const {data} = await axios.get('http://localhost:8000/api/products/')
                setProducts(data)
                setError(null)
            } catch (err) {
                console.error('Error fetching products:', err)
                setError('Unable to load products. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

  return (
    <div>
        <h3 className='py-3 text-center'><i className='fas fa-fire'></i>Hottest in the Market<i className='fas fa-fire'></i></h3>
        
        {error && <Alert variant="warning">{error}</Alert>}
        
        {loading ? (
            <div className="text-center py-5">
                <p>Loading products...</p>
            </div>
        ) : (
            <Row>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center w-100">
                        <p>No products available</p>
                    </Col>
                )}
            </Row>
        )}
    </div>
  )
}

export default HomeScreen