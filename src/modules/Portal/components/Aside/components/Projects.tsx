import { faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTreeContext } from 'modules/Portal/context/Tree/TreeContext';
import { useState } from 'react';

import * as S from '../styled';

export const Projects = () => {
    const { projectTree, loadingProjectTree } = useTreeContext();

    //TODO KAREL
    // je potreba pridat strankovani - tam chybi i UI
    // napojit
    // pridat routovani
    // umoznit pohyb sipek
    // udelat to stejny pro joby + UI efekt


    return ( <S.Wrapper color={"rgb(255 202 108 / 80%)"}>
        {projectTree.data?.map( ( item ) => {
            return ( <S.Item key={item.name}>
                <S.TitleWrapper>
                    <FontAwesomeIcon
                        icon={faFolder}
                    />
                    <S.Title>{item.name}</S.Title>
                </S.TitleWrapper>
                <FontAwesomeIcon icon={faAngleRight} />
            </S.Item> );
        } )}
    </S.Wrapper> );
};
