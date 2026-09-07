const yargs = require('yargs/yargs');
const fs = require('fs');
const { isValidEmail, isValidPassword, isValidIsActive, isValidName } = require('./validator');

yargs(process.argv.slice(2))
    .command({
        command: 'add',
        describe: 'Add New User',
        builder: {
            name: {
                describe: 'User Full Name',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'User Email Address',
                demandOption: true,
                type: 'string',
            },
            password: {
                describe: 'User Password',
                demandOption: true,
                type: 'string',
            },
            phone: {
                describe: 'User Phone Number',
                demandOption: true,
                type: 'string',
            },
            role: {
                describe: 'User Role (admin/user)',
                demandOption: true,
                type: 'string',
            },
            isActive: {
                describe: 'Is Active (true/false atau y/n)',
                demandOption: true,
                type: 'string',
            }
        },
        handler(argv) {
            if (!isValidName(argv.name)) {
                console.log("Error: Format Nama tidak valid! (Tidak boleh hanya angka)");
                return;
            }
            if (!isValidEmail(argv.email)) {
                console.log("Error: Format Email tidak valid!");
                return;
            }
            if (!isValidPassword(argv.password)) {
                console.log("Error: Password tidak valid! (Min 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka)");
                return;
            }
            if (!isValidIsActive(String(argv.isActive))) {
                console.log("Error: Status Is Active tidak valid! (Harus true/false atau y/n)");
                return;
            }

            const role = argv.role.trim().toLowerCase() === "admin" ? "admin" : "user";
            const cleanActiveInput = String(argv.isActive).trim().toLowerCase();
            const isActive = cleanActiveInput === "true" || cleanActiveInput === "y";

            const newUserData = {
                name: argv.name.trim(),
                email: argv.email.trim(),
                password: argv.password,
                phone: String(argv.phone).trim(),
                role,
                isActive
            };

            if (!fs.existsSync('users.json')) {
                fs.writeFileSync('users.json', '[]', 'utf-8');
            }

            const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
            
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
        }
    })
    .command({
        command: 'list',
        describe: 'Show all users',
        handler() {
            if (!fs.existsSync('users.json')) {
                console.log("Data users masih kosong (file users.json tidak ditemukan).");
                return;
            }
            
            const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
            if (data.length === 0) {
                console.log("Data users kosong.");
                return;
            }

            console.log('Daftar Nama Pengguna:');
            data.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name}`);
            });
        }
    })
    .command({
        command: 'detail',
        describe: 'Show detail of a specific user',
        builder: {
            name: {
                describe: 'User Full Name',
                demandOption: true,
                type: 'string',
            }
        },
        handler(argv) {
            if (!fs.existsSync('users.json')) {
                console.log("Data users masih kosong (file users.json tidak ditemukan).");
                return;
            }
            
            const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
            const user = data.find((u) => u.name.trim().toLowerCase() === argv.name.trim().toLowerCase());

            if (!user) {
                console.log(`User dengan nama "${argv.name}" tidak ditemukan.`);
                return;
            }

            console.log('Detail Pengguna:');
            console.log(user);
        }
    })
    .help()
    .argv;