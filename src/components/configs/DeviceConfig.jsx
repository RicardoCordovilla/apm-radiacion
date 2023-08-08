import React, { useState } from 'react'

const DeviceConfig = ({ info }) => {
    console.log(info)

    const [name, setName] = useState(info?.alias)
    const [beds, setBeds] = useState(info?.beds)
    const [humRange, setHumRange] = useState(info?.humRange)
    const [tempRange, setTempRange] = useState(info?.tempRange)


    return (
        <div className='deviceConfigBx'>
            <span>{info?.alias}</span>
            <div className="fieldsContainer">
                <div className="field">
                    <label htmlFor="" className='fieldLabel'>Nombre:</label>
                    <input type="text" name="" id="" className='fieldInput'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="" className='fieldLabel'>Camas:</label>
                    <input type="text" name="" id="" className='fieldInput'
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                    />
                </div>

                <div className="fieldRow">
                    <div className="field">
                        <label htmlFor="" className='fieldLabel'>Temperatura mínima:</label>
                        <input type="number" name="" id="" className='fieldInput'
                            value={tempRange.min}
                        // onChange={(e) => setTempRange(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="" className='fieldLabel'>Temperatura máxima:</label>
                        <input type="number" name="" id="" className='fieldInput'
                            value={tempRange.max}
                        // onChange={(e) => setTempRange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="fieldRow">
                    <div className="field">
                        <label htmlFor="" className='fieldLabel'>Humedad mínima:</label>
                        <input type="number" name="" id="" className='fieldInput'
                            value={humRange.min}
                        // onChange={(e) => setTempRange(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="" className='fieldLabel'>Humedad máxima:</label>
                        <input type="number" name="" id="" className='fieldInput'
                            value={humRange.max}
                        // onChange={(e) => setTempRange(e.target.value)}
                        />
                    </div>
                </div>

                <button className="btnSave">
                    Guardar
                </button>
            </div>

        </div>
    )
}

export default DeviceConfig