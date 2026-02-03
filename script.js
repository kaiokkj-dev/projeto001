// ✅ Selecionar elementos
const input = document.getElementById('taskInput');
const botao = document.querySelector('.bi-plus-circle-fill');
const lista = document.querySelector('.task-list');
const contador = document.getElementById('contador');


// ✅ Salvar no localStorage
function salvarTarefas() {
  const tarefas = [];

  document.querySelectorAll('.task-list li').forEach((li) => {
    const texto = li.querySelector('span').textContent;
    const feita = li.classList.contains('done');
    tarefas.push({ texto, feita });
  });

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
// atualizar os numeros
function atualizarContador() {
  const total = document.querySelectorAll('.task-list li').length;
  const feitas = document.querySelectorAll('.task-list li.done').length;
  const pendentes = total - feitas;

  contador.textContent = `Total: ${total} | Feitas: ${feitas} | Pendentes: ${pendentes}`;
}


// ✅ Criar tarefa na tela (reutilizável)
function criarTarefaNaTela(textoDaTarefa, feita = false) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (feita) li.classList.add('done');

  const texto = document.createElement('span');
  texto.textContent = textoDaTarefa;
  li.appendChild(texto);

  // concluir ✓
  const btnConcluir = document.createElement('button');
  btnConcluir.classList.add('done-btn');
  btnConcluir.innerHTML = '<i class="bi bi-check-lg"></i>';
  li.appendChild(btnConcluir);

  // editar ✏️
  const btnEditar = document.createElement('button');
  btnEditar.classList.add('edit-btn');
  btnEditar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
  li.appendChild(btnEditar);

  // remover ✖
  const btnRemover = document.createElement('button');
  btnRemover.classList.add('remove');
  btnRemover.innerHTML = '<i class="bi bi-x-lg"></i>';
  li.appendChild(btnRemover);

  lista.appendChild(li);
}

// ✅ Carregar do localStorage ao abrir
function carregarTarefas() {
  const dados = localStorage.getItem('tarefas');
  if (!dados) return;

  const tarefas = JSON.parse(dados);
  tarefas.forEach((t) => criarTarefaNaTela(t.texto, t.feita));
}

// ✅ Adicionar tarefa (botão + ou Enter)
function adicionarTarefa() {
  const tarefa = input.value.trim();
  if (tarefa === '') return;

      if (tarefa.length > 50) {
  alert('Máximo 50 caracteres');
  return;
}

  criarTarefaNaTela(tarefa);
  salvarTarefas();
  atualizarContador();

  input.value = '';
  input.focus();
}

// ✅ Botão +
botao.addEventListener('click', adicionarTarefa);

// ✅ Enter no input
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') adicionarTarefa();
});

// ✅ Concluir / Editar / Remover (um listener só)
lista.addEventListener('click', function (e) {
  const botaoClicado = e.target.closest('button');
  if (!botaoClicado) return;

  const li = botaoClicado.closest('li');

  // editar
  if (botaoClicado.classList.contains('edit-btn')) {
    const span = li.querySelector('span');
    const novoTexto = prompt('Editar tarefa:', span.textContent);
    if (novoTexto === null) return;

    const textoFinal = novoTexto.trim();
    if (textoFinal === '') return;

    span.textContent = textoFinal;
    salvarTarefas();
    atualizarContador();
    return;
  }

  // remover
  if (botaoClicado.classList.contains('remove')) {
    li.remove();
    salvarTarefas();
    atualizarContador();
    return;
  }

  // concluir
  if (botaoClicado.classList.contains('done-btn')) {
    li.classList.toggle('done');
    salvarTarefas();
    atualizarContador();
  }
});
// ✅ Executa ao abrir a página
carregarTarefas();
atualizarContador();

