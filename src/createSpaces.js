const {uniqueNamesGenerator} = require('unique-names-generator');
const faker = require('faker');
const fetch = require("node-fetch");

const generateRandomSpaceName = () => {
  return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()} space`
};

const createSpace = async () => {
    const space = {
        name: generateRandomSpaceName(),
        accessorIDs: ["5d91e4c00a09a2e6a67e2fe3"],
        adminIDs: ["5d91e4c00a09a2e6a67e2fe3"]

    };

    let spaceResp = await fetch('https://de-t1.eyo.net/api/spaces;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353',
        {
            body: JSON.stringify(space),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const json = await spaceResp.json();

    console.log('created space:', json);
};

async function createSpaces() {

    const x = Array(299).fill(0);

    for (let i of x) {
        await createSpace()
    }
}

createSpaces();
