"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/model/Product";
import ShoppingCart from "../shoppingCart/shoppingCart";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Product[]>([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const handleClick = (produtoCarrinho) => {
    // Procura o produto no carrinho
    const existingProduct = shoppingCart.find(
      (item) => item.id === produtoCarrinho.id
    );

    if (existingProduct) {
      // Se encontrou, aumenta a quantidade
      setShoppingCart(
        shoppingCart.map((item) =>
          item.id === produtoCarrinho.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Se não encontrou, adiciona o produto com quantidade 1
      setShoppingCart([...shoppingCart, { ...produtoCarrinho, quantity: 1 }]);
    }
    setMostrarCarrinho(true);
  };

  const fecharCarrinho = () => {
    setMostrarCarrinho(false);
  };

  useEffect(() => {
    console.log(shoppingCart);
  }, [shoppingCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
        );
        const produtos = response.data.products.map((item) => ({
          ...item,
          quantity: 0,
        }));
        setProducts(produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 items-center justify-items-center h-screen p-40 gap-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-center w-[300px] h-[350px] border rounded-lg relative"
          >
            <div className="absolute top-4">
              <Image
                src={product.photo}
                alt={product.name}
                width={150}
                height={150}
                className=""
              />
            </div>
            <div className="absolute bottom-0">
              <div className="px-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="">{product.name}</h2>
                  <p className="bg-black text-white text-[15px] rouned-md font-bold p-2 rounded-md">
                    R$ {product.price}
                  </p>
                </div>
                <p className="text-[10px]">{product.description}</p>
              </div>
              <div className="flex items-center justify-center bg-[#0F52BA] text-white h-10 font-semibold rounded-b-lg gap-3 cursor-pointer"
              onClick={() => handleClick(product)}>
                <FiShoppingBag />
                <span>Comprar</span>
              </div>
            </div>
            {/* <div className="flex flex-col gap-5">
              <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                  <h2>{product.name}</h2>
                  <p className="text-[15px] bg-black text-white px-2 py-2 rounded-md font-bold">
                    R$ {product.price}
                  </p>
                </div>
                <p className="text-[10px]">{product.description}</p>
              </div>
              <div className="bg-[#0F52BA] flex items-center justify-center text-white h-10 font-semibold absolute left-0 bottom-0 w-full rounded-b-lg gap-3">
                <FiShoppingBag />
                <button onClick={() => handleClick(product)}>Comprar</button>
              </div>
            </div> */}
          </div>
        ))}
      </div>
      <ShoppingCart
        carrinho={shoppingCart}
        mostrarCarrinho={mostrarCarrinho}
        fecharCarrinho={fecharCarrinho}
        setShoppingCart={setShoppingCart}
      />
    </div>
  );
}
