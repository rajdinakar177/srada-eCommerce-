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

export async function POST(req: Request) {

  try {

    await connect();

    const body = await req.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: body.name.trim(),
      slug: toSlug(body.name),
    });

    return NextResponse.json(
      {
        message: "Category created",
        category,
      },
      { status: 201 }
    );

  }
  catch (error: any) {

    console.error("POST /api/categories failed:", error);

    // Duplicate name/slug hits the unique index
    const message =
      error?.code === 11000
        ? "A category with this name already exists"
        : error?.name === "ValidationError"
        ? error.message
        : "Category creation failed";

    return NextResponse.json(
      { error: message },
      { status: error?.code === 11000 ? 409 : 500 }
    );

  }

}

export async function GET() {

  try {

    await connect();

    const categories = await Category.find().sort({ name: 1 });

    return NextResponse.json(categories);

  }
  catch (error: any) {

    console.error("GET /api/categories failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );

  }

}