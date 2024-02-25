import {AllFormActions} from '@/forms/formReducerUtils';
import {User} from '@/user/userTypes';
import {useFocusEffect} from '@react-navigation/native';
import {useReducer, useCallback, useMemo} from 'react';

export type UserEditing = Pick<User, 'bio' | 'display_name'>;

interface Map<K extends keyof UserEditing> {
  ['UPDATE_FIELD']: {field: K; value: UserEditing[K]};
  ['RESET']: UserEditing;
}

export type UserEditDispatch = React.Dispatch<
  AllFormActions<Map<keyof UserEditing>>
>;
const reducer = (
  state: UserEditing,
  action: AllFormActions<Map<keyof UserEditing>>,
) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {...state, [action.payload.field]: action.payload.value};
    case 'RESET':
      return {
        bio: action.payload.bio ?? '',
        display_name: action.payload.display_name ?? '',
      };
    default:
      return state;
  }
};

export function useProfileHead(user?: User) {
  const initialValues: UserEditing = useMemo(
    () => ({
      bio: user?.bio ?? '',
      display_name: user?.display_name ?? '',
    }),
    [user],
  );
  const [state, dispatch] = useReducer(reducer, initialValues);

  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'RESET', payload: initialValues});
    }, [initialValues]),
  );

  const submit = () => {};

  return {
    dispatch,
    state,
    submit,
    initialValues,
  };
}
