import { ComponentType } from "react"; // React에서 제공하는 타입, 컴포넌트 타입 정의에 사용
import { create } from "zustand"; // Zustand 라이브러리에서 `create` 함수 가져오기

// 모달 컴포넌트에 전달할 프로퍼티 타입 정의
export type ModalPropsType = {
  onClose?: () => void; // 모달 닫기 콜백 함수 (선택적)
  onSubmit?: (event?: any) => void; // 모달 확인 버튼 클릭 콜백 함수 (선택적)
  modalId?: string; // 모달 고유 식별자 (내부에서 관리)
  [property: string]: any; // 추가적인 속성을 허용
};

// 모달의 데이터 타입 정의
type ModalType = {
  modalId: string; // 모달의 고유 키 (중복 방지)
  props: ModalPropsType; // 모달에 전달되는 프로퍼티
  Component: ComponentType<ModalPropsType>; // 렌더링될 React 컴포넌트
};

// 모달 스토어의 상태와 메서드 타입 정의
type ModalStoreType = {
  modals: ModalType[]; // 현재 열려 있는 모달들의 배열
  open: (Component: ComponentType<any>, props: ModalPropsType) => void; // 모달 열기 메서드
  close: (modalId: string) => void; // 특정 모달 닫기 메서드
  clear: () => void; // 모든 모달 닫기 메서드
};

// Zustand를 사용하여 모달 스토어 생성
export const useModalStore = create<ModalStoreType>((set, get) => ({
  modals: [], // 초기 상태: 모달 리스트는 빈 배열
  open: (Component: ComponentType<any>, props: ModalPropsType) => {
    const { modals } = get(); // 현재 열려 있는 모달 리스트 가져오기
    const modal = props.modalId
      ? modals.find((m) => m.modalId === props.modalId)
      : null;
    // modalId가 제공되었을 경우, 동일한 modalId를 가진 모달이 이미 열려 있는지 확인
    const modalId = props.modalId || Date.now().toString(); // modalId가 없으면 현재 시간을 문자열로 사용

    // stack: false인 경우
    if (props.stack === false) {
      if (modals.length > 0) {
        console.error(
          "새로운 모달을 열 수 없습니다. 기존 모달이 닫혀야 합니다."
        );
        return;
      }
      set({ modals: [{ Component, props, modalId }] }); // 기존 모달을 덮어씀
      return;
    }
    // stack: true 경우
    if (!modal) {
      set({ modals: [...modals, { Component, props, modalId }] });
    }
  },
  close: (modalId: string) => {
    const { modals } = get(); // 현재 열려 있는 모달 리스트 가져오기
    set({ modals: modals.filter((m) => m.modalId !== modalId) });
    // 주어진 modalId와 일치하지 않는 모달들만 남김 (특정 모달 닫기)
  },
  clear: () => {
    set({ modals: [] }); // 모든 모달을 닫음 (리스트 초기화)
  },
}));
