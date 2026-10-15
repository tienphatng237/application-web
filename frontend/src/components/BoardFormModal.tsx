import { useEffect, useState } from "react";
import type { Board } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Board>) => void;
  defaultValues?: Partial<Board>;
  isEditing?: boolean;
  board?: Board;
  editingBoard?: Board;
}

function BoardFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isEditing = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#9198A1");

  const colors = [
    "#7F8CFF", // pastel tím xanh 
    "#49D2CF", // pastel teal
    "#FF8C42", // pastel cam rực 
    "#F85149", // pastel đỏ san hô
    "#DB61A2", // pastel hồng tím
    "#AB7DF8", // pastel tím nhạt
    "#55B37A", // pastel xanh lá tươi
    "#D29922", // pastel vàng ấm
  ];

  useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        setTitle(defaultValues.title || "");
        setSelectedColor(defaultValues.color || "#9198A1");
      } else {
        setTitle("");
        setSelectedColor("#9198A1");
      }
    }
  }, [defaultValues, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, color: selectedColor });
    if (!isEditing) {
      setTitle("");
      setSelectedColor("#9198A1");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgb(15 23 42 / 0.3)" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 w-96 dark:bg-[#2B2B39] dark:border-[#2F2F3C]">
        <h2 className="text-lg font-bold text-slate-900 mb-4 dark:text-white">
          {isEditing ? "Edit Board" : "Add Board"}
        </h2>
        <hr className="border-slate-200 mb-4 dark:border-gray-500" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="board-title">
            Board title *
          </label>
          <input
            type="text"
            placeholder="Enter board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-slate-300 px-4 py-2 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 dark:bg-[#1F1D29] dark:border-gray-600 dark:text-white"
          />

          {/* Color picker */}
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded cursor-pointer border-2 ${
                  selectedColor === color ? "border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 bg-white rounded-lg hover:bg-slate-100 text-slate-700 dark:bg-[#3A374A] dark:border-gray-500 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-violet-600 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardFormModal;
