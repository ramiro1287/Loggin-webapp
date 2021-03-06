const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const passport = require("passport")

// --------------------------------------------------------------------------------------------- GET

router.get("/", (req, res) => {
	const usrState = req.isAuthenticated()
	if (usrState) {
		const {_id, email, nombre, apellido, fechaNacimiento, sexo, avatar} = req.user
		res.json({body: {userProps: {_id, email, nombre, apellido, fechaNacimiento, sexo, avatar}, usrLogged: usrState}})
	}
	else {
		res.json({body: {usrLogged: usrState}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router