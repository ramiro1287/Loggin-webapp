const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const passport = require("passport")

// --------------------------------------------------------------------------------------------- DELETE

//await Usuario.findOneAndRemove({userName: req.params.usrName})

router.delete("/", async (req, res) => {
	if (req.isAuthenticated()) {
		sad
	}
	else {
		const usrState = req.isAuthenticated()
		return res.json({body: {usrLogged: usrState}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router