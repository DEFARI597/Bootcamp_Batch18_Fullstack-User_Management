console.log('User Management System');

const users = require('./user');
const rl = require('./readline');
const fs = require('fs');

if (!fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
}


rl((newUserData) => {
    const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    console.log(data);

    const isExist = data.some(
        (user) => user.name.trim().toLowerCase() === newUserData.name.trim().toLowerCase()
    );

    if (isExist) {
        console.log(`\nNama "${newUserData.name}" sudah ada. Data batal disimpan.`);
        return;
    }

    data.push(newUserData);
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2));

    console.log('\nData berhasil disimpan. Data pengguna saat ini:');
    console.log(data);
});