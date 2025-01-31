import "./App.css";
import { ColorPicker, TestC } from "@/components";
import { ThemeProvider } from "@/routers/Provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TestC />

      <h1 className="text-3xl font-bold underline hover:bg-slate-500">
        Hello world!
      </h1>
      <div className="text-background bg-primary">light primary</div>
      <div className="bg-secondary text-primary">light secondary</div>

      <div className="dark text-background bg-primary">다크 primary</div>
      <div className="dark text-primary bg-secondary">다크 secondary</div>

      {/* 화면 왼쪽 하단에 고정 */}
      <div className="fixed bottom-[5rem] left-[5rem] rounded-lg p-8 bg-primary-foreground all-shadow">
        <ColorPicker cKey={"primary"} />
        <ColorPicker cKey={"secondary"} />
        <ColorPicker cKey={"primary"} isDark={true} />
        <ColorPicker cKey={"secondary"} isDark={true} />
      </div>
    </ThemeProvider>
  );
}

export default App;
