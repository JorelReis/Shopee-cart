//Assinaturas dos métodos.
//Quais ações meu carrinho pode fazer. (Casos de uso)


// --Add Item
async function addItem(userCart, item) {
    userCart.push(item)
}

// --Calcular o total.
async function calculateTotal(userCart) {
    console.log("\nShopee cart TOTAL IS: ");

    const result = userCart.reduce((total, item)=> total + item.subtotal (), 0);
    console.log (`Total ${result}`);
} 

// --Deletar item do carrinho
async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item)=> item.name === name);

    if (index !== -1){
        userCart.splice(index, 1);
    }
}

// --Remove Item - diminui um item
async function removeItem(userCart, item) {
    //Encotnrando o indice do item
  const indexFound = userCart.findIndex((p)=> p.name === item.name);

  // Caso não encontre o item:
  if (indexFound == -1){
    console.log("Item não encontrado");
    return;
  }
 
  //Item maior do que 1, subtrair um item
  if(userCart[indexFound].quantity > 1){
    userCart[indexFound].quantity -= 1;
    return;
  }


  //Caso item = 1 deletar o item
  if(userCart[indexFound].quantity == 1){
    userCart.splice(indexFound, 1);
  }

    }

// Mostrar o que tem detro do carrinho, display cart

 async function displayCart(userCart) {
    console.log("\nShopee cart list:")
    userCart.forEach((item, index)=>{
        console.log(`${index + 1}. ${item.name} - R$ ${item.price} | ${item.quantity}x | Subtotal ${item.subtotal()}`);
    })
 }




export{
    addItem,
    calculateTotal,
    deleteItem,
    removeItem,
    displayCart,
}