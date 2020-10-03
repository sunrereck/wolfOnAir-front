import {
  useCallback, useEffect, useRef, useState
} from 'react';
import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

import { checkObject, checkDeepEqualObject } from '@/utils/commons';

type ObjectType = Record<string, unknown>

function checkParams<T>(prevParams: T, nextParams: T): boolean {
  if (prevParams === nextParams) {
    return true;
  }

  if (!(checkObject(prevParams as ObjectType) && checkObject(nextParams as ObjectType))) {
    return false;
  }

  return checkDeepEqualObject(prevParams as ObjectType, nextParams as ObjectType);
}

function useRequest<T>(
  callback: (params: T) => AxiosPromise,
  params: T,
  isSkip = false
): [
  AxiosResponse['data'] | null,
  AxiosError | null,
  boolean,
  (param: T) => Promise<void>,
  () => void
] {
  const prevParams = useRef<T | null>(null);
  const isMounted = useRef<boolean>(false);
  const [data, setData] = useState<AxiosResponse['data'] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFetch = useCallback(async (newParams: typeof params) => {
    setIsLoading(true);

    try {
      const response = await callback(newParams);

      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  const onReset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSkip) {
      return;
    }

    // 최초 실행
    if (!isMounted.current) {
      isMounted.current = true;
      prevParams.current = params;

      onFetch(params);

      return;
    }

    // params이 이전 값이랑 다를 때
    if (!checkParams(prevParams.current, params)) {
      prevParams.current = params;

      onFetch(params);
    }
  });

  return [data, error, isLoading, onFetch, onReset];
}

export default useRequest;
