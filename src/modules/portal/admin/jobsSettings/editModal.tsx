import { Button } from 'components/Form/Button';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { FloatRight, Gap, HR } from 'constants/globalStyles';
import { UseFormRegister } from 'react-hook-form';
import { TFunction } from 'react-i18next';
import styled from 'styled-components';

const editModal = (register: UseFormRegister<any>, onSubmit: () => void, t: TFunction) => ({
  title: t('form:table.jobEdit'),
  content: (
    <>
      <Row>
        <TextInput title={t('form:table.jobName')} name="name" register={register} />
        <TextInput title={t('form:table.jobCode')} name="code" register={register} />
      </Row>
      <HR />
      <Row>
        <TextInput title={'Normalized name'} name="name" register={register} />
        <TextInput title={'Translation'} name="code" register={register} />
      </Row>
      <Row>
        <TextInput title={'Normalized name'} name="name" register={register} />
        <TextInput title={'Translation'} name="code" register={register} />
      </Row>
      <Row>
        <TextInput title={'Normalized name'} name="name" register={register} />
        <TextInput title={'Translation'} name="code" register={register} />
      </Row>
    </>
  ),
  footer: (
    <FloatRight>
      <Button loading={false}>{t('form:button.save')}</Button>
    </FloatRight>
  ),
  onSubmit
});

export default editModal;

const Row = styled(Gap)`
  > * {
    width: 300px;
  }
`;
