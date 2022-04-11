import { useRef, useState } from 'react';

export enum ProgressStatus {
  Waiting,
  Running,
  Success,
  Fail
}

export type ProgressRunFunction = (
  addItem: (
    name: string,
    initialStatus?: ProgressStatus.Waiting | ProgressStatus.Running,
    statusText?: string
  ) => number,
  setItemStatus: (
    index: number,
    status: ProgressStatus.Running | ProgressStatus.Success | ProgressStatus.Fail,
    statusText?: string
  ) => void,
  finish: () => void
) => void;

export interface ProgressItem {
  name: string;
  status: ProgressStatus;
  statusText: string;
  started: Date | null;
  ended: Date | null;
}

const useProgress = () => {
  const items = useRef<ProgressItem[]>([]);
  const [finished, setFinishedState] = useState(false);

  const addItem = (
    name: string,
    initialStatus: ProgressStatus.Waiting | ProgressStatus.Running = ProgressStatus.Running,
    statusText: string = ''
  ) => {
    const index =
      items.current.push({
        name,
        status: initialStatus,
        statusText: '',
        started: initialStatus === ProgressStatus.Running ? new Date() : null,
        ended: null
      }) - 1;
    return index;
  };

  const setItemStatus = (
    index: number,
    status: ProgressStatus.Running | ProgressStatus.Success | ProgressStatus.Fail,
    statusText: string = ''
  ) => {
    items.current[index].status = status;
    items.current[index].statusText = statusText;
    if (status === ProgressStatus.Running) items.current[index].started = new Date();
    else {
      if (items.current[index].started === null) items.current[index].started = new Date();
      items.current[index].ended = new Date();
    }
  };

  const finish = () => {
    setFinishedState(true);
  };

  const reset = () => {
    items.current = [];
    setFinishedState(false);
  };

  return {
    addItem,
    setItemStatus,
    reset,
    finish,
    items: items.current,
    finished
  };
};

export default useProgress;
