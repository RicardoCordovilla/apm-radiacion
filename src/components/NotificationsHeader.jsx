import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'

const NotificationsHeader = ({ notificationList, setAlert }) => {
    console.log(notificationList)

    const [hideInfo, setHideInfo] = useState(true)

    const alertMessage = [
        null,
        'Límite de radiación alto',
        'Tolerancia de radiación alta',
        'Alerta de radiacion ionizante',
    ]


    return (
        <div className='notificationsHeaderContainer'>
            <h3>Notificaciones...</h3>
            <div className="notificationsContainer">

                <div className="notificationBx"
                    onClick={() => setHideInfo(!hideInfo)}
                >
                    {
                        notificationList.map((notif, index) => (
                            <span key={index} className='notificationTitle'>
                                {notif?.values?.alert ? alertMessage[notif?.values?.alert] : null} | {notif?.time}
                                {/* <BiTrash /> */}
                            </span>
                        ))
                    }

                    {/* {
                        !hideInfo &&
                        <div className="notificationInfo">
                            <span onClick={() => setAlert(0)}>Eliminar alerta</span>
                        </div>
                    } */}

                </div>

            </div>
        </div>
    )
}

export default NotificationsHeader