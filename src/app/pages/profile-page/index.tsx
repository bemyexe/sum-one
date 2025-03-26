import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router';

import StorageService from '../../../shared/lib/storage.service';
import {Button} from '../../../shared/ui';
import {useAppDispatch} from '../../../store';
import {logout} from '../../../store/slices/login/login.thunk';
import {usersSelectors} from '../../../store/slices/users/users.selectors';
import {fetchUsers} from '../../../store/slices/users/users.thunks';

export const ProfilePage = () => {
  const {id} = useParams<{id: string}>();
  const userId = StorageService.getUserId();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const users = useSelector(usersSelectors.selectUsersStateUsers);
  const user = users.filter((user) => user.id === id || user.id === userId);

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', {replace: true});
  };

  return (
    <div>
      <h1>Привет!</h1> <div>{user[0]?.name}</div>
      <Button type="button" onClick={handleLogout} loading={false}>
        Выйти
      </Button>
    </div>
  );
};
