import React from 'react'
import {Grid, Typography, Paper} from  '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SocketContext} from '../Context';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const Player = () => {
    return (
        <div>
           Player 
        </div>
    )
}

export default Player;