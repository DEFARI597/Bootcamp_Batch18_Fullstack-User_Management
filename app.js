console.log('User Management System');

const data = [{
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081231231',
    role: 'USER',
    isActive: true
},
{
    name: 'udin',
    email: 'udin@user.com',
    phone: '012831283',
    role: 'USER',
    isActive: true
},
{
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '081231232',
    role: 'ADMIN',
    isActive: false
}];

const greetUser = (data) => {
    data.forEach(data => {
        if (data.isActive === true) {
            console.log('User is active');
        } else {
            console.log('User is not active');
        }
        console.log(`Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Role: ${data.role}
        Status: ${data.isActive}`);
    });

}

greetUser(data)