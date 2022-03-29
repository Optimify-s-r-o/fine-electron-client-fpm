import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { ProjectCreateRequest } from '../../../../../api/generated';
import * as GS from 'constants/globalStyles';
import { TextInput } from '../../../../../components/Form/Input/Text/TextInput';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { CardTable } from 'components/Table/CardTable';
import { CloseButton } from 'components/Form/Button/CloseButton';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { Input } from 'components/Form/Input/styled';
import { ChangeEvent, useRef } from 'react';

export const CreateProjectForm = ({
  register
}: {
  register: UseFormRegister<ProjectCreateRequest>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addFile = (fileToAdd: File) => {
    alert('TODO add file');
  };

  const deleteFile = (fileToDelete: any) => {
    alert('TODO delete file');
  };

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput name={'name'} register={register} title={t('form:input.projectName')} />
        <TextAreaInput
          name={'description'}
          register={register}
          title={t('form:input.projectDescription')}
        />
      </GS.GridItem>
      <GS.GridItem>
        <CardTable
          columns={[
            {
              title: t('form:table.fileName'),
              render: (t, _r) => <>{t}</>,
              dataIndex: 'name'
            },
            {
              title: t('form:table.fileExtension'),
              render: (t, _r) => <>{t}</>,
              dataIndex: 'format'
            },
            {
              title: <Input placeholder={t('form:input.searchPlaceholder')} />,
              render: (_t, r) => (
                <GS.FloatRight>
                  <CloseButton onClick={() => deleteFile(r)} />
                </GS.FloatRight>
              )
            }
          ]}
          dataSource={[
            {
              name: 'Dokumentace.pdf',
              format: 'pdf'
            },
            {
              name: 'Zadani.docx',
              format: 'docx'
            }
          ]}
          emptyTableText={t('form:table.noFiles')}
          onFilesDrop={(files) =>
            files.forEach((file: File) => {
              addFile(file);
            })
          }
          extraRow={
            <GS.Center>
              <label htmlFor="add-file">
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}>
                  {t('form:table.fileAdd')}
                </PlainButton>
                <input
                  ref={fileInputRef}
                  id="add-file"
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  autoComplete={'off'}
                  tabIndex={-1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) addFile(e.target.files[0]);
                  }}
                />
              </label>
            </GS.Center>
          }
        />
      </GS.GridItem>
    </GS.GridRow>
  );
};
