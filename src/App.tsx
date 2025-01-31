import { Button } from "@/components/ui/button";
import "./App.css";
import { ColorPicker, TestC } from "@/components";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline hover:bg-slate-500">
        Hello world!
      </h1>
      <Button variant={"default"}>버튼</Button>
      <Button variant={"secondary"}>버튼</Button>
      <div className="bg-chart-1">chart1</div>

      <div className="dark bg-primary">다크모드</div>
      <div className="dark bg-destructive">destructive</div>

      <TestC />
      {/* 화면 왼쪽 하단에 고정 */}
      <div className="fixed bottom-[5rem] left-[5rem] rounded-lg p-8 bg-primary-foreground all-shadow">
        <ColorPicker cKey={"primary"} />
        <ColorPicker cKey={"secondary"} />
        <ColorPicker cKey={"chart-1"} />
        <ColorPicker cKey={"primary"} isDark={true} />
        <ColorPicker cKey={"destructive"} isDark={true} />
      </div>
    </>
  );
}

export default App;
