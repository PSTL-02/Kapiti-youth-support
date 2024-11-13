import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import PageHeaders from './PageHeader';

const Cart = () => {
    const { cart, updateCart, removeFromCart } = useContext(CartContext);

    const handleIncrement = (item) => {
        updateCart(item.id, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateCart(item.id, item.quantity - 1); 
        } else {
            removeFromCart(item.id);
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.prices.price / 100) * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            <PageHeaders title="Cart" image_url="/header_imgs/bg5.jpg" />
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-container">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <h2>{item.name}</h2>
                                <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleDecrement(item)} disabled={item.quantity === 1}>-</button>
                                <button onClick={() => handleIncrement(item)}>+</button>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ${getTotalPrice()}</h3>
                    <button onClick={() => alert("Proceeding to checkout...")}>Proceed to Checkout</button>
                </>
            )}
        </>
    );
};

export default Cart;
