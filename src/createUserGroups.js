const {uniqueNamesGenerator} = require('unique-names-generator');
const faker = require('faker');
const fetch = require("node-fetch");

const generateRandomGroupName = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()} group`
};

const createGroup = async () => {
    const group = {
        name: generateRandomGroupName(),
        accessorIDs: ["5d91e4c00a09a2e6a67e2fdf"],
        type: "enumeration"

    };

    let groupResp = await fetch('https://de-t1.eyo.net/api/branch/groups;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353',
        {
            body: JSON.stringify(group),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const json = await groupResp.json();

    console.log('created User Group:', json);
};

async function createUserGroups() {

    for (let i=0;i<10;i++) {
        await createGroup()
    }
}

createUserGroups();
