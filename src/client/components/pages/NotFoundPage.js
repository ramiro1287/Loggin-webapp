import React from "react"

export default function NotFoundPage() {
	return(
		<div style={styles.mainContainer}>
			<h1 style={{color: "red"}}> Page Not Found </h1>
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