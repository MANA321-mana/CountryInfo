import React,{ useState,useEffect } from 'react';

import Loading from './Loading';
import CountryMap from './CountryMap';
import countriesData from '../storage/countries.json';

const Main = () =>{
    const [countries,setCountries] = useState([]);

    useEffect(()=>{
        setCountries(countriesData);
    },[]);

    return(
        <div>
            { countries.length === 0 ? <Loading/> :
              <div>
                <CountryMap countries={countries} />
              </div>
            }
        </div>
    );
}

export default Main;