import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnecter } from '../apiConnecter';
import { catalogData } from '../api';

export const getCatalogPageData = async(categoryId) => {
  
   const toastId = toast.loading("Loading...");
   let result = [];
   try {
    const response = await apiConnecter("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});

    if(!response?.data?.success)
    throw new Error("Could not fetch Category page data");

    result = response?.data
   } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
   }
  toast.dismiss(toastId);
  return result
}


