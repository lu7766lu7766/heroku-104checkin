const express = require('express')
const app = express()

const multer = require('multer')
const upload = multer()

const checkin = require('./checkin')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({
		code: 0,
		result: 'success',
	})
})

app.post('/check-in', upload.array(), checkin)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}/`))
