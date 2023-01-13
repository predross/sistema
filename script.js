const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sfabricante = document.querySelector('#m-fabricante')
const spreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')
const sidproduto = document.querySelector('#m-idproduto') 

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sfabricante.value = itens[index].fabricante
    sidproduto.value = itens[index].idproduto
    spreco.value = itens[index].preco
    id = index
            }
   else     {
    sNome.value = ''
    sfabricante.value = ''
    sidproduto.value = ''
    spreco.value = ''
            }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr') 

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.fabricante}</td>
    <td>${item.idproduto}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sfabricante.value == '' || sidproduto.vlaue =='' || spreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].fabricante = sfabricante.value
    itens[id].idproduto = sidproduto.value
    itens[id].preco = spreco.value
  } else {
    itens.push({'nome': sNome.value, 'fabricante': sfabricante.value,'idproduto': sidproduto.value, 'preco': spreco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
