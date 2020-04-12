import React from 'react';
import {Card, CardContent, Typography, Grid } from '@material-ui/core';
import  styles from './Cards.module.css'
import Countup from 'react-countup';
import cx from 'classnames';

// props gets the the data sent from app.js into the cards
//to access props into html it has to be destructed first.
const Cards = ({ data : { confirmed, recovered, deaths, lastUpdate }}) => {
    //console.log(props);
    if(!confirmed){
        return 'Loading...'
    }
    
    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography className={styles.headings} color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5" className={styles.numheadings}>
                            <Countup start = {0} end = {confirmed.value} duration = {2.5} separator = ',' />
                        </Typography>
                        <Typography className={styles.dateheadings} color="textSecondary">{ new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography className={styles.descriptionheadings} variant="body2">Numbers of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography className={styles.headings} color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5"  className={styles.numheadings}>
                            <Countup start = {0} end = {recovered.value} duration = {2.5} separator = ',' />
                        </Typography>
                        <Typography className={styles.dateheadings} color="textSecondary">{ new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography className={styles.descriptionheadings} variant="body2">Numbers of recovered cases from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography className={styles.headings} color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5"  className={styles.numheadings}>
                            <Countup start = {0} end = {deaths.value} duration = {2.5} separator = ',' />
                        </Typography>
                        <Typography className={styles.dateheadings} color="textSecondary">{ new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography className={styles.descriptionheadings} variant="body2">Numbers of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;