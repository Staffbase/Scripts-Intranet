const fetch = require("node-fetch");

const getSpaces = async () => {
    const response = await fetch(
        'https://de-t1.eyo.net/api/spaces;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?offset=0&limit=1000');
    const dataObject = await response.json();
    return dataObject.data
};

const publishNewsChannel = async (installationId) => {
    await fetch(
        `https://de-t1.eyo.net/api/installations/${installationId}/publish;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`,
        {
            method: 'POST'
        }
    );
};

const getPluginsAndPublishChannels = async () => {
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
                        await publishNewsChannel(id);
                    }
                }
            }
        }
    } catch (e) {
            console.log(e.message)
    }
};

getPluginsAndPublishChannels().catch(x => console.log(x));
