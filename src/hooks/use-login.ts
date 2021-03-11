import Services from "../services";
import {navigate} from "@reach/router";
import {useContext, useEffect} from "react";
import {LogedInActionType, LogedInUser} from "../providers/loged-in-user";
import type {User} from "../entities/user";
import {Role} from "../entities/role";
import { ValidEmail } from "../entities/valid-email";
import { ValidPassword } from "../entities/valid-password";

export type Credentials = {
  email: string;
  password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
  const {loginService} = useContext(Services);
  const {dispatch, state = {user: null}} = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }

    try {
      loginService.login(
        ValidEmail.from(credentials.email),
        ValidPassword.from(credentials.password)
      )
        .then((user: User) => {
          dispatch!({type: LogedInActionType.LOG_IN, payload: user})
          return user
        })
        .then((user: User) => {
          if (user.role === Role.CLIENT) {
            return navigate("/notAvailable")
          }
          return navigate("/")
        })
        .catch(e => alert(e.message));
    } catch(e) {
      alert(e.message)
    }

  }, [credentials, dispatch]);

  return state.user;
}
