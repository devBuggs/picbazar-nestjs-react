import type {
  Attachment,
  Author,
  AuthorPaginator,
  AuthorQueryOptions,
  AuthResponse,
  CategoryPaginator,
  CategoryQueryOptions,
  ChangePasswordUserInput,
  CheckoutVerificationInput,
  CouponPaginator,
  CouponQueryOptions,
  CreateAbuseReportInput,
  CreateContactUsInput,
  CreateFeedbackInput,
  CreateOrderInput,
  CreateQuestionInput,
  CreateRefundInput,
  CreateReviewInput,
  DownloadableFilePaginator,
  Feedback,
  ForgotPasswordUserInput,
  LoginUserInput,
  Manufacturer,
  ManufacturerPaginator,
  ManufacturerQueryOptions,
  MyQuestionQueryOptions,
  MyReportsQueryOptions,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  OrderStatusPaginator,
  OtpLoginInputType,
  OTPResponse,
  PasswordChangeResponse,
  PopularProductQueryOptions,
  Product,
  ProductPaginator,
  ProductQueryOptions,
  QueryOptions,
  QuestionPaginator,
  QuestionQueryOptions,
  Refund,
  RefundPaginator,
  RegisterUserInput,
  ResetPasswordUserInput,
  Review,
  ReviewPaginator,
  ReviewQueryOptions,
  ReviewResponse,
  SendOtpCodeInputType,
  Settings,
  Shop,
  ShopPaginator,
  ShopQueryOptions,
  SocialLoginInputType,
  TagPaginator,
  TagQueryOptions,
  Type,
  TypeQueryOptions,
  UpdateReviewInput,
  UpdateUserInput,
  User,
  VerifiedCheckoutData,
  VerifyCouponInputType,
  VerifyCouponResponse,
  VerifyForgotPasswordUserInput,
  VerifyOtpInputType,
  Wishlist,
  WishlistPaginator,
  WishlistQueryOptions,
  GetParams,
  SettingsQueryOptions,
  CreateOrderPaymentInput,
  SetupIntentInfo,
  PaymentIntentCollection,
  Card,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { OTPVerifyResponse } from '@/types';

class Client {
  products = {
    all: ({
      type,
      categories,
      name,
      shop_id,
      author,
      manufacturer,
      min_price,
      max_price,
      tags,
      ...params
    }: Partial<ProductQueryOptions>) =>
      HttpClient.get<ProductPaginator>(API_ENDPOINTS.PRODUCTS, {
        searchJoin: 'and',
        with: 'type;author',
        ...params,
        search: HttpClient.formatSearchParams({
          type,
          categories,
          name,
          shop_id,
          author,
          manufacturer,
          min_price,
          max_price,
          tags,
          status: 'publish',
        }),
      }),
    popular: (params: Partial<PopularProductQueryOptions>) =>
      HttpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_POPULAR, params),

    questions: ({ question, ...params }: QuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.PRODUCTS_QUESTIONS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          question,
        }),
      }),

    get: ({ slug, language }: GetParams) =>
      HttpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`, {
        language,
        searchJoin: 'and',
        with: 'categories;shop;type;variations;variations.attribute.values;manufacturer;variation_options;tags;author',
      }),

    createFeedback: (input: CreateFeedbackInput) =>
      HttpClient.post<Feedback>(API_ENDPOINTS.FEEDBACK, input),
    createAbuseReport: (input: CreateAbuseReportInput) =>
      HttpClient.post<Review>(
        API_ENDPOINTS.PRODUCTS_REVIEWS_ABUSE_REPORT,
        input
      ),
    createQuestion: (input: CreateQuestionInput) =>
      HttpClient.post<Review>(API_ENDPOINTS.PRODUCTS_QUESTIONS, input),
  };
  myQuestions = {
    all: (params: MyQuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.MY_QUESTIONS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  myReports = {
    all: (params: MyReportsQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.MY_REPORTS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  reviews = {
    all: ({ rating, ...params }: ReviewQueryOptions) =>
      HttpClient.get<ReviewPaginator>(API_ENDPOINTS.PRODUCTS_REVIEWS, {
        searchJoin: 'and',
        with: 'user',
        ...params,
        search: HttpClient.formatSearchParams({
          rating,
        }),
      }),
    get: ({ id }: { id: string }) =>
      HttpClient.get<Review>(`${API_ENDPOINTS.PRODUCTS_REVIEWS}/${id}`),
    create: (input: CreateReviewInput) =>
      HttpClient.post<ReviewResponse>(API_ENDPOINTS.PRODUCTS_REVIEWS, input),
    update: (input: UpdateReviewInput) =>
      HttpClient.put<ReviewResponse>(
        `${API_ENDPOINTS.PRODUCTS_REVIEWS}/${input.id}`,
        input
      ),
  };
  categories = {
    all: ({ type, ...params }: Partial<CategoryQueryOptions>) =>
      HttpClient.get<CategoryPaginator>(API_ENDPOINTS.CATEGORIES, {
        searchJoin: 'and',
        ...params,
        ...(type && { search: HttpClient.formatSearchParams({ type }) }),
      }),
  };
  tags = {
    all: (params: Partial<TagQueryOptions>) =>
      HttpClient.get<TagPaginator>(API_ENDPOINTS.TAGS, params),
  };
  types = {
    all: (params?: Partial<TypeQueryOptions>) =>
      HttpClient.get<Type[]>(API_ENDPOINTS.TYPES, params),
    get: ({ slug, language }: { slug: string; language: string }) =>
      HttpClient.get<Type>(`${API_ENDPOINTS.TYPES}/${slug}`, { language }),
  };
  shops = {
    all: (params: Partial<ShopQueryOptions>) =>
      HttpClient.get<ShopPaginator>(API_ENDPOINTS.SHOPS, {
        search: HttpClient.formatSearchParams({
          is_active: '1',
        }),
        ...params,
      }),
    get: (slug: string) =>
      HttpClient.get<Shop>(`${API_ENDPOINTS.SHOPS}/${slug}`),
  };
  authors = {
    all: ({ name, ...params }: Partial<AuthorQueryOptions>) => {
      return HttpClient.get<AuthorPaginator>(API_ENDPOINTS.AUTHORS, {
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      });
    },
    top: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<Author[]>(API_ENDPOINTS.AUTHORS_TOP, params),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Author>(`${API_ENDPOINTS.AUTHORS}/${slug}`, {
        language,
      }),
  };
  manufacturers = {
    all: ({ name, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClient.get<ManufacturerPaginator>(API_ENDPOINTS.MANUFACTURERS, {
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      }),
    top: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<Manufacturer[]>(API_ENDPOINTS.MANUFACTURERS_TOP, params),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Manufacturer>(`${API_ENDPOINTS.MANUFACTURERS}/${slug}`, {
        language,
      }),
  };
  coupons = {
    all: (params: Partial<CouponQueryOptions>) =>
      HttpClient.get<CouponPaginator>(API_ENDPOINTS.COUPONS, params),
    verify: (input: VerifyCouponInputType) =>
      HttpClient.post<VerifyCouponResponse>(
        API_ENDPOINTS.COUPONS_VERIFY,
        input
      ),
  };
  orders = {
    all: (params: Partial<OrderQueryOptions>) =>
      HttpClient.get<OrderPaginator>(API_ENDPOINTS.ORDERS, {
        with: 'refund',
        ...params,
      }),
    get: (tracking_number: string) =>
      HttpClient.get<Order>(`${API_ENDPOINTS.ORDERS}/${tracking_number}`),
    create: (input: CreateOrderInput) =>
      HttpClient.post<Order>(API_ENDPOINTS.ORDERS, input),
    refunds: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<RefundPaginator>(API_ENDPOINTS.ORDERS_REFUNDS, params),
    createRefund: (input: CreateRefundInput) =>
      HttpClient.post<Refund>(API_ENDPOINTS.ORDERS_REFUNDS, input),
    payment: (input: CreateOrderPaymentInput) =>
      HttpClient.post<any>(API_ENDPOINTS.ORDERS_PAYMENT, input),
    savePaymentMethod: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.SAVE_PAYMENT_METHOD, input),

    downloadable: (query?: OrderQueryOptions) =>
      HttpClient.get<DownloadableFilePaginator>(
        API_ENDPOINTS.ORDERS_DOWNLOADS,
        query
      ),
    verify: (input: CheckoutVerificationInput) =>
      HttpClient.post<VerifiedCheckoutData>(
        API_ENDPOINTS.ORDERS_CHECKOUT_VERIFY,
        input
      ),
    generateDownloadLink: (input: { digital_file_id: string }) =>
      HttpClient.post<string>(
        API_ENDPOINTS.GENERATE_DOWNLOADABLE_PRODUCT_LINK,
        input
      ),
    getPaymentIntent: ({ tracking_number }: { tracking_number: string }) =>
      HttpClient.get<PaymentIntentCollection>(API_ENDPOINTS.PAYMENT_INTENT, {
        tracking_number,
      }),
  };
  users = {
    me: () => HttpClient.get<User>(API_ENDPOINTS.USERS_ME),
    update: (user: UpdateUserInput) =>
      HttpClient.put<User>(`${API_ENDPOINTS.USERS}/${user.id}`, user),
    login: (input: LoginUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
    socialLogin: (input: SocialLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.SOCIAL_LOGIN, input),
    sendOtpCode: (input: SendOtpCodeInputType) =>
      HttpClient.post<OTPResponse>(API_ENDPOINTS.SEND_OTP_CODE, input),
    verifyOtpCode: (input: VerifyOtpInputType) =>
      HttpClient.post<OTPVerifyResponse>(API_ENDPOINTS.VERIFY_OTP_CODE, input),
    OtpLogin: (input: OtpLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.OTP_LOGIN, input),
    register: (input: RegisterUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_REGISTER, input),
    forgotPassword: (input: ForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_FORGOT_PASSWORD,
        input
      ),
    verifyForgotPasswordToken: (input: VerifyForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_VERIFY_FORGOT_PASSWORD_TOKEN,
        input
      ),
    resetPassword: (input: ResetPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_RESET_PASSWORD,
        input
      ),
    changePassword: (input: ChangePasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_CHANGE_PASSWORD,
        input
      ),
    logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
    deleteAddress: ({ id }: { id: string }) =>
      HttpClient.delete<boolean>(`${API_ENDPOINTS.USERS_ADDRESS}/${id}`),
    subscribe: (input: { email: string }) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_SUBSCRIBE_TO_NEWSLETTER, input),
    contactUs: (input: CreateContactUsInput) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_CONTACT_US, input),
  };
  wishlist = {
    all: (params: WishlistQueryOptions) =>
      HttpClient.get<WishlistPaginator>(API_ENDPOINTS.USERS_WISHLIST, {
        with: 'shop',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
    toggle: (input: { product_id: string; language?: string }) =>
      HttpClient.post<{ in_wishlist: boolean }>(
        API_ENDPOINTS.USERS_WISHLIST_TOGGLE,
        input
      ),
    remove: (id: string) =>
      HttpClient.delete<Wishlist>(`${API_ENDPOINTS.WISHLIST}/${id}`),
    checkIsInWishlist: ({ product_id }: { product_id: string }) =>
      HttpClient.get<boolean>(
        `${API_ENDPOINTS.WISHLIST}/in_wishlist/${product_id}`
      ),
  };
  settings = {
    all: (params?: SettingsQueryOptions) =>
      HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS, { ...params }),
    upload: (input: File[]) => {
      let formData = new FormData();
      input.forEach((attachment) => {
        formData.append('attachment[]', attachment);
      });
      return HttpClient.post<Attachment[]>(API_ENDPOINTS.UPLOADS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  };
  cards = {
    all: (params?: any) => HttpClient.get<Card[]>(API_ENDPOINTS.CARDS, { ...params }),
    remove: ({ id }: { id: string }) => HttpClient.delete<any>(`${API_ENDPOINTS.CARDS}/${id}`),
    addPaymentMethod: (method_key: any) => HttpClient.post<any>(API_ENDPOINTS.CARDS, method_key),
    makeDefaultPaymentMethod: (input: any) => HttpClient.post<any>(API_ENDPOINTS.SET_DEFAULT_CARD, input),
  };
}

export default new Client();
