const fetch = require("node-fetch");
const {uniqueNamesGenerator} = require('unique-names-generator');
const faker = require('faker');

const generateRandomTitle = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()}`
};

const generateRandomTeaser = () => {
    return `${uniqueNamesGenerator({length: 1})} ${faker.random.word()}`
};

const getSpaces = async () => {
    const response = await fetch(
        'https://de-t1.eyo.net/api/spaces;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?offset=0&limit=1000');
    const dataObject = await response.json();
    return dataObject.data
};

const createPosts = async (installationId) => {
    const title = generateRandomTitle();
    const teaser = generateRandomTeaser();
    const postData = {
        published: true,
        unpublished: null,
        contents: {
            en_US: {
                title: title,
                teaser: teaser,
                content:`<p>${teaser}</p><p><img title=\"\" src=\"https://de-cdn-t1.eyo.net/t1-backend/image/upload/v1571050323/DVSYB2xTO27Z39g5FdmGo5YwbxoolPSuzorUoGroHdpSuBZI4HctOx6TsVf12tAlxTYLZspDwEUUnLGXUzWtGk7cA2XTvbWn7cJXd87nXiUeD2iPaQSOGbENHBo1ai6wfm7Z1LfrdCXfjQnOMhPxAFydLx3XGue2RYAOZSF4iqX9scHrJs0BrnJZDBMcnQTa/DSC_0231.jpeg\" height=\"1282\" width=\"1923\" data-original-width=\"1923\" data-original-height=\"1282\"></p><p>&nbsp;</p>`
            }
        },
        commentingEnabled: true,
        likingEnabled: true,
        acknowledgingEnabled: false,
        highlighted: false
    };

    await fetch(
        `https://de-t1.eyo.net/api/channels/${installationId}/posts;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }
    );
};

const getPluginsAndCreatePosts = async () => {
    try {
        const spaces = await getSpaces();
        for (let space of spaces) {
            const response = await fetch(`https://de-t1.eyo.net/api/spaces/${space.id}/plugins;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`);
            const dataObject = await response.json();
            for (let plugin of dataObject.data) {
                if (plugin.id === 'news') {
                    const installations = plugin.installations.data;
                    for (let installation of installations) {
                        const id = installation.id;
                        await createPosts(id);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
};

getPluginsAndCreatePosts().catch(x => console.log(x));
