import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../api';
import { normalize, schema } from 'normalizr';

const userEntity = new schema.Entity('users')

export const getUsersData = createAsyncThunk('users/fetchData', async () => {
    const data = await fetchUsers();
    const normalized = normalize(data.users, [userEntity]);
    return normalized.entities
})

export interface UserState {
    ids: string[],
    entities: {[key: string]: any} | undefined,
    loading: string,
    error?: string,
    currentPage: number
}

const initialState: UserState = {
    ids: [],
    entities: {},
    loading: 'idle',
    currentPage: 1
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changePage: (state: UserState, action) => {
            return {...state, currentPage: action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersData.fulfilled, (state: UserState , action: {payload: any}) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.entities = action.payload.users;
                    state.ids = Object.keys(action.payload.users);
                }
            })
            .addCase(getUsersData.pending, (state:UserState, action: {payload: any}) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(getUsersData.rejected, (state: UserState, action: any) => {
                if(state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = action.error;
                }
            })
    }
});

export const {changePage} = usersSlice.actions;

export default usersSlice.reducer;
