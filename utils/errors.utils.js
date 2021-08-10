module.exports.signUpErrors = (err) => {
    let errors = { username: "", email: "", password: "" }
  
    if (err.message.includes("username"))
      errors.username = "Incorrect username or already token"
  
    if (err.message.includes("email")) errors.email = "Incorrect email"
  
    if (err.message.includes("password"))
      errors.password = "Password must be at least 6 characters long"
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
      errors.username = "Username already token"
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "This email is already registered "
  
    return errors
  }
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email unknown"
    
    if (err.message.includes('password'))
      errors.password = "Password does not match"
  
    return errors
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""}
  
    if (err.message.includes('invalid file'))
      errors.format = "Inconsistent format"
  
    if (err.message.includes('max size'))
      errors.maxSize = "File exceeds 500ko"
  
    return errors
  }