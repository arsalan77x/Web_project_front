import React from "react"
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    card: {
        float: "right",
        width: "240px",
        margin: '10px'
    },
    media: {
        height: 190,
    },
})

const DesktopProductSkeleton = props => {

    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Skeleton  variant="circle" width={40} height={40} />}
                title={<Skeleton  height={10} width="80%" style={{ marginBottom: 6 }} />}
                subheader={<Skeleton  height={10} width="40%" />}/>

            <Skeleton  variant="rect" className={classes.media} />

            <CardContent>
                <Skeleton  height={10} style={{ marginBottom: 6 }} />
                <Skeleton  height={10} width="80%" />
            </CardContent>
        </Card>
    )
}

export default DesktopProductSkeleton