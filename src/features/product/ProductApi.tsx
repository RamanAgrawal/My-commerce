
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDataI } from "../../models/Models";


export const fetchSingleProduct = (id:string) => {
  return new Promise((resolve) => {
    //TODO: we will not hard-code server URL here
    fetch('/api/products/'+id)
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  }
  );
}

export const createProduct = (product:unknown) => {
  return new Promise((resolve) => {
    //TODO: we will not hard-code server URL here
    fetch('/api/products/',{
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  }
  );
}

export const updateProduct = (update: ProductDataI) => {

  return new Promise(async (resolve) => {
      const response = await fetch('/api/products/' +update.id, {
          method: "PATCH",
          body: JSON.stringify(update),
          headers: { "content-type": "application/json" }
      })
      console.log(update.id);
      
      const data = await response.json()
      console.log(data);

      resolve({ data })
  })
}

export const fetchCategories = () => {
  return new Promise((resolve) => {
    //TODO: we will not hard-code server URL here
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  }
  );
}
export const fetchBrands = () => {
  return new Promise((resolve) => {
    //TODO: we will not hard-code server URL here
    fetch('/api/brands')
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  }
  );
}
export interface Data {
  products: ProductDataI[]
  totalItems: string | null
}
export const fetchProductsByFilters = async (filter: any, sort: any, pagination: any ,admin:boolean) => {
  // const filter: Filter = { category: "smartphone" };
  // TODO: on the server, we will support multi values
  let queryString = '';
  for (const key in filter) {
    const categoryVal = filter[key]
    if (categoryVal.length) {
      const lastval = categoryVal[categoryVal.length - 1]
      queryString += `${key}=${lastval}&`;
    }
    // queryString += `${key}=${filter[key]}&`;z
  }
  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if(admin){
queryString+=`admin=${admin}&`
  }
  // console.log(queryString);


  return new Promise<{ data: Data }>(async (resolve) => {
    // TODO: we will not hard-code server URL here
    const response = await fetch('/api/products?' + queryString);
    console.log(response);
    
    const productData = await response.json();
    const totalItems = await response.headers.get("X-Total-Count")
    resolve({ data: { products: productData, totalItems } });
    //   fetch('/api/products?' + queryString)
    //   .then((response) => response.json())
    //   .then((data) => resolve({ data }));
  });
}
