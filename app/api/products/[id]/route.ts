import { NextResponse } from "next/server";

import { connect } from "@/app/dbConfig/db";
import Product from "@/app/models/productModel";



type Context = {
  params: Promise<{
    id: string;
  }>;
};




// GET PRODUCT

export async function GET(
  req: Request,
  { params }: Context
) {

  try {


    await connect();
    const { id } = await params;



    const product =
      await Product.findById(id);



    if (!product) {

      return NextResponse.json(
        {
          error: "Product not found"
        },
        {
          status: 404
        }
      );

    }



    return NextResponse.json(product);


  }
  catch (error: any) {


    console.log(
      "GET product error:",
      error
    );


    return NextResponse.json(
      {
        error: "Failed to fetch product"
      },
      {
        status: 500
      }
    );


  }

}


// UPDATE PRODUCT

export async function PUT(
  req: Request,
  { params }: Context
) {


  try {


    await connect();



    const { id } = await params;



    const body = await req.json();





    if (body.name && !body.slug) {

      body.slug =
        body.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

    }






    const product =
      await Product.findByIdAndUpdate(

        id,

        body,

        {
          new: true,
          runValidators: true
        }

      );






    if (!product) {

      return NextResponse.json(
        {
          error: "Product not found"
        },
        {
          status: 404
        }
      );

    }






    return NextResponse.json(product);



  }
  catch (error: any) {


    console.log(
      "PUT error:",
      error
    );



    return NextResponse.json(
      {
        error: "Product update failed"
      },
      {
        status: 500
      }
    );


  }

}


// DELETE PRODUCT

export async function DELETE(
  req: Request,
  { params }: Context
) {


  try {


    await connect();



    const { id } = await params;



    const product =
      await Product.findByIdAndDelete(id);





    if (!product) {

      return NextResponse.json(
        {
          error: "Product not found"
        },
        {
          status: 404
        }
      );

    }






    return NextResponse.json({

      success: true

    });



  }
  catch (error: any) {


    return NextResponse.json(
      {
        error: "Delete failed"
      },
      {
        status: 500
      }
    );


  }

}