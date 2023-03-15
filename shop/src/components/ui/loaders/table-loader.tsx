import ContentLoader from 'react-content-loader';

const TableLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={300}
    viewBox="0 0 875 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="900" height="35" />
    <rect x="0" y="55" rx="0" ry="0" width="80" height="245" />
    <rect x="105" y="55" rx="0" ry="0" width="250" height="245" />
    <rect x="380" y="55" rx="0" ry="0" width="120" height="245" />
    <rect x="525" y="55" rx="0" ry="0" width="120" height="245" />
    <rect x="670" y="55" rx="0" ry="0" width="100" height="245" />
    <rect x="795" y="55" rx="0" ry="0" width="80" height="245" />
  </ContentLoader>
);

export default TableLoader;
