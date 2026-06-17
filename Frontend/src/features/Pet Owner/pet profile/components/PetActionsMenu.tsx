import { useEffect, useRef, useState } from "react";

import {
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";

type PetActionsMenuProps = {
  petName: string;
  onEdit: () => void;
  onDelete: () => void;
};

const PetActionsMenu = ({
  petName,
  onEdit,
  onDelete,
}: PetActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={`Open actions for ${petName}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
      >
        <EllipsisVertical size={21} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-[#101b3d] transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PetActionsMenu;