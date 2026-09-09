const validator = require("validator");

const isValidPhone = (phone) => {
    return validator.isMobilePhone(phone, 'id-ID');
};

const isValidEmail = (email) => {
    return validator.isEmail(email);
};

const isValidPassword = (password) => {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    });
};

const isValidIsActive = (isActive) => {
    const validValues = ["true", "false", "y", "n"];
    return validValues.includes(isActive.trim().toLowerCase());
};

const isValidName = (name) => {
    return !validator.isNumeric(name);
};

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidIsActive,
    isValidName,
    isValidPhone
};
