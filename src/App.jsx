import React from "react"
import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import ContactUs from "./Pages/ContactUs/ContactUs"
import Pay from "./Pages/Pay/Pay"
import Profile from "./Pages/Profile/Profile"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MobileAddress from './Pages/MobileAddress/MobileAddress';
import MobileBasket from './Pages/MobileBasket/MobileBasket';
import Factor from './Pages/Factor/Factor';
import Product from './Pages/Product/Product';
import AppBar from "./components/AppBar/AppBar"
import LoadingBackdrop from "./components/LoadingBackdrop/LoadingBackdrop"
import SnackBar from "./components/SnackBar/SnackBar"
import store from "./redux/store"
import { Provider } from "react-redux";

const theme = createTheme({
    palette: {
        primary: {
            main: "#01bfd7"
        }
    }
})

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export default function App(props) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <StylesProvider jss={jss}>
                    <ThemeProvider theme={theme}>
                        <AppBar />
                        <LoadingBackdrop />
                        <SnackBar />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/aboutus" exact component={AboutUs} />
                            <Route path="/contactus" exact component={ContactUs} />
                            
                            <Route path="/pay" exact component={Pay} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/addresses" exact component={MobileAddress} />
                            <Route path="/basket" exact component={MobileBasket} />
                            <Route path="/factor/:id" component={Factor} />
                            <Route path="/product/:category/:id" component={Product} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </ThemeProvider>
                </StylesProvider>
            </BrowserRouter>
        </Provider>
    )
}
