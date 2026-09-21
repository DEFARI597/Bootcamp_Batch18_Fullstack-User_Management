console.log('User Management System');

const expressApp = require('./express');
const httpHandler = require('./http');
const rl = require('./readline');
const User = require('./user');

expressApp.use(httpHandler);

const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);

    console.log("--- CLI: Add new user (or press Ctrl+C to exit) ---");
    runCli();
});

function runCli() {
    rl(async (newUserData) => {
        try {
            const exists = await User.checkExistsByName(newUserData.name);
            if (exists) {
                console.log(`\nNama "${newUserData.name}" sudah ada. Data batal disimpan.\n`);
            } else {
                await User.create(newUserData);
                console.log('\nData berhasil disimpan ke PostgreSQL.\n');
            }
        } catch (error) {
            console.error('\nError menyimpan data:', error);
        }

        runCli();
    });
}