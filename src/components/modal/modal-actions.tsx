export default function ModalActions({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="modal-action -mx-2">
      <form method="dialog">
        {children}
      </form>
    </div>    
  );
}
