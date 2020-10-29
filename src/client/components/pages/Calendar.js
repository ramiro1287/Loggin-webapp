import React, {useState} from "react"
import moment from "moment"

export default function Calendar() {
	const [state, setState] = useState({
		dd: moment().date(),
		mm: moment().month(),
		aaaa: moment().year(),
		selectedDay: moment().date(),
		selectedMonth: moment().month()
	})

// ---------------------------------------------------------------------------------- monthString()

	function monthString(num) {
		switch(num) {
			case 0: return "Ene";
			case 1: return "Feb";
			case 2: return "Mar";
			case 3: return "Abr";
			case 4: return "May";
			case 5: return "Jun";
			case 6: return "Jul";
			case 7: return "Ago";
			case 8: return "Sep";
			case 9: return "Oct";
			case 10: return "Nov";
			default: return "Dic"
		}
	}

// ---------------------------------------------------------------------------------- changeMonth()

	function changeMonth(num) {
		setState({
			...state,
			mm: (state.mm + num)
		})
	}

// ---------------------------------------------------------------------------------- selectDay()

	function selectDay(dd, mm) {
		setState({
			...state,
			selectedDay: dd,
			selectedMonth: mm
		})
	}

// ---------------------------------------------------------------------------------- handleDate()

	function handleDate() {
		var dd = state.dd
		var mm = state.mm
		var aaaa = state.aaaa
		var daysMonth = Number
		var weekDay = Number
		var array = []
		function weekDayString(num) {
			switch(num) {
				case 1: return "Lu";
				case 2: return "Ma";
				case 3: return "Mi";
				case 4: return "Ju";
				case 5: return "Vi";
				case 6: return "Sa";
				default: return "Do"
			}
		}
		weekDay = moment().year(aaaa).month(mm).date(1).isoWeekday()
		daysMonth = moment().year(aaaa).month(mm).daysInMonth()
		for (var i = 1; i <= (daysMonth); i++) {
			if (weekDay <= 7) {
				array.push({dia: weekDayString(weekDay), mes: mm, num: i})
			}
			else {
				weekDay = 1
				array.push({dia: weekDayString(weekDay), mes: mm, num: i})
			}
			weekDay++
		}
		return array
	}

// ---------------------------------------------------------------------------------- render

	return(
		<div style={styles.mainContainer}>
			<div style={{display: "row", width: "50%", justifyContent: "center"}}>
				<div style={styles.monthContainer}>
					{state.mm !== 0 && <button style={styles.monthButtonStyle} onClick={()=>{changeMonth(-1)}}>{"<| "}</button>}
					<div style={{fontSize: 30, color: "black", paddingLeft: "0.5vw", paddingRight: "0.5vw"}}> {monthString(state.mm)} </div>
					{state.mm !== 11 &&
					<button style={styles.monthButtonStyle} onClick={()=>{changeMonth(1)}}>{" |>"}</button>}
				</div>
				<div style={styles.scrollStyle}>
					{handleDate().map(d => 
						{if (d.num === state.selectedDay) {
							if (d.mes === state.selectedMonth) {
								return(
									<div key={d.num} style={styles.dayButtonContainer}>
										<button style={styles.dayButtonStyle} onClick={()=>{selectDay(d.num, d.mes)}}>
											<p style={styles.diaText1}>{d.dia}</p>
											<p style={styles.numText1}>{d.num}</p>
										</button>
									</div>
								)
							}
							else {
								return(
									<div key={d.num} style={styles.dayButtonContainer}>
										<button style={styles.dayButtonStyle} onClick={()=>{selectDay(d.num, d.mes)}}>
											<p style={styles.diaText}>{d.dia}</p>
											<p style={styles.numText}>{d.num}</p>
										</button>
									</div>
								)
							}
						}
						else {
							return(
								<div key={d.num} style={styles.dayButtonContainer}>
									<button style={styles.dayButtonStyle} onClick={()=>{selectDay(d.num, d.mes)}}>
										<p style={styles.diaText}>{d.dia}</p>
										<p style={styles.numText}>{d.num}</p>
									</button>
								</div>
							)
						}}
					)
					}
				</div>
			</div>
		</div>
	)

}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "center"
	},
	monthContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: "2vh 0 2vh 0"
	},
	monthButtonStyle: {
		color: "white",
		borderWidth: 2,
		borderColor: "#FF2525",
		borderRadius: 8,
		borderStyle: "solid",
		backgroundColor: "black",
		fontSize: 20,
		paddingTop: "0.3vh",
		paddingBottom: "0.7vh",
		paddingLeft: "0.2vw",
		paddingRight: "0.2vw"
	},
	scrollStyle: {
		display: "flex",
		overflow: "auto",
		whiteSpace: "nowrap",
		backgroundColor: "black",
		borderRadius: 10
	},
	dayButtonContainer: {
		marginLeft: 7,
		marginRight: 7,
		marginTop: 7,
		marginBottom: 7
	},
	dayButtonStyle:{
		backgroundColor: "#FF2525",
		borderRadius: 15,
		borderWidth: 0,
		padding: "0 0 0 0",
		width: "3.5vw"
	},
	diaText: {
		marginTop: 5,
		marginBottom: -3,
		fontSize: 15
	},
	numText: {
		marginBottom: 5,
		marginTop: -3,
		fontSize: 20
	},
	diaText1: {
		marginTop: 5,
		marginBottom: -3,
		fontSize: 15,
		color: "white"
	},
	numText1: {
		marginTop: -3,
		marginBottom: 5,
		fontSize: 20,
		color: "white"
	}
}