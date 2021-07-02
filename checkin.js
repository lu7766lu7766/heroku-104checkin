const puppeteer = require('puppeteer')

module.exports = async (req, res) => {
	try {
		const { username, password } = req.body

		const browser = await puppeteer.launch({
			// headless: false,
			executablePath: '/usr/bin/chromium-browser',
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
