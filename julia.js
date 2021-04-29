const fs = require('fs')

class Producto {

  constructor(clave, desc, precio, cls, ext, min, max){
    this.clave = clave;
    this.desc = desc;
    this.precio = precio;
    this.cls = cls;
    this.ext = ext;
    this.min = min;
    this.max = max;
  }

}

var datos = "";

try {
  const data = fs.readFileSync('./bd.txt', 'utf8')
  datos = data
} catch (err) {
  console.error(err);
}

let productos = [];
let inventario = [];

let i =0;
let linea = "";
while(i < datos.length){
  if(datos[i] != "\n"){
    linea+=datos[i]
  }
  else{
    linea+=" ";
    productos.push(linea);
    linea = "";
  }
  i++;
}

let index = 0;
let dat = "";
for(let j=0; j<80; j++){
  dat = "";

  let clave = j;

  let desc = "Loremipsum";

  index = productos[j].indexOf("precio:") + 7;
  while(productos[j][index] != " "){
    dat+=productos[j][index];
    index++;
  }
  let precio = parseFloat(dat);

  dat = "";
  index = productos[j].indexOf("cls:") + 4;
  while(productos[j][index] != " "){
    dat+=productos[j][index];
    index++;
  }
  let cls = dat;

  dat = "";
  index = productos[j].indexOf("ext:") + 4;
  while(productos[j][index] != " "){
    dat+=productos[j][index];
    index++;
  }
  let ext = parseInt(dat);

  dat = "";
  index = productos[j].indexOf("min:") + 4;
  while(productos[j][index] != " "){
    dat+=productos[j][index];
    index++;
  }
  let min = parseInt(dat);

  dat = "";
  index = productos[j].indexOf("max:") + 4;
  while(productos[j][index] != " "){
    dat+=productos[j][index];
    index++;
  }
  let max = parseInt(dat);

  inventario.push(new Producto(clave, desc, precio, cls, ext, min, max));
}

// console.log(inventario);

//CONSULTAS AHORA

console.log("\n######## CONSULTAS ########");

// 1) Número de productos con existencia mayor a 20.
let count = 0;
for(let i=0; i<80; i++){
  if(inventario[i]["ext"] > 20){
    count++;
  }
}
console.log(`\nExisten ${count} productos con existencia mayor a 20.`);

// 2) Número de productos con existencia menos a 15.
count = 0;
for(let i=0; i<80; i++){
  if(inventario[i]["ext"] < 15){
    count++;
  }
}
console.log(`\nExisten ${count} productos con existencia menor a 15.`);

// 3) Lista de productos con la misma clasificación y precio mayor 15.50
let clasificaciones = {
  "comida":null,
  "dulces":null,
  "bebida":null,
  "limpieza":null
};
let comida = [];
let dulces = [];
let bebida = [];
let limpieza = [];
for(let i=0; i<80; i++){
  if(inventario[i]["cls"] == "comida" && inventario[i]["precio"] > 15.5){
    comida.push(inventario[i]["clave"]);
  }
  else if(inventario[i]["cls"] == "dulces" && inventario[i]["precio"] > 15.5){
    dulces.push(inventario[i]["clave"]);
  }
  else if(inventario[i]["cls"] == "bebida" && inventario[i]["precio"] > 15.5){
    bebida.push(inventario[i]["clave"]);
  }
  else if(inventario[i]["cls"] == "limpieza" && inventario[i]["precio"] > 15.5){
    limpieza.push(inventario[i]["clave"]);
  }
}

clasificaciones["comida"] = comida;
clasificaciones["dulces"] = dulces;
clasificaciones["bebida"] = bebida;
clasificaciones["limpieza"] = limpieza;

console.log(`\n##### Lista de productos mayores a $15.5 agrupados #####`);
console.log("COMIDA:");
console.log(clasificaciones["comida"]);
console.log("DULCES:");
console.log(clasificaciones["dulces"]);
console.log("BEBIDAS:");
console.log(clasificaciones["bebida"]);
console.log("LIMPIEZA:");
console.log(clasificaciones["limpieza"]);


// 4) Lista de productos con precio mayor a 20.30 y menor a 45.00

let lista = [];
for(let i=0; i<80; i++){
  lista.push(inventario[i]["clave"]);
}
lista = lista.filter(value => value > 20.30 && value < 45);

console.log(`\n##### Lista de productos mayores a $20.3 y menores a $45 #####`);
console.log(lista);

// 5) Número de productos agrupados por su clasificación

let materiales = [];
for(let i=0; i<80; i++)
  materiales.push(inventario[i]["cls"]);

let comidaContador = materiales.filter(value => value == "comida").length;
let dulcesContador = materiales.filter(value => value == "dulces").length;
let bebidaContador = materiales.filter(value => value == "bebida").length;
let limpiezaContador = materiales.filter(value => value == "limpieza").length;

console.log(`\n##### Lista de productos por categoria #####`);
console.log(`COMIDA: ${comidaContador}`);
console.log(`DULCES: ${dulcesContador}`);
console.log(`BEBIDAS: ${bebidaContador}`);
console.log(`LIMPIEZA: ${limpiezaContador}`);
