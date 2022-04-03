import { ReactNode } from 'react';
import { CardTable } from './CardTable';

interface Attribute {
  title?: ReactNode;
  value?: ReactNode;
}

const AttributesTable = ({
  attributes,
  header
}: {
  attributes: Array<Attribute>;
  header?: Attribute;
}) => {
  return (
    <CardTable
      columns={[
        {
          title: header?.title,
          render: (text: string, _record: Attribute) => text,
          dataIndex: 'title'
        },
        {
          title: header?.value,
          render: (text: string, _record: Attribute) => text,
          dataIndex: 'value'
        }
      ]}
      dataSource={attributes}
    />
  );
};

export default AttributesTable;
