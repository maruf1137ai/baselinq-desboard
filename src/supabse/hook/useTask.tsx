import { useQuery } from '@tanstack/react-query';
import { GetTask } from '../api';

const useTask = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['task'],
    queryFn: GetTask,
  });

  return { data, isLoading, error, refetch };
};

export default useTask;
