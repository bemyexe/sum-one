import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '../../../store';
import {usersSelectors} from '../../../store/slices/users/users.selectors';
import {fetchUsers} from '../../../store/slices/users/users.thunks';

export const LoginPage = () => {
  const users = useSelector(usersSelectors.selectUsersStateUsers);
  const status = useSelector(usersSelectors.selectUsersStateStatus);
  const error = useSelector(usersSelectors.selectUsersStateError);
  const dispatch = useAppDispatch();
  console.log({
    users,
    status,
    error,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.password}</div>
      ))}
    </div>
  );
};
