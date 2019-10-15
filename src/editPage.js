const {uniqueNamesGenerator} = require('unique-names-generator');
const fetch = require("node-fetch");
const faker = require('faker');

const generateRandomNewPageName = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()} page`
};

const getSpaces = async () => {
    const response = await fetch(
        'https://de-t1.eyo.net/api/spaces;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?offset=0&limit=1000');
    const dataObject = await response.json();
    return dataObject.data
};

const editPage = async (pagePluginId) => {
    const pagePluginData = {
        accessorIDs: ["5d91e4c00a09a2e6a67e2fe3"],
        config: {
            localization: {
                en_Us: {
                    title: generateRandomNewPageName()
                }
            }
        }

    };

    await fetch(`https://de-t1.eyo.net/api/installations/${pagePluginId};wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`,
        {
            body: JSON.stringify(pagePluginData),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });
};

const editPagesInAllSpaces = async () => {
    try {
        const spaces = await getSpaces();
        for (let space of spaces) {
            const response = await fetch(`https://de-t1.eyo.net/api/spaces/${space.id}/plugins;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`);
            const dataObject = await response.json();
            for (let plugin of dataObject.data) {
                if (plugin.id === 'page') {
                    const installations = plugin.installations.data;
                    for (let installation of installations) {
                        const id = installation.id;
                        await editPage(id);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
};

editPagesInAllSpaces().catch(x => console.log(x));
