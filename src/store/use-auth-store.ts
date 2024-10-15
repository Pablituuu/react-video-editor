import { User } from "@/interfaces/editor";
import supabase from "@/utils/supabase";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  signinWithMagicLink: ({ email }: { email: string }) => Promise<any>;
  signinWithGithub: () => Promise<any>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  signinWithGithub: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github"
    });
    if (error) {
      console.log(error);
    }
  },
  signinWithMagicLink: async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email
    });
    if (error) {
      console.log(error);
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
