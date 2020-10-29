import React, {useState, useEffect} from "react"
import moment from "moment"
import {serverIP, serverPORT} from "../../../config"

export default function UserUpdate(props) {
	const [state, setState] = useState({
		nombre: "",
		apellido: "",
		fechaNacimiento: "",
		sexo: false,
		fechaInvalida: false
	})
	const [fechaState, setFechaState] = useState({
		fechaDD: "",
		fechaMM: "",
		fechaYYYY: ""
	})
	useEffect(()=>{
		setState({
			...state,
			nombre: props.user.nombre,
			apellido: props.user.apellido,
			sexo: props.user.sexo,
			fechaNacimiento: props.user.fechaNacimiento
		})
	}, [])
	const stateWatcher = state.fechaNacimiento
	useEffect(()=>{desarmarFecha(stateWatcher)}, [stateWatcher])

// ---------------------------------------------------------------------------------- calcularEdad()

function desarmarFecha(fecha) {
	if (fecha) {
		setFechaState({
			...fechaState,
			fechaDD: moment(fecha, "DD/MM/YYYY").format("DD"),
			fechaMM: moment(fecha, "DD/MM/YYYY").format("MM"),
			fechaYYYY: moment(fecha, "DD/MM/YYYY").format("YYYY")
		})
	}
}

// ---------------------------------------------------------------------------------- validarFecha()

function validarFecha(dd, mm, yyyy) {
	if (dd !== "" && mm !== "" && yyyy !== "") {
		const yearActual = moment().year()
		if ((Number(dd) >= 1 && Number(dd) <= 31) && (Number(mm) >= 1 && Number(mm) <= 12) && (Number(yyyy) >= (yearActual-100) && Number(yyyy) <= yearActual)) {
			return false
		}
		else {
			return true
		}
	}
	else {
		return true
	}
}

// ---------------------------------------------------------------------------------- checkInputs()

function checkInputs() {
	if (validarFecha(fechaState.fechaDD, fechaState.fechaMM, fechaState.fechaYYYY)) {
		setState({...state, fechaInvalida: true})
	}
	else {
		var fDD = fechaState.fechaDD
		var fMM = fechaState.fechaMM
		var fYYYY = fechaState.fechaYYYY
		if ((fDD).length === 1) {
			fDD = String("0" + fechaState.fechaDD)
		}
		if ((fMM).length === 1) {
			fMM = String("0" + fechaState.fechaMM)
		}
		setFechaState({...fechaState, fechaDD: fDD, fechaMM: fMM})
		const fecha = `${fDD}/${fMM}/${fYYYY}`
		fetchUpdate(fecha)
	}
}

// ---------------------------------------------------------------------------------- fetchUpdate()

function fetchUpdate(fecha) {
	fetch(`http://${serverIP}:${serverPORT}/users/updateUser`, {
		method: "put",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			nombre: state.nombre,
			apellido: state.apellido,
			fechaNacimiento: fecha,
			sexo: state.sexo
		})
	})
	.then(res => res.json())
	.then(data => {
		if (data.body.status === "OK") {
			setState({
				...state,
				nombre: "",
				apellido: "",
				fechaNacimiento: "",
				sexo: false,
				fechaInvalida: false
			})
			setFechaState({
				...fechaState,
				fechaDD: "",
				fechaMM: "",
				fechaYYYY: ""
			})
			props.setUpdateSwitch(0)
		}
		else {
			setState({
				...state,
				nombre: "",
				apellido: "",
				fechaNacimiento: "",
				sexo: false,
				fechaInvalida: false
			})
			setFechaState({
				...fechaState,
				fechaDD: "",
				fechaMM: "",
				fechaYYYY: ""
			})
		}
	})
	.catch(err => console.error(err))
}

