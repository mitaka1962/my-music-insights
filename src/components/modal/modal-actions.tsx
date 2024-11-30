export default function ModalActions({
  children,
  submit = false,
}: {
  children: React.ReactNode;
  submit?: boolean;
}) {
  return (
    <div className="modal-action -mx-2">
      {submit ? children : (
        <form method="dialog">
          {children}
        </form>
      )}
    </div>    
  );
}
