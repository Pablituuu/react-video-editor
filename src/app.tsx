import { useEffect } from "react";
import Editor from "./pages/editor";
import supabase from "./utils/supabase";
import useAuthStore from "./store/use-auth-store";
import { getUserFromSession } from "./utils/user";
import useUploadsStore from "./store/use-uploads-store";
import useDataState from "./store/use-data-state";
import { getCompactFontData } from "./pages/editor/utils/fonts";
import { FONTS } from "./data/fonts";

export default function App() {
  const { setUser, user } = useAuthStore();
  const { getUploads } = useUploadsStore();
  const { setCompactFonts, setFonts } = useDataState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      const user = getUserFromSession(session);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    setCompactFonts(getCompactFontData(FONTS));
    setFonts(FONTS);
  }, []);

  useEffect(() => {
    if (user?.id) {
      getUploads();
    }
  }, [user?.id]);

  return <Editor />;
}
