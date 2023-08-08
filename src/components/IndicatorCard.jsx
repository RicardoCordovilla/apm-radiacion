import React, { useEffect } from 'react'
import GaugeChart from 'react-gauge-chart';
import { FaTemperatureLow, FaArrowUp } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi';
import Gauge from './Gauge';


const IndicatorCard = ({ type, value, status, min, max, payload }) => {
    console.log(min, max, value)


    useEffect(() => { }, [payload])

    return (
        <div className="indicatorCard">

            <div className='indicatorCard_body'>

                {/* <div className="sideIcon">
                    {
                        type === 'temp' ?
                            < FaTemperatureLow />
                            : < WiHumidity />
                    }
                </div> */}

                <div className="sideNumber">
                    <span className='titleIndicatorCard'>{type}</span>
                    {/* <span className='numberIndicatorCard'>
                        {value}
                        {
                            type === 'temp' ?
                                ' °C'
                                : '%'
                        }
                    </span> */}
                </div>

                {/* <div className="sideUp">
                    <FaArrowUp fontSize={'1rem'} color='#2d0' />
                    <span className='sideUp_number'>1</span>
                </div> */}

            </div>

            <div className="indicatorCard_footer">
                <span className='indicatorCard_body_numbers'>{value}</span>
                {/* <Gauge
                    min={min}
                    max={max}
                    value={value}
                    payload={payload}
                /> */}
                {/* <div className="indicatorCard_footer_labels">
                    <span>{min}</span>
                    <span>{max}</span>
                </div> */}
            </div>

        </div>
    )
}

export default IndicatorCard