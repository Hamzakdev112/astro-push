import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getMenu } from '../api/menu';
import MenuContainer from './MenuContainer';

const Menu = () => {

  const client  = useQueryClient() 
  const { data, isLoading, isError, error, status} = useQuery({
    queryKey:['menus'],
    queryFn: getMenu
    // retry:false,
  });
  console.log(error)
  console.log(data);
  console.log(status)
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-10'>MENU</h1>
      {status === 'loading' ? (
        <p>Loading ...</p>
      ) : status === 'error' ? (
        <pre>{ typeof error === 'object'  ? JSON.stringify(error) : "ERROR OCCURED" }</pre>
      ) : (
        <>
        <MenuContainer data={data} />
        </>
      )}
    </div>
  );
};

export default Menu;
