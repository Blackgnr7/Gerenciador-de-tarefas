import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const divDestinada = document.getElementById("lista da tarefas");
    const clonar = document.getElementById("tarefas0");
    let number = 1;
    function adiconarElementos() {
      while (true) {
        if (localStorage.getItem(number) !== null) {
          const lista = JSON.parse(localStorage.getItem(number));
          const clone = clonar.cloneNode(true);
          divDestinada.appendChild(clone);
          clone.id = "tarefas" + number;
          clone.querySelector("#titulo2").id = "titulo2" + number;
          clone.querySelector("#sub-titulo2").id = "sub-titulo2" + number;
          clone.querySelector("#data2").id = "data2" + number;
          clone.querySelector("#titulo2" + number).innerText = lista.titulo;
          clone.querySelector("#sub-titulo2" + number).innerText =
            lista.subTitulo;
          clone.querySelector("#data2" + number).innerText = lista.data;
          clone.querySelector("#img-io").id = "img-io" + number;
          clone.querySelector("#img-io" + number).removeAttribute("hidden");
          clone.querySelector("#img-io" + number).setAttribute("key", number);
          clone
            .querySelector("#img-io" + number)
            .addEventListener("click", deletar_key);
          clone
            .querySelector("#img-io" + number)
            .addEventListener("mouseenter", trocar_imagem);
          clone
            .querySelector("#img-io" + number)
            .addEventListener("mouseleave", trocar_imagem);
        } if (number == 1000) {
          break;
        }
        number = number + 1;
      }
    }
    adiconarElementos();
  });
  let lista_para_storcar;
  let number = 1;
  let number_para_estocar;
  while (true) {
    if (localStorage.getItem(number) === null) {
      number_para_estocar = number;
      break;
    }
    number = number + 1;
  }
  function trocar_imagem(event) {
    if (event.target.getAttribute("src") == "./trash-abr115312.png") {
      event.target.setAttribute("src", "./trash-fechado115312.png");
    } else {
      event.target.setAttribute("src", "./trash-abr115312.png");
    }
  }
  function deletar_key(event) {
    const key = event.target.getAttribute("key");
    localStorage.removeItem(key);
    window.location.reload();
  }
  function checkInput() {
    if (
      document.getElementById("titulo2").innerText.length > 0 &&
      document.getElementById("sub-titulo2").innerText.length > 0 &&
      document.getElementById("data2").innerText.length > 0
    ) {
      document.getElementById("enviar").disabled = false;
    } else {
      document.getElementById("enviar").disabled = true;
    }
  }
  function data() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    let data_hora = document.getElementById("data_hora");
    var data2 = document.getElementById("data2");
    data_hora.min =
      ano +
      "-" +
      (mes < 10 ? "0" + mes : mes) +
      "-" +
      (dia < 10 ? "0" + dia : dia) +
      "T" +
      (hora < 10 ? "0" + hora : hora) +
      ":" +
      (minutos < 10 ? "0" + minutos : minutos);
    if (data_hora.value == "") {
      console.log("Please select a date and time.");
    } else {
      data2.innerText = data_hora.value;
    }
  }
  function handleSubmit() {
    const titulo3 = document.getElementById("titulo");
    const subtitulo3 = document.getElementById("sub-titulo");
    const datahora3 = document.getElementById("data_hora");
    lista_para_storcar = {
      titulo: titulo3.value,
      subTitulo: subtitulo3.value,
      data: datahora3.value,
    };
    localStorage.setItem(
      number_para_estocar,
      JSON.stringify(lista_para_storcar)
    );
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col text-center mx-8 my-8 absolute top-0 max-w-lg">
          <p className="text-4xl font-black">Gerenciador de Tarefas</p>
          <div className="field ">
            <label className="label">Oque deseja se lembrar?</label>
            <form onSubmit={handleSubmit}>
              <input
                id="titulo"
                className="input"
                type="text"
                placeholder="Titulo da tarefa / max 20 caracteres"
                onChange={() => (
                  (document.getElementById("titulo2").innerText =
                    document.getElementById("titulo").value),
                  checkInput()
                )}
                maxLength={20}
              />
              <input
                id="sub-titulo"
                className="input my-4"
                type="text"
                placeholder="Sub-Titulo da tarefa / max 90 caracteres"
                onChange={() => (
                  (document.getElementById("sub-titulo2").innerText =
                    document.getElementById("sub-titulo").value),
                  checkInput()
                )}
                maxLength={90}
              />
              <input
                className="input"
                type="datetime-local"
                onMouseOver={() => (data(), checkInput())}
                onChange={() => (data(), checkInput())}
                id="data_hora"
              />
              <button
                id="enviar"
                className="button is-dark my-3 size-30"
                type="submit"
                disabled={true}
              >
                Enviar
              </button>
            </form>
            <div
              id="lista da tarefas"
              className="my-3 bg-neutral-800/30 rounded-xl"
            >
              <div className="box text-wrap my-4" id="tarefas0">
                <p>
                  <label
                    id="titulo2"
                    className="text-4xl font-bold my-2 brak-normal"
                  ></label>
                </p>
                <p className="my-2">
                  <label
                    id="sub-titulo2"
                    className="text-2xl font-semibold max-w-lg break-all"
                  ></label>
                </p>
                <p>
                  <label id="data2" className="my-2"></label>
                </p>
                <img
                  hidden
                  src="./trash-fechado115312.png"
                  id="img-io"
                  onClick={() => deletar_key()}
                  className="icon hover:cursor-pointer transition-all duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
