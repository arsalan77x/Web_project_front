import React, { useEffect, useState } from "react"
import AppBar from "../../components/AppBar/AppBar"
import BuyHistoryStepper from "../../components/cards/BuyHistoryStepper/BuyHistoryStepper"
import Footer from "../../components/Footer/Footer"
import "./Factor.scss"
import { getOrder } from "./FactorApi"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Divider, makeStyles, withStyles, Tooltip, Typography, Button } from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#f4006e',
        color: theme.palette.common.white,
        fontSize: '20px',
        borderRight: 'solid 2px #f4006e',
        borderLeft: 'solid 2px #f4006e',
    },
    body: {
        fontSize: 14,
        borderRight: 'solid 2px #f1f1f1',
        borderLeft: 'solid 2px #f1f1f1',
        boxSizing: 'border-box'
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        width: '60%',
        margin: '50px auto'
    }
})

const FactorField = props => {
    return (
        <div className="factorDetailsField">
            <p className="factorDetailsFieldText">{props.title}</p>
            <p className="factorDetailsFieldText">{props.detail}</p>
        </div>
    )
}

const Factor = props => {

    const [factorDetail, setFactorDetail] = useState({ detail: [] })
    const classes = useStyles()

    useEffect(() => {
        getOrder(props.match.params.id, setFactorDetail)
    }, [])


    return (
        <div>
            <ContentWrapper>

                <BuyHistoryStepper state={factorDetail ? factorDetail.state : 'ثبت سفارش موفق'} />

                {factorDetail.address &&

                    <div className="factorContainer">

                        <Paper elevation={7}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">نام سفارش</StyledTableCell>
                                            <StyledTableCell align="center">اندازه</StyledTableCell>
                                            <StyledTableCell align="center">تعداد</StyledTableCell>
                                            <StyledTableCell align="center">قیمت</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {factorDetail.detail.map(detailItem =>
                                            detailItem.types.map(row =>
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="center">{detailItem.product.name}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.size}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{row.count}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper className="factorDetails" elevation={7}>
                            <div >
                                <FactorField title="نحوه پرداخت" detail={factorDetail.state} />
                                <Divider />
                                <div className="factorDetailsField">
                                    <p className="factorDetailsFieldText">زمان ثبت سفارش</p>
                                    <p className="factorDetailsFieldText">{factorDetail.time}</p>
                                </div>
                                {
                                    factorDetail.ref_id ?
                                        <div>
                                            <Divider />
                                            <div className="factorDetailsField">
                                                <p className="factorDetailsFieldText">شماره پیگیری :</p>
                                                <p className="factorDetailsFieldText">{factorDetail.ref_id}</p>
                                            </div>
                                        </div> : null}
                                <Divider />
                                <div className="factorDetailsField">
                                    <p className="factorDetailsFieldText">تاریخ ثبت سفارش</p>
                                    <p className="factorDetailsFieldText">{factorDetail.date}</p>
                                </div>
                                <Divider />
                                <div className="factorDetailsField">
                                    <p className="factorDetailsFieldText">آدرس</p>
                                    <p className="factorDetailsFieldText">{factorDetail.address.title}</p>
                                </div>
                                <Divider />
                                <div className="factorDetailsField">
                                    <p className="factorDetailsFieldText">مجموع</p>
                                    <p className="factorDetailsFieldText">{factorDetail.price}</p>
                                </div>
                                <Divider />
                                <div className="factorDetailsField">
                                    <p className="factorDetailsFieldText">هزینه ارسال</p>
                                    <p className="factorDetailsFieldText">{factorDetail.send_price}</p>
                                </div>
                            </div>


                            <div className="factorFooter">
                                <p className="factorFooterText">مبلغ پرداخت شده</p>
                                <p className="factorFooterText">{factorDetail.price_after_off}</p>
                            </div>
                        </Paper>

                    </div>

                }
            </ContentWrapper>
            <Footer />
        </div>
    )
}

export default Factor