import type { Menu } from "../pages/api/getMenu.json";

interface Props {
  data: Menu | undefined;
}

const MenuContainer: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-10 w-[90%] mx-auto p-10">
      {data?.categories?.map((category) => {
        const filteredItems = data.items.filter((item)=>item.item_data.category_id === category.id)
        return (
          <div
          key={category.id}
           className="border-[black] border-[1px] w-[300px] min-h-[300px] p-2 "
           >
            <h1 className="text-xl font-bold mb-2">{category.category_data.name}</h1>
            <div className="flex flex-col gap-2">
            {
              filteredItems?.map((item)=>{
                return (
                  <div
                   key={item.id}
                   className=""
                  >{item.item_data.name}</div>
                )
              })
            }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuContainer;
