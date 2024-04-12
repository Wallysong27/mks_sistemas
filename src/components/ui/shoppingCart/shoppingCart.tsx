import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ShoppingCartContainer,
  StyledLi,
} from "@/components/layout/ShoppingCartStyles";

export default function ShoppingCart({
  carrinho,
  mostrarCarrinho,
  fecharCarrinho,
  setShoppingCart,
}) {
  const [total, setTotal] = useState(0);
  const [compraEfetuada, setCompraEfetuada] = useState(false);

  useEffect(() => {
    const calcularTotal = () => {
      let totalCalculado = 0;
      carrinho.forEach((produto) => {
        totalCalculado += produto.price * produto.quantity;
      });
      setTotal(totalCalculado);
    };

    calcularTotal();
  }, [carrinho]);

  useEffect(() => {
    if (compraEfetuada) {
      setShoppingCart([]);
    }
  }, [compraEfetuada, setShoppingCart]);

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
      .filter((item) => item.quantity > 0);
    setShoppingCart(novoCarrinho);
  };

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setShoppingCart(novoCarrinho);
  };

  const finalizarCompra = () => {
    setCompraEfetuada(true);
    carrinho.forEach((item) => removerItem(item.id));
    setTimeout(() => {
      setCompraEfetuada(false);
      fecharCarrinho();
    }, 3000);
  };

  return (
    <ShoppingCartContainer
      className={`carrinho ${
        mostrarCarrinho ? "mostrar" : ""
      } lg:!w-[450px] !bg-[#0F52BA] z-50 overflow-y-auto`}
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
              className="flex flex-col lg:flex-row items-center justify-around lg:justify-between bg-white lg:px-4 rounded-md relative h-[250px] lg:h-[100px] w-full lg:w-[400px]"
            >
              <div
                className="absolute top-2 right-2 lg:-top-1 lg:-right-1 flex items-center justify-center lg:bg-black rounded-full w-5 h-5 cursor-pointer"
                onClick={() => removerItem(produto.id)}
              >
                <span className="lg:text-white font-medium lg:font-normal text-4xl lg:text-base">
                  x
                </span>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-evenly h-full w-full">
                <Image
                  src={produto.photo}
                  width={100}
                  height={100}
                  alt={produto.name}
                />
                <div className="w-full text-sm lg:w-20 text-center">
                  {produto.name}
                </div>
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                  <div className="flex flex-col">
                    <span className="text-[5px] hidden lg:block">Qtd:</span>
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
                  <div className="bg-black text-white font-bold p-2 rounded-md">
                    {produto.price}
                  </div>
                </div>
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
        button {
          margin: 0 5px;
        }
        /* Adicione mais estilos conforme necessário */
      `}</style>
      {!compraEfetuada && (
        <div className="!bg-[#0F52BA]">
          <div className="lg:absolute lg:bottom-32 w-full flex items-center justify-around mt-10 mb-6">
            <p className="text-white font-bold text-2xl">Total:</p>
            <p className="text-white font-bold text-2xl">R$ {total}</p>
          </div>
          <div
            className="lg:absolute lg:bottom-0 h-24 w-full bg-black flex items-center justify-center cursor-pointer"
            onClick={finalizarCompra}
          >
            <button className="text-3xl text-white font-bold">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
      {compraEfetuada && (
        <div className="absolute bottom-1/2 h-24 w-full bg-green-500 flex items-center justify-center">
          <p className="text-white text-xl font-bold">
            Compra efetuada com sucesso!
          </p>
        </div>
      )}
    </ShoppingCartContainer>
  );
}
