import { faFileArrowUp } from '@fortawesome/pro-light-svg-icons';
import { useTranslation } from 'react-i18next';
import { ProjectDto } from 'api/generated';
import ProgressModalFiles, {
  ProgressRunFunctionWithFiles
} from 'components/Progress/ProgressModalFiles';
import { ProgressStatus } from 'utils/hooks/useProgress';
import { JobCreateRequest } from '../../../../../api/generated/api';

export const ImportJobData = ({ project }: { project?: ProjectDto | null }) => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);

  const createFileToWrite = async (inputFile: File) => {
      const response = await window.API.invoke( 'GET_TEMP_DIRECTORY' );

      try {
          const entityToWrite: JobCreateRequest = {
              type: "",
              name: inputFile.name.substring( inputFile.name.lastIndexOf( '.' ) ),
              description: "",
              projectId: project?.id as string,
              application: "",
              applicationFileExtension: "",
              attributes: []
          };

          await window.API.invoke( 'WRITE_FILE', {
              directory: response + `\\${ new Date().getTime() }`,
              file: 'output.json',
              content: JSON.stringify( entityToWrite ),
              coding: 'utf-8'
          }
          );
          
          return true;
          
      } catch ( e ) {
          console.log( e );
          return false;
      }
      
      
}
    
    const handleImport: ProgressRunFunctionWithFiles = async (
        files: File[] | null,
        addItem,
        setItemStatus,
        finish
    ) => {
        if ( !files || files.length === 0 ) return;
      
        // Create status for all files
        for ( let i = 0; i < files.length; i++ ) {
            addItem( files[i].name, ProgressStatus.Waiting );
        }
    
        // Do actual work
        for ( let i = 0; i < files.length; i++ ) {
            setItemStatus( i, ProgressStatus.Running );
            await createFileToWrite( files[i] );
            setItemStatus( i, ProgressStatus.Success );
        }

      
        const file1 = addItem( 'Processing first file' );
        setTimeout( () => {
            setItemStatus( file1, ProgressStatus.Success );
            finish();
        }, 2500 );
    }

  return (
    <ProgressModalFiles
      triggerText={t('form:button.importData')}
      triggerIcon={faFileArrowUp}
      titleText={t('form:button.importData')}
      run={handleImport}
    />
  );
};
