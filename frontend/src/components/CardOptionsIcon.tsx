import { useState } from "react";
import type { Card } from "../types";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import OptionIcon from "../icons/OptionIcon";

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  deleteCard: (id: string) => void;
}

function CardOptionsIcon({ card, onEdit, deleteCard }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="absolute right-4 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="px-2 text-lg text-slate-500 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <OptionIcon />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-10 z-20 w-32 rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg dark:border-gray-600 dark:bg-[#1F1D29] dark:text-white">
          <div className="flex flex-col gap-y-1">
          <div className="mt-2 mb-2 px-4 py-2 text-xs text-slate-500 dark:text-slate-300">
            Card options
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
              onEdit(card);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-gray-700"
          >
            <EditIcon /> Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
              deleteCard(card.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-700/20 w-full text-left mb-4"
          >
            <TrashIcon /> Delete
          </button>
        </div>
        </div>
      )}
    </div>
  );
}

export default CardOptionsIcon;
