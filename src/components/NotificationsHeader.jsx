import React, { useState } from 'react'

const NotificationsHeader = ({ alertMessage, setAlert }) => {
    console.log(alertMessage)

    const [hideInfo, setHideInfo] = useState(true)

    return (
        <div className='notificationsHeaderContainer'>
            <h3>Notificaciones</h3>
            <div className="notificationsContainer">

                <div className="notificationBx"
                    onClick={() => setHideInfo(!hideInfo)}
                >
                    {alertMessage && <span className='notificationTitle'>{alertMessage}</span>}
                    {
                        !hideInfo &&
                        <div className="notificationInfo">
                            <span onClick={() => setAlert(0)}>Eliminar alerta</span>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}

export default NotificationsHeader