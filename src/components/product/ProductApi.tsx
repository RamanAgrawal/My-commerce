import axios from "axios";

export const fetchAllProducts=()=> {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await axios('http://localhost:3000/products') 
      const data = await response.data
      resolve({data})
    }
    );
  }
  
  export interface Filter {
    category: string;
    // Add more properties here if needed, e.g., brand: string;
  }
  
  export const fetchProductsByFilters=async(filter:Filter)=> {
    // const filter: Filter = { category: "smartphone" };
    // TODO: on the server, we will support multi values
    let queryString = '';
    for (let key in filter) {
      queryString += `${key}=${filter[key as keyof Filter]}&`;
    }
  
    return new Promise<{ data: any }>(async (resolve) => {
      // TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:8080/products?' + queryString);
      const data = await response.json();
      resolve({ data });
    });
  }
  