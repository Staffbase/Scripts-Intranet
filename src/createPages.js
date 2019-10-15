const {uniqueNamesGenerator} = require('unique-names-generator');
const fetch = require("node-fetch");
const faker = require('faker');

const generateRandomNewPageName = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()}`
};

const createPage = async (spaceId) => {
    const space = {
        pluginID: "page",
        accessorIDs: ["5d91e4c00a09a2e6a67e2fe3"],
        config: {
            localization: {
                en_Us: {
                    title: generateRandomNewPageName()
                }
            }
        }

    };

    await fetch(`https://de-t1.eyo.net/api/spaces/${spaceId}/installations;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`,
        {
            body: JSON.stringify(space),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });
};

const createPagesIntoAllSpaces = async () => {
    //get spaces
    const responseForSpaces = await fetch(
        'https://de-t1.eyo.net/api/spaces/root/children;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?limit=1001&offset=0&suppressAllSpace=true');

    const spacesDataObject = await responseForSpaces.json();

    const spacesData = spacesDataObject.data;

    for (let i=0; i<=spacesData.length;i++) {
        for(let j=0; j<=3;j++) {
            await createPage(spacesData[i].id);
        }
    }
};

createPagesIntoAllSpaces();
