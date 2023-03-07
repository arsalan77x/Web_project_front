import React from "react"
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    card: {
        width: "95%",
        margin: "10px auto",
        display: 'flex',
        paddingLeft:'10px',
        boxSizing:'border-box'
    },
    media: {
        height: "130px",
        width: "130px",
    },
    textContainer: {
        flexGrow: '1',
    },
    text: {
        float: "right",
        margin: "10px",
        width: "100%",
    }
})

const MobileProductSkeleton = props => {

    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Skeleton variant="rect" className={classes.media} />
            <div className={classes.textContainer}>
                <Skeleton height={20} className={classes.text} />
                <Skeleton height={20} className={classes.text} />
                <Skeleton height={20} className={classes.text} />
            </div>
        </Card>
    )
}

export default MobileProductSkeleton