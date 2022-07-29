import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import {httpGetHeaders, httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser} from "../models";
import Config from "../config";

import { context, trace } from '@opentelemetry/api';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const provider = new WebTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new B3Propagator(),
});


registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      // load custom configuration for xml-http-request instrumentation
      // needs to be secured to API - need to make regex out of gateway URL in the config
      '@opentelemetry/instrumentation-xml-http-request': {
        propagateTraceHeaderCorsUrls: [
          /http:\/\/localhost:8080\.*/,
        ],
      },
      // load custom configuration for fetch instrumentation
      // needs to be secured to api
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: [
          // Config.getConfiguration().AVVIR_GATEWAY_URL,
          /http:\/\/localhost:8080\.*/,
        ],
      },
    }),
  ],


});

const  webTracerWithZone = provider.getTracer('avvir-tracer-web');

export default class Http {
  static baseUrl = (): string => Config.getConfiguration().AVVIR_GATEWAY_URL;


  static fetch(url: RequestInfo, data) {
    if (Config.getConfiguration().logFetch) {
      console.log("Calling fetch with:", url, data);
    }
    return fetch(url, data);
  }

  static get(url: RequestInfo, user: User, contentType = "application/json") {
    return Http.fetch(url, {
      method: "GET",
      headers: {
        ...httpGetHeaders(contentType),
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static put(url: RequestInfo, user: User, body?: any, contentType = "application/json") {
    return Http.fetch(url, {
      method: "PUT",
      headers: {
        ...httpPostHeaders(contentType),
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
    });
  }

  static delete(url: RequestInfo, user: User) {
    return Http.fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static post(url: RequestInfo, user: User, body?: any) {
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
    });
  }

  static patch(url: RequestInfo, user: User, body: any) {
    return Http.fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    });
  }

  static addAuthToDownloadUrl(baseUrl: string, user: User): string {
    if (user) {
      if (isGatewayUser(user)) {
        return `${baseUrl}?auth=${user.gatewayUser.idToken}`;
      } else if (isFirebaseUser(user)) {
        return `${baseUrl}?firebaseAuth=${user.firebaseUser.idToken}`;
      }
    } else {
      return baseUrl;
    }
  }

  static __fetch;
}
