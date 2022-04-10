import { faFileArrowUp } from '@fortawesome/pro-light-svg-icons';
import { useTranslation } from 'react-i18next';
import { ProjectDto } from 'api/generated';
import ProgressModalFiles, {
  ProgressRunFunctionWithFiles
} from 'components/Progress/ProgressModalFiles';
import { ProgressStatus } from 'utils/hooks/useProgress';

export const ImportJobData = ({ project }: { project?: ProjectDto | null }) => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);

  const handleImport: ProgressRunFunctionWithFiles = (
    files: File[] | null,
    addItem,
    setItemStatus,
    finish
  ) => {
    if (!files || files.length === 0) return;
    // TODO Tady bych potreboval zobrazit modal a zacit zpracovavat ty soubory
    console.log(files);
    const file1 = addItem('Processing first file');
    setTimeout(() => {
      setItemStatus(file1, ProgressStatus.Success);
      finish();
    }, 2500);
  };

  return (
    <ProgressModalFiles
      triggerText={t('form:button.importData')}
      triggerIcon={faFileArrowUp}
      titleText={t('form:button.importData')}
      run={handleImport}
    />
  );
};
