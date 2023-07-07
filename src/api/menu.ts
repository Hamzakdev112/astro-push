import type { Menu } from "../pages/api/getMenu.json";

 export const getMenu = async () => {
    try {
      const response = await fetch('/api/getMenu.json');
      const jsonData = await response.json();
      console.log(jsonData)
      return jsonData as Menu
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };