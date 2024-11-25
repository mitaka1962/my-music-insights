'use client';

import Modal from "@/components/modal";
import { useState } from "react";

export default function ShareButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsModalOpen(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleClick}>名前を付けて公開する</button>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        buttons={<>
          <button className="btn">キャンセル</button>
          <button className="btn btn-primary">公開する</button>
        </>}
      >
        公開しますか？
      </Modal>
    </>
  );
}
