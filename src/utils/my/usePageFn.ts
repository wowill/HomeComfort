import { useRouter } from 'vue-router';

const usePageFn = () => {
  const { currentRoute } = useRouter();
  return (currentRoute.value.meta.pageFn as Record<string, any>) || {};
};

export default usePageFn;
