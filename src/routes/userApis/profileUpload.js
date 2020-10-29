const router = require('express').Router()
const Usuario = require('../../models/Usuario')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const {promisify} = require('util')
const crypto = require('crypto')

// --------------------------------------------------------------------------------------------- POST

function fileExtensionReader(type) {
	switch(type) {
		case 'image/png': return '.png';
		case 'image/jpeg': return '.jpeg';
		case 'image/jpg': return '.jpg';
		default: return ''
	}
}
const upload = multer()
const pipeline = promisify(require('stream').pipeline)

router.post('/', upload.single('Image'), async (req, res) => {
	const usrState = req.isAuthenticated()
	if(usrState) {
		const {file} = req
		const fileExtension = fileExtensionReader(file.clientReportedMimeType)
		if (fileExtension === file.clientReportedFileExtension) {
			const len = 16
			const fileName = crypto.randomBytes(Math.ceil((len * 3) / 4)).toString('base64').slice(0, len).replace(/\+/g, '0').replace(/\//g, '0')
			const imgName = `${fileName}${fileExtension}`
			await req.user.updateOne({avatar: imgName})
			.then(
				await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../../public/uploads/${imgName}`))
				.then(() => {res.json({body: {status: 'OK'}})})
				.catch(err => {
					console.error(err)
					res.json({body: {status: 'Error'}})
				})
			)
			.catch(err => {
				console.error(err)
				res.json({body: {status: 'Error'}})
			})
		}
		else {
			res.json({body: {status: 'wrongExtension'}})
		}
	}
	else {
		res.json({body: {status: 'No Autorizado'}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router