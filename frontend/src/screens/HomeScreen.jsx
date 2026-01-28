import React, {useState, useEffect} from 'react'
import products from '../products'
import {Row, Col, Alert} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {
    const [products, setProducts] = useState(products)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const {data} = await axios.get('http://localhost:8000/api/products/')
                // Only update if we get valid data with images
                if (data && data.length > 0) {
                    setProducts(data)
                }
                setError(null)
            } catch (err) {
                console.error('Error fetching products:', err)
                // Don't set error, just use local products as fallback
                console.log('Using local products as fallback')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

  return (
    <div>
        <h3 className='py-3 text-center'><i className='fas fa-fire'></i>Hottest in the Market<i className='fas fa-fire'></i></h3>
        
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