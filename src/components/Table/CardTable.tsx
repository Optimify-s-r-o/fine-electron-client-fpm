import React, { ReactNode } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export type Row<T> = {
  title: any;
  titleHide?: boolean;
  dataIndex?: string;
  key?: string;
  render: (text: any, record: T, index: number) => ReactNode;
  collapsibleNode?: (record: T) => ReactNode;
  onCollapse?: (record: T) => any;
  collapsible?: boolean;
  width?: string;
};

const TableRow = <T extends unknown>({
  columns,
  tableRowKey,
  data
}: {
  columns: Row<T>[];
  tableRowKey: number;
  data: any;
}) => {
  return (
    <tr key={tableRowKey}>
      {columns?.map((e: Row<T>, keyColumn: number) => {
        const value = e.dataIndex ? data[e.dataIndex] : '';
        return <td key={keyColumn}>{e.render(value, data, tableRowKey)}</td>;
      })}
    </tr>
  );
};

export const CardTable = <T extends unknown>({
  columns,
  dataSource,
  emptyTableText,
  loading,
  extraRow,
  onFilesDrop
}: {
  columns: Row<T>[];
  dataSource: any;
  emptyTableText?: string;
  loading?: boolean;
  extraRow?: ReactNode;
  onFilesDrop?: (files: File[]) => void;
}) => {
  const { t } = useTranslation(['form']);

  const body = () => (
    <>
      {!loading &&
        dataSource?.map((data: any, key: number) => {
          return <TableRow key={key} data={data} tableRowKey={key} columns={columns} />;
        })}
      {!loading && dataSource?.length === 0 && emptyTableText && (
        <tr>
          <td colSpan={columns.length}>
            <EmptyTable text={emptyTableText} />
          </td>
        </tr>
      )}
    </>
  );

  return (
    <Container>
      <StyledTable dropText={t('form:table.dropFiles')}>
        <thead>
          <tr>
            {columns?.map((e: Row<T>, key: number) => {
              return (
                <Th key={key} width={e?.width}>
                  <Header transparent={!!e?.titleHide}>{e?.titleHide ? 'XXX' : e?.title}</Header>
                </Th>
              );
            })}
          </tr>
        </thead>
        {onFilesDrop ? (
          <Dropzone onDrop={onFilesDrop} noClick={true}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <>
                <input {...getInputProps()} />
                <tbody {...getRootProps()} className={isDragActive ? 'dragging' : ''}>
                  {body()}
                </tbody>
              </>
            )}
          </Dropzone>
        ) : (
          <tbody>{body()}</tbody>
        )}
        {extraRow && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>{extraRow}</td>
            </tr>
          </tfoot>
        )}
      </StyledTable>
    </Container>
  );
};

export const EmptyTable = ({ text }: { text: string }) => {
  return (
    <Text>
      {text.split('\n').map((c, key) => {
        return <Paragraph key={key}> {c} </Paragraph>;
      })}
    </Text>
  );
};

const Text = styled.div`
  color: #727272;
  text-align: center;
`;

const Paragraph = styled.p`
  line-height: 1.5;
  margin: 0;

  & + & {
    margin: 1em 0 0 0;
  }
`;

const Header = styled.div<{ transparent: boolean }>`
  font-size: 13px;
  padding: 8px 0 8px 16px;
  color: #727272;
  font-weight: 400;
  white-space: nowrap;

  &:last-child {
    padding-right: 16px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Th = styled.th<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : 'auto')};
  min-width: 70px;
`;

const StyledTable = styled.table<{ dropText: string }>`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  //min-width: 1000px;

  th {
    padding: 0;
  }

  td {
    padding: 9px 0 10px 16px;

    border-bottom: 1px solid ${(props) => props.theme.common.lightGray};
    color: ${(props) => props.theme.text.label};
    font-size: 13px;

    overflow: visible;
    vertical-align: middle;
  }

  td:last-child {
    padding-right: 16px;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  th > div {
    text-align: left;
  }

  tbody {
    position: relative;

    background-color: ${(props) => props.theme.common.content};
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.common.contentText};

    tr:first-child td:first-child {
      border-top-left-radius: 7px;
    }

    tr:first-child td:last-child {
      border-top-right-radius: 7px;
    }

    tr:last-child td:first-child {
      border-bottom-left-radius: 7px;
    }

    tr:last-child td:last-child {
      border-bottom-right-radius: 7px;
    }

    &.dragging:after {
      content: '${(props) => props.dropText}';
      position: absolute;

      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      display: flex;

      align-items: center;
      justify-content: center;

      background-color: ${(props) => props.theme.common.content};
      border-radius: 3px;
      color: ${(props) => props.theme.colors.primary.default};
      font-size: 13px;
    }
  }

  thead:first-child {
    z-index: 9999999;
  }
`;

export const Relative = styled.div`
  position: relative;
`;
