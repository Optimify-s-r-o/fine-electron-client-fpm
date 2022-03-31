import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';

import * as S from '../../styled';
import { ProjectRow } from './Item';
import { ProjectDto } from '../../../../../../api/generated';
import Pagination from '../Pagination';
import { useState } from 'react';

export const Projects = () => {
  const { projectTree, loadingProjectTree } = useTreeContext();
  const [page, setPage] = useState(1);

  return (
    <S.Wrapper color={'rgb(255, 202, 108)'}>
      <S.Items>
        {loadingProjectTree
          ? 'loading'
          : projectTree.data?.map((project: ProjectDto, key: number) => (
              <ProjectRow project={project} key={key} />
            ))}
      </S.Items>
      <Pagination
        page={page}
        pages={4}
        onPrevious={() => {
          setPage(page - 1);
        }}
        onNext={() => {
          setPage(page + 1);
        }}
      />
    </S.Wrapper>
  );
};
