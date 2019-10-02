const fetch = require("node-fetch");

const addMembersToGroups = async (limit, offset) => {
    const userGroupsResponse = await fetch(
        `https://de-t1.eyo.net/api/branch/groups;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?limit=${limit}&offset=${offset}&public=true`);
    const userGroupsObject = await userGroupsResponse.json();
    const userGroupsData = userGroupsObject.data;
    for (let i = 0; i <userGroupsData.length; i++) {
        if (userGroupsData[i].id === undefined) {
            continue
        }
            const usersResponse = await fetch(`https://de-t1.eyo.net/api/users;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?offset=${i * 4}&limit=4&filter=(staffbase.status eq "pending")&sort=created_DESC`);
            const usersResponseObject = await usersResponse.json();
            const usersResponseData = usersResponseObject.data;
            const usersId = [usersResponseData[0].id, usersResponseData[1].id, usersResponseData[2].id, usersResponseData[3].id];
            await fetch(`https://de-t1.eyo.net/api/groups/${userGroupsData[i].id}/users;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`, {
                body: JSON.stringify(usersId),
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }
};

const init = async () => {
  for (let i = 0; i <= 100; i++) {
      await addMembersToGroups(100, i*100);
  }
};


init();
