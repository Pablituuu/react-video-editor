import { User } from "@/interfaces/editor";

export const getUserFromSession = (session: any): User => {
  return {
    id: session.user.id,
    email: session.user.email,
    avatar: session.user.user_metadata.avatar_url,
    username: session.user.user_metadata.user_name,
    provider: "github"
  };
};
