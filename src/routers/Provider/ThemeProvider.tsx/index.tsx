import { createContext, useContext, useEffect, useState } from "react";

// 사용할 테마 타입 지정
type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode; // React 노드를 자식으로 받을 수 있도록 설정
  defaultTheme?: Theme; // 기본 테마 (디폴트값은 "system")
  storageKey?: string; // localStorage에 저장할 키 (디폴트: "vite-ui-theme")
};

// 테마 상태를 위한 타입 정의
type ThemeProviderState = {
  theme: Theme; // 현재 테마 상태
  setTheme: (theme: Theme) => void; // 테마를 변경하는 함수
};

// 기본 상태값 설정 (초기값)
const initialState: ThemeProviderState = {
  theme: "system", // 기본값으로 "system" 모드 사용
  setTheme: () => null, // 기본적으로 빈 함수 (실제 사용 시 바뀜)
};

// 테마 컨텍스트 생성
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system", // 기본값으로 시스템 테마 사용
  storageKey = "vite-ui-theme", // localStorage 키 설정
  ...props
}: ThemeProviderProps) {
  // 테마 상태 관리 (localStorage에 저장된 값을 불러오거나 기본 테마 사용)
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  // 테마가 변경될 때마다 실행되는 효과 (useEffect)
  useEffect(() => {
    const root = window.document.documentElement; // HTML 루트 요소 가져오기

    // 기존에 설정된 "light", "dark" 클래스를 제거하여 초기화
    root.classList.remove("light", "dark");

    // 시스템 테마를 사용할 경우, 시스템 설정을 감지하여 적용
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark" // 사용자의 OS 설정이 다크 모드면 "dark"
        : "light"; // 아니면 "light"

      root.classList.add(systemTheme); // 감지된 테마 적용
      return;
    }

    // 사용자가 직접 선택한 테마를 HTML 요소에 적용
    root.classList.add(theme);
  }, [theme]); // theme 값이 바뀔 때마다 실행됨

  // 컨텍스트에 전달할 값 설정
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme); // localStorage에 테마 저장
      setTheme(theme); // 상태 업데이트
    },
  };

  return (
    // 컨텍스트 프로바이더를 통해 상태 전달
    <ThemeProviderContext.Provider {...props} value={value}>
      {children} {/* 자식 컴포넌트 렌더링 */}
    </ThemeProviderContext.Provider>
  );
}

// 커스텀 훅: useTheme
export const useTheme = () => {
  const context = useContext(ThemeProviderContext); // 컨텍스트 값 가져오기

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  // 컨텍스트가 없으면 (ThemeProvider 밖에서 사용하면) 오류 발생

  return context; // 현재 테마 상태와 setTheme 함수 반환
};
