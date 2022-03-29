import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'components/Form/Button';
import { RoutesPath } from 'constants/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { ApplicationCreateRequest } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';

const ApplicationsSettings = () => {
    const { t } = useTranslation( ['portal', 'form', 'common'] );
    const { applications, loading } = useApplicationContext();

    const onSubmit = async ( data: ApplicationCreateRequest ) => {
        console.log( data );
    };

    const { handleSubmit } = useForm<ApplicationCreateRequest>( {
        resolver: yupResolver(
            Yup.object().shape( {
                name: Yup.string().required( t( 'form:validation.required' ) )
            } )
        )
    } );

    return (
        <MainWrapper
            icon={faFolder}
            title={t( 'portal:admin.title' )}
            navigation={[
                {
                    path: RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
                    active: true,
                    text: t( 'portal:admin.tabs.applicationsSettings' ),
                    icon: faDatabase
                }
            ]}
        >
            <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
                <S.ContentWrapper>
                    <div>Cast1: Vypsat existujici programy, je to tabulka bez pagination, bude tam jenom par zaznamu</div>
                    <div>Ikony by mely chodit uz primo jako url pro rychlejsi zobrazeni, pokud tam ikona neni, oznac prosim nejak viditelne ze by tam mela jit pridat</div>
                    <div>Zaroven potrevujem aby to misto s ikonou dokazalo nahravat soubory - klasicky drag and drop, nebo na kliknuti</div>
                    <div>
                        {loading ? 'loading main' : applications.map( e => `Nazev programu: ${ e.name } Interni kod programu: ${ e.code } Icon: ${ e.icon }` )}
                    </div>
                </S.ContentWrapper>
                <S.ButtonsWrapper>
                    <Button loading={false}>{t( 'form:button.save' )}</Button>
                </S.ButtonsWrapper>
            </S.MainFormContent>
        </MainWrapper>
    );
};

export default ApplicationsSettings;
