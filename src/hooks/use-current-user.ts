import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import type { CurrentUser } from "../entities/user";
import {navigate} from "@reach/router";

export default function useCurrentUser(): CurrentUser {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  if (user === null) { //так можно делать? Писать редирект в хуке?
    navigate("/login");
  }
  return user;
}

