import React from 'react';


// taking input from component's index.js 
import {Cards, Chart, CountryPicker} from './components';

import styles from './App.module.css';
// {} for named import. No need to specify index files as index.js explicitly.
import {fetchData} from './api';

import cimg from './images/image2.png';

class App extends React.Component {

    state = {
        data : {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData });
    }

    //this function needed to be in app.js as its output is needed to be relfected onto the cards and the charts as app.js is a parent to those.
    handleCountryChange = async (country) => {
         //call api and pass this specific country name selected to it
        //fetch the data
         const fetchedData = await fetchData(country);
        //set the state
        console.log(fetchedData);
        this.setState({ data: fetchedData, country: country });
    }
    render(){
        //destructing the state at top for short naming purposes
        const { data, country } = this.state;

        return(
            <div className={styles.container}>
                <img className={styles.image} src={cimg} alt="COVID19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Chart data={ data } country={ country } />
            </div>
        )
    }
}

export default App;