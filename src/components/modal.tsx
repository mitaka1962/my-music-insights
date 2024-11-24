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

      dialogElement?.showModal();
      dialogElement?.addEventListener('close', handler);

      return () => {
        dialogElement?.removeEventListener('close', handler)
      }
    }
  }, [open, onClose]);
  
  return (
    <>
      {open && (
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box min-w-[50%] max-w-[80%] w-fit">
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
