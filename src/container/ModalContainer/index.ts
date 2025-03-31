import { ModalPropsType, useModalStore } from "@/store/modal";
import { Nullable } from "@/types/common";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer() {
  const { modals, close } = useModalStore();
  const [portal, setPortal] = useState<Nullable<Element>>(null);

  useEffect(() => {
    setPortal(document.getElementById("modal"));
  }, []);

  return (
    portal &&
    createPortal(
      modals.map((modal) => {
        const { Component, props, modalId } = modal;
        const { onSubmit = () => {}, onClose = () => {}, ...restProps } = props;

        const handleClose = async () => {
          await onClose?.();
          close(modalId);
        };

        const handleSubmit = async (props?: ModalPropsType) => {
          await onSubmit?.(props);
          close(modalId);
        };

        return React.createElement(Component, {
          key: modalId, // key는 modalId로 설정
          modalId: props.modalId,
          onSubmit: handleSubmit,
          onClose: handleClose,
          ...restProps,
        });
      }),
      portal
    )
  );
}
