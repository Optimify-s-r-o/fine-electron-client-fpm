import { useTranslation } from 'react-i18next';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormWatch
} from 'react-hook-form';
import * as GS from 'constants/globalStyles';
import { TextInput } from '../../../../../components/Form/Input/Text/TextInput';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { CardTable } from 'components/Table/CardTable';
import { CloseButton } from 'components/Form/Button/CloseButton';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { Input } from 'components/Form/Input/styled';
import { ChangeEvent, useRef } from 'react';
import { ProjectCreateRequestForm } from '../index';

export const CreateProjectForm = ({
  errors,
  control,
  register,
  watch
}: {
  errors: FieldErrors<ProjectCreateRequestForm>;
  register: UseFormRegister<ProjectCreateRequestForm>;
  control: Control<ProjectCreateRequestForm>;
  watch: UseFormWatch<ProjectCreateRequestForm>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { append, remove } = useFieldArray({
    control,
    name: 'files'
  });

  const addFiles = (files: File[]) => {
    if (!files) return;

    append(files);
  };

  const addFile = (file: File) => {
    if (!file) return;

    append(file);
  };

  const deleteFile = (id: number) => {
    if (!id) return;

    remove(id);
  };

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput
          errors={errors}
          name={'name'}
          register={register}
          title={t('form:input.projectName')}
        />
        <TextAreaInput
          errors={errors}
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
              dataIndex: 'type'
            },
            {
              title: <Input placeholder={t('form:input.searchPlaceholder')} />,
              dataIndex: 'id',
              render: (t, r, index) => (
                <GS.FloatRight>
                  <CloseButton onClick={() => deleteFile(index)} />
                </GS.FloatRight>
              )
            }
          ]}
          dataSource={watch('files')}
          emptyTableText={t('form:table.noFiles')}
          onFilesDrop={addFiles}
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
