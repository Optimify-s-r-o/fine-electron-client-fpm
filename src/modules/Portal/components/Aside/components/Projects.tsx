import {useState} from "react";
import * as S from "../styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/pro-solid-svg-icons";
import {faAngleRight} from "@fortawesome/pro-light-svg-icons";
import {useApi} from "../../../../../utils/hooks/useApi";
import {SignInRequest, SignInResponse} from "../../../../../api/generated";
import API from "../../../../../utils/api";
import useEffectAsync from "../../../../../utils/useEffectAsync";

export const Projects = () => {
    const [getProjects, { data }] = useApi<SignInRequest, SignInResponse>();

    const [state] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])

    console.log(data);

    //TODO KAREL
    // je potreba pridat strankovani - tam chybi i UI
    // napojit
    // pridat routovani
    // umoznit pohyb sipek
    // udelat to stejny pro joby + UI efekt
    useEffectAsync(async ()=>{
        await getProjects(()=>API.ProjectsApi.fineProjectManagerApiProjectsGet());
    },[])

    return (<S.Wrapper color={"rgb(255 202 108 / 80%)"}>
        {state.map((item, key) => {
            return (<S.Item key={key}>
                <S.TitleWrapper>
                    <FontAwesomeIcon
                        icon={faFolder}
                    />
                    <S.Title>{item}</S.Title>
                </S.TitleWrapper>
                <FontAwesomeIcon icon={faAngleRight}/>
            </S.Item>)
        })}
    </S.Wrapper>)
}
