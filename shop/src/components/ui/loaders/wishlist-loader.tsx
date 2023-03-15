import ContentLoader from 'react-content-loader';

const WishlistLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 900 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="13" rx="0" ry="0" width="8.2%" height="74" />
    <rect x="89" y="18" rx="0" ry="0" width="12.67%" height="18" />
    <rect x="750" y="21" rx="0" ry="0" width="7.1%" height="14" />
    <rect x="839" y="21" rx="0" ry="0" width="6.1%" height="14" />
    <rect x="89" y="51" rx="0" ry="0" width="22.2%" height="14" />
  </ContentLoader>
);

export default WishlistLoader;
