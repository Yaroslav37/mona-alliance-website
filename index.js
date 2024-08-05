const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

// Парсинг данных формы
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/form', async (req, res) => {
  console.log(
    `Имя: ${req.body.name}\nEmail: ${req.body.email}\nСообщение: ${req.body.message}`
  )
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // email
      pass: process.env.PASSWORD, // pass
    },
  })

  let mailOptions = {
    from: 'monaservicemail@gmail.com',
    to: 'mona.bel.minsk@gmail.com',
    subject: 'Новое сообщение с формы',
    text: `Имя: ${req.body.name}\nEmail: ${req.body.email}\nТелефон: ${req.body.phone}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Сообщение отправлено')
  } catch (error) {
    console.error(error)
    console.log('Ошибка при отправке сообщения')
  }
})

app.listen(3000, () => console.log('Сервер запущен на порту 3000'))
