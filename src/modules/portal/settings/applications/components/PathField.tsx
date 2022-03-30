import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState, useRef } from 'react';
import { Row } from '../../../../../constants/globalStyles';
import { Input } from '../../../../../components/Form/Input/styled';
import { PlainButton } from '../../../../../components/Form/Button/PlainButton';
import styled from 'styled-components';
import { useEffectAsync } from '../../../../../utils/useEffectAsync';
import { ApplicationDto } from '../../../../../api/generated';

export const PathField = ({ application }: { application: ApplicationDto }) => {
  const { t } = useTranslation(['form']);
  const pathInputRef = useRef<HTMLInputElement | null>(null);

  const [path, setPath] = useState<null | string>(null);

  useEffectAsync(async () => {
    const applicationPath = await window.API.invoke('ELECTRON_STORE_GET', { name: application.id });

    setPath(applicationPath);
  }, []);

  const handlePathChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    await savePathToStorage(file);
  };

  const savePathToStorage = async (file: File | null) => {
    const path = (file as any).path;

    if (!path) return;

    setPath(path);

    await window.API.invoke('ELECTRON_STORE_SET', { name: application.id, value: path });
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
        placeholder={t('form:table.programPathNotSet')}
        onClick={() => pathInputRef.current?.click()}
      />
      <MarginLeft>
        <PlainButton
          loading={false}
          onClick={() => {
            pathInputRef.current?.click();
          }}>
          {path ? t('form:table.programPathChange') : t('form:table.programPathAdd')}
        </PlainButton>
      </MarginLeft>
    </Row>
  );
};

const MarginLeft = styled.span`
  margin-left: 16px;
`;
