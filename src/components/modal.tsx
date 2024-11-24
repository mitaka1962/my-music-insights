import { useRef, useEffect } from "react";

export default function Modal({
  children,
  open,
  onClose,
  buttons = <button className="btn">閉じる</button>,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  buttons?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      const dialogElement = dialogRef.current;
      const handler = () => {
        // hide dialog after close animation
        setTimeout(onClose, 200);
      };

      dialogElement?.addEventListener('close', handler);
      // delay for open animation
      setTimeout(() => dialogElement?.showModal(), 1);

      return () => {
        dialogElement?.removeEventListener('close', handler)
      }
    }
  }, [open, onClose]);
  
  return (
    <>
      {open && (
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box max-w-[48rem]">
            {children}
            <div className="modal-action">
              <form method="dialog" className="flex gap-3">
                {buttons}
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
