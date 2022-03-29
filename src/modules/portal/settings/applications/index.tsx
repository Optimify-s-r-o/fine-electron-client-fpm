import { faCog, faDatabase } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest } from 'api/generated';
import { Button } from 'components/Form/Button';
import { RoutesPath } from 'constants/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';

const LocalApplicationsSettings = () => {
    const { t } = useTranslation( ['portal', 'form', 'common'] );
    const { applications, loading } = useApplicationContext();

    const { handleSubmit } = useForm<ProjectCreateRequest>( {
        resolver: yupResolver(
            Yup.object().shape( {
                name: Yup.string().required( t( 'form:validation.required' ) )
            } )
        )
    } );

    const onSubmit = async ( data: ProjectCreateRequest ) => {
        console.log( data );
    };

    return (
        <MainWrapper icon={faCog} title={t( 'portal:settings.title' )} navigation={[
            {
                path: `${ RoutesPath.SYSTEM }`,
                active: false,
                text: t( 'portal:settings.tabs.system' ),
                icon: faDatabase
            },
            {
                path: `${ RoutesPath.LOCAL_APPLICATIONS_SETTINGS }`,
                active: true,
                text: t( 'portal:settings.tabs.applicationsSettings' ),
                icon: faDatabase
            },
            {
                path: `${ RoutesPath.UPDATE }`,
                active: false,
                text: t( 'portal:settings.tabs.update' ),
                icon: faDatabase
            },
        ]}>
            <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
                <S.ContentWrapper>
                    {loading ? 'loading' :
                        <div>
                            {'Tabulka ma tyhle radky:'}
                            <div>
                                {applications.map( e => `Name: ${ e.name }, Exe file path: Tohle se meni localne, netaha se z api, Ikona ${ e.icon } (zase uz hotova url na nejakou ikonu, pokud null, vykreslit nejakej placeholder obrazek)` )}
                            </div>
                        </div>
                    }
                </S.ContentWrapper>
                <S.ButtonsWrapper>
                    <Button loading={false}>{t( 'form:button.save' )}</Button>
                </S.ButtonsWrapper>
            </S.MainFormContent>
        </MainWrapper>
    );
};

export default LocalApplicationsSettings;
