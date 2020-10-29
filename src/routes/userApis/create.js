const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	const {email, password} = req.body
	const existUser = await Usuario.exists({email})
	if (existUser) {
		res.json({status: "Existe"})
	}
	else {
		const user = new Usuario({email, password})
		user.password = await user.cifrarPassword(password)
		await user.save()
			.then(() => res.json({status: "Creado"}))
			.catch(e => res.json({status: "Error"}))
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router