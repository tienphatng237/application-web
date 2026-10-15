import { useEffect, useState } from "react";
import type { Card } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Card>) => Promise<void>;
  defaultValues?: Partial<Card>;
  isEditMode?: boolean;
}

function CardFormModal({
  isOpen,
  onClose,
  onSave,
  defaultValues = {},
  isEditMode = false,
}: Props) {
  const [formData, setFormData] = useState<Partial<Card>>({
    content: "",
    subjectName: "",
    semester: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData((prevData) => {
        const newData = {
          content: defaultValues.content || "",
          subjectName: defaultValues.subjectName || "",
          semester: defaultValues.semester || "",
        };

        const isSame =
          prevData.content === newData.content &&
          prevData.subjectName === newData.subjectName &&
          prevData.semester === newData.semester;

        if (!isSame) return newData;
        return prevData; 
      });
    }
  }, [
    defaultValues?.content,
    defaultValues?.subjectName,
    defaultValues?.semester,
  ]);

  const handleSubmit = async () => {
    if (!formData.content?.trim()) return;
    await onSave(formData);
    onClose();
    setFormData({ content: "", subjectName: "", semester: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xl w-[90%] max-w-md space-y-4 dark:bg-[#2B2B39] dark:border-[#2F2F3C]">
        <div>
          <h2 className="text-xl font-semibold text-left text-slate-900 mb-4 dark:text-white">
            {isEditMode ? "Edit Card" : "Add New Card"}
          </h2>
          <hr className="mt-2 border-slate-200 dark:border-gray-500" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Content *</label>
            <input
              type="text"
              placeholder="Content"
              className="w-full p-2 border border-slate-300 rounded-lg bg-white text-slate-900 mt-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 dark:bg-[#1F1D29] dark:border-gray-600 dark:text-white"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Name of subject</label>
            <input
              type="text"
              placeholder="Name of subject"
              className="w-full p-2 border border-slate-300 rounded-lg bg-white text-slate-900 mt-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 dark:bg-[#1F1D29] dark:border-gray-600 dark:text-white"
              value={formData.subjectName}
              onChange={(e) =>
                setFormData({ ...formData, subjectName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Semester</label>
            <input
              type="text"
              placeholder="Semester"
              className="w-full p-2 border border-slate-300 rounded-lg bg-white text-slate-900 mt-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 dark:bg-[#1F1D29] dark:border-gray-600 dark:text-white"
              value={formData.semester}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-10">
          <button
            className="px-4 py-2 border border-slate-300 bg-white rounded-lg hover:bg-slate-100 text-slate-700 dark:bg-[#3A374A] dark:border-gray-500 dark:text-white dark:hover:bg-gray-600"
            onClick={() => {
              setFormData({ content: "", subjectName: "", semester: "" });
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border border-violet-600 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFormModal;
