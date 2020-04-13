//usestate and useeffect are hooks
import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: {confirmed,recovered,deaths}, country }) => {
    //state
    // setting data to the state is done using hooks
    //usestate is used for functional component 
    //in class component we have, state = { variable : {} } which is similar to usestate but in class
    //here setdailydata is similar to variable to which data is assigned
    const [dailyData, setDailyData] = useState({});

    // useeffect is a sync function so async with it cannot be used 
    // so another variable is created
    //fetchdailydata is a promise 
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        //console.log(dailyData);
        fetchAPI();
    }, []);

    //labels and datasets needs to be an array
    
    const lineChart = (
        dailyData.length
        ? (
            <Line 
                data = {{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        fontColor: '#fff',
                        borderColor: '#3333ff',
                        fill: true,
                    },{
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                    
                }}
                options={{
                    legend: {
                        labels:{
                            fontColor: '#fff',
                            fontSize: 10,
                        }
                    },
                    scales:{
                        xAxes:[{
                            gridLines:{
                                display: false,
                            },
                            ticks:{
                                fontColor: '#fff',
                                fontFamily: "Rubik",
                                fontSize: 10,
                            }
                        }],
                        yAxes:[{
                            gridLines:{
                                display: true,
                                color: '#00adb5cc',
                            },
                            ticks:{
                                fontColor: '#fff',
                                fontFamily: "Rubik",
                            }
                        }]
                    }
                }}
            />
        ) : null

    );
    //{{}}, one bracket for making code dynamic and one bracket for opening an object
    
    const barChart = (
        
        confirmed
        ? (
            <Bar 
                data= {{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)', 
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],        
                    }]
                }}
                options={{
                    legend: {display:false},
                    title:{display:true, text:`Current State in ${country}`},
                    fontColor: "#fff",
                    scales:{
                        xAxes:[{
                            gridLines:{
                                display: false,
                            },
                            ticks:{
                                fontColor: '#fff',
                                fontFamily: "Rubik",
                                fontSize: 10,
                            }
                        }],
                        yAxes:[{
                            gridLines:{
                                display: true,
                                color: '#00adb5cc',
                            },
                            ticks:{
                                fontColor: '#fff',
                                fontFamily: "Rubik",
                            }
                        }]
                    },
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}  
        </div>
    )
}

export default Chart;
