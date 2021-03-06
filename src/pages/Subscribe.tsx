import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      }
    });

    navigate('/event');
  }
  
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center lg:p-8">
      <div className="w-full max-w-[1100px] gap-8 flex flex-col items-center justify-between mx-auto mt-6 lg:flex-row lg:gap-4 lg:mt-20">
        <div className="max-w-xl text-center flex flex-col items-center p-8 lg:items-start lg:text-left lg:p-0">
          <Logo />
          <h1 className="mt-8 text-3xl leading-tight lg:text-[2.5rem]">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 w-full lg:w-auto lg:rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form action="" className="flex flex-col gap-2 w-full" onSubmit={handleSubscribe}>
            <input 
              type="text" 
              placeholder="Seu nome completo" 
              className="bg-gray-900 rounded px-5 h-14 outline-none hover:outline-1 hover:outline-green-300 focus:outline-1 focus:outline-green-300"
              onChange={(event) => setName(event.target.value)}
            />
            <input 
              type="email" 
              placeholder="Digite seu email"
              className="bg-gray-900 rounded px-5 h-14  outline-none hover:outline-1 hover:outline-green-300 focus:outline-1 focus:outline-green-300"
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      
      <img src="/src/assets/code-mockup.png" alt="Imagem Ilustrativa" />
    </div>
  )
}