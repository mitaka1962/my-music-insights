'use client';

import Modal from "@/components/modal";
import { addMylist } from "@/lib/actions";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ShareButton() {
  const searchParams = useSearchParams();

  const colorList = ['red', 'blue', 'yellow', 'green', 'cyan']
  const [iconColor, setIconColor] = useState(colorList[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="btn btn-smlr btn-primary" onClick={() => setIsModalOpen(true)}>公開する</button>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="名前を付けて公開"
        buttons={<button type="submit" form="share" className="btn btn-smlr btn-primary">公開する</button>}
      >
        <form id="share" action={addMylist} className="flex flex-col gap-2">
          <input type="hidden" name="trackIds" defaultValue={searchParams.get('q') ?? undefined} />
          <label className="form-control">
            <div className="label">
              <span className="label-text text-base-content/80">マイリスト名</span>
            </div>            
            <input type="text" name="listname" placeholder="例）私の名曲○選" className="input input-bordered input-sm w-full" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-base-content/80">ニックネーム</span>
            </div>
            <input type="text" name="username" placeholder="ニックネームを入力" className="input input-bordered input-sm w-full" />
          </label>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80">アイコンの色</span>
            </label>
            <div className="grid grid-cols-[auto_minmax(0,1fr)]">
              <UserCircleIcon className="w-12 h-12 mx-2 my-1" style={{ color: iconColor }} />
              <div className="flex flex-wrap gap-3 p-3 border border-base-content/15 rounded-xl">
                {colorList.map((color) => (
                  <input
                    key={color}
                    type="radio"
                    name="color"
                    value={color}
                    aria-label={color}
                    className="appearance-none cursor-pointer w-8 h-8 rounded ring-base-content/30 ring-offset-base-100 ring-offset-2 checked:ring-1"
                    style={{ backgroundColor: color }}
                    onChange={() => setIconColor(color)}
                    checked={iconColor === color} />
                ))}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
