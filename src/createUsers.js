function generateRandomText(len) {
    let output = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
}

async function generateRandomUser() {
    const user = {
        firstName: generateRandomText(8),
        lastName: generateRandomText(8),
        email: `${userName}+${generateRandomText(7)}@staffbase.com`,
        companyRole: 'WeCompanyBasicRole'
    };

    await fetch('https://de-t1.eyo.net/api/users;wesessid=atm72e4figj0cxwp2haxtime3348',
        {
            body: JSON.stringify(user),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });
};

function generateRandomUsers() {
    for (let i=0; i<100; i++) {
        setTimeout(generateRandomUser, 100);
    }
}

generateRandomUsers();
