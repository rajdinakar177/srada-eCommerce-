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

export async function POST(req: Request) {

  try {

    await connect();

    const body = await req.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: "SubCategory name is required" },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: "Parent category is required" },
        { status: 400 }
      );
    }

    const subcategory = await SubCategory.create({
      name: body.name.trim(),
      slug: toSlug(body.name),
      category: body.category,
    });

    return NextResponse.json(
      {
        message: "SubCategory created",
        subcategory,
      },
      { status: 201 }
    );

  }
  catch (error: any) {

    console.error("POST /api/subcategories failed:", error);

    const message =
      error?.code === 11000
        ? "This subcategory already exists under the selected category"
        : error?.name === "ValidationError"
        ? error.message
        : "SubCategory creation failed";

    return NextResponse.json(
      { error: message },
      { status: error?.code === 11000 ? 409 : 500 }
    );

  }

}

export async function GET(req: Request) {

  try {

    await connect();

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category");

    const filter = categoryId ? { category: categoryId } : {};

    const subcategories = await SubCategory.find(filter)
      .populate("category", "name slug")
      .sort({ name: 1 });

    return NextResponse.json(subcategories);

  }
  catch (error: any) {

    console.error("GET /api/subcategories failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );

  }

}