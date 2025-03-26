import {useSelector} from 'react-redux';
import {useParams} from 'react-router';

import StorageService from '../../../shared/lib/storage.service';
import {usersSelectors} from '../../../store/slices/users/users.selectors';

export const ProfilePage = () => {
  const {id} = useParams<{id: string}>();
  const userId = StorageService.getUserId();
  const users = useSelector(usersSelectors.selectUsersStateUsers);
  const user = users.filter((user) => user.id === id || user.id === userId);
  return <div>Профиль пользовател {user[0]?.name}</div>;
};
