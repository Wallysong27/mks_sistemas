"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShoppingCart({
  carrinho,
  mostrarCarrinho,
  fecharCarrinho,
  setShoppingCart,
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcularTotal = () => {
      let totalCalculado = 0;
      carrinho.forEach((produto) => {
        totalCalculado += produto.price * produto.quantity; // Multiplica o preço pela quantidade
      });
      setTotal(totalCalculado);
    };

    calcularTotal();
  }, [carrinho]);

  const aumentarQuantidade = (id) => {
    const novoCarrinho = carrinho.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setShoppingCart(novoCarrinho);
  };

  const diminuirQuantidade = (id) => {
    const novoCarrinho = carrinho
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove o item se a quantidade for 0
    setShoppingCart(novoCarrinho);
  };

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setShoppingCart(novoCarrinho);
  };

  return (
    <div
      className={`carrinho ${
        mostrarCarrinho ? "mostrar" : ""
      } !w-[450px] !bg-[#0F52BA]`}
    >
      <div className="flex items-center justify-around">
        <h2 className="font-bold text-[27px] text-white">
          Carrinho <br />
          de Compras
        </h2>
        <button
          onClick={fecharCarrinho}
          className="text-white bg-black rounded-full w-10 h-10"
        >
          <span className="w-full h-full">X</span>
        </button>
      </div>
      {carrinho.length > 0 ? (
        <ul className="px-10">
          {carrinho.map((produto) => (
            <li
              key={produto.id}
              className="flex items-center justify-between bg-white px-4 rounded-md relative h-[100px] w-[400px]"
            >
              <div
                className="absolute -top-1 -right-1 flex items-center justify-center bg-black rounded-full w-5 h-5 cursor-pointer"
                onClick={() => removerItem(produto.id)}
              >
                <span className="text-white">x</span>
              </div>
              <div className="flex items-center justify-evenly w-full">
                <div className="">
                  <Image
                    src={produto.photo}
                    width={50}
                    height={50}
                    alt={produto.name}
                  />
                </div>
                <div className="w-20">{produto.name}</div>
                <div className="flex flex-col">
                  <span className="text-[5px]">Qtd:</span>
                  <div className="flex items-center justify-center border rounded-[4px] w-14">
                    <div
                      className="border-r cursor-pointer"
                      onClick={() => aumentarQuantidade(produto.id)}
                    >
                      <button>+</button>
                    </div>
                    <div className="px-1">{produto.quantity}</div>
                    <div
                      className="border-l cursor-pointer"
                      onClick={() => diminuirQuantidade(produto.id)}
                    >
                      <button>-</button>
                    </div>
                  </div>
                </div>
                <div>{produto.price}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-bold text-white mt-10 pl-14">
          Seu carrinho está vazio.
        </p>
      )}
      <style jsx>{`
        .carrinho {
          position: fixed;
          right: 0;
          top: 0;
          width: 300px;
          height: 100%;
          background-color: white;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }
        .carrinho.mostrar {
          transform: translateX(0);
        }
        li {
          margin: 10px 0;
        }
        button {
          margin: 0 5px;
        }
        /* Adicione mais estilos conforme necessário */
      `}</style>
      <div>
        <div className="absolute bottom-32 w-full flex items-center justify-around">
          <p className="text-white font-bold text-2xl">Total:</p>
          <p className="text-white font-bold text-2xl">R$ {total}</p>
        </div>
        <div className="absolute bottom-0 h-24 w-full bg-black flex items-center justify-center">
          <button
            className="text-3xl text-white font-bold"
            onClick={fecharCarrinho}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
