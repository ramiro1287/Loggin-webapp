import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import moment from "moment"
import UserAvatar from "./UserAvatar"
import UserUpdate from "./UserUpdate"
import loadUser from "../../../actions/LoadUser"
import {serverIP, serverPORT} from "../../../config"

export default function UserProfile(props) {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const [updateSwitch, setUpdateSwitch] = useState(0)
	useEffect(()=>{loadUser(dispatch)}, [updateSwitch])

// ---------------------------------------------------------------------------------- calcularEdad()

function calcularEdad(fecha) {
	if (fecha) {
		const yearActual = moment().year()
		const monthActual = moment().month() + 1
		const dayActual = moment().date()
		const yearFecha = Number(moment(fecha, "DD/MM/YYYY").format("YYYY"))
		const monthFecha = Number(moment(fecha, "DD/MM/YYYY").format("MM"))
		const dayFecha = Number(moment(fecha, "DD/MM/YYYY").format("DD"))
		var age = yearActual - yearFecha
		if ( monthActual < monthFecha ) {return age-1}
   		else if (monthActual === monthFecha  && dayActual < dayFecha ) {return age-1}
    	return age
	}
}

// ---------------------------------------------------------------------------------- switchRender()

function switchRender() {
	switch(updateSwitch) {
		case 1: return <UserAvatar setUpdateSwitch={setUpdateSwitch} avatar={user.avatar} />;
		case 2: return <UserUpdate setUpdateSwitch={setUpdateSwitch} user={user} />;
		default: return(
			<div style={{display: "flex", alignItems: "center"}}>
				<h2 style={{color: "red"}}>User Profile</h2>
			</div>
		)
	}
}

// ---------------------------------------------------------------------------------- render

	return(
		<div style={styles.mainContainer}>
			<div style={styles.absoluteFrame}>
				<div style={{display: "flex", justifyContent: "center", marginTop: "1vh"}}>
					<img onClick={()=>setUpdateSwitch(1)} src={`/uploads/${user.avatar}`} style={{height: "30vh", borderRadius: "50%"}} />
				</div>
				<div style={{display: "flex", fontSize: 18, margin: "4vh 1vw 0 2vw"}}>
					Nombre: {user.nombre}
				</div>
				<div style={{display: "flex", fontSize: 18, margin: "2vh 1vw 0 2vw"}}>
					Apellido: {user.apellido}
			</div>
					<div style={{display: "flex", fontSize: 18, margin: "2vh 1vw 0 2vw"}}>
					E-Mail: {user.email}
			</div>
				<div style={{display: "flex", fontSize: 18, margin: "2vh 1vw 0 2vw"}}>
					Edad: {calcularEdad(user.fechaNacimiento)}
				</div>
				<div style={{display: "flex", fontSize: 18, margin: "2vh 1vw 0 2vw"}}>
					Sexo: {user.sexo ? "Hombre" : "Mujer"}
				</div>
				<div style={{display: "flex", fontSize: 18, margin: "2vh 1vw 0 2vw"}}>
					Fecha de Nacimiento: {user.fechaNacimiento}
			</div>
				<div style={{display: "flex", justifyContent: "flex-end", marginRight: "2vw"}}>
					<button onClick={()=>setUpdateSwitch(2)} style={styles.btnStyle}>Editar</button>
				</div>
			</div>
			<div style={styles.absoluteFrame2}>
				{switchRender()}
			</div>
		</div>
	)
}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "flex",
		width: "100%"
	},
	absoluteFrame: {
		display: "row",
		position: "absolute",
		top: "13vh",
		left: "2vw",
		width: "30vw",
		height: "70vh",
		justifyContent: "center",
		backgroundColor: "#686868aa"
	},
	absoluteFrame2: {
		display: "flex",
		position: "absolute",
		top: "13vh",
		right: "20vw",
		width: "45vw",
		overflow: "hidden",
		height: "81vh",
		backgroundColor: "#686868aa"
	},
	btnStyle: {
		outline: "none",
		margin: "0 0 0 0",
		border: "none",
		backgroundColor: "black",
		color: "white",
		padding: "0.5vh 1vw 0.5vh 1vw"
	}
}