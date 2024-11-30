import { z } from "zod";

export const defaultUserName = '匿名さん';
export const listNameMax = 100;
export const userNameMax = 30;

export const formSchema = z.object({
  trackId: z
    .string()
    .array()
    .min(3, 'トラックは最低3曲以上選択してください。')
    .max(10, '選択できるトラック数は最大10曲です。'),
  listName: z
    .string()
    .trim()
    .min(1, 'マイリスト名を入力してください。' )
    .max(listNameMax, `マイリスト名は${listNameMax}文字以内にしてください。`),
  userName: z
    .string()
    .max(userNameMax, `ニックネームは${userNameMax}文字以内にしてください。` )
    .transform((val) => val.trim() === '' ? defaultUserName : val),
  color: z
    .string({message: '色を選んでください。'})
    .regex(/^#[0-9a-fA-F]{6}$/, '不正なRGB値です。'),
});

export type FormSchema = z.infer<typeof formSchema>;
