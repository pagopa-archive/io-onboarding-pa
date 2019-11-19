import {
  ApiHeaderJson,
  composeHeaderProducers,
  createFetchRequestForApi,
  RequestHeaderProducer,
  RequestHeaders
} from "italia-ts-commons/lib/requests";
import {
  createOrganizationsDefaultDecoder,
  CreateOrganizationsT,
  getDocumentDefaultDecoder,
  GetDocumentT,
  getProfileDefaultDecoder,
  GetProfileT,
  logoutDefaultDecoder,
  LogoutT,
  searchPublicAdministrationsDefaultDecoder,
  SearchPublicAdministrationsT,
  sendDocumentsDefaultDecoder,
  SendDocumentsT,
  updateProfileDefaultDecoder,
  UpdateProfileT
} from "../../generated/definitions/api/requestTypes";
import { defaultRetryingFetch } from "../utils/fetch";

function ParamAuthorizationBearerHeaderProducer<
  P extends { readonly bearerAuth: string }
>(): RequestHeaderProducer<P, "Authorization"> {
  return (p: P): RequestHeaders<"Authorization"> => {
    return {
      Authorization: `Bearer ${p.bearerAuth}`
    };
  };
}

//
// Create client
//

// tslint:disable-next-line:no-any
export function BackendClient(
  baseUrl: string,
  token: string,
  fetchApi: typeof fetch = defaultRetryingFetch()
  // tslint:disable-next-line:no-any
): any {
  const options = {
    baseUrl,
    fetchApi
  };

  const tokenHeaderProducer = ParamAuthorizationBearerHeaderProducer();

  const getProfileT: GetProfileT = {
    headers: tokenHeaderProducer,
    method: "get",
    query: _ => ({}),
    response_decoder: getProfileDefaultDecoder(),
    url: () => "/profile"
  };

  const createOrganizationsT: CreateOrganizationsT = {
    body: params => JSON.stringify(params.organizationRegistrationParams),
    headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
    method: "post",
    query: _ => ({}),
    response_decoder: createOrganizationsDefaultDecoder(),
    url: () => "/organizations"
  };

  const searchPublicAdministrationsT: SearchPublicAdministrationsT = {
    headers: ApiHeaderJson,
    method: "get",
    query: params => ({ search: params.administrationSearchParam }),
    response_decoder: searchPublicAdministrationsDefaultDecoder(),
    url: () => "/public-administrations"
  };

  const getDocumentT: GetDocumentT = {
    headers: tokenHeaderProducer,
    method: "get",
    query: _ => ({}),
    response_decoder: getDocumentDefaultDecoder(),
    url: params =>
      `/organizations/${params.ipaCode}/documents/${params.documentName}`
  };

  const sendDocumentsT: SendDocumentsT = {
    body: _ => JSON.stringify({}),
    headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
    method: "post",
    query: _ => ({}),
    response_decoder: sendDocumentsDefaultDecoder(),
    url: params => `/organizations/${params.ipaCode}/signed-documents`
  };

  const updateProfileT: UpdateProfileT = {
    body: params => JSON.stringify(params.updateUserProfile),
    headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
    method: "put",
    query: _ => ({}),
    response_decoder: updateProfileDefaultDecoder(),
    url: () => "/profile"
  };

  const logoutT: LogoutT = {
    body: _ => JSON.stringify({}),
    headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
    method: "post",
    query: _ => ({}),
    response_decoder: logoutDefaultDecoder(),
    url: () => "/logout"
  };

  // withBearerToken injects the field 'Baerer' with value token into the parameter P
  // of the f function
  const withBearerToken = <P extends { bearerAuth: string }, R>(
    f: (p: P) => Promise<R>
  ) => async (po: Omit<P, "bearerAuth">): Promise<R> => {
    const params = Object.assign({ bearerAuth: String(token) }, po) as P;
    return f(params);
  };

  return {
    createOrganization: withBearerToken(
      createFetchRequestForApi(createOrganizationsT, options)
    ),
    getDocument: withBearerToken(
      createFetchRequestForApi(getDocumentT, options)
    ),
    getProfile: withBearerToken(createFetchRequestForApi(getProfileT, options)),
    logout: withBearerToken(createFetchRequestForApi(logoutT, options)),
    searchPublicAdministrations: createFetchRequestForApi(
      searchPublicAdministrationsT,
      options
    ),
    sendDocuments: withBearerToken(
      createFetchRequestForApi(sendDocumentsT, options)
    ),
    updateProfile: withBearerToken(
      createFetchRequestForApi(updateProfileT, options)
    )
  };
}
