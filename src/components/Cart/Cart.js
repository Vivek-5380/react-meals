import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props =>{
    const [isCheckout , setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item , amount: 1});
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async(userData) =>{
        setIsSubmitting(true);

        await fetch("https://foodapp-9693-default-rtdb.asia-southeast1.firebasedatabase.app/food/orders.json" , {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });

        setIsSubmitting(false);
        setIsSubmited(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => {
        return <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    onRemove={cartItemRemoveHandler.bind(null , item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />;
    })}</ul>;

    const modalAction = <div className={classes['actions']}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
    </div>;

    const cartModalContent =
        <>
            {cartItems}
            <div className={classes['total']}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalAction}
        </>;

    const isSubmittingModalContent = <p>Sending Order Data!......</p>;

    const isSubmitedModalContent = 
        <>
            <p>Your order has been sucessfully placed</p>
            <div className={classes['actions']}>
                <button className={classes['button']} onClick={props.onClose}>Close</button>
            </div>
        </>;

    return <Modal onClose={props.onClose}>
        { !isSubmitting && !isSubmited && cartModalContent}
        { isSubmitting && isSubmittingModalContent}
        { !isSubmitting && isSubmited && isSubmitedModalContent}
    </Modal>;
};

export default Cart;