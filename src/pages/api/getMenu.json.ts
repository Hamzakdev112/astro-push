import type { APIRoute } from "astro";

const TOKEN = import.meta.env.SQUARE_TOKEN;
const BASE_URL = 'https://connect.squareup.com'

export interface Menu {
  items:ItemObject[];
  categories: CategoryObject[];
}


export interface ItemObject {
  objects: object;
  created_at: string;
  custom_attribute_values: object;
  id:string;
  is_deleted:boolean;
  item_data: object;
  present_at_all_locations:boolean;
  type:string;
  updated_at:string;
  version: number;
}

interface CategoryObject {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  category_data: {
    name: string;
    is_top_level: boolean;
  };
}

export const get: APIRoute = async function get() {
  try {
    const categories = await fetchCategories()
    const categoryIds = categories?.map(({ id }) => id);
    
    const items = await fetchItems(categoryIds)
    return new Response(JSON.stringify({ items, categories }), {
      status: 200,
    });
  } catch (err) {
    return new Response(null, {
      status: 500,
      statusText:
        typeof err === "object" ? JSON.stringify(err) : "Internal Server Error",
    });
  }
};

async function fetchCategories() {
  const data = await fetch(
    `${BASE_URL}/v2/catalog/list?types=CATEGORY`,
    {
      headers: {
        "Square-Version": "2023-06-08",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  ).then((response) => response.json());
  return data.objects as CategoryObject[];
}

async function fetchItems(category_ids:string[]) {
  const data = await fetch(
    `${BASE_URL}/v2/catalog/search-catalog-items`,
    {
      method:'POST',
      headers: {
        "Square-Version": "2023-06-08",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify({category_ids})
    }
  ).then((response) => response.json());
  return data.items as ItemObject[]
}
