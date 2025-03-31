import "./App.css";
import {
  ColorPicker,
} from "@/components";
import ModalContainer from "@/container/ModalContainer";
import { useTheme } from "@/routers/Provider";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("theme:", theme);
    console.log(theme == "dark");
  }, [theme]);

  return (
    <>
      <ModalContainer></ModalContainer>
      <div className="fixed bottom-[5rem] left-[5rem] rounded-lg p-8 bg-primary-foreground all-shadow">
        <ColorPicker cKey={"primary"} isDark={theme == "dark" ? true : false} />
        <ColorPicker
          cKey={"secondary"}
          isDark={theme == "dark" ? true : false}
        />
      </div>
    </>
  );
}

export default App;
