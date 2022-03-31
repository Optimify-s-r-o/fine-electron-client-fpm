import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';
import * as S from '../../styled';
import { ProjectRow } from './Item';
import { ProjectDto } from 'api/generated';
import Pagination from '../Pagination';
import { useRef, useState } from 'react';
import { projectContextMenuBridge } from './contextMenuBridge';
import { useKeyPress } from 'utils/keyHandler/useKeyPress';
import _ from 'lodash';

export const Projects = () => {
  const projectsRef = useRef(null);

  const { projectTree, loadingProjectTree, selectProject, selectedProjectId } = useTreeContext();
  const [page, setPage] = useState(1);

  const handleDownPressed = () => {
    const data = projectTree.data;

    if (!selectedProjectId) {
      const firstProject = _.first(data);
      firstProject && selectProject(firstProject.id);
      return;
    }

    const index = _.findIndex(data, (e) => e.id === selectedProjectId);

    const next = data[index + 1];

    if (next) selectProject(next.id);
  };

  const handleUpPressed = () => {
    const data = projectTree.data;

    const index = _.findIndex(data, (e) => e.id === selectedProjectId);

    const previous = data[index - 1];

    if (previous) selectProject(previous.id);

    return;
  };

  useKeyPress('ArrowUp', handleUpPressed, projectTree.data, projectsRef.current);
  useKeyPress('ArrowDown', handleDownPressed, projectTree.data, projectsRef.current);

  const { project } = useContextMenu(projectContextMenuBridge);

  return (
    <S.Wrapper color={'rgb(255, 202, 108)'} ref={projectsRef} tabIndex={0}>
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
      <ContextMenu bridge={projectContextMenuBridge}>
        <ContextMenu.Option
          onClick={() => {
            // TODO karel: do something with project
            console.log(project);
          }}>
          Test
        </ContextMenu.Option>
      </ContextMenu>
    </S.Wrapper>
  );
};
