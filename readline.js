const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestions = (callback) => {
    rl.question("Name: ", (name) => {
        rl.question("Email: ", (email) => {
            rl.question("No Telp: ", (phone) => {
                rl.question("Role (admin/user): ", (roleInput) => {
                    rl.question("Is Active (true/false atau y/n): ", (activeInput) => {
                        rl.close();

                        const role = roleInput.trim().toLowerCase() === "admin" ? "admin" : "user";

                        const cleanActiveInput = activeInput.trim().toLowerCase();
                        const isActive = cleanActiveInput === "true" || cleanActiveInput === "y";

                        callback({
                            name: name.trim(),
                            email: email.trim(),
                            phone: phone.trim(),
                            role,
                            isActive
                        });
                    });
                });
            });
        });
    });
};

module.exports = askQuestions;