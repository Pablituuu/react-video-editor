import { useEditorState } from "@designcombo/core";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "../shared/icons";
import { Button } from "../ui/button";
import { Image, Video, Zap } from "lucide-react";
import useLayoutStore from "@/store/use-layout-store";

const properties = {
  image: [],
  video: [],
  audio: [],
  text: [],
};

export default function ControlItem() {
  const { activeIds, trackItemsMap } = useEditorState();
  const [showControlItem, setShowControlItem] = useState(false);
  const [typeElement, setTypeElement] = useState<string>("");

  useEffect(() => {
    if (activeIds.length === 1) {
      setShowControlItem(true);
      setTypeElement(trackItemsMap[activeIds[0]].type);
    } else {
      setShowControlItem(false);
    }
  }, [activeIds, trackItemsMap]);

  return <>{showControlItem && <ControlMenu type={typeElement} />}</>;
}

function ControlMenu({ type }: { type: string }) {
  const { setShowToolboxItem, setActiveToolboxItem, activeToolboxItem } =
    useLayoutStore();

  const openToolboxItem = useCallback(
    (type: string) => {
      if (type === activeToolboxItem) {
        setShowToolboxItem(false);
        setActiveToolboxItem(null);
      } else {
        setShowToolboxItem(true);
        setActiveToolboxItem(type);
      }
    },
    [activeToolboxItem]
  );

  return (
    <div
      style={{ zIndex: 201 }}
      className="w-14 py-2 absolute top-1/2 -translate-y-1/2 right-2.5 bg-zinc-950 rounded-lg shadow-lg flex flex-col   items-center"
    >
      <Button
        size="icon"
        onClick={() => openToolboxItem("zap")}
        variant="ghost"
      >
        <Zap size={20} className="text-white" />
      </Button>
      {type === "text" && (
        <Button
          size="icon"
          onClick={() => openToolboxItem("text")}
          variant="ghost"
        >
          <Icons.type size={20} className="text-white" />
        </Button>
      )}
      {type === "image" && (
        <Button
          size="icon"
          onClick={() => openToolboxItem("image")}
          variant="ghost"
        >
          <Image />
        </Button>
      )}
      {type === "video" && (
        <Button
          size="icon"
          onClick={() => openToolboxItem("video")}
          variant="ghost"
        >
          <Video />
        </Button>
      )}
      <Button
        size="icon"
        onClick={() => openToolboxItem("animation")}
        variant="ghost"
      >
        {/* <Icons.type size={20} className="text-white" /> */}
        <svg
          width={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.77329 21.14C6.2479 21.3362 5.67727 21.3777 5.12902 21.2596C4.58077 21.1414 4.07788 20.8685 3.67995 20.4733C3.40573 20.2025 3.18839 19.8795 3.0407 19.5235C2.89302 19.1674 2.81797 18.7855 2.81995 18.4C2.82282 18.1291 2.8632 17.8599 2.93995 17.6C2.65089 17.0595 2.42709 16.4866 2.27329 15.8933C1.66062 16.7384 1.37897 17.7787 1.48164 18.8174C1.5843 19.8561 2.06417 20.8212 2.83041 21.53C3.59666 22.2387 4.59613 22.642 5.63969 22.6635C6.68325 22.685 7.69849 22.3233 8.49329 21.6467C7.90225 21.545 7.32504 21.375 6.77329 21.14ZM12.2733 18.4533C11.3101 18.9902 10.1982 19.1986 9.10595 19.0471C8.0137 18.8955 7.00057 18.3922 6.21995 17.6133C5.44017 16.8362 4.93549 15.8257 4.78266 14.7355C4.62984 13.6452 4.83722 12.5349 5.37329 11.5733C5.22747 10.9499 5.14483 10.3133 5.12662 9.67334C3.99221 10.8836 3.3732 12.4878 3.40057 14.1464C3.42794 15.805 4.09956 17.3878 5.27329 18.56C6.4502 19.73 8.03445 20.3988 9.69374 20.4262C11.353 20.4535 12.9585 19.8373 14.1733 18.7067C13.5331 18.6854 12.8967 18.6005 12.2733 18.4533Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M14.4394 17.4732C12.5735 17.4704 10.7663 16.8208 9.32553 15.6352C7.88477 14.4495 6.89961 12.801 6.53784 10.9705C6.17608 9.13998 6.46008 7.24067 7.34149 5.59605C8.22289 3.95144 9.64718 2.66324 11.3718 1.95087C13.0963 1.2385 15.0145 1.14602 16.7996 1.68919C18.5847 2.23235 20.1263 3.37756 21.1619 4.92976C22.1974 6.48196 22.6628 8.34514 22.4788 10.202C22.2948 12.0588 21.4728 13.7944 20.1528 15.1132C19.4024 15.8629 18.5115 16.4572 17.5311 16.8622C16.5508 17.2671 15.5002 17.4747 14.4394 17.4732ZM14.4394 2.6665C13.5538 2.66563 12.6766 2.83932 11.8581 3.17764C11.0396 3.51597 10.2958 4.01229 9.66923 4.63825C9.04266 5.2642 8.5456 6.00751 8.20646 6.82568C7.86733 7.64385 7.69277 8.52083 7.69278 9.4065C7.6929 10.293 7.86985 11.1707 8.21326 11.988C8.55668 12.8053 9.05966 13.5459 9.69278 14.1665C10.958 15.4314 12.6737 16.1419 14.4628 16.1419C16.2518 16.1419 17.9676 15.4314 19.2328 14.1665C20.175 13.2219 20.8157 12.019 21.0738 10.71C21.3318 9.401 21.1955 8.04488 20.6822 6.81339C20.1689 5.58191 19.3017 4.53047 18.1904 3.79224C17.079 3.05402 15.7736 2.66223 14.4394 2.6665Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}

function ControlMenuItem() {
  return <div>Control item</div>;
}
