const puppeteer = require('puppeteer')

// run puppeteer on heroku need run cli
// $ heroku buildpacks:clear
// $ heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
// $ heroku buildpacks:add --index 1 heroku/nodejs

// show heroku log
// $ heroku logs --tail
// http://arrogant-bunnyhug-30887.herokuapp.com/
module.exports = async (req, res) => {
	try {
		const { username, password } = req.body

		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		})

		const page = await browser.newPage()
		await page.goto('https://bsignin.104.com.tw/login')
		await page.waitForSelector('.BaseInput')
		await page.waitForSelector('.BaseInput__view')
		await page.type('.BaseInput__view[type="text"]', username)
		await page.type('.BaseInput__view[type="password"]', password)
		await page.click('.BaseButton')
		await page.waitForSelector('.Product__product')
		await page.goto('https://pro.104.com.tw/psc2')
		await page.waitForSelector('.btn.btn-white.btn-lg.btn-block')

		await page.click('.fa.fa-times')
		await page.click('.btn.btn-white.btn-lg.btn-block')
		// await page.screenshot({
		// 	path: './checkin.png',
		// 	fullPage: true,
		// })
		await page.waitForTimeout(1000)

		await browser.close()
		res.json({
			code: 0,
			result: 'success',
		})
	} catch (err) {
		throw err
		// res.json({
		// 	code: -1,
		// 	result: err,
		// })
	}
}
