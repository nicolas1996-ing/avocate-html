const URL_BASE = "https://platzi-avo.vercel.app";

// internazionalización: formato a fechas y monedas
const formatPrice = (price) => {
  /*
    return new window.Intl.NumberFormat("es", {
    style: "currency",
    currency: "COP",
  }).format(price);
    
    */
   return new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const renderData = (data) => {
  const container = document.querySelector("#container");
  data.forEach((item) => {
    // creacion de elementos
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const desription = document.createElement("p");
    const containerItem = document.createElement("div");
    const containerTitlePrice = document.createElement("div");

    // asignacion de valores
    img.src = `${URL_BASE}${item.image}`;
    title.textContent = item.name;
    price.textContent = formatPrice(item.price);
    desription.textContent = item.attributes.description;

    // contenedor hijo. append agrega elementos al final
    containerTitlePrice.append(title, desription, price);
    containerItem.append(img, containerTitlePrice);
    containerItem.className =
      "flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-4 p-2";
    img.className =
      "object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg";
    title.className =
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center";
    price.className = "text-gray-700 dark:text-gray-300 text-center";
    desription.className = "m-4 text-gray-600 text-justify";
    /*
    containerItem.className = "flex flex-col items-center"; // tailwindcss
    containerItem.style.cssText = "text-align: center; margin: 1rem;";
    containerItem.style.color = "green";
    */
    // containerItem.style = "font-size: 1.2rem;";

    // contenedor padre
    container.append(containerItem);
  });
};

const getData = async () => {
  try {
    // fetch: web api para hacer peticiones http
    const response = await fetch(`${URL_BASE}/api/avo`);
    const { data } = await response.json(); // transforma la respuesta en json
    console.log(data);
    renderData(data);
  } catch (error) {
    console.log(error);
  }
};

getData();
