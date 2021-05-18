const getRandomItemOfArray = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

exports.getRandomItemOfArray = getRandomItemOfArray;
