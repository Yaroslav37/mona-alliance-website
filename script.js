document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.form-container')
  const contactButtons = document.querySelectorAll(
    '#contactButton, #contactButton2'
  )
  const closeButton = document.getElementById('closeButton')
  const closeAlertButton = document.getElementById('closeAlert')
  const contactFormElement = document.getElementById('contactForm')
  const customAlert = document.getElementById('customAlert')
  const alertMessage = document.getElementById('alertMessage')

  const showElement = (element) => (element.style.display = 'flex')
  const hideElement = (element) => (element.style.display = 'none')

  const showAlert = (message) => {
    alertMessage.textContent = message
    showElement(customAlert)
  }

  const validateForm = (event) => {
    const form = event.target
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
      form.reportValidity()
      return false
    }

    const phoneInput = document.getElementById('phone')
    const phonePattern = /^\+\d{12}$/
    if (!phonePattern.test(phoneInput.value)) {
      event.preventDefault()
      showAlert('Введите корректный номер телефона')
      return false
    }

    const nameInput = document.getElementById('name')
    if (nameInput.value.trim() === '') {
      event.preventDefault()
      showAlert('Введите Ваше имя')
      return false
    }

    return true
  }

  const submitForm = (event) => {
    event.preventDefault()
    if (!validateForm(event)) return

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
    }

    fetch('http://localhost:3000/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        hideElement(contactFormElement)
        showAlert(
          data.success
            ? data.message
            : 'Ошибка при отправке формы: ' + data.message
        )
      })
      .catch((error) => {
        showAlert('Ошибка при отправке формы: ' + error)
      })
  }

  if (contactForm) {
    contactForm.addEventListener('submit', submitForm)
  }

  contactButtons.forEach((button) => {
    button.addEventListener('click', () => showElement(contactFormElement))
  })

  closeButton.addEventListener('click', () => hideElement(contactFormElement))
  closeAlertButton.addEventListener('click', () => hideElement(customAlert))
})
