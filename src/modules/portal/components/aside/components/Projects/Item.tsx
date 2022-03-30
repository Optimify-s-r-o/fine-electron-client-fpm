import { MouseEvent, useEffect, useRef } from 'react';
import { useTreeContext } from '../../../../context/Tree/TreeContext';
import { TabType, useTabContext } from '../../../../context/Tab/TabContext';
import * as S from '../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { faAngleRight, faCross } from '@fortawesome/pro-light-svg-icons';
import { ProjectDto } from '../../../../../../api/generated';

export const ProjectRow = ({ project }: { project: ProjectDto }) => {
  const itemRef = useRef(null);
  const { selectedProjectId, selectProject } = useTreeContext();
  const { addTab } = useTabContext();

  useEffect(() => {
    (itemRef?.current as any)?.addEventListener('dblclick', handleDoubleClick);

    return () => {
      (itemRef?.current as any)?.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [itemRef]);

  const handleDoubleClick = () => {
    selectProject(project.id);
    addTab({ id: project.id, type: TabType.PROJECT, name: project.name });
  };

  //TODO MARA
  // je potreba pridat strankovani - tam chybi i UI
  // pridat routovani
  // umoznit pohyb sipek
  // Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek

  const handleSelection = (_event: MouseEvent<HTMLDivElement>) => {
    selectProject(project.id);
  };

  return (
    <S.Item
      ref={itemRef}
      onClick={handleSelection}
      id={project.id}
      active={selectedProjectId === project.id ? 1 : 0}>
      <S.TitleWrapper>
        <FontAwesomeIcon icon={faFolder} />
        <S.Title>{project.name}</S.Title>
      </S.TitleWrapper>
      <FontAwesomeIcon icon={faAngleRight} />
    </S.Item>
  );
};
