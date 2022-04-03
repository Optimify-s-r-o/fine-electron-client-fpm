import {
  faArrowDown19,
  faArrowDown91,
  faArrowDownAZ,
  faArrowDownZA,
  faFilterSlash,
  faStar as faStarOutline,
  faUser
} from '@fortawesome/pro-light-svg-icons';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectDto } from 'api/generated';
import _ from 'lodash';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { ProjectTreeSort } from 'modules/portal/context/Tree/types';
import { useRef } from 'react';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useKeyPress } from 'utils/keyHandler/useKeyPress';

import API from '../../../../../../utils/api';
import { useApi } from '../../../../../../utils/hooks/useApi';
import { TabType, useTabContext } from '../../../../context/Tab/TabContext';
import * as S from '../../styled';
import Filters from '../Filters';
import Pagination from '../Pagination';
import { Skeleton } from '../Skeleton';
import Sort from '../Sort';
import { projectContextMenuBridge } from './contextMenuBridge';
import { ProjectRow } from './Item';

export const Projects = () => {
  const { t } = useTranslation(['portal']);

  const projectsRef = useRef(null);

  const { addTab } = useTabContext();

  const [deleteProject] = useApi<any>();

  const {
    projectTree,
    loadingProjectTree,
    selectProject,
    selectedProjectId,
    refetchProjects,
    isFiltered,
    setFavoritesOnlyFilter,
    filterQuery,
    resetFilters,
    setSort,
    setPage
  } = useTreeContext();

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

    await refetchProjects();
  };

  const toggleFavoritesFilter = () => {
    setFavoritesOnlyFilter(!filterQuery.favoriteOnly);
  };

  const filterItems = [
    {
      iconOff: faStarOutline,
      iconOn: faStar,
      colorOff: '#696969',
      colorOn: '#f1e230',
      state: filterQuery.favoriteOnly ?? false,
      onClick: toggleFavoritesFilter
    }
  ];

  if (isFiltered) {
    filterItems.push({
      iconOff: faFilterSlash,
      iconOn: faFilterSlash,
      colorOff: '#696969',
      colorOn: '#fff',
      state: !isFiltered,
      onClick: resetFilters
    });
  }

  return (
    <S.Wrapper color={'rgb(255, 202, 108)'} ref={projectsRef} tabIndex={0}>
      <TopWrapper>
        <Filters items={filterItems} />
        <Sort
          items={[
            {
              label: <FontAwesomeIcon icon={faArrowDownAZ} />,
              value: ProjectTreeSort.alphabeticalAsc
            },
            {
              label: <FontAwesomeIcon icon={faArrowDownZA} />,
              value: ProjectTreeSort.alphabeticalDesc
            },
            {
              label: <FontAwesomeIcon icon={faArrowDown91} />,
              value: ProjectTreeSort.modifyDateDesc
            },
            {
              label: <FontAwesomeIcon icon={faArrowDown19} />,
              value: ProjectTreeSort.modifyDateAsc
            },
            {
              label: <FontAwesomeIcon icon={faUser} />,
              value: ProjectTreeSort.myFirst
            }
          ]}
          initialValue={ProjectTreeSort.alphabeticalAsc}
          onSelect={setSort}
        />
      </TopWrapper>
      <S.Items>
        {loadingProjectTree ? (
          <Skeleton />
        ) : (
          projectTree.data?.map((project: ProjectDto, key: number) => (
            <ProjectRow project={project} key={key} />
          ))
        )}
      </S.Items>
      <Pagination
        page={projectTree.page + 1}
        pages={projectTree.totalPages}
        onPrevious={() => {
          setPage(projectTree.page - 1);
        }}
        onNext={() => {
          setPage(projectTree.page + 1);
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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 8px;
  padding: 8px 6px;

  border-bottom: 1px solid ${(props) => props.theme.common.lightGray};
  color: ${(props) => props.theme.text.gray};
  font-size: 13px;
`;
