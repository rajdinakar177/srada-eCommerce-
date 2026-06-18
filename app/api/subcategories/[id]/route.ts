import { NextResponse } from "next/server";

import { connect } from "@/app/dbConfig/db";
import SubCategory from "@/app/models/subCategoryModel";

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

    const update: any = {};

    if (body.name && body.name.trim()) {
      update.name = body.name.trim();
      update.slug = toSlug(body.name);
    }

    if (body.category) {
      update.category = body.category;
    }

    const subcategory = await SubCategory.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name slug");

    if (!subcategory) {
      return NextResponse.json(
        { error: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory);

  }
  catch (error: any) {

    console.error("PUT /api/subcategories/[id] failed:", error);

    const message =
      error?.code === 11000
        ? "This subcategory already exists under the selected category"
        : "SubCategory update failed";

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

    await SubCategory.findByIdAndDelete(id);

    return NextResponse.json({ success: true });

  }
  catch (error: any) {

    console.error("DELETE /api/subcategories/[id] failed:", error);

    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );

  }

}