import { UserState } from "../reducers";

export const usersLoading = (state: {users: UserState}) => state.users.loading;
export const usersEntities = (state: {users: UserState}) => ({...state.users.entities});
export const usersIds = (state: {users: UserState}) => ([...state.users.ids]);
export const usersCurrentPage = (state: {users: UserState}) => state.users.currentPage;
