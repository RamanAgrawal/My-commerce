// import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductData } from "./ProductSlice";

export const fetchAllProducts=()=> {
    return new Promise( (resolve) =>{
      //TODO: we will not hard-code server URL here
      // const response = await axios('http://localhost:3000/products') 
      // const data = await response.data
      // resolve({data})
      fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => resolve({ data }));
    }
    );
  }
    
  export const fetchProductsByFilters=async(filter:any)=> {
    // const filter: Filter = { category: "smartphone" };
    // TODO: on the server, we will support multi values
    let queryString = '';
    for (const key in filter) {
      queryString += `${key}=${filter[key]}&`;
    }
  console.log(queryString);
  
    return new Promise<{ data: ProductData[] }>( (resolve) => {
      // TODO: we will not hard-code server URL here
      // const response = await fetch('http://localhost:3000/products?' + queryString);
      // const data = await response.json();
      // resolve({ data });
      fetch('http://localhost:3000/products?' + queryString)
      .then((response) => response.json())
      .then((data) => resolve({ data }));
    });
  }
  