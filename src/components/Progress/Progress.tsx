import { faCircleNotch } from '@fortawesome/pro-light-svg-icons';
import { faCircleCheck, faCirclePause, faCircleXmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useProgress, { ProgressRunFunction, ProgressStatus } from 'utils/hooks/useProgress';

const Progress = ({ run }: { run: ProgressRunFunction }) => {
  const progress = useProgress();
  const interval = useRef<NodeJS.Timer>();
  const [start] = useState(new Date());
  const [time, setTime] = useState(start);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime(new Date());
    }, 100);
    run(progress.addItem, progress.setItemStatus, progress.finish);

    return () => {
      interval.current && clearInterval(interval.current);
      progress.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress.finished) interval.current && clearInterval(interval.current);
  }, [progress.finished]);

  const getDateDiff = (higher: Date, lower: Date) =>
    (Math.round((higher.getTime() - lower.getTime()) / 100) / 10).toFixed(1);

  return (
    <Wrapper>
      <Scroll>
        <Items>
          {progress.items.map((item, key) => (
            <Item key={key}>
              <Status status={item.status}>
                {item.status === ProgressStatus.Running ? (
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : item.status === ProgressStatus.Success ? (
                  <FontAwesomeIcon icon={faCircleCheck} />
                ) : item.status === ProgressStatus.Fail ? (
                  <FontAwesomeIcon icon={faCircleXmark} />
                ) : (
                  <FontAwesomeIcon icon={faCirclePause} />
                )}
                {item.statusText.length > 0 && <span>{item.statusText}</span>}
              </Status>
              <Name>{item.name}</Name>
              <ItemTime>
                {item.started
                  ? (item.ended
                      ? getDateDiff(item.ended, item.started)
                      : getDateDiff(time, item.started)) + 's'
                  : ''}
              </ItemTime>
            </Item>
          ))}
        </Items>
      </Scroll>
      <Time>{getDateDiff(time, start)}s</Time>
    </Wrapper>
  );
};

export default Progress;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 320px;
`;

const Scroll = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  //justify-content: flex-end;

  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 16px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #fff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.common.darkGray};
    border: 5px solid #fff;
    border-radius: 99px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #727272;
  }
`;

const Items = styled.div``;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 8px 16px 8px 32px;
`;

const Status = styled.div<{ status: ProgressStatus }>`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 19px;
    height: 19px;

    padding-top: 2px;
  }

  span {
    padding-top: 3px;

    font-size: 13px;
  }

  svg,
  span {
    color: ${(props) =>
      props.status === ProgressStatus.Waiting
        ? props.theme.common.darkGray
        : props.status === ProgressStatus.Running
        ? props.theme.common.darkGray
        : props.status === ProgressStatus.Success
        ? props.theme.colors.primary.default
        : props.theme.colors.danger.default};
  }
`;

const Name = styled.div`
  flex-grow: 1;
`;

const ItemTime = styled.div`
  color: #727272;
  text-align: right;
`;

const Time = styled.div`
  padding: 8px 32px;

  border-top: 1px solid ${(props) => props.theme.common.lightGray};
  color: #727272;
  text-align: right;
`;
