const fs = require('fs');

const readFile = (path, callback) => {
  fs.readFile(
    path,
    'utf-8',
    (err, data) => {
      if (err) throw err;
      callback(JSON.parse(data));
    },
  );
};

readFile('../../data/tpItems.json', (data) => {
  const { items } = data;
  const idOrganizedItems = {};
  items.forEach((item) => {
    const {
      name, id, icon, rarity,
    } = item;
    idOrganizedItems[id] = {
      name,
      icon,
      rarity,
    };
  });
  fs.writeFileSync('./tpItemsOrganized.json', JSON.stringify(idOrganizedItems, null, 2));
});
