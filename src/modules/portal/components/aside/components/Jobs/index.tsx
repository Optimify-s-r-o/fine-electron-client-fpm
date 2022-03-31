import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';
import * as S from '../../styled';
import { JobDto } from '../../../../../../api/generated';
import { JobRow } from './Item';
import { jobContextMenuBridge } from './contextMenuBridge';
import _ from 'lodash';
import { useKeyPress } from '../../../../../../utils/keyHandler/useKeyPress';
import { useRef } from 'react';

//TODO MARA
// Strankovani tady neexistuje, vsechny operace se provadi s lokalnimi daty1
// Sort = Nazev/{Name}, Datum/{UpdatedAt} a Typ/{Application, pak Type}
// Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek
export const Jobs = () => {
  const { jobTree, selectJob, selectedJobId, loadingJobTree } = useTreeContext();
  const jobsRef = useRef(null);
  const { job } = useContextMenu(jobContextMenuBridge);

  const handleDownPressed = () => {
    if (!selectedJobId) {
      const firstJob = _.first(jobTree);
      firstJob && selectJob(firstJob.id);
      return;
    }

    const index = _.findIndex(jobTree, (e) => e.id === selectedJobId);

    const next = jobTree[index + 1];

    if (next) selectJob(next.id);
  };

  const handleUpPressed = () => {
    const index = _.findIndex(jobTree, (e) => e.id === selectedJobId);

    const previous = jobTree[index - 1];

    if (previous) selectJob(previous.id);

    return;
  };

  useKeyPress('ArrowUp', handleUpPressed, jobTree, jobsRef.current);
  useKeyPress('ArrowDown', handleDownPressed, jobTree, jobsRef.current);

  return (
    <S.Wrapper color={'rgb(143, 113, 52)'} ref={jobsRef} tabIndex={0}>
      <S.Items>
        {loadingJobTree ? 'loading' : jobTree.map((job: JobDto) => <JobRow job={job} />)}
      </S.Items>
      <ContextMenu bridge={jobContextMenuBridge}>
        <ContextMenu.Option
          onClick={() => {
            // TODO karel: do something with job
            console.log(job);
          }}>
          Jedna položka
        </ContextMenu.Option>
        <ContextMenu.Option
          onClick={() => {
            // TODO karel: do something with job
            console.log(job);
          }}>
          Druhá položka
        </ContextMenu.Option>
      </ContextMenu>
    </S.Wrapper>
  );
};
