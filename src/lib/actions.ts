'use server';

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { formSchema, FormSchema } from "@/lib/validations/share-mylist-form";
import { ZodError } from "zod";

export async function addMylist(data: FormSchema): Promise<{ errors: string[] }> {
  try {
    // Form validation (and userName is transformed to a default userName if it is an empty string)
    const validResult = formSchema.parse({
      trackId: data.trackId,
      listName: data.listName,
      userName: data.userName,
      color: data.color,
    });

    // update or create user
    const user = await prisma.user.upsert({
      where: {
        name: validResult.userName,
      },
      update: {
        imageColor: validResult.color,
      },
      create: {
        name: validResult.userName,
        imageColor: validResult.color,
      },
    });

    // create new mylist
    const mylist = await prisma.mylist.create({
      data: {
        name: validResult.listName,
        userId: user.id,
      }
    });

    // register tracks into mylist
    const input = data.trackId.map(
      (id, idx) => ({ mylistId: mylist.id, position: idx + 1, trackId: id })
    );
    await prisma.tracksOnMylists.createMany({
      data: input ?? [],
    });
  } catch (error) {
    // Validation error
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map(issue => issue.message);
      return { errors: errorMessages };
    }

    return { errors: ['Failed to create your mylist.'] };
  }

  redirect('/');
}
