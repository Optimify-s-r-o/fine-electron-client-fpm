import { ChangeEvent, useRef } from 'react';
import {
    faFileArrowUp
  } from '@fortawesome/pro-light-svg-icons';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { useTranslation } from 'react-i18next';
import { ProjectDto } from 'api/generated';
  

export const ImportJobData = ({project}: {project?: ProjectDto | null}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation( ['portal', 'form', 'common', 'project'] );
    
      const handleImport = (files: FileList) => {
        if (files.length === 0) return;
        // TODO Tady bych potreboval zobrazit modal a zacit zpracovavat ty soubory
      };

    return (
        <label htmlFor="import-data">
            <PlainButton loading={false} icon={faFileArrowUp} type="button" onClick={( e ) => {
                e.preventDefault();
                fileInputRef.current?.click();
            }}
            >
                {t( 'form:button.importData' )}
            </PlainButton>
            <input
                ref={fileInputRef}
                id="import-data"
                type="file"
                multiple
                style={{ display: 'none' }}
                autoComplete={'off'}
                tabIndex={-1}
                onChange={( e: ChangeEvent<HTMLInputElement> ) => {
                    if ( e.target.files ) handleImport(e.target.files);
                }}
            />
            </label>
    );
}