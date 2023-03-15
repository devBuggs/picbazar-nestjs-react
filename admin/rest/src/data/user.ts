import { AUTH_CRED } from '@/utils/constants';
import { Routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from './client/api-endpoints';
import { userClient } from './client/user';
import { User, QueryOptionsType, UserPaginator } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';

export const useMeQuery = () => {
  return useQuery<User, Error>([API_ENDPOINTS.ME], userClient.me);
};

export function useLogin() {
  return useMutation(userClient.login);
}

export const useLogoutMutation = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation(userClient.logout, {
    onSuccess: () => {
      Cookies.remove(AUTH_CRED);
      router.replace(Routes.login);
      toast.success(t('common:successfully-logout'));
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.register, {
    onSuccess: () => {
      toast.success(t('common:successfully-register'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    },
  });
};

export const useUpdateUserMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(userClient.update, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation(userClient.changePassword);
};

export const useForgetPasswordMutation = () => {
  return useMutation(userClient.forgetPassword);
};

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation(userClient.verifyForgetPasswordToken);
};

export const useResetPasswordMutation = () => {
  return useMutation(userClient.resetPassword);
};

export const useMakeOrRevokeAdminMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.makeAdmin, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.block, {
    onSuccess: () => {
      toast.success(t('common:successfully-block'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
    },
  });
};

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.unblock, {
    onSuccess: () => {
      toast.success(t('common:successfully-unblock'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
    },
  });
};

export const useAddWalletPointsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(userClient.addWalletPoints, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useUserQuery = ({ id }: { id: string }) => {
  return useQuery<User, Error>(
    [API_ENDPOINTS.USERS, id],
    () => userClient.fetchUser({ id }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useUsersQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.USERS, params],
    () => userClient.fetchUsers(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    users: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};
