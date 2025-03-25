import {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {z} from 'zod';

import {Button, Input} from '../../../shared/ui';
import {useAppDispatch} from '../../../store';
import {loginSelectors} from '../../../store/slices/login/login.selectors';
import {login} from '../../../store/slices/login/login.thunk';
import {usersSelectors} from '../../../store/slices/users/users.selectors';
import {fetchUsers} from '../../../store/slices/users/users.thunks';

const INITIAL_FORM_STATE = {
  name: '',
  login: '',
  password: '',
  mathPassword: '',
};

const formStateSchema = z
  .object({
    name: z.string().min(3, {message: 'Должно быть не менее 3 символов'}),
    login: z.string().min(3, {message: 'Должно быть не менее 3 символов'}),
    password: z.string().min(3, {message: 'Должно быть не менее 3 символов'}),
    mathPassword: z.string(),
  })
  .refine((data) => data.password === data.mathPassword, {
    message: 'Введенные пароли не совпадают',
    path: ['mathPassword'],
  });

type FormState = z.infer<typeof formStateSchema>;

export const RegistrationPage = () => {
  const [formState, setFormState] = useState<Partial<FormState>>({});
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useAppDispatch();
  const users = useSelector(usersSelectors.selectUsersStateUsers);
  const status = useSelector(loginSelectors.selectLoginStateStatus);
  const error = useSelector(loginSelectors.selectLoginStateError);
  const userFormState = {...INITIAL_FORM_STATE, ...formState};

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const validate = () => {
    const res = formStateSchema.safeParse(userFormState);
    if (res.success) {
      return undefined;
    }
    return res.error.format();
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setShowErrors(true);
      return;
    }
    dispatch(
      login({
        users,
        loginData: userFormState,
      })
    );
  };
  console.log('userFormState', userFormState);
  console.log('status', status);
  console.log('error', error);
  const errors = showErrors ? validate() : undefined;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          title="Имя"
          placeholder="Введите имя"
          required
          value={userFormState.name}
          onChange={(e) =>
            setFormState((item) => ({...item, name: e.target.value}))
          }
          errors={errors?.name?._errors}
        />
        <span>{}</span>
        <Input
          type="text"
          title="Логин"
          placeholder="Введите логин"
          required
          value={userFormState.login}
          onChange={(e) =>
            setFormState((item) => ({...item, login: e.target.value}))
          }
          errors={errors?.login?._errors}
        />

        <Input
          type="password"
          title="Пароль"
          placeholder="Введите пароль"
          required
          value={userFormState.password}
          onChange={(e) =>
            setFormState((item) => ({...item, password: e.target.value}))
          }
          errors={errors?.password?._errors}
        />
        <Input
          type="password"
          title="Пароль"
          placeholder="Введите пароль"
          required
          value={userFormState.mathPassword}
          onChange={(e) =>
            setFormState((item) => ({...item, mathPassword: e.target.value}))
          }
          errors={errors?.mathPassword?._errors}
        />
        <Button loading={false}>Submit</Button>
      </form>
    </div>
  );
};
