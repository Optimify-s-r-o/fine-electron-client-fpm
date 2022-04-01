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
import { useTranslation } from 'react-i18next';
import { TabType, useTabContext } from '../../../../context/Tab/TabContext';
import { useApi } from '../../../../../../utils/hooks/useApi';
import API from '../../../../../../utils/api';
import Filters from '../Filters';
import { faStar as faStarOutline } from '@fortawesome/pro-light-svg-icons';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

export const Projects = () => {
  const { t } = useTranslation(['portal']);

  const projectsRef = useRef(null);

  const { addTab } = useTabContext();

  const [deleteProject] = useApi<any>();

  const { projectTree, loadingProjectTree, selectProject, selectedProjectId, refetchProjects } =
    useTreeContext();
  const [page, setPage] = useState(1);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const handleDownPressed = () => {
    const data = projectTree.data;

    if (!selectedProjectId) {
      const firstProject = _.first(data);
      firstProject && selectProject(firstProject);
      return;
    }

    const index = _.findIndex(data, (e) => e.id === selectedProjectId);

    const next = data[index + 1];

    if (next) selectProject(next);
  };

  const handleUpPressed = () => {
    const data = projectTree.data;

    const index = _.findIndex(data, (e) => e.id === selectedProjectId);

    const previous = data[index - 1];

    if (previous) selectProject(previous);

    return;
  };

  useKeyPress('ArrowUp', handleUpPressed, projectTree.data, projectsRef.current);
  useKeyPress('ArrowDown', handleDownPressed, projectTree.data, projectsRef.current);

  const { project } = useContextMenu(projectContextMenuBridge);

  const handleOpen = (e: any) => {
    if (!project) return;

    selectProject(project);
  };

  const handleNewTab = (e: any) => {
    if (!project) return;

    selectProject(project);
    addTab({ id: project.id, type: TabType.PROJECT, name: project.name });
  };

  const handleDelete = async (e: any) => {
    if (!project) return;

    await deleteProject(() => API.ProjectsApi.fineProjectManagerApiProjectsIdDelete(project.id));

    await refetchProjects(onlyFavorites);
  };

  const toggleFavoritesFilter = () => {
    setOnlyFavorites(!onlyFavorites);
    refetchProjects(!onlyFavorites);
  };

  return (
    <S.Wrapper color={'rgb(255, 202, 108)'} ref={projectsRef} tabIndex={0}>
      <Filters
        items={[
          {
            iconOff: faStarOutline,
            iconOn: faStar,
            colorOff: '#696969',
            colorOn: '#F47b20',
            state: onlyFavorites,
            onClick: toggleFavoritesFilter
          }
        ]}
      />
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
        <ContextMenu.Option onClick={handleOpen}>{t('portal:contextMenu.open')}</ContextMenu.Option>
        <ContextMenu.Option onClick={handleNewTab}>
          {t('portal:contextMenu.newTab')}
        </ContextMenu.Option>
        <ContextMenu.Option onClick={handleDelete}>
          {t('portal:contextMenu.delete')}
        </ContextMenu.Option>
      </ContextMenu>
    </S.Wrapper>
  );
};
