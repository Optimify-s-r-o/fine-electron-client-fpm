import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';

import * as S from '../../styled';
import { JobDto } from '../../../../../../api/generated';
import { JobRow } from './Item';

//TODO MARA
// Strankovani tady neexistuje, vsechny operace se provadi s lokalnimi daty1
// Sort = Nazev/{Name}, Datum/{UpdatedAt} a Typ/{Application, pak Type}
// Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek
export const Jobs = () => {
  const { jobTree, loadingJobTree } = useTreeContext();

  return (
    <S.Wrapper color={'rgb(143, 113, 52)'}>
      <S.Items>
        {loadingJobTree ? 'loading' : jobTree.map((job: JobDto) => <JobRow job={job} />)}
      </S.Items>
    </S.Wrapper>
  );
};
