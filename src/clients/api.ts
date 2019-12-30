import {
  ApiHeaderJson,
  composeHeaderProducers,
  composeResponseDecoders,
  constantResponseDecoder,
  createFetchRequestForApi,
  RequestHeaderProducer,
  RequestHeaders
} from "italia-ts-commons/lib/requests";

import {
  createOrganizationsDefaultDecoder,
  CreateOrganizationsT,
  getDocumentDefaultDecoder,
  GetDocumentT,
  getOrganizationsDefaultDecoder,
  GetOrganizationsT,
  getProfileDefaultDecoder,
  GetProfileT,
  LogoutT,
  searchPublicAdministrationsDefaultDecoder,
  SearchPublicAdministrationsT,
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

/*
 * Custom decoder to temporary fix problem with 204-no content response
 * TODO: change it with generated class - tracked with story https://www.pivotaltracker.com/story/show/169836423
 */
// Decodes the success response with a custom success type
// tslint:disable-next-line:typedef
function sendDocumentsCustomDecoder() {
  return composeResponseDecoders(
    composeResponseDecoders(
      composeResponseDecoders(
        composeResponseDecoders(
          composeResponseDecoders(
            composeResponseDecoders(
              constantResponseDecoder<undefined, 204>(204, undefined),
              constantResponseDecoder<undefined, 400>(400, undefined)
            ),
            constantResponseDecoder<undefined, 401>(401, undefined)
          ),
          constantResponseDecoder<undefined, 403>(403, undefined)
        ),
        constantResponseDecoder<undefined, 404>(404, undefined)
      ),
      constantResponseDecoder<undefined, 429>(429, undefined)
    ),
    constantResponseDecoder<undefined, 503>(503, undefined)
  );
}

// Decodes the success response with the type defined in the specs
const sendDocumentsCustomDefaultDecoder = () => sendDocumentsCustomDecoder();

/*
 * Custom decoder to temporary fix problem with 204-no content response
 * TODO: change it with generated class - tracked with story https://www.pivotaltracker.com/story/show/169836423
 */
// Decodes the success response with a custom success type
// tslint:disable-next-line:typedef
function logoutCustomDecoder<A, O>() {
  return composeResponseDecoders(
    composeResponseDecoders(
      composeResponseDecoders(
        composeResponseDecoders(
          constantResponseDecoder<undefined, 204>(204, undefined),
          constantResponseDecoder<undefined, 400>(400, undefined)
        ),
        constantResponseDecoder<undefined, 401>(401, undefined)
      ),
      constantResponseDecoder<undefined, 429>(429, undefined)
    ),
    constantResponseDecoder<undefined, 503>(503, undefined)
  );
}

// Decodes the success response with the type defined in the specs
const logoutCustomDefaultDecoder = () => logoutCustomDecoder();

/*
 * Create client
 */

// tslint:disable-next-line: typedef
export function BackendClient(
  baseUrl: string,
  token: string,
  fetchApi: typeof fetch = defaultRetryingFetch()
) {
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

  const getOrganizationsT: GetOrganizationsT = {
    headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
    method: "get",
    query: _ => ({}),
    response_decoder: getOrganizationsDefaultDecoder(),
    url: () => "/organizations"
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
    response_decoder: sendDocumentsCustomDefaultDecoder(),
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
    response_decoder: logoutCustomDefaultDecoder(),
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
    createOrganizations: withBearerToken(
      createFetchRequestForApi(createOrganizationsT, options)
    ),
    getDocument: withBearerToken(
      createFetchRequestForApi(getDocumentT, options)
    ),
    getOrganizations: withBearerToken(
      createFetchRequestForApi(getOrganizationsT, options)
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
