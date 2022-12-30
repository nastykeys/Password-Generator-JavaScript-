const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
passwordOutput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box span"),
passwordStrength = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn")

const characters = {
    lowercase: "qwertyuiopasdfghjklzxcvbnm",
    uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
    numbers: "0123456789",
    symbols: "^!@#$%*&(){}[];:,.<>?_+-~"
}

const updateSlider = () =>{
    document.querySelector(".details span").innerText = lengthSlider.value
    generatePassword()
}

const generatePassword = () => {
    let staticPassword =""
    let passLength = lengthSlider.value
    let excludeDuplicate = false
    let randomPassword =""
    options.forEach(option => {
        if(option.checked){
            // if checked box isn't exclude duplicate and spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]
            }else if(option.id === "spaces"){//add spaces to staticPass, if space is sent
                staticPassword += `  ${staticPassword}  `
            }else{//update excludeDuplicate to true
                excludeDuplicate = true
            }

        }
    })

    for(let i = 0; i < passLength; i++){
        let randomChar = staticPassword.charAt(Math.floor(Math.random() * staticPassword.length))
        if(excludeDuplicate){
            //if randomChar isn't in randomPassword then add it to randomPassword else decrement i
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--
        }else{
            randomPassword += randomChar 
        }
    }
    passwordOutput.value = randomPassword
    updatePasswordStrength()
}

const updatePasswordStrength = () => {
    passwordStrength.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}

updateSlider()

const copyPass = () => {
    navigator.clipboard.writeText(passwordOutput.value)
    copyIcon.innerText = "check"
    setTimeout(() =>{
        copyIcon.innerText = "content_copy"
    }, 1000)
}

lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword)
copyIcon.addEventListener("click", copyPass)