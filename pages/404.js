import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  });

  return null;
};

export default ErrorPage;
