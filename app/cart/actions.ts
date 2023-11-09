"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  // we got three cases to look at :
  // 1. if quantity is updated to 0 -> we want to remove the item from the cart
  // 2. if quantity is positive -> we want to update the quantity
  // 3. if the item is not in the cart and we want to add it even though it is not possible (for instance take that also consideration)

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: {
          id: articleInCart.id,
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }
  }

  revalidatePath("/cart");
}
