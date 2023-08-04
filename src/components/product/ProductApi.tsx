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
  export interface Data{
    products:ProductData[]
    totalItems:string|null
  }
  export const fetchProductsByFilters=async(filter:any,sort:any,pagination:any)=> {
    // const filter: Filter = { category: "smartphone" };
    // TODO: on the server, we will support multi values
    let queryString = '';
    for (const key in filter) {
      const categoryVal=filter[key]
      console.log(key);
      
      console.log(categoryVal);
      
      if(categoryVal.length){
        const lastval=categoryVal[categoryVal.length-1]
        queryString += `${key}=${lastval}&`;
      }
      // queryString += `${key}=${filter[key]}&`;z
    }
    for(const key in sort){
      queryString += `${key}=${sort[key]}&`;
    }
    for(const key in pagination){
      queryString += `${key}=${pagination[key]}&`;
    }
  // console.log(queryString);
  
  
    return new Promise<{ data: Data }>(async (resolve) => {
      // TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/products?' + queryString);
      const productData = await response.json();
      const totalItems =await response.headers.get("X-Total-Count")
      resolve({ data:{products:productData,totalItems} });
    //   fetch('http://localhost:3000/products?' + queryString)
    //   .then((response) => response.json())
    //   .then((data) => resolve({ data }));
    });
  }
  