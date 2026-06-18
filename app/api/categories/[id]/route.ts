import { NextResponse } from "next/server";

import { connect } from "@/app/dbConfig/db";
import Category from "@/app/models/categoryModel";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connect();

    const { id } = await params;

    const body = await req.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: body.name.trim(),
        slug: toSlug(body.name),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);

  }
  catch (error: any) {

    console.error("PUT /api/categories/[id] failed:", error);

    const message =
      error?.code === 11000
        ? "A category with this name already exists"
        : "Category update failed";

    return NextResponse.json(
      { error: message },
      { status: error?.code === 11000 ? 409 : 500 }
    );

  }

}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connect();

    const { id } = await params;

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true });

  }
  catch (error: any) {

    console.error("DELETE /api/categories/[id] failed:", error);

    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );

  }

}