import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { config } from '../config'
import { CSVLink } from "react-csv";
import { ExportToExcel } from './ExportToExcel'
import { BiHome } from 'react-icons/bi';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import IndicatorCard from './IndicatorCard'
import SideNavBar from './SideNavBar'
import useMqtt from '../hooks/useMqtt'
import { signal } from '@preact/signals-react'
import { BsFillGearFill } from 'react-icons/bs'
import { FaCircleRadiation } from 'react-icons/fa6'
import NotificationsHeader from './NotificationsHeader'
import { useOrientation } from 'react-use';
import Notifier from "react-desktop-notifications"


const ChartStation = () => {

    const { angle, type } = useOrientation();

    const cont = signal(0)

    // const { station } = useParams()
    const station = 'RAD1'
    console.log(station)
    const navigate = useNavigate()


    const digits = (num) => {
        let digit = num < 10 ? '0' + num : num + ''
        return digit
    }

    const formatDate = (date) => {
        const fecha = new Date(date)
        let stringDate = fecha.getFullYear() + '-' + digits(fecha.getMonth() + 1) + '-' + digits(fecha.getDate())
        return stringDate
    }

    const formatTime = (date) => {
        const time = new Date(date)
        let stringTime = digits(time.getHours() + ':' + digits(time.getMinutes()))
        return stringTime
    }


    const options = {
        backgroundColor: '#848484',
        color: "#212121"
    }

    const [itemInfo, setItemInfo] = useState()
    const [stationInfo, setStationInfo] = useState()
    const [registers, setRegisters] = useState()
    const [allRegisters, setAllRegisters] = useState([])
    const [csv, setCsv] = useState([])
    const [data, setData] = useState()
    const [download, setDownload] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [from, setFrom] = useState(formatDate(new Date()))
    const [to, setTo] = useState(formatDate(new Date()))
    const [rangeType, setRangeType] = useState('day')

    const { mqttSubscribe, isConnected, payload } = useMqtt();
    const [notificationList, setNotificationList] = useState([]);

    const [hideNotifications, setHideNotifications] = useState(false)

    const [alert, setAlert] = useState(0)

    const getAlerts = (date) => {
        let url = config.db.baseurl + 'registers/' + station + '/date/alerts?'
            + 'from=' + date
            + '&to=' + date
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setNotificationList(response.data)
                setAlert(response.data.length)
            })
            .catch(err => console.log(err))
    }

    const getLastInfo = () => {
        let url = config.db.baseurl + 'registers/' + station + '/last'
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setItemInfo(response.data)
            })
            .catch(err => console.log(err))
    }


    const getStation = () => {
        let url = config.db.baseurl + 'stations/' + station
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setStationInfo(response.data)
                console.log(stationInfo)
            })
            .catch(err => console.log(err))
    }


    const getRegistersRange = (from, to) => {
        console.log(from)
        let url = config.db.baseurl + 'registers/' + station + '/date?'
            + 'from=' + from
            + '&to=' + to
        console.log(url)
        setFetching(true)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setRegisters(response.data)
                setRangeType(response.data[0].type)
                console.log(response.data[0].type)
                setFetching(false)
            })
            .catch(err => console.log(err.data))
    }

    const getAllRegisters = () => {
        let url = config.db.baseurl + 'registers/' + station
        console.log(url)
        setFetching(true)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setAllRegisters(response.data)
                setFetching(false)
            })
            .catch(err => console.log(err.data))
    }

    const handleFromTo = (e, type) => {
        console.log(e, type)
        switch (type) {
            case 'from':
                setFrom(e)
                break;
            case 'to':
                setTo(e)
                break;
            default:
                break;
        }

        from !== to &&
            getRegistersRange(from, to)

    }

    const formatData = (data) => {
        let dataformat = data?.map((reg, index) => ({ date: reg.date, time: reg.time, data1: reg.values?.data1, data2: reg.values?.data2, data3: reg.values?.data3 }))
        return dataformat
    }
    const formatCsv = (data) => {
        let csvformat = data?.map((reg, index) => ({ device: station, fecha: reg.date, hora: reg.time, data1: reg.values?.data1, data2: reg.values?.data2, data3: reg.values?.data3 }))
        return csvformat
    }


    useEffect(() => {
        getStation()
        getAlerts(formatDate(new Date()))
        document.addEventListener('visibilitychange', (e) => {
            console.log(document.visibilityState)
            if (document.visibilityState === 'visible') {
                getLastInfo()
                // window.alert('Bienvenido')
                getRegistersRange(from, to)
                getAlerts(formatDate(new Date()))
            }
        })
    }, [])

    // useEffect(() => {
    //     console.log(type)
    // })


    useEffect(() => {
        getRegistersRange(from, to)
        getAlerts(formatDate(new Date()))
        getLastInfo()
    }, [payload])

    useEffect(() => {
        console.log(from)
        console.log(to)
        getRegistersRange(from, to)
    }, [from, to])

    useEffect(() => {
        setData(formatData(registers))
    }, [registers])

    useEffect(() => {
        setCsv(formatCsv(allRegisters))
    }, [allRegisters])


    useEffect(() => {
        if (isConnected) {
            mqttSubscribe(config.db.mqtt);
            mqttSubscribe(config.db.mqttalert);
        }
    }, [isConnected]);

    useEffect(() => {
        if (payload.message
            // && [config.db.mqtt].includes(payload.topic)
        ) {
            console.log(payload.topic)
            // const newMessage = JSON.parse(payload.message);
            // const newMessage = payload.message;
            // console.log(newMessage, stationInfo)
            if (payload.topic.split('/')[1] === 'all') {
                getAlerts(formatDate(new Date()))
                getRegistersRange(from, to)
            }
            if (payload.topic.split('/')[1] === 'alerts')
                getLastInfo()
        }
    }, [payload]);


    return (
        <div className='chartStationPage'
            // onClick={() => setHideNotifications(false)}
            onFocus={() => console.log('dasd')}
        >

            {/* <SideNavBar /> */}

            <div className="navBarContainer">
                <div className="navBarContainer_header">

                    {/* <button
                        className='navButton'
                        onClick={() => navigate('/')}
                        disabled={download && fetching}
                    > <BiHome />Inicio</button> */}

                    {/* <button
                className='HomeButton'
                onClick={() => getRegistersRange(from, to)}
                disabled={download && fetching}
            >Actualizar</button> */}


                    {!allRegisters.length > 0 &&
                        <button
                            className='navButton'
                            onClick={() => getAllRegisters()}
                            disabled={download && fetching}
                        >Obtener todos los datos <PiMicrosoftExcelLogo /></button>
                    }

                    {allRegisters.length > 0 &&
                        <ExportToExcel
                            apiData={csv}
                            fileName={`${station}`}
                            station={station}
                            setDownload={setDownload}
                            fetching={fetching}
                        />

                        // <CSVLink
                        //     className='downLoadBtn'
                        //     data={csv}
                        //     filename={`${station}.csv`}
                        // // headers={headers}
                        // >
                        //     Descargar CSV
                        // </CSVLink>
                    }


                    <h1 className='chartTitle'>{stationInfo?.alias}</h1>

                    <div className="navbar_header_right"
                    // onMouseLeave={() => setHideNotifications(false)}
                    >
                        <div className="navbar_header_notificationBx">
                            {notificationList.length > 0 &&
                                <div className='navbar_header_notificationBx_numberContainer'>
                                    <span>{notificationList.length}</span>
                                </div>
                            }
                            <FaCircleRadiation fontSize={'3.5rem'}
                                onClick={() => setHideNotifications(!hideNotifications)}
                            />
                            {hideNotifications && <NotificationsHeader notificationList={notificationList} setAlert={setAlert} />}
                        </div>
                    </div>



                </div>

                <div className="navBarContainer_body">
                    {/* <div className="">
                        <span className="bodyStationCard_label">Id: </span>
                        <span className="bodyStationCard_text">{stationInfo?.title}</span>
                    </div> */}
                    {/* <div className="">
                        <span className="bodyStationCard_label">Camas: </span>
                        <span className="bodyStationCard_text">{stationInfo?.beds}</span>
                    </div>
                    <div className="">
                        <span className="bodyStationCard_label">Flor: </span>
                        <span className="bodyStationCard_text">{stationInfo?.flowername}</span>
                    </div> */}
                </div>

            </div>

            <div className="chartStationBody">


                <div className="dateContainer">
                    <div className="dateField">
                        <label htmlFor="">Desde:</label>
                        <input type="date"
                            value={from}
                            onChange={(e) => handleFromTo(e.target.value, 'from')}
                        />
                    </div>
                    <div className="dateField">
                        <label htmlFor="">Hasta:</label>
                        <input type="date"
                            value={to}
                            onChange={(e) => handleFromTo(e.target.value, 'to')}
                        />
                    </div>

                    {/* <button onClick={() => cont.value++} >hola: {cont}</button> */}

                </div>

                <div className="indicatorsContainer">

                    <IndicatorCard
                        type={'cps'}
                        value={itemInfo?.values ? itemInfo?.values?.data1 : 0}
                        status={1}
                        payload={payload}
                        stationInfo={stationInfo}
                    />
                    <IndicatorCard
                        type={'µSv/h'}
                        value={itemInfo?.values ? itemInfo?.values?.data2 : 0}
                        status={1}
                        payload={payload}
                        stationInfo={stationInfo}
                    />
                    <IndicatorCard
                        type={'µSv/d'}
                        value={itemInfo?.values ? itemInfo?.values?.data3 : 0}
                        status={1}
                        payload={payload}
                        stationInfo={stationInfo}
                    />

                </div>
                {/* <h1 className='chartTitle'>{stationInfo?.alias}</h1> */}

                <div className="chartsContainer">

                    <div className="chartContainer">
                        <h3>Conteo por segundo (cps):</h3>
                        <span className='y_axisLabel'>cps</span>

                        <LineChart
                            width={angle === 0 ? 300 : 700}
                            height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
                            <Line type="monotone" dataKey="data1"
                                stroke={config.styles.linecolor}
                                strokeWidth={config.styles.linewidth}
                                animationDuration={500}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey={rangeType === 'hour' ? 'time' : 'date'} />
                            <YAxis dataKey={"data1"} />
                            <Tooltip animationDuration={200}
                                itemStyle={options}
                                contentStyle={options}
                            />
                        </LineChart>

                        <div className='x_axisLabel'>Hora</div>
                    </div>

                    <div className="chartContainer">
                        <h3>Tasa de dosis (µSv/h): </h3>
                        <span className='y_axisLabel'>µSv/h</span>
                        <LineChart
                            width={angle === 0 ? 300 : 700}
                            height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="data2"
                                stroke={config.styles.linecolor}
                                strokeWidth={config.styles.linewidth}
                                animationDuration={500}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
                            <XAxis dataKey={rangeType === 'hour' ? 'time' : 'date'} />
                            <YAxis dataKey={"data2"} />
                            <Tooltip animationDuration={200}
                                itemStyle={options}
                                contentStyle={options}
                            />
                        </LineChart>
                        <div className='x_axisLabel'>Hora</div>

                    </div>

                    <div className="chartContainer">
                        <h3>Tasa de dosis (µSv/d): </h3>
                        <span className='y_axisLabel'>µSv/d</span>
                        <LineChart
                            width={angle === 0 ? 300 : 700}
                            height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="data3"
                                stroke={config.styles.linecolor}
                                strokeWidth={config.styles.linewidth}
                                animationDuration={500}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
                            <XAxis dataKey={rangeType === 'hour' ? 'time' : 'date'} />
                            <YAxis dataKey={"data3"} />
                            <Tooltip animationDuration={200}
                                itemStyle={options}
                                contentStyle={options}
                            />
                        </LineChart>
                        <div className='x_axisLabel'>Hora</div>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default ChartStation