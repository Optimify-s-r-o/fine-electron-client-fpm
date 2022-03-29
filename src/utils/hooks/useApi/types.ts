import { UserDto } from '../../../api/generated';
import { AxiosResponse } from 'axios';

export interface BaseMutationOptions<TData = any> {
  notifyOnNetworkStatusChange?: boolean;
  onCompleted?: (data: TData) => void;
  onError?: (error: any) => void;
  ignoreResults?: boolean;
}

export interface MutationFunctionOptions<TData = any> extends BaseMutationOptions<TData> {
  mutation?: any;
}

export interface FetchResult<
  TData = { [key: string]: any },
  C = Record<string, any>,
  E = Record<string, any>
> {
  data?: TData | null;
  extensions?: E;
  context?: C;
}

export interface MutationResult<TData = any> {
  data?: TData | null;
  error?: any;
  loading: boolean;
  called?: boolean;
}

export type MutationTuple<TInputData, TResponseData> = [
  (mutate: () => any) => Promise<TResponseData>,
  MutationResult<TResponseData>
];
