import { useRef , useState} from "react";
import classes from "./Checkout.module.css";

const isEmpty = val => val.trim() === '';
const isCorrectPostal = val => val.trim().length !== 6;

const Checkout = (props)=>{
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const isValidName = !isEmpty(enteredName);
        const isValidStreet = !isEmpty(enteredStreet);
        const isValidPostal = !isCorrectPostal(enteredPostal);
        const isValidCity = !isEmpty(enteredCity);

        setFormInputValidity({
            name: isValidName,
            city: isValidCity,
            postalCode: isValidPostal,
            street: isValidStreet
        });

        const isValidForm = isValidCity && isValidName && isValidPostal && isValidStreet;

        if(!isValidForm){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
        });
    };


    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

    return <form onSubmit={confirmHandler}>
        <div className={nameControlClasses} >
            <label htmlFor="name" >Your Name</label>
            <input id="name" type="text" ref={nameInputRef}/>
            {!formInputValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses} >
            <label htmlFor="street" >Street</label>
            <input id="street" type="text" ref={streetInputRef}/>
            {!formInputValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClasses} >
            <label htmlFor="postal" >Postal Code</label>
            <input id="postal" type="text" ref={postalInputRef}/>
            {!formInputValidity.postalCode && <p>Please enter a valid postalCode!</p>}
        </div>
        <div className={cityControlClasses} >
            <label htmlFor="city" >City</label>
            <input id="city" type="text" ref={cityInputRef} />
            {!formInputValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} >Confirm</button>
        </div>
    </form>
};

export default Checkout;