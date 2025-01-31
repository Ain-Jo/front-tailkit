import { useTheme } from "@/routers/Provider";

export default function TestC() {
  const { theme, setTheme } = useTheme();

  console.log("테마:", theme);

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "다크 모드" : "라이트 모드"}
    </button>
  );
}
