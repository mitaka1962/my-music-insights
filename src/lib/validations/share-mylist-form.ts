import { z } from "zod";

export const defaultUserName = '匿名さん';
export const listNameMax = 100;
export const userNameMax = 30;
export const defaultColor = '#808080';

export const formSchema = z
  .object({
    trackId: z
      .string()
      .array()
      .min(3, 'トラックは最低3曲以上選択してください。')
      .max(10, '選択できるトラック数は最大10曲です。'),
    listName: z
      .string()
      .min(1, 'マイリスト名を入力してください。' )
      .max(listNameMax, `マイリスト名は${listNameMax}文字以内にしてください。`)
      .refine((val) => val.trim() !== '', 'マイリスト名を入力してください。'),
    userName: z
      .string()
      .max(userNameMax, `ニックネームは${userNameMax}文字以内にしてください。` )
      .transform((val) => val.trim() === '' ? defaultUserName : val),
    color: z
      .string({message: '色を選んでください。'})
      .regex(/^#[0-9a-fA-F]{6}$/, '不正なRGB値です。'),
  })
  // User color defaults to gray if username is empty
  .refine((obj) => !(obj.userName === defaultUserName && obj.color !== defaultColor), {
    message: '不正なRGB値です。',
    path: ['color'],
  });

export type FormSchema = z.infer<typeof formSchema>;
