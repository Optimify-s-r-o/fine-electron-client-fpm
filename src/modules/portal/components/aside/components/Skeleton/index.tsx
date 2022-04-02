import ContentLoader from 'react-content-loader';

export const Skeleton = ({ columns = 10 }: { columns?: number }) => {
  return (
    <ContentLoader
      speed={2}
      width={200}
      height={200}
      viewBox="0 0 200 200"
      backgroundColor="#e9e9e9f0"
      foregroundColor="#efefef">
      <rect x="23" y="3" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="3" rx="2" ry="4" width="15" height="15" />

      <rect x="23" y="22" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="22" rx="2" ry="4" width="15" height="15" />

      <rect x="23" y="41" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="41" rx="2" ry="4" width="15" height="15" />

      <rect x="23" y="60" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="60" rx="2" ry="4" width="15" height="15" />

      <rect x="23" y="79" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="79" rx="2" ry="4" width="15" height="15" />

      <rect x="23" y="98" rx="2" ry="4" width="160" height="15" />
      <rect x="3" y="98" rx="2" ry="4" width="15" height="15" />
    </ContentLoader>
  );
};
