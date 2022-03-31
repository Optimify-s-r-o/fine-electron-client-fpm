import Moment from 'react-moment';

export const DateFormat = ({ date, format }: { date: string; format?: string }) => {
  const defaultFormat = 'DD. MM. YYYY HH:mm';

  return <Moment format={format ? format : defaultFormat}>{date}</Moment>;
};
