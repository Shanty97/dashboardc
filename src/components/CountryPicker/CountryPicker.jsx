import React,{useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css'
import { fetchcountries } from '../../api';

const CountryPicker = ({ handleCountryChange}) => {
const [fetchedCountries, setFetchedCountries] = useState([]); 

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchcountries());
        }

        fetchAPI();
    },[setFetchedCountries]); 
    // console.log(fetchedCountries);
    //rule of react is to always have a key while mapping over something 
    return(
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue='' onChange={(event) => handleCountryChange(event.target.value)}>
                <h2>Select Country</h2>
                <option className={styles.txtcolr} color='#fff' value="">Global</option>
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;