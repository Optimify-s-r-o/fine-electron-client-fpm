import { faAngleRight, faCross } from '@fortawesome/pro-light-svg-icons';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { MouseEvent } from 'react';

import * as S from '../styled';

export const Projects = () => {
    const { projectTree, selectedProjectId, selectProject, loadingProjectTree } = useTreeContext();


  //TODO MARA
  // je potreba pridat strankovani - tam chybi i UI
  // pridat routovani
  // umoznit pohyb sipek
  // Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek

    const handleSelection = ( id: string ) => ( _event: MouseEvent<HTMLDivElement> ) => {
        selectProject( id );
    };

    return ( <S.Wrapper color={"rgb(255 202 108 / 80%)"}>
        {loadingProjectTree ? 'loading'
            :
            projectTree.data?.map( ( item ) => {
                return ( <S.Item key={item.name} onClick={handleSelection( item.id )}>
                    <S.TitleWrapper>
                        <FontAwesomeIcon
                            icon={faFolder}
                        />
                        <S.Title>{item.name}</S.Title>
                    </S.TitleWrapper>
                    {/* TODO MARA poznat ktery prvek je selectnuty graficky, ted je jen ikona jen pro overeni funkcnosti  */}
                    {item.id === selectedProjectId && <FontAwesomeIcon icon={faCross} />}
                    <FontAwesomeIcon icon={faAngleRight} />
                </S.Item> );
            } )}
    </S.Wrapper> );
};
