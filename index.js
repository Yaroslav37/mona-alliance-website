const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors') // Добавьте эту строку
require('dotenv').config()

const app = express()

// Настройка CORS
app.use(cors())

// Парсинг данных формы
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/form', async (req, res) => {
  console.log(
    `Имя: ${req.body.name}\nEmail: ${req.body.email}\nТелефон: ${req.body.phone}`
  )

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // ваш email
      pass: process.env.PASSWORD, // ваш пароль или app-specific password
    },
  })

  let mailOptions = {
    from: 'monaservicemail@gmail.com',
    to: 'minenkovaroslav@gmail.com',
    subject: 'Новый клиент',
    text: `Имя: ${req.body.name}\nEmail: ${req.body.email}\nТелефон: ${req.body.phone}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Сообщение отправлено')
    res
      .status(200)
      .json({ success: true, message: 'Ваша заявка успешно отправлена!' })
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error)
    res
      .status(500)
      .json({ success: false, message: 'Ошибка при отправке заявки.' })
  }
})

app.listen(3000, () => console.log('Сервер запущен на порту 3000'))
