import { useContext, useEffect, useState} from 'react';
import wooCommerceApi from '../woocommerceApi';
import { CartContext } from '../context/CartContext';
import PageHeader from './PageHeader';
import Cart from './Cart';
import Seo from '../components/Seo'

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const {addToCart} = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await wooCommerceApi.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        fetchProducts();
    }, []);

    const handleAddToCart = (product) =>{
        addToCart(product); // Add product to cart
    };

  return (
    <>
        <Seo
        title="Shop - Kāpiti Youth Support"
        description="Explore our wide range of cloths"
        url={window.location.href}
      />

    <div>
      <PageHeader title="Products" image_url="/header_imgs/bg4.jpg"/>
      <ul className="product-container">
          {products.map(product => (
              <li key={product.id} className="product-item">
                  <h2>{product.name}</h2>
                  <img src={product.images[0].src} alt={product.name} />
                  <p>Price: ${(product.prices.price / 100).toFixed(2)} {product.prices.currency_code}</p>
                  <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </li>
          ))}
      </ul>
      
    </div>
    </>
  )
}

export default ProductList
