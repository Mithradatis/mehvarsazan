"use client";

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Loading from '@/components/Globals/Loading'

const NavigationLoading = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    handleStop();
  }, [pathname, searchParams]);

  return isLoading ? <Loading /> : null;
}

export default NavigationLoading;