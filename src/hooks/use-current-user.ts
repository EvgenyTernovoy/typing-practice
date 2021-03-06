import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import {navigate} from "@reach/router";
import {User} from "../entities/user";

export default function useCurrentUser(): User | null {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  if (user === null) { //так можно делать? Писать редирект в хуке?
    navigate("/login");
  }
  return user;
}

