import React from 'react'
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Player from './Components/Player';
import Options from './Components/Options';
import Notifications from './Components/Notifications';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper} >

            <AppBar className={classes.appBar} position="static" color="inherit"  >
                <Typography variant="h3" align="center" >
                    Online Meeting App
                </Typography>
            </AppBar>
            <Player/>
            <Options>
                <Notifications/>
            </Options>
        </div>
    )
}

export default App;
