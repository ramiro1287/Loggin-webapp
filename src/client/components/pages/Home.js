import React from "react"

export default function Home() {
	return(
		<div style={styles.mainContainer}>
			<h1 style={{color: "green"}}> Home Page </h1>
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