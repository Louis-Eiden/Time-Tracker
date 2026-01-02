// hooks/useModalForm.ts
// this hook is used to manage all states and handlers outside of HomeScreen

import { useState } from "react";

interface UseModalFormOptions<T> {
  onAdd: (value: string) => Promise<void> | void;
  onEdit: (item: T, value: string) => Promise<void> | void;
}

export function useModalForm<T>({ onAdd, onEdit }: UseModalFormOptions<T>) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingItem(null); // this means ModalForm
    setValue("");
    setVisible(true);
  };

  const openEdit = (item: T, initialValue: string) => {
    setEditingItem(item);
    setValue(initialValue);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setEditingItem(null);
    setValue("");
  };

  const confirm = async () => {
    const trimmed = value.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);

    try {
      if (editingItem) {
        await onEdit(editingItem, trimmed);
      } else {
        await onAdd(trimmed);
      }
      close();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    visible,
    value,
    setValue,
    isEditing: Boolean(editingItem),
    submitting,
    openAdd,
    openEdit,
    close,
    confirm,
  };
}
