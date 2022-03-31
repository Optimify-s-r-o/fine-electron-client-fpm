import { MouseEvent, useEffect, useRef } from 'react';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { TabType, useTabContext } from 'modules/portal/context/Tab/TabContext';
import * as S from '../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { ProjectDto } from '../../../../../../api/generated';
import { ContextMenuTriggerArea } from 'react-context-menu-hooks';
import { projectContextMenuBridge } from './contextMenuBridge';

export const ProjectRow = ({ project }: { project: ProjectDto }) => {
  const itemRef = useRef(null);
  const { selectedProjectId, selectProject } = useTreeContext();
  const { addTab } = useTabContext();

  useEffect(() => {
    const handleDoubleClick = () => {
      selectProject(project.id);
      addTab({ id: project.id, type: TabType.PROJECT, name: project.name });
    };

    const item = itemRef?.current as any;

    item?.addEventListener('dblclick', handleDoubleClick);

    return () => {
      item?.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [itemRef, addTab, project, selectProject]);

  //TODO MARA
  // je potreba pridat strankovani - tam chybi i UI
  // pridat routovani
  // umoznit pohyb sipek
  // Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek

  const handleSelection = (_event: MouseEvent<HTMLDivElement>) => {
    selectProject(project.id);
  };

  return (
    <ContextMenuTriggerArea bridge={projectContextMenuBridge} data={{ project }}>
      <S.Item
        ref={itemRef}
        onClick={handleSelection}
        id={project.id}
        active={selectedProjectId === project.id}>
        <S.TitleWrapper>
          <FontAwesomeIcon icon={faFolder} />
          <S.Title>{project.name}</S.Title>
        </S.TitleWrapper>
        <FontAwesomeIcon icon={faAngleRight} />
      </S.Item>
    </ContextMenuTriggerArea>
  );
};
