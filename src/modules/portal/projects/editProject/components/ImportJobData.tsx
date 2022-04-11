import { faFileArrowUp } from '@fortawesome/pro-light-svg-icons';
import { ProjectDto } from 'api/generated';
import ProgressModalFiles, { ProgressRunFunctionWithFiles } from 'components/Progress/ProgressModalFiles';
import { useTranslation } from 'react-i18next';
import { ProgressStatus } from 'utils/hooks/useProgress';

import { JobCreateRequest } from '../../../../../api/generated/api';

export const ImportJobData = ({ project }: { project?: ProjectDto | null }) => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project', 'job']);

  const createFileToWrite = async (inputFile: File) => {
      const response = await window.API.invoke( 'GET_TEMP_DIRECTORY' );

      try {
          const entityToWrite: JobCreateRequest = {
              type: "",
              name: inputFile.name.substring( 0, inputFile.name.lastIndexOf( '.' ) ),
              description: "",
              projectId: project?.id as string,
              application: "",
              applicationFileExtension: "",
              attributes: []
          };

          const directory = response + `\\TPM\\${ new Date().getTime() }`;
          const file = 'output.json';

          await window.API.invoke( 'WRITE_FILE', {
              directory: directory,
              file: file,
              content: JSON.stringify( entityToWrite ),
              coding: 'utf-8'
          }
          );
          
          return {
              success: true,
              directory: directory,
              file: file
          };
          
      } catch ( e ) {
          console.log( e );
          return {
              success: false
          };
      }
      
      
    }
    
    const openFileInfoExe = async (path: string, output: string, outputDir: string) => {
        const args = ['-path', path, '-output', output, '-outputDir', outputDir];
        const exe = await window.API.invoke( 'GET_FPM_FILE_INFO_EXE_PATH' );

      console.log(`Exe: '${exe}' Args: '${args}'`);

        const res = await window.API.execFile( exe, args );
        return res;
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
            addItem( files[i].name, ProgressStatus.Waiting, t('job:import.jobWaiting') );
        }
    
        // Do actual work
        for ( let i = 0; i < files.length; i++ ) {
            setItemStatus( i, ProgressStatus.Running, t('job:import.jobRunning') );
            
            const fileRes = await createFileToWrite( files[i] );
            
            if ( fileRes.success ) {
            } else {
                setItemStatus( i, ProgressStatus.Fail, t('job:import.jobFailPreparation') );
                continue;
            }

            const res = await openFileInfoExe((files[i] as any).path, fileRes?.file as string, fileRes?.directory as string);

            console.log( res );
            const statusText = res.exitCode === 0 ? t('job:import.jobSuccess') : res.exitCode === null ? t('job:import.jobFailExeOpen') : t('job:import.jobFailOther')

            setItemStatus( i, res.exitCode === 0 ? ProgressStatus.Success : ProgressStatus.Fail, statusText );
        }

        finish();
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