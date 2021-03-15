import Services from "../services";
import {useContext} from "react";
import type {User} from "../entities/user";
import {Admin} from "../entities/admin";
import {Moderator} from "../entities/moderator";

export default function useOperations(user: User, currentUser: User) {
  const {userService} = useContext(Services);
  if (!currentUser) {
    return []
  }

  return userService.getAvailableOperations(user, Admin.Or(Moderator).check(currentUser));
}
