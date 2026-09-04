const readline = require('readline');
const { isValidEmail, isValidPassword, isValidIsActive, isValidName } = require('./validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const askQuestions = async (callback) => {
    let name, email, password, phone, roleInput, activeInput;

    while (true) {
        name = await question("Name: ");
        if (!isValidName(name)) {
            console.log("Nama tidak valid! (Tidak boleh hanya angka)");
        } else {
            break;
        }
    }

    while (true) {
        email = await question("Email: ");
        if (!isValidEmail(email)) {
            console.log("Format Email tidak valid!");
        } else {
            break;
        }
    }

    while (true) {
        password = await question("Password: ");
        if (!isValidPassword(password)) {
            console.log("Password tidak valid! (Min 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka)");
        } else {
            break;
        }
    }

    phone = await question("No Telp: ");
    roleInput = await question("Role (admin/user): ");

    while (true) {
        activeInput = await question("Is Active (true/false atau y/n): ");
        if (!isValidIsActive(activeInput)) {
            console.log("Status Is Active tidak valid! (Harus true/false atau y/n)");
        } else {
            break;
        }
    }

    rl.close();

    const role = roleInput.trim().toLowerCase() === "admin" ? "admin" : "user";
    const cleanActiveInput = activeInput.trim().toLowerCase();
    const isActive = cleanActiveInput === "true" || cleanActiveInput === "y";

    callback({
        name: name.trim(),
        email: email.trim(),
        password: password,
        phone: phone.trim(),
        role,
        isActive
    });
};

module.exports = askQuestions;