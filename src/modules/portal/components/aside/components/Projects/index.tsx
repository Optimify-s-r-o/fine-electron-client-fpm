import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';

import * as S from '../../styled';
import { ProjectRow } from './Item';
import { ProjectDto } from '../../../../../../api/generated';

export const Projects = () => {
  const { projectTree, loadingProjectTree } = useTreeContext();

  return (
    <S.Wrapper color={'rgb(255 202 108 / 80%)'}>
      {loadingProjectTree
        ? 'loading'
        : projectTree.data?.map((project: ProjectDto, key: number) => (
            <ProjectRow project={project} key={key} />
          ))}
    </S.Wrapper>
  );
};
