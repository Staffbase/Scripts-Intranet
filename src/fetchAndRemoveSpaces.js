const fetch = require("node-fetch");

const getSpacesAndRemove = async () => {
  const response = await fetch(
      'https://de-t1.eyo.net/api/spaces;wesessid=1uw0rn8oivbzmti3yxhhk3tda3353?offset=0&limit=1000');
  const dataObject = await response.json();
  const data = dataObject.data;

  for (let space of data) {

      if (space.name !== "All employees") {
          await fetch(`https://de-t1.eyo.net/api/spaces/${space.id};wesessid=1uw0rn8oivbzmti3yxhhk3tda3353`, {method: 'delete'});
      }


  }
};

getSpacesAndRemove();
