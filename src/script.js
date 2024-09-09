const formulario = document.getElementById("form-task");
const input = document.getElementById("task");
const resultado = document.getElementById("resultado");
const inputPesquisa = document.getElementById("pesquisa");
let nenhumaTask = document.getElementById("nenhumaTask");
let tasks = [];

function boasVindas() {
  let saudacao = document.getElementById("saudacao");
  const nome = prompt("Olá, seja bem-vindo, por favor digite o seu nome:");

  if (nome == "") {
    saudacao.innerHTML = `Seja bem-vindo! 🤓`;
  } else {
    saudacao.innerText = `Seja bem-vindo, ${nome}! 🤓`;
  }
}

function date() {
  let data = document.getElementById("data");
  const date = new Date();
  
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  data.innerHTML = `Hoje é ${formattedDate}`;
}


boasVindas();
date();

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    alert("Preencha o campo de tarefa");
    return;
  }

  cadastrarTasks();
  mostrarResultado();

  formulario.reset();
});

function gerarIdUnico() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function cadastrarTasks() {
  const id = gerarIdUnico();
  const newTask = {
    id: id,
    text: input.value,
    completed: false,
  };
  tasks.push(newTask);
}

function removerTarefa(id) {
  tasks = tasks.filter((task) => task.id != id);

  mostrarResultado();
}

function editarTarefa(id) {
  // Localiza a tarefa pelo ID
  const task = tasks.find((task) => task.id === id);

  // Substitui o texto atual pelo input para edição
  resultado.innerHTML = tasks
    .map((task) => {
      if (task.id === id) {
        // Exibe o input para edição da tarefa selecionada
        return `
              <li class="w-full bg-gray-50 h-[50px] rounded-lg flex justify-between items-center px-4 border-solid border-[1px] border-gray-700">
                <input type="text" id="edit-task-${task.id}" value="${task.text}" class="h-[50px] py-4 bg-transparent focus:outline-none placeholder:text-black w-full"/>
                <div class="flex gap-2">
                <button onclick="cancelarEdicao()" class="bg-red-500 p-1 h-[33.98px] w-[31.98px] rounded-lg">
                    <img src="../assets/cancel.svg" alt="Cancelar" class="h-full w-full select-none">
                </button>
                <button onclick="salvarTarefa('${task.id}')" class="bg-green-500 p-1 rounded-lg h-[31.98px] w-[33.98px]">
                    <img src="../assets/save.svg" alt="Salvar" class="h-full w-full select-none">
                </button>
                </div>
              </li>`;
      } else {
        // Exibe as outras tarefas normalmente
        return `
              <li class="w-full bg-gray-50 h-[50px] rounded-lg flex justify-between items-center px-4 border-solid border-[1px] border-gray-300">
                ${task.text}
                <div class="flex gap-2">
                <button onclick="removerTarefa('${task.id}')" class="bg-red-500 p-2 rounded-lg">
                  <img src="../assets/trash.svg" alt="Remover" class="select-none">
                </button>
                  <button onclick="editarTarefa('${task.id}')" class="bg-green-500 p-2 rounded-lg">
                    <img src="../assets/edit.svg" alt="Editar" class="select-none">
                  </button>
                </div>
              </li>`;
      }
    })
    .join(""); // Garante que não haverá vírgulas entre os elementos
}

function salvarTarefa(id) {
  // Pega o novo valor do input
  const newText = document.getElementById(`edit-task-${id}`).value;

  // Atualiza a tarefa no array
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        text: newText,
      };
    }
    return task;
  });

  // Reexibe a lista de tarefas atualizada
  mostrarResultado();
}

function cancelarEdicao() {
  // Simplesmente reexibe a lista sem fazer alterações
  mostrarResultado();
}

function mostrarResultado() {
  resultado.innerHTML = "";
  nenhumaTask.style.display = "none";
  tasks.forEach((task) => {
    resultado.innerHTML += `
    <li class="w-full bg-gray-50 h-[50px] rounded-lg flex justify-between items-center px-4 border-solid border-[1px] border-gray-300">
        <p>${task.text}</p>
        <div class="flex gap-2">
        <button onclick="removerTarefa('${task.id}')" class="bg-red-500 p-2 rounded-lg">
          <img src="../assets/trash.svg" alt="Remover" class="select-none">
        </button>
          <button onclick="editarTarefa('${task.id}')" class="bg-green-500 p-2 rounded-lg">
            <img src="../assets/edit.svg" alt="Editar" class="select-none">
          </button>
        </div>
      </li`;
  });
}




inputPesquisa.addEventListener("keyup", function() {
  filtrarTasks(); // Chama a função para filtrar as tasks
});


function filtrarTasks() {
  
  const valorPesquisa = inputPesquisa.value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(valorPesquisa) 
  );
  
  resultado.innerHTML = "";
  
  if (filteredTasks.length > 0) {
    filteredTasks.forEach((task) => {
      resultado.innerHTML += `
      <li class="w-full bg-gray-50 h-[50px] rounded-lg flex justify-between items-center px-4 border-solid border-[1px] border-gray-300">
          <p>${task.text}</p>
          <div class="flex gap-2">
          <button onclick="removerTarefa('${task.id}')" class="bg-red-500 p-2 rounded-lg">
            <img src="../assets/trash.svg" alt="Remover" class="">
          </button>
            <button onclick="editarTarefa('${task.id}')" class="bg-green-500 p-2 rounded-lg">
              <img src="../assets/edit.svg" alt="Editar" class="">
            </button>
          </div>
        </li>`;
    });
  } else {
    resultado.innerHTML = "<li>Nenhuma tarefa encontrada</li>";
  }
}
