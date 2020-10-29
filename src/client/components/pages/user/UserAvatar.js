import React, {useState} from 'react'
import ReactCrop from 'react-image-crop'
import './ImgCropStyle.css'
import {serverIP, serverPORT} from '../../../config'

export default function UserAvatar(props) {
	const [crop, setCrop] = useState({aspect: 1})
	const [image, setImage] = useState(null)
	const [croppedImage, setCroppedImage] = useState(null)
	const [extensionType, setExtensionType] = useState('')

// ---------------------------------------------------------------------------------- handleCropComplete()

	function handleCropComplete(crop, percentCrop) {
		const canvas = document.createElement('canvas')
		var scaleX = 1
		var scaleY = 1
		if (image.naturalWidth >= image.naturalHeight) {
			scaleX = (image.naturalWidth/400)
			scaleY = (image.naturalHeight/((image.naturalHeight*400)/image.naturalWidth))
		}
		else {
			scaleY = (image.naturalHeight/400)
			scaleX = (image.naturalWidth/((image.naturalWidth*400)/image.naturalHeight))
		}
		canvas.width = crop.width
		canvas.height = crop.height
		const ctx = canvas.getContext('2d')
		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		)
		const extType = (image.src).split(';')[0].split('/')[1]
		setExtensionType(`.${extType}`)
		const croppedImg = canvas.toDataURL(`image/${extType}`)
		setCroppedImage(croppedImg)
	}

// ---------------------------------------------------------------------------------- handleFileChange()

	function handleFileChange(e) {
		const reader = new FileReader()
		const img = new Image()
		reader.addEventListener('load', ()=>{
			img.src = reader.result
			setImage(img)
		}, false)
		reader.readAsDataURL(e.target.files[0])
	}

// ---------------------------------------------------------------------------------- handleSubmit()

	function handleSubmit() {
		function base64ToRawFile(base64Src, fileName) {
			var arr = base64Src.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]),
			n = bstr.length, u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new File([u8arr], fileName, {type: mime})
		}
		const croppedImageRawFile = base64ToRawFile(croppedImage, `ImageName${extensionType}`)
		const dataImage = new FormData()
		dataImage.append('Image', croppedImageRawFile)
		fetch(`http://${serverIP}:${serverPORT}/users/upload`, {
			method: 'post',
			body: dataImage
		})
		.then(res => res.json())
		.then(data => {
			if (data.body.status === 'OK') {
				setCrop({aspect: 1})
				setImage(null)
				setCroppedImage(null)
				setExtensionType('')
				props.setUpdateSwitch(0)
			}
			else if (data.body.status === 'Error') {
				console.log('Error al subir foto...')
			}
			else if (data.body.status === 'wrongExtension') {
				console.log('Extension no valida...')
			}
			else {
				console.log('No autorizado...')
			}
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------------------- return()

	return(
		<div style={styles.mainContainer}>
			<form onSubmit={handleSubmit} style={{display: "row"}}>
				{image
					?
					<div style={{display: "flex", justifyContent: "center"}}>
					<ReactCrop
						src={image.src}
						crop={crop}
						onChange={(crop, percentCrop) => setCrop(crop)}
						onComplete={(crop, percentCrop) => handleCropComplete(crop, percentCrop)}
						imageStyle={image.naturalHeight >= image.naturalWidth ? {height: "400px", width: "auto"} : {height: "auto", width: "400px"}}
					/>
					</div>
					:
					<div style={{display: "flex", justifyContent: "center"}}>
						<img src={`/uploads/${props.avatar}`} style={{height: "300px", width: "auto"}} />
					</div>
				}
				<div style={{display: "flex", justifyContent: "center"}}>
					<input type="file" accept="image/*" multiple={false} onChange={e => handleFileChange(e)} />
				</div>
				<div style={{display: "flex", justifyContent: "center"}}>
					{croppedImage ? <button type="submit" style={styles.btnUploadStyle}>Upload</button> : null}
					<button onClick={()=>{props.setUpdateSwitch(0)}} style={styles.btnUploadStyle}>Cerrar</button>
				</div>
			</form>
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
	btnUploadStyle: {
		border: "none",
		margin: "2vh 1.5vw 0 1.5vw",
		padding: "0.5vh 1vw 0.5vh 1vw",
		borderRadius: 10,
		backgroundColor: "green"
	}
}