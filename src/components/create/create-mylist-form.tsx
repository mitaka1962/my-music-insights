import { addMylist } from "@/lib/actions";
import { Track } from "@/lib/definitions";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "@/lib/validations/share-mylist-form";
import ValidatedInput from "@/components/create/validated-input";
import ModalActions from "@/components/modal/modal-actions";

const colorList = ['#ff0000', '#0000ff', '#ffff00', '#00ff00', '#00ffff']

export default function CreateMylistForm({
  selectedTrackList,
}: {
  selectedTrackList: Track[];
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackId: selectedTrackList.map((item) => item.id),
      color: colorList[0],
    }
  });

  const selectedColor = watch('color');

  const onSubmitForm: SubmitHandler<FormSchema> = (data) => {
    console.log(data);    
  };

  return (
    <form id="share" onSubmit={handleSubmit(async (data) => { await new Promise(r => setTimeout(r, 5000)); console.log(data)}, (error) => console.log(error))} className="flex flex-col">
      <ValidatedInput
        name="listName"
        label="マイリスト名"
        register={register}
        errors={errors}
        placeholder="例）私の名曲○選" />
      <ValidatedInput
        name="userName"
        label={<>ニックネーム&nbsp;<span className="text-xs align-bottom text-base-content/80">(任意)</span></>}
        register={register}
        errors={errors}
        placeholder="匿名さん"
        autoComplete="on" />
      <div className="form-control">
        <div className="label">
          <span className="label-text">アイコンの色</span>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)]">
          <UserCircleIcon className="w-12 h-12 mx-2 my-1" style={{ color: selectedColor }} />
          <fieldset className="flex flex-wrap gap-3 p-3 border border-base-content/15 rounded-xl">
            {colorList.map((color) => (
              <input
                key={color}
                {...register('color')}
                type="radio"
                value={color}
                aria-label={color}
                className="appearance-none cursor-pointer w-8 h-8 rounded ring-base-content/20 ring-offset-base-100 ring-offset-2 checked:ring-2"
                style={{ backgroundColor: color }} />
            ))}
          </fieldset>
        </div>
      </div>
      <ModalActions>
        <button type="submit" form="share" className="btn btn-smlr btn-primary" disabled={isSubmitting}>公開する</button>
      </ModalActions>
    </form>
  );
}
