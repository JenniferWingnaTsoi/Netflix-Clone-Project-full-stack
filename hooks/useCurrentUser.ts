import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
//如果已經fetch過,那在其他地方再用也不會fetch again
const useCurrentUser = () =>{
    const{data,error,isLoading,mutate} = useSWR('/api/current',fetcher);

    return{
        data, //包含从 /api/current 获取的当前用户信息的数据。如果数据还没有被获取，它可能为 undefined
        error,
        isLoading,//表示数据是否正在加载。如果数据正在加载，它为 true，否则为 false。
        mutate//可以用来手动触发数据的重新获取和刷新。这在某些情况下很有用，例如在用户执行某些操作后，需要更新用户数据
    }
}
export default useCurrentUser;