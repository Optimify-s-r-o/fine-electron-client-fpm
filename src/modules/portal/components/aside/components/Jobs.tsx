import { faCross, faHomeAlt } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';

import * as S from '../styled';
import { MouseEvent } from 'react';

//TODO MARA
// Strankovani tady neexistuje, vsechny operace se provadi s lokalnimi daty1
// Sort = Nazev/{Name}, Datum/{UpdatedAt} a Typ/{Application, pak Type}
// Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek
export const Jobs = () => {
  const { jobTree, selectedJobId, selectJob, loadingJobTree } = useTreeContext();

  const handleSelection = (id: string) => (_event: MouseEvent<HTMLDivElement>) => {
    selectJob(id);
  };

  return (
    <S.Wrapper color={'rgba(143, 113, 52, 0.8)'}>
      {loadingJobTree
        ? 'loading'
        : jobTree.map((item) => {
            return (
              <S.Item key={item.id} onClick={handleSelection(item.id)}>
                <S.TitleWrapper>
                  <FontAwesomeIcon icon={faHomeAlt} />
                  <S.Title>{item.name}</S.Title>
                  {/* TODO MARA poznat ktery prvek je selectnuty graficky, ted je jen ikona jen pro overeni funkcnosti  */}
                  {item.id === selectedJobId && <FontAwesomeIcon icon={faCross} />}
                </S.TitleWrapper>
              </S.Item>
            );
          })}
    </S.Wrapper>
  );
};
