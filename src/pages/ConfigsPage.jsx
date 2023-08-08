import React, { useEffect, useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router'
import DeviceConfig from '../components/configs/DeviceConfig'
import axios from 'axios'
import { config } from '../config'

const ConfigsPage = () => {

    const [stations, setStations] = useState([])

    const getStations = () => {
        axios.get(config.db.baseurl + 'stations')
            .then((response) => {
                console.log(response.data)
                setStations(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getStations()
    }, [])


    const navigate = useNavigate()
    return (
        <div className='configsPage'>
            <MdArrowBackIosNew fontSize={'3rem'} onClick={() => navigate(-1)} />
            <h1>Configuraciones</h1>

            <div className="congig_devicesContainer">

                {
                    stations.map(station => (
                        <DeviceConfig key={station.id} info={station} />
                    ))
                }

            </div>
        </div>
    )
}

export default ConfigsPage