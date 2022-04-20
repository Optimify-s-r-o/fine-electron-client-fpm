import { faFileImport } from '@fortawesome/pro-light-svg-icons';
import { ApplicationDto, ProjectJobsDto } from 'api/generated';
import ApplicationSelector from 'components/ApplicationSelector';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { useAuthContext } from 'modules/auth/context/AuthContext';
import { useExecutableApplicationContext } from 'modules/portal/context/ExecutableApplications/ExecutableApplicationsContext';
import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useModal from 'utils/hooks/useModal';

const ImportJob = ({ project }: { project?: ProjectJobsDto | null }) => {
  const modal = useModal();
  const { t } = useTranslation(['modal', 'form']);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const appRef = useRef<ApplicationDto | null>(null);
  const { isExecutable } = useExecutableApplicationContext();
  const { token } = useAuthContext();

  const onAppClick = (app: ApplicationDto) => {
    appRef.current = app;
    if (inputRef.current) inputRef.current.files = null;

    if (inputRef.current) {
      inputRef.current.accept = app.extensions.join(',');
      inputRef.current.click();
    }
  };

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      const file = e.target.files.item(0) as any;
      const extension = '.' + file.path.split('.').pop();

      if (inputRef.current?.accept?.includes(extension)) {
        const args = [
          '-mode',
          'fpm',
          '-serverUrl',
          'https://trussapi.fine.cz', // TODO?
          '-e',
          'importJob',
          '-projectId',
          project?.id,
          '-path',
          file.path,
          '-token',
          token
        ];
        const exe = isExecutable(appRef.current?.code ?? '');

        if (exe) {
          try {
            window.API.execFile(exe, args);
            // TODO result handling
            toast.success(
              t('toast:project.jobImport.success', {
                appName: appRef.current?.name
              })
            );
            modal.closeModal();
          } catch {
            toast.error(
              t('toast:project.jobImport.failed', {
                appName: appRef.current?.name
              })
            );
          }
        } else {
          toast.error(
            t('toast:project.jobImport.appNotExecutable', {
              appName: appRef.current?.name
            })
          );
        }
      } else {
        toast.error(
          t('toast:project.jobImport.badExtension', {
            appName: appRef.current?.name,
            extension: extension,
            allowedExtensions: appRef.current?.extensions.join(', ')
          })
        );
      }
    }
  };

  return (
    <PlainButton
      icon={faFileImport}
      type="button"
      onClick={() => {
        modal.showModal({
          title: t('form:modal.jobImport'),
          content: (
            <>
              <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                autoComplete={'off'}
                tabIndex={-1}
                onChange={onFileSelected}
              />
              <ApplicationSelector onClick={onAppClick} />
            </>
          ),
          onClose: () => {
            appRef.current = null;
            return true;
          }
        });
      }}>
      {t('form:button.importJob')}
    </PlainButton>
  );
};

export default ImportJob;
