import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";

export default function Modal({
  children,
  open,
  setOpen,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {      
      const dialogElement = dialogRef.current;
      const handler = () => {
        // hide dialog after the close animation
        setTimeout(() => setOpen(false), 200);
      };

      dialogElement?.addEventListener('close', handler);
      // delay to make sure the open animation runs
      setTimeout(() => dialogElement?.showModal(), 1);

      return () => {
        dialogElement?.removeEventListener('close', handler)
      };
    }
  }, [open, setOpen]);
  
  return (
    <>
      {open && (
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box max-w-[48rem]">
            <form method="dialog" className="flex gap-3">
              {/* if there is a button in form[method="dialog"], it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="閉じる">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </form>
            {title ? (
              <h3 className="font-bold text-xl px-2 pb-2 mb-4 border-b border-base-content/15">{title}</h3>
            ) : null}
            <div className="px-2">
              {children}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
