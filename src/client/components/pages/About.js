import React from "react"

export default function About() {
	return(
		<div style={styles.mainContainer}>
			<h1 style={{color: "green"}}> About Page </h1>
		</div>
	)
}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "flex",
		width: "100%",	
		alignItems: "center",
		justifyContent: "center"
	}
}