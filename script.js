// Checa e adiciona itens à lista de tarefas
function checkEachTask() {
  const newElement = document.createElement('li');
  const inputValue = document.getElementById('texto-tarefa');
  if (inputValue.value === '') {
    alert('Você precisa escrever algo para adicionar à lista!');
  } else {
    document.getElementById('lista-tarefas').appendChild(newElement);
    newElement.classList.add('list-item');
    newElement.innerText = inputValue.value;
    inputValue.value = '';
  }
}

const btnAddTask = document.getElementById('criar-tarefa');
btnAddTask.addEventListener('click', checkEachTask);

// Adiciona riscado nos itens marcados como concluídos
// Atualiza função para método toggle
const myListOfTasks = document.getElementById('lista-tarefas');
myListOfTasks.addEventListener('dblclick', (e) => e.target.classList.toggle('completed'));

// Limpar o local storage 
function clearLocalStorage() {
  localStorage.clear();
}

// Apaga todos os itens da lista
function eraseAll() {
  while (myListOfTasks.childElementCount > 0) {
    myListOfTasks.firstElementChild.remove();
  }
  clearLocalStorage();
}

const eraseMyList = document.getElementById('apaga-tudo');
eraseMyList.addEventListener('click', eraseAll);

// Remove somente as tarefas marcadas como concluídas
/* Solução da função removeTaskDone foi compartilhada pelo colega Luciano Amâncio no Slack.
Segue link para a thread:
https://trybecourse.slack.com/archives/C01L16B9XC7/p1615426426071100 */

function removeTaskDone() {
  const removeItem = document.querySelector('#remover-finalizados');
  removeItem.addEventListener('click', () => {
    const taskCompleted = document.querySelectorAll('.completed');
    for (let index = 0; index < taskCompleted.length; index += 1) {
      if (taskCompleted[index].className.includes('completed')) {
        myListOfTasks.removeChild(taskCompleted[index]);
      }
    } 
  });
}
removeTaskDone();

// Remover Item Selecionado 

function removeTaskSelected() {
  const removeItemSelected = document.querySelector('#remover-selecionado');
  removeItemSelected.addEventListener('click', () => {
    const taskSelected = document.querySelector('.selected');
      if (taskSelected.className.includes('selected')) {
        myListOfTasks.removeChild(taskSelected);
      } 
  });
}
removeTaskSelected();

// Teste 2 de função de mudança de cor de fundo de item selecionado
function changeBgColorSelectedItem(e) {
  const bgColor = 'rgb(128, 128, 128)';
  if (e.target.style.backgroundColor !== bgColor && e.target.className !== 'selected') {
    e.target.style.backgroundColor = bgColor;
    e.target.classList.add('selected');
  } else {
    e.target.style.backgroundColor = 'paleturquoise';
    e.target.classList.remove('selected');
  }
}
myListOfTasks.addEventListener('click', changeBgColorSelectedItem);

// Função mover para baixo - com base na solução do colega Daniel Ribeiro

const btnMoveDown = document.getElementById('mover-baixo');
btnMoveDown.addEventListener('click', () => {
  const liSelected = document.querySelector('.selected');
  if (liSelected !== null) {
    const nextTask = liSelected.nextElementSibling;
    if (myListOfTasks.lastChild !== liSelected) {
      nextTask.parentNode.insertBefore(nextTask, liSelected);
    }
  }
}); 

// Função mover para cima - com base na solução do colega Daniel Ribeiro

const btnMoveUp = document.getElementById('mover-cima');
btnMoveUp.addEventListener('click', () => {
  const taskSelected = document.querySelector('.selected');
  if (!taskSelected) {
    return;
  }
  if (myListOfTasks.firstChild.nextElementSibling !== taskSelected) {
    const afterTask = taskSelected.previousElementSibling;
    afterTask.parentNode.insertBefore(taskSelected, afterTask);
  }
});

// Salva as tarefas no Local Storage
/* Para a função saveMyTasks, utilizei como base a solução de  Lucas Yoshida (Trybe, turma 4):
segue link do repositório: https://github.com/tryber/sd-04-block5-project-todo-list/pull/58
 */

function saveMyTasks() {
  localStorage.myListOfTasks = myListOfTasks.innerHTML;
}
const btnSaveMyTasks = document.getElementById('salvar-tarefas');

if (typeof Storage !== 'undefined' && localStorage.myListOfTasks) {
  myListOfTasks.innerHTML = localStorage.myListOfTasks;
}

window.onload = function initialize() {
  btnSaveMyTasks.addEventListener('click', saveMyTasks);
};

/* Referências consultadas para o projeto To do list:

--> https://www.w3schools.com/howto/howto_js_todolist.asp (usei como base para a função checkEachTask)
--> DUCKETT, Jon. JavaScript & JQuery: desenvolvimento de interfaces web interativas. Rio de Janeiro: AltaBooks, 2015. (Base para entender integração de JS com HTML e CSS)
--> FLANAGAN, David. JavaScript: the defintive guide. 7 ed. Sebastopol: O'Reilly, 2020. (Base para entender eventos, DOM)
--> Para a função clearLocalStorage, utilizei a solução do colega Wanderson Sales. Segue link:
https://github.com/tryber/sd-010-a-project-todo-list/pull/47/files
--> Sobre uso de symbols no html: 
https://www.toptal.com/designers/htmlarrows/math/plus-sign/
https://www.w3schools.com/html/html_symbols.asp
--> Sobre uso do toggle:
https://www.w3schools.com/howto/howto_js_toggle_class.asp
-->Sobre insertBefore:
https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
--> Para as funções mover para cima e mover para baixo, utilizei como base as soluções do colega: 
https://github.com/tryber/sd-010-a-project-todo-list/pull/65
---> Agradecimento especial aos colegas Murilo Gonçalves e Lucas Pedroso, pelas sugestões e pela ajuda!! =))
Os dois me ajudaram a encontrar o erro neste código (que fazia com que uma string 'undefined' retornasse
na lista de tarefas vazia). Os colegas me ajudaram a corrigir erros nas funções checkEachTask e saveMyTasks.
*/
