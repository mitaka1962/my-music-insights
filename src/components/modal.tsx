import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";

export default function Modal({
  children,
  open,
  setOpen,
  title,
  buttons,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  buttons?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {      
      const dialogElement = dialogRef.current;
      const handler = () => {
        // hide dialog after close animation
        setTimeout(() => setOpen(false), 200);
      };

      dialogElement?.addEventListener('close', handler);
      // delay to make sure that open animation runs
      setTimeout(() => dialogElement?.showModal(), 1);

      return () => {
        dialogElement?.removeEventListener('close', handler)
      }
    }
  }, [open, setOpen]);
  
  return (
    <>
      {open && (
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box max-w-[48rem]">
            {title ? (
              <h3 className="font-bold text-xl px-2 pb-2 mb-4 border-b border-base-content/15">{title}</h3>
            ) : null}
            <div className="px-2">
              {children}
            </div>            
            <div className="modal-action">
              <form method="dialog" className="flex gap-3">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="閉じる">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                {buttons}
              </form>              
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
