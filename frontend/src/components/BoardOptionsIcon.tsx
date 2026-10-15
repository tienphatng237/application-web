import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import type { Board } from "../types";
import BoardFormModal from "./BoardFormModal";
import { fetchBoards, updateBoard } from "../api/boardApi";
import EditIcon from "../icons/EditIcon";
import OptionIcon from "../icons/OptionIcon";

interface BoardOptionsIconProps {
  board: Board;
  deleteBoard: (id: string) => void;
  setEditMode: (value: boolean) => void;
}

const BoardOptionsIcon = ({
  board,
  deleteBoard,
}: BoardOptionsIconProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className="p-2 text-slate-700 rounded-lg hover:bg-white/60 dark:text-white dark:hover:bg-gray-600"
        title="Board options"
      >
        <OptionIcon />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-10 z-20 w-32 rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg dark:border-gray-600 dark:bg-[#1F1D29] dark:text-white">
          <div className="flex flex-col gap-y-1">
            <div className="mt-2 mb-2 px-4 py-2 text-xs text-slate-500 dark:text-slate-300">
              Board options
            </div>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModalOpen(true); 
                setShowDropdown(false);
              }}
            >
              <EditIcon /> Edit
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-700/20 w-full text-left mb-4"
              onClick={(e) => {
                e.stopPropagation();
                deleteBoard(board.id);
                setShowDropdown(false);
              }}
            >
              <TrashIcon /> Delete
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <BoardFormModal
          key={board.id} 
          isOpen={true}
          onClose={() => setIsEditModalOpen(false)}
          isEditing={true}
          defaultValues={{ title: board.title, color: board.color }}
          onSubmit={async (data) => {
            if (!data.title) return;
            await updateBoard(board.id, {
              title: data.title,
              color: data.color || board.color, 
              order: board.order,
            });
            setIsEditModalOpen(false);
            fetchBoards(); 
          }}
        />
      )}
    </div>
  );
};

export default BoardOptionsIcon;
