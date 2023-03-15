import { useGroupsQuery } from '../gql/groups.graphql';
const useHomepage = () => {
  const { data } = useGroupsQuery();
  const homePage =
    data?.types?.find((type:any) => type?.settings?.isHome) ?? data?.types?.[0];
  return {
    homePage,
  };
};

export default useHomepage;
