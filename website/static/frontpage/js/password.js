let passOutput = document.querySelector('code')
let passOutputDiv = document.querySelector('.output')
let form = document.querySelector('form')
let clickToCopy = document.querySelector('body > div > div.output > div')

// generate password
const randomPass = (passLength) => {
    let pass = ''
    let chars = ''

    const asciiLowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const asciiUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const digits = '0123456789'
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

    if (form.useAsciiLowerCase.checked) {
        chars += asciiLowerCase
    }
    if (form.useAsciiUpperCase.checked) {
        chars += asciiUpperCase
    }
    if (form.useDigits.checked) {
        chars += digits
    }
    if (form.usePunctuation.checked) {
        chars += punctuation
    }

    for (let i = 0; i < passLength; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return [pass, chars.length]
}

// display password or errors
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let pass = randomPass(form.passLength.value)

    if (pass[1] === 0) {
        passOutputDiv.style.display = 'none'
        M.toast({ html: 'At least one set of characters must be checked!' })
    }
    if (pass[0].length >= 1 && pass[0].length <= 256) {
        passOutput.innerText = pass[0]
        passOutputDiv.style.display = 'block'
    }
})

// copy password
clickToCopy.addEventListener('click', (e) => {
    navigator.clipboard.writeText(e.target.innerText)
    M.toast({ html: 'Password copied!' })
})