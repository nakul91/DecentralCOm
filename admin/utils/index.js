import { truncate } from "lodash";

const truncateText = (str) => truncate(str);
const getImage = (image) => {
  if (!image) {
    return;
  }
  return new URL(`../public/images/${image}`, import.meta.url).href;
};
export { truncateText, getImage };

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return null;
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return null;
  }
};

export const copyToClipBoard = (val) => {
  navigator.clipboard.writeText(`${val}`);
};

export const trimAddress = (val) => {
  const firstFour = val.substring(0, 4);
  const lastFour = val.substring(val.length - 4, val.length);
  return firstFour + "..." + lastFour;
};
