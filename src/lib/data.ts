import prisma from "@/lib/prisma";

export async function fetchMylist(id: string) {
  const mylist = await prisma.mylist.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      tracks: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });
  
  return mylist;
}

export async function fetchLatestMylists(limit: number, cursorArg?: string) {
  const cursor = cursorArg ? { id: cursorArg } : undefined;
  const skip = cursorArg ? 1 : 0;

  try {
    const mylists = await prisma.mylist.findMany({
      include: {
        user: true,
        tracks: {
          orderBy: {
            position: 'asc',
          },
          take: 3,
        }
      },
      orderBy: {
        id: 'desc', // CUID includes timestamp
      },
      take: limit,
      cursor,    
      skip,
    });
      
    return mylists;
  } catch (error) {
    console.error('Error fetching latest mylists:', error);
    throw error;
  }
}
