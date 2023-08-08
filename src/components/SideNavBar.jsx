import React, { useState } from 'react'
import { BiHome } from 'react-icons/bi';
import { TbPhotoSensor3 } from 'react-icons/tb';
import { BsLayoutTextSidebar, BsDeviceSsd, BsFillGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';




const SideNavBar = () => {

    const navigate = useNavigate()

    const [hover, setHover] = useState(false)

    const handleNavigate = (e, r) => {
        navigate(e)
        r && window.location.reload()

    }

    return (
        <div className='sidenavbar'
            onMouseLeave={() => setHover(false)}
        >
            {!hover &&
                <div className="sideBar_iconBox"
                    onClick={() => setHover(true)}
                >
                    <BsLayoutTextSidebar
                        className='sidenavbar_headericon'
                        fontSize={'2rem'}
                    />
                </div>
            }

            {
                hover &&

                <div className="sidenavbar_devicesContainer">
                    <div className="sidenavbar_devicesContainer_header">
                        <BsLayoutTextSidebar
                            className='sidenavbar_headericon'
                            fontSize={'2rem'}
                            onClick={() => setHover(!hover)}
                        />

                        <span className="sidenavbar_devicesContainer_hederText">
                            Equipos
                        </span>


                    </div>

                    <div
                        className="sidenavbar_devicesContainer_deviceBox"
                        onClick={() => handleNavigate('/ESP1', true)}
                    >

                        <TbPhotoSensor3 />
                        <span>EQUIPO 1</span>
                    </div>

                    <div
                        className="sidenavbar_devicesContainer_deviceBox"
                        onClick={() => handleNavigate('/ESP2', true)}
                    >

                        <TbPhotoSensor3 />
                        <span>EQUIPO 2</span>
                    </div>

                    <div
                        className="sidenavbar_devicesContainer_deviceBox"
                        onClick={() => handleNavigate('/ESP3')}
                    >

                        <TbPhotoSensor3 />
                        <span>EQUIPO 3</span>
                    </div>
                </div>
            }

            <div className="sideBar_iconBox"
                onClick={() => handleNavigate('/config', false)}
            >
                <BsFillGearFill fontSize={'2rem'} />
            </div>
        </div>
    )
}

export default SideNavBar