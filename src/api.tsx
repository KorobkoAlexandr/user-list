import users from '../users.json'

export const fetchUsers = () => {
    return Promise.resolve(users);
};
