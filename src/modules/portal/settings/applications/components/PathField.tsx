import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ApplicationDto } from '../../../../../api/generated';
import { PlainButton } from '../../../../../components/Form/Button/PlainButton';
import { Input } from '../../../../../components/Form/Input/styled';
import { Row } from '../../../../../constants/globalStyles';
import { useEffectAsync } from '../../../../../utils/useEffectAsync';
import { useApplicationContext } from '../../../context/Applications/ApplicationsContext';

export const PathField = ( { application }: { application: ApplicationDto; } ) => {
  const { t } = useTranslation( ['form'] );
  const { setApplicationExePath, getApplicationExePath } = useApplicationContext();
  const pathInputRef = useRef<HTMLInputElement | null>( null );

  const [path, setPath] = useState<null | string>( null );

  useEffectAsync( async () => {
    const applicationPath = await getApplicationExePath( application.code );

    setPath( applicationPath );
  }, [] );

  const handlePathChange = async ( e: ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files ? e.target.files[0] : null;

    await savePathToStorage( file );
  };

  const savePathToStorage = async ( file: File | null ) => {
    const path = ( file as any ).path;

    if ( !path ) return;

    await setApplicationExePath( path, application.code );
    setPath( path );
  };

  return (
    <Row>
      <input
        type="file"
        ref={pathInputRef}
        accept=".exe"
        style={{ display: 'none' }}
        onChange={handlePathChange}
      />
      <Input
        value={path ?? ''}
        readOnly
        placeholder={t( 'form:table.programPathNotSet' )}
        onClick={() => pathInputRef.current?.click()}
      />
      <MarginLeft>
        <PlainButton
          loading={false}
          onClick={() => {
            pathInputRef.current?.click();
          }}>
          {path ? t( 'form:table.programPathChange' ) : t( 'form:table.programPathAdd' )}
        </PlainButton>
      </MarginLeft>
    </Row>
  );
};

const MarginLeft = styled.span`
  margin-left: 16px;
`;
