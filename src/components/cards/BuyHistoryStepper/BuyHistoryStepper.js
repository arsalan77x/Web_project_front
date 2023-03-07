import React from "react"
import { Card, createTheme, makeStyles, withStyles, ThemeProvider } from "@material-ui/core"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CancelIcon from '@material-ui/icons/Cancel';
import payImage from "./credit-card.png"

const useStyles = makeStyles({
    error: {
        fontSize: "26px",
    },
    errorContainer: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
        marginTop:'10px'
    }
})

const breakpoints = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
})

function getSteps() {
    return [
        'ثبت سفارش موفق',
        'در حال آماده‌سازی',
        'ارسال سفارش'];
}

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: "#01bfd7",
        },
    },
    overrides: {
        MuiSvgIcon: {
            root: {
                width: '60px',
                height: '60px'
            }
        },
        MuiStepper: {
            root: {
                [breakpoints.breakpoints.down('sm')]: {
                    padding: "10px 0px"
                },
            }
        },
        MuiStepIcon: {
            root: {
                [breakpoints.breakpoints.down('sm')]: {
                    width: "30px",
                    height: "30px"
                },
                width: "40px",
                height: "40px"
            },
            text: {
                fontSize: "20px",
                fill: "white"
            },
        },
        MuiStepLabel: {
            label: {
                [breakpoints.breakpoints.down('sm')]: {
                    fontSize: "16px"
                },
                fontSize: "26px"
            }
        },
        MuiStepConnector: {
            horizontal: {
                [breakpoints.breakpoints.down('sm')]: {
                    paddingTop: "4px"
                },
                paddingTop: "8px"
            }
        }
    }
});

const BuyHistoryStepper = props => {

    const steps = getSteps()
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            {props.state === "پرداخت ناموفق" ?

                <div className={classes.errorContainer}>

                    <CancelIcon color="error" />
                    <p className={classes.error}>پرداخت ناموفق</p>
                </div>

                : props.state === "پرداخت حضوری" ?
                    <div className={classes.errorContainer}>

                        <img src={payImage} width="60px" height="60px"/>
                        <p className={classes.error}>پرداخت حضوری</p>
                    </div>
                    :
                    <Stepper activeStep={steps.indexOf(props.state)} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label} >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
            }
        </ThemeProvider>
    )
}

export default BuyHistoryStepper