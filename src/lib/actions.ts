'use server';

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function addMylist(data: FormData) {
  // update or create user
  const user = await prisma.user.upsert({
    where: {
      name: data.get('username') as string,
    },
    update: {
      imageColor: data.get('color') as string,
    },
    create: {
      name: data.get('username') as string,
      imageColor: data.get('color') as string,
    },
  });

  // create new mylist
  const mylist = await prisma.mylist.create({
    data: {
      name: data.get('listname') as string,
      userId: user.id,
    }
  });

  // create some tracks in mylist
  const input = data.get('trackIds')?.toString().split(',').map(
    (id, idx) => ({ mylistId: mylist.id, position: idx + 1, trackId: id })
  );
  await prisma.tracksOnMylists.createMany({
    data: input ?? [],
  });

  redirect('/');
}
