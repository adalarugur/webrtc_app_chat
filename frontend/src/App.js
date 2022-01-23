import React from 'react'
import {Typography,AppBar} from '@material-ui/core';

import Player from './Components/Player';
import Options from './Components/Options';
import Notifications from './Components/Notifications';
const App = () => {
    return (
        <div>
            <AppBar position="static" color="inherit"  >
                <Typography variant="h1" align="center" >
                    Video Calling App
                </Typography>    
            </AppBar> 
        </div>
    )
}

export default App
