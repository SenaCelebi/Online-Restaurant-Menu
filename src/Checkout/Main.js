import React, { useState, useEffect } from "react";
import {Dialog} from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';
import CustomizedSteppers from "./Views/Stepper";
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeyGet } from './constants/functions'

const useStyles = makeStyles(theme => ({
    boxWrapper: {
        marginBottom: "55px",
        minHeight: "calc(26vh + 260px)"
    },
    container: {
        position: "relative",
        zIndex: "1100",
        marginTop: "-95px",
        marginBottom: "45px",
    },
    dialogPaper: {
        minHeight: '50vh',
        maxHeight: '80vh',
    },
}));

const Main = () => {
    const classes = useStyles();

    const [stripePromise, setStripePromise] = useState(null)

    useEffect(() => {
        const retrievePublishableKey = async () => {
            const publishableKey = await publishableKeyGet()
            const stripe = loadStripe(publishableKey);
            setStripePromise(stripe)
        }
        retrievePublishableKey()
    }, [])

    return (
        <Dialog classes={{ paper: classes.dialogPaper }} maxWidth='md' open={true}>
                    {stripePromise
                        ? <Elements stripe={stripePromise}>
                            <CustomizedSteppers />
                        </Elements>
                        : null
                    }
            </Dialog>
    )
}

export default Main;