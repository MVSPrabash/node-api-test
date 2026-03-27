const getUsers = () => {
  console.log("ADMIN: Serving data of all the users");
  return [
    {
      id: 1,
      name: 'prabash'
    },
    {
      id: 2,
      name: 'mvs'
    }
  ];
};

const createUser = (user) => {
  console.log('User created: ' + user);
  console.log(user);
};

const getUser = (uid) => {
  console.log('Serving User details of uid:' + uid);
  return {
    id: uid,
    name: 'prabash' // Access through database
  }
};

const updateUser = (uid) => {
  console.log("Updating user info for uid: " + uid);
};

const deleteUser = (uid) => {
  console.log("Deleting the user with id: " + uid);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};

