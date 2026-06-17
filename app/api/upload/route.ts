import {NextResponse} from "next/server";
import cloudinary from "@/app/lib/cloudinary";


export async function POST(req:Request){


try{


const formData = await req.formData();


const file:any = formData.get("file");



const bytes = await file.arrayBuffer();


const buffer = Buffer.from(bytes);



const result:any = await new Promise(
(resolve,reject)=>{


cloudinary.uploader.upload_stream(
{
folder:"srada/products"
},

(error,result)=>{

if(error) reject(error);

else resolve(result);

}

).end(buffer)



});



return NextResponse.json({
url:result.secure_url
});


}
catch(error){

return NextResponse.json(
{
error:"Upload failed"
},
{
status:500
}
)

}


}