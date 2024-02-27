function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(items) {
  if (Array.isArray(items)) {
    return items[getRandomInt(0, items.length - 1)];
  } else {
    return '';
  }
}

module.exports = {
  getRandomInt,
  getRandomItem
};
