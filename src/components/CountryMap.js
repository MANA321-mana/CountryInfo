import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CountryMap.css';
const CountryDataURL = "https://restcountries.com/v3.1/name/";

const CountryMap = ({ countries }) => {
    const [showDetail, setShowDetail] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 8000);
    }, [error]);

    const mapStyle = {
        fillColor: 'white',
        weight: 1,
        color: 'purple',
        fillOpacity: 1
    }

    const fetchData = (cN) => {
        fetch(CountryDataURL + cN)
            .then(res => res.json())
            .then(data => setShowDetail(data))
            .catch(err => setError(err.message));
    }

    const showDetails = (e) => {
        let countryName;
        if (typeof (e) === 'string') {
            countryName = e;
        } else {
            countryName = e.target.feature.properties.ADMIN;
            setSearchCountry('')
        }

        if (showDetail.length > 0) {
            if (showDetail[0].name.common === countryName)
                return
            else {
                fetchData(countryName);
                console.log(1);
            }
        } else {
            fetchData(countryName);
        }

    }

    const onSearch = (e) => {
        if (e.keyCode === 13) {
            showDetails(e.target.value)
        }
    }

    const onEachCountry = (country, layer) => {
        const name = country.properties.ADMIN;
        layer.bindPopup(`${name}`);
        layer.on({
            click: showDetails
        })
    }
    const handleInput = (e) => {
        setSearchCountry(e.target.value);
    }

    return (
        <div className="mapBody">
            <div className="searchBox">
                <input type="text" value={searchCountry} onKeyDown={onSearch} onInput={handleInput} placeholder="Search " />
            </div>
            <MapContainer
                style={{ height: '100vh' }}
                zoom={1}
                maxZoom={10}
                center={[20, 120]}>
                <GeoJSON style={mapStyle} data={countries} onEachFeature={onEachCountry} />
            </MapContainer>
            {
                (error) && <div className="errorBox"><p>{error}</p></div>
            }
            {
                (showDetail.length > 0) ?
                    (<div className="detailListDiv">
                        <ul className="detailList">
                            <li>
                                <h2 className="countryName">{showDetail[0].name.common}</h2>
                            </li>
                            <li>
                                <img src={showDetail[0].flags.png} alt={showDetail[0].flags.alt} />
                            </li>
                            <li>
                                <strong>Capital</strong><span>{showDetail[0].capital[0]}</span>
                            </li>
                            <li>
                                <strong>Currency</strong><span>{Object.keys(showDetail[0].currencies).map((item, idx) => <span key={idx}> {showDetail[0].currencies[item].symbol} , {showDetail[0].currencies[item].name}</span>)}</span>
                            </li>
                            <li>
                                <strong>Population</strong><span>{new Intl.NumberFormat('ja-JP', { currency: 'JPY' }).format(showDetail[0].population)}</span>
                            </li>
                            <li>
                                <strong>Latlang</strong><span>{showDetail[0].capitalInfo.latlng[0]},{showDetail[0].capitalInfo.latlng[1]},</span>
                            </li>
                            <li>
                                <strong>Language</strong><span >{Object.keys(showDetail[0].languages).map((lang, idx) => <span key={idx} className="lang"> {showDetail[0].languages[lang]} </span>)}</span>
                            </li>
                            <li>
                                <strong>Area</strong><span>{showDetail[0].area}</span>
                            </li>
                            <li>
                                <strong>TimeZone</strong><span>{showDetail[0].timezones[0]}</span>
                            </li>
                            <li>
                                <strong>Region</strong><span>{showDetail[0].subregion}</span>
                            </li>
                        </ul>
                    </div>) : ''
            }
        </div>
    )
}

export default CountryMap;