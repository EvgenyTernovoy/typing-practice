import Services from "../services";
import { useContext } from "react";
import type {CurrentUser, User } from "../entities/user";

export default function useOperations(user: User, currentUser: User | null) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
