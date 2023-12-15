import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { db, todoTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS Todos(id SERIAL, task varchar(255));`;
    const res = await db.select().from(todoTable);
    return NextResponse.json({ data: res });
  } catch (error) {
    console.log((error as { message: string }).message);
    return new NextResponse("Something Went Wrong!");
  }
};

export const POST = async (request: NextRequest) => {
  const { task } = await request.json();
  console.log(task);
  
  try {
    if (!task) {
      return new NextResponse("Task field is required!");
    }

    const res = await db.insert(todoTable).values({ task }).returning();

    return NextResponse.json({ message: "Data added successfully" });
  } catch (error) {
    console.log((error as { message: string }).message);
    return new NextResponse("Something Went Wrong!");
  }
};

export const PUT = async (request: NextRequest) => {
  const { taskId, task } = await request.json();
  try {
    if (!taskId || !task) {
      return new NextResponse("Task field is required!");
    }

    const res = await db
      .update(todoTable)
      .set({ task: task })
      .where(eq(todoTable.id, taskId))
      .returning({ task: todoTable.task });
    console.log(res);

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    console.log((error as { message: string }).message);
    return new NextResponse("Something Went Wrong!");
  }
};

export const DELETE = async (request: NextRequest) => {
  const { taskId } = await request.json();
  try {
    if (!taskId) {
      return new NextResponse("Task field is required!");
    }

    const res = await db
      .delete(todoTable)
      .where(eq(todoTable.id, taskId))
    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log((error as { message: string }).message);
    return new NextResponse("Something Went Wrong!");
  }
};
