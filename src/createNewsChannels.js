const {uniqueNamesGenerator} = require('unique-names-generator');
const fetch = require("node-fetch");
const faker = require('faker');

const generateRandomNewChannelName = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()} channel`
};

const createNewsChannel = async (spaceId) => {
    const space = {
        contentType: "articles",
        pluginID: "news",
        accessorIDs: ["5d91e4c00a09a2e6a67e2fe3"],
        config: {
            localization: {
                en_Us: {
                    title: generateRandomNewChannelName()
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

const createNewsChannelsIntoAllSpaces = async () => {
    //get spaces
    const responseForSpaces = await fetch(
        'https://de-t1.eyo.net/api/spaces/root/children;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?limit=1001&offset=0&suppressAllSpace=true');

    const spacesDataObject = await responseForSpaces.json();

    const spacesData = spacesDataObject.data;

    for (let i=0; i<=spacesData.length;i++) {
        for(let j=0; j<=3;j++) {
            await createNewsChannel(spacesData[i].id);
        }
    }
};

const createNewsChannelsIntoSpace = async () => {
    //get spaces
    const responseForSpaces = await fetch(
        'https://de-t1.eyo.net/api/spaces/root/children;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?limit=1001&offset=0&suppressAllSpace=true');

    const spacesDataObject = await responseForSpaces.json();

    const spacesData = spacesDataObject.data;

    //create 1200 news channels into "All employees" space
    for (let i=0; i<=spacesData.length;i++) {
        if(spacesData[i].name === "All employees") {
            for (let j = 0; j <1200; j++) {
                await createNewsChannel(spacesData[i].id);
            }
        }
    }
};


//createNewsChannelsIntoAllSpaces();

createNewsChannelsIntoSpace();
