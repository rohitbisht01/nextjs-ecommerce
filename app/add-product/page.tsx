import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import FormSubmitBtn from "../components/FormSubmitBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - ShopSwift",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="mb-3 input input-bordered w-full"
        />

        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>

        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="mb-3 input input-bordered w-full"
        />

        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="mb-3 input input-bordered w-full"
        />

        <FormSubmitBtn className="btn-block">Add Product</FormSubmitBtn>
      </form>
    </div>
  );
}
