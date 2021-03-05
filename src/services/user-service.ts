import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import {Operation} from "../entities/operation";
import type {CurrentUser, User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations(user: User, currentUser: CurrentUser):  Operation[] {
    // Вам нужно поменять логику внутри getAvailableOperations для того, что бы это работало с логином
    if (!currentUser) {
      return []
    }

    if(this.userIsAdmin(currentUser)) {
      switch (true) {
        case this.userIsModerator(user):
          return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN]
        case this.userIsClient(user):
          return [Operation.UPDATE_TO_MODERATOR]
        case this.userIsAdmin(user):
          return [Operation.UPDATE_TO_MODERATOR]
      }
    }

    if(this.userIsModerator(currentUser)) {
      switch (true) {
        case this.userIsModerator(user):
          return [Operation.UPDATE_TO_CLIENT]
        case this.userIsClient(user):
          return [Operation.UPDATE_TO_MODERATOR]
        case this.userIsAdmin(user):
          return []
      }
    }

    if(this.userIsClient(currentUser)) {
      switch (true) {
        case this.userIsModerator(user):
          return []
        case this.userIsClient(user):
          return []
        case this.userIsAdmin(user):
          return []
      }
    }

    return []
  }

  userIsAdmin(
    user: User
  ): user is Admin {
    return user instanceof Admin;
  }

  userIsModerator(
    user: User
  ): user is Moderator {
    return user instanceof Moderator;
  }

  userIsClient(
    user: User
  ): user is Client {
    return user instanceof Client;
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
