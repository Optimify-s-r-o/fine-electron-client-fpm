import { faAngleRight, faCross } from '@fortawesome/pro-light-svg-icons';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTreeContext } from 'modules/Portal/context/Tree/TreeContext';

import * as S from '../styled';

export const Projects = () => {
    const { projectTree, selectedProjectId, selectProject, loadingProjectTree } = useTreeContext();

    //TODO MARA
    // je potreba pridat strankovani - tam chybi i UI
    // napojit
    // pridat routovani
    // umoznit pohyb sipek
    // udelat to stejny pro joby + UI efekt


    return ( <S.Wrapper color={"rgb(255 202 108 / 80%)"}>
        {loadingProjectTree ? 'loading'
            :
            projectTree.data?.map( ( item ) => {
                return ( <S.Item key={item.name} onClick={() => selectProject( item.id )}>
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
