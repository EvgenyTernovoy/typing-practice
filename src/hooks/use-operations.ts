import Services from "../services";
import { useContext } from "react";
import type { User } from "../entities/user";
import or from "../utils/or";
import {Admin} from "../entities/admin";
import {Moderator} from "../entities/moderator";

export default function useOperations(user: User, currentUser: User) {
  const { userService } = useContext(Services);
  const adminOrModerator = or(Admin, Moderator);

  return userService.getAvailableOperations(user, adminOrModerator(currentUser));
}
