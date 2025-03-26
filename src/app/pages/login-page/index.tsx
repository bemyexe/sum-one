import {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {z} from 'zod';

import {Button, Input} from '../../../shared/ui';
import {useAppDispatch} from '../../../store';
import {loginSelectors} from '../../../store/slices/login/login.selectors';
import {login} from '../../../store/slices/login/login.thunk';
import {fetchUsers} from '../../../store/slices/users/users.thunks';

import './style.scss';

const INITIAL_FORM_STATE = {
  login: '',
  password: '',
};

const formStateSchema = z.object({
  login: z.string().min(3, {message: 'Должно быть не менее 3 символов'}),
  password: z.string().min(3, {message: 'Должно быть не менее 3 символов'}),
});

type FormState = z.infer<typeof formStateSchema>;

export const LoginPage = () => {
  const [formState, setFormState] = useState<Partial<FormState>>({});
  const [showErrors, setShowErrors] = useState(false);
  const userFormState = {...INITIAL_FORM_STATE, ...formState};
  const dispatch = useAppDispatch();
  const isAuth = useSelector(loginSelectors.selectLoginStateIsAuth);
  const status = useSelector(loginSelectors.selectLoginStateStatus);
  const error = useSelector(loginSelectors.selectLoginStateError);
  const id = useSelector(loginSelectors.selectLoginStateId);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }

    if (isAuth) {
      navigate('/profile/' + id);
    }
  }, [status, dispatch, navigate, id, isAuth]);

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
    dispatch(login(userFormState));
  };

  const errors = showErrors ? validate() : undefined;
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" loading={false}>
          Submit
        </Button>
      </form>

      {!!error && <p className="error">{error}</p>}
    </div>
  );
};
