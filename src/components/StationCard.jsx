import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config'
import { useNavigate } from 'react-router'
import { FaTemperatureLow, FaCloudversify } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';


const StationCard = ({ info }) => {
    console.log(info)
    const navigate = useNavigate()

    const [itemInfo, setItemInfo] = useState()
    const [dbUpdated, setDbUpdated] = useState(0)

    const digits = (num) => {
        let digit = num < 10 ? '0' + num : num + ''
        return digit
    }

    const formatDate = (date) => {
        const fecha = new Date(date)
        let stringDate = digits(fecha.getDate()) + '-' + digits(fecha.getMonth() + 1) + '-' + fecha.getFullYear()
        return stringDate
    }

    const formatTime = (date) => {
        const time = new Date(date)
        let stringTime = digits(time.getHours() + ':' + digits(time.getMinutes()))
        return stringTime
    }


    const getItemInfo = () => {
        if (info.title) {
            let url = config.db.baseurl + 'registers/' + info.title + '/last'
            console.log(url)
            axios.get(url)
                .then(response => {
                    console.log(response.data)
                    setItemInfo(response.data)
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getItemInfo()
    }, [])


    

    return (
        <div className='stationCard'
            onClick={() => itemInfo && navigate('/' + itemInfo?.stationtitle)}
        >

            <div className="stationCard_header">

                {/* <div className="sensorInfoContainer">
                    <span
                        className='stationTitle'
                        onClick={() => itemInfo && navigate('/' + info?.title)}
                    >{info?.alias}</span>
                </div> */}

                <div className="stationCard_header_line">
                    <span className='stationCard_header_line_infoLabel'><FaTemperatureLow /></span>
                    <span className='stationCard_header_line_infoText'>{itemInfo ? itemInfo?.temp + '°C' : 'sin datos'}</span>
                </div>
                <div className="stationCard_header_line">
                    <span className='stationCard_header_line_infoLabel'><WiHumidity /></span>
                    <span className='stationCard_header_line_infoText'>{itemInfo ? itemInfo?.hum + '%' : 'sin datos'}</span>
                </div>
            </div>



            <div className="bodyStationCard">
                {/* <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Hora: </span>
                    <span className="bodyStationCard_text">{formatTime(info?.createdAt)}</span>
                </div> */}
                <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Id: </span>
                    <span className="bodyStationCard_text">{info?.alias}</span>
                </div>
                <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Flor: </span>
                    <span className="bodyStationCard_text">{info.flowername}</span>
                </div>
                {/* <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Bloque: </span>
                    <span className="bodyStationCard_text">1</span>
                </div> */}
                {/* <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Nave: </span>
                    <span className="bodyStationCard_text">1</span>
                </div> */}
                <div className="bodyStationCardLine">
                    <span className="bodyStationCard_label">Camas: </span>
                    <span className="bodyStationCard_text">{info?.beds}</span>
                </div>
            </div>

        </div>
    )
}

export default StationCard