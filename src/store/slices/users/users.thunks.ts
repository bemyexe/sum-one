import {createAppAsyncThunk} from '../../../shared/lib/create-thunk';

export const fetchUsers = createAppAsyncThunk('users/getUsers', async () => {
  const response = await fetch('/users.json');
  const data = await response.json();

  return data;
});
