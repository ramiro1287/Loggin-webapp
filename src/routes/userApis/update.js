const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const passport = require("passport")

// --------------------------------------------------------------------------------------------- PUT

router.put("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const {nombre, apellido, sexo, fechaNacimiento} = req.body
		await req.user.updateOne({nombre, apellido, sexo, fechaNacimiento})
			.then(res.json({body: {status: "OK"}}))
			.catch(res.json({body: {status: "Error"}}))
	}
	else {
		const usrState = req.isAuthenticated()
		return res.json({body: {usrLogged: usrState}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router