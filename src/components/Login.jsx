import React, { useState } from 'react'
import logo from '../../public/APMlogo.png'
import { useNavigate } from 'react-router'

const Login = ({ user, setUser }) => {

    const navigate = useNavigate()

    const handleSubmit = () => {
        if (user) {
            navigate('/home')
        }
    }

    return (
        <div>

            <figure className="logoContainer">
                <img src={logo} alt="" className='logo' />
            </figure>

            <h2 style={{ textAlign: "center", margin: "1rem" }}>Ingreso</h2>
            
            <div className="inputField">
                <label htmlFor="">Usuario:</label>
                <input type="text" className="loginField"
                    placeholder='Nombre de ususario'
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div className="inputField">
                <label htmlFor="">Password:</label>
                <input type="password" className="loginField"
                    placeholder=''
                />
            </div>

            <button
                className="submit"
                onClick={handleSubmit}
            >
                Ingresar
            </button>
        </div>
    )
}

export default Login