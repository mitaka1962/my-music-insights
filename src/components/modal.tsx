import { useRef, useEffect } from "react";

export default function Modal({
  children,
  open,
  setOpen,
  buttons = <button className="btn">閉じる</button>,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttons?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      console.log('Open!!');
      
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
