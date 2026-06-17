import { NextResponse } from "next/server";

import { connect } from "@/app/dbConfig/db";
import Product from "@/app/models/productModel";


export async function POST(req: Request) {

  try {

    await connect();

    const body = await req.json();

    // Generate a URL-safe slug from the name if one wasn't provided
    const slug =
      body.slug ||
      body.name
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    const product = await Product.create({
      ...body,
      slug
    });

    return NextResponse.json(
      {
        message: "Product created",
        product
      },
      {
        status: 201
      }
    )

  }
  catch (error: any) {

    // Log the real error server-side so it shows up in your terminal
    console.error("POST /api/products failed:", error);

    // Mongoose validation errors have a useful `.message` —
    // surface that instead of a generic string when available
    const message =
      error?.name === "ValidationError"
        ? error.message
        : "Product creation failed";

    return NextResponse.json(
      {
        error: message
      },
      {
        status: 500
      }
    )

  }


}


export async function GET() {

  try {

    await connect();

    const products = await Product.find()
      .sort({
        createdAt: -1
      });

    return NextResponse.json(products);

  }
  catch (error: any) {

    console.error("GET /api/products failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch products"
      },
      {
        status: 500
      }
    )

  }

}