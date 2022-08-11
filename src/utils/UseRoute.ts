import { RouteLocationRaw, useRouter } from 'vue-router';

export const useNav = () => {
  const router = useRouter();
  return (toPath: RouteLocationRaw) => {
    try {
      router.push(toPath).catch((e) => {
        console.log(e);
      });
    } catch (e: any) {
      console.log(e.message, e.params);
      router.push('/no-permission?status=403');
    }
  };
};