// ---------------------------------------------------------------------------------- render

	return(
		<div style={styles.mainContainer}>
			<div style={styles.frameStyle}>
				<p style={{display: "flex", margin: "0 1vw 0 0", fontSize: 18, justifyContent: "center"}}>Nombre</p>
				<div style={{display: "flex", justifyContent: "center"}}>
					<input name="nombre" value={state.nombre} onChange={e => setState({...state, nombre: e.target.value})} placeholder="Nombre" style={styles.inputStyle} />
				</div>
		</div>
			<div style={styles.frameStyle}>
				<p style={{display: "flex", margin: "0 1vw 0 0", fontSize: 18, justifyContent: "center"}}>Apellido</p>
				<div style={{display: "flex", justifyContent: "center"}}>
					<input name="apellido" value={state.apellido} onChange={e => setState({...state, apellido: e.target.value})} placeholder="Apellido" style={styles.inputStyle} />
				</div>
			</div>
			<div style={styles.frameStyle}>
				<p style={{display: "flex", margin: "0 1vw 0 0", fontSize: 18, justifyContent: "center"}}>Sexo</p>
				<div style={{display: "flex", justifyContent: "center"}}>
					<button onClick={()=>setState({...state, sexo: true})} style={state.sexo ? styles.sexoBtnStyle : styles.sexoBtnStyle1}>Hombre</button>
					<button onClick={()=>setState({...state, sexo: false})} style={!state.sexo ? styles.sexoBtnStyle : styles.sexoBtnStyle1}>Mujer</button>
				</div>
			</div>
			<div style={state.fechaInvalida ? styles.frameStyle1 : styles.frameStyle}>
				<p style={{display: "flex", margin: "0 1vw 0 0", fontSize: 18, justifyContent: "center"}}>Fecha de nacimento</p>
				<div onClick={()=>setState({...state, fechaInvalida: false})} style={{display: "flex", justifyContent: "center"}}>
					<input type="text" placeholder="DD" value={fechaState.fechaDD} name="fechaDD" onChange={e => setFechaState({...fechaState, fechaDD: e.target.value})} style={styles.fechaStyle} />
					<p style={{fontSize: 20, margin: "0 0.5vw 0 0.5vw"}}> / </p>
					<input type="text" placeholder="MM" value={fechaState.fechaMM} name="fechaMM" onChange={e => setFechaState({...fechaState, fechaMM: e.target.value})} style={styles.fechaStyle} />
					<p style={{fontSize: 17, margin: "0 0.5vw 0 0.5vw"}}> / </p>
					<input type="text" placeholder="AAAA" value={fechaState.fechaYYYY} name="fechaYYYY" onChange={e => setFechaState({...fechaState, fechaYYYY: e.target.value})} style={styles.fechaStyle1} />
				</div>
				{state.fechaInvalida
					?
					<p style={{display: "flex", justifyContent: "center", fontSize: 14, margin: "1vh 0 0 0", padding: "0 0 0 0"}}>Fecha Invalida...</p>
					:
					null
				}
			</div>
			<div style={{display: "flex", justifyContent: "center", margin: "1.5vh 0 0 0"}}>
				<button onClick={()=>{checkInputs()}} style={{borderRadius: 10, backgroundColor: "green", border: "none", margin: "0 1.5vw 0 0"}}> Actualizar </button>
				<button onClick={()=>{props.setUpdateSwitch(0)}} style={{borderRadius: 10, backgroundColor: "green", border: "none", margin: "0 0 0 1.5vw"}}> Cerrar </button>
			</div>
		</div>
	)
}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "row",
		width: "100%"
	},
	frameStyle: {
		display: "row",
		backgroundColor: "#BABABA",
		padding: "1vh 1vw 2vh 1vw",
		margin: "2vh 2vw 1vh 2vw",
		borderRadius: 10
	},
	frameStyle1: {
		display: "row",
		backgroundColor: "#A14E4E",
		padding: "1vh 1vw 2vh 1vw",
		margin: "2vh 2vw 1vh 2vw",
		borderRadius: 10
	},
	sexoBtnStyle: {
		outline: "none",
		border: "none",
		margin: "0vh 1vw 0vh 1vw",
		padding: "0.5vh 0.5vw 0.5vh 0.5vw",
		backgroundColor: "#4EA15C",
		color: "black",
		borderRadius: 10
	},
	sexoBtnStyle1: {
		outline: "none",
		border: "none",
		margin: "0vh 1vw 0vh 1vw",
		padding: "0.5vh 0.5vw 0.5vh 0.5vw",
		backgroundColor: "#A14E4E",
		color: "black",
		borderRadius: 10
	},
	inputStyle: {
		fontSize: 13,
		borderRadius: 10,
		border: "none",
		width: "20vw"
	},
	fechaStyle: {
		outline: "none",
		border: "none",
		borderRadius: 10,
		margin: "0 0 0 0",
		padding: "0 0 0 0.5vw",
		width: "2vw"
	},
	fechaStyle1: {
		outline: "none",
		border: "none",
		borderRadius: 10,
		margin: "0 0 0 0",
		padding: "0 0 0 0.5vw",
		width: "3.5vw"
	}
}