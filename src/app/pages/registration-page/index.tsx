import {FormEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {z} from 'zod';

import StorageService from '../../../shared/lib/storage.service';
import {Button, Input} from '../../../shared/ui';
import {loginSelectors} from '../../../store/slices/login/login.selectors';
import {usersSelectors} from '../../../store/slices/users/users.selectors';

import './style.scss';

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const users = useSelector(usersSelectors.selectUsersStateUsers);
  const userId = StorageService.getUserId();
  const isAuth = useSelector(loginSelectors.selectLoginStateIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/profile/' + userId);
    }
  }, [isAuth, navigate, userId]);

  const userFormState = {...INITIAL_FORM_STATE, ...formState};

  const validate = () => {
    const res = formStateSchema.safeParse(userFormState);
    if (res.success) {
      return undefined;
    }
    return res.error.format();
  };

  const isLoginTaken = (login: string) => {
    return users.some((user) => user.login === login);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setShowErrors(true);
      setErrorMessage(null);
      return;
    }

    if (isLoginTaken(userFormState.login)) {
      setErrorMessage('Пользователь с таким логином уже зарегистрирован');
      return;
    }

    setRegistrationSuccess(true);
    setErrorMessage(null);
  };

  const errors = showErrors ? validate() : undefined;

  return (
    <div>
      {!registrationSuccess ? (
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
            title="Повторите пароль"
            placeholder="Введите пароль"
            required
            value={userFormState.mathPassword}
            onChange={(e) =>
              setFormState((item) => ({
                ...item,
                mathPassword: e.target.value,
              }))
            }
            errors={errors?.mathPassword?._errors}
          />
          {errorMessage && (
            <p style={{color: 'red', marginTop: '10px'}}>{errorMessage}</p>
          )}
          <Button type="submit" loading={false}>
            Зарегистрироваться
          </Button>
        </form>
      ) : (
        <div className="registration-success">
          <h3>Регистрация прошла успешно!</h3>
          <Button
            type="button"
            onClick={() => navigate('/login')}
            loading={false}>
            Залогиниться
          </Button>
        </div>
      )}
    </div>
  );
};
