import { useModalAction } from '@/components/ui/modal/modal.context';
import type {
  PopularProductQueryOptions,
  ProductQueryOptions,
  QuestionQueryOptions,
} from '@/types';
import { NetworkStatus } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import {
  CreateAbusiveReportInput,
  CreateFeedbackInput,
  CreateQuestionInput,
} from '__generated__/__types__';
import {
  useCreateAbuseReportMutation,
  useCreateFeedbackMutation,
  useCreateQuestionMutation,
  usePopularProductsQuery,
  useProductQuery,
  useProductsQuery,
  useQuestionsQuery,
} from './gql/products.graphql';
import { getProducts } from './utils/products';
import { useRouter } from 'next/router';

export function useProducts(options: Partial<ProductQueryOptions>) {
  const { locale } = useRouter();

  const localeOptions = {
    language: locale,
    ...getProducts(options),
  };

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useProductsQuery({
    variables: localeOptions,
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.products?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.products?.paginatorInfo?.currentPage + 1,
          // first: 30,
        },
      });
    }
  }

  return {
    products: data?.products?.data ?? [],
    paginatorInfo: data?.products?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.products?.paginatorInfo?.hasMorePages),
  };
}

export const usePopularProducts = (
  options: Partial<PopularProductQueryOptions>
) => {
  const { locale } = useRouter();

  const localeOptions = {
    language: locale,
    ...options,
  };

  const {
    data,
    loading: isLoading,
    error,
  } = usePopularProductsQuery({
    variables: localeOptions,
  });

  return {
    products: data?.popularProducts ?? [],
    isLoading,
    error,
  };
};

export function useProduct({ slug }: { slug: string }) {
  const { locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
  } = useProductQuery({
    variables: {
      slug,
      language: locale,
    },
  });
  return {
    product: data?.product,
    isLoading,
    error,
  };
}

export function useQuestions({
  limit,
  question,
  ...options
}: Partial<QuestionQueryOptions>) {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuestionsQuery({
    variables: {
      ...options,
      ...(question && { question: `%${question}%` }),
      first: limit,
    },
  });
  return {
    questions: data?.questions?.data ?? [],
    paginatorInfo: data?.questions?.paginatorInfo,
    isLoading,
    error,
  };
}

export function useCreateFeedback() {
  const { t } = useTranslation('common');
  const [create, { loading: isLoading }] = useCreateFeedbackMutation({
    refetchQueries: ['Questions', 'Reviews'],
    onCompleted: (data: any) => {
      toast.success(t('text-feedback-submitted'));
    },
  });

  function createFeedback(input: CreateFeedbackInput) {
    create({ variables: { input } });
  }

  return {
    createFeedback,
    isLoading,
  };
}

export function useCreateAbuseReport() {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const [create, { loading: isLoading }] = useCreateAbuseReportMutation({
    onCompleted: (data) => {
      toast.success(t('text-abuse-report-submitted'));
      closeModal();
    },
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  function createAbuseReport(input: CreateAbusiveReportInput) {
    create({ variables: { input } });
  }

  return {
    createAbuseReport,
    isLoading,
  };
}

export function useCreateQuestion() {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const [create, { loading: isLoading }] = useCreateQuestionMutation({
    refetchQueries: ['Questions'],
    onCompleted: (data) => {
      toast.success(t('text-question-submitted'));
      closeModal();
    },
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  function createQuestion(input: CreateQuestionInput) {
    create({ variables: { input } });
  }

  return {
    createQuestion,
    isLoading,
  };
}
