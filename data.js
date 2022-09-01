let nextID = 0;

const getNextID = () => nextID++;
const users = [
  {
    id: getNextID(),
    name: "root",
    password: "unix",
  },
];

module.exports = {
  users,
  getNextID,
};
