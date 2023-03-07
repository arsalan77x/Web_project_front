import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles'

function ProgressBar(props) {
    
    const classes = useStylesFacebook(props);

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={120}
                thickness={2}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                size={120}
                thickness={2}
                disableShrink
            />
        </div>
    );
}

const useStylesFacebook = makeStyles({
    root: {
        position: 'relative',
    },
    bottom: {
        color: 'white'
    },
    top: {
        color: props => props.color,
        animationDuration: '1000ms',
        position: 'absolute',
        left: 0,
    },
})

export default ProgressBar