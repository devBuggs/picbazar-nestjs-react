import ContentLoader from 'react-content-loader';

const QuestionLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 900 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="40" height="40" />
    <rect x="55" y="0" rx="0" ry="0" width="220" height="14" />
    <rect x="55" y="24" rx="0" ry="0" width="80" height="14" />
    <rect x="0" y="65" rx="0" ry="0" width="900" height="60" />
  </ContentLoader>
);

export default QuestionLoader;
