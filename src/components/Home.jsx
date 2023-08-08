import React, { useEffect, useState } from 'react'
import StationCard from './StationCard'
import axios from 'axios'
import { config } from '../config'

const Home = ({ user }) => {

    const [stations, setStations] = useState()

    const getStations = () => {
        let url = config.db.baseurl + 'stations'
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setStations(response.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getStations()
    }, [])

    return (

        <>
            <h2
            style={{marginTop:"2rem"}}
            >Bienvenido {user}</h2>

            <div className='cardsContainer'>
                {
                    stations?.map(station => (
                        <StationCard
                            key={station.id}
                            info={station}
                        />
                    ))
                }

            </div>
        </>
    )
}

export default Home