import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import CommentApi from "../../source/api/comment_api";
import {makeStoreContents} from "../test_utils/test_factories";
import {ApiComment, ApiCommentThread, ApiUser, User, UserRole, UserAuthType} from "../../source";
import Http from "../../source/utilities/http";

describe("CommentApi", () => {
  let user: User, fakeGetState;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {
      authType: UserAuthType.FIREBASE,
      firebaseUser: {uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token"}
    };
    fakeGetState = () => makeStoreContents({
      user,
    });
  });

  describe("::getCommentThreads", () => {
    let author = new ApiUser({email: "some-user@email.com", role: UserRole.USER});
    beforeEach(() => {
      let response = new ApiCommentThread({
        id: 4,
        author,
        viewId: 7,
        comments: [new ApiComment({
          id: 1,
          author,
          text: "some text",
          commentThreadId: 4,
          date: 12345689
        })]
      });

      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/comments/threads`, response);
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/comments/threads?floorId=some-floor&scanDatasetId=some-scan-dataset&viewId=4`, response);
    });

    it("makes a call to the endpoint", () => {
      CommentApi.getCommentThreads({
          projectId: "some-project-id"
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/comments/threads`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("makes a call to the endpoint with additional query parameters", () => {
      CommentApi.getCommentThreads({
          projectId: "some-project-id",
          floorId: "some-floor",
          scanDatasetId: "some-scan-dataset",
          viewId: 4
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/comments/threads?floorId=some-floor&scanDatasetId=some-scan-dataset&viewId=4`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      CommentApi.getCommentThreads({
          projectId: "some-project-id"
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createCommentThread", () => {
    let author;
    let apiThread;
    beforeEach(() => {
      author = new ApiUser({email: "some-user@email.com", role: UserRole.USER});
      apiThread = new ApiCommentThread({
        author,
        viewId: 7,
        comments: [new ApiComment({
          id: 1,
          author,
          text: "some text",
          commentThreadId: 4,
          date: 12345689
        })]
      });

      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/comments/threads`,
        new ApiCommentThread({
          id: 4,
          author,
          viewId: 7,
          comments: [new ApiComment({
            id: 1,
            author,
            text: "some text",
            commentThreadId: 4,
            date: 12345689
          })]
        }));
    });

    it("makes a call to the endpoint", () => {
      CommentApi.createCommentThread({
          projectId: "some-project-id"
        },
        apiThread,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/comments/threads`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      CommentApi.createCommentThread({
          projectId: "some-project-id",
        },
        apiThread,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createCommentForThread", () => {
    let author;
    let apiComment;
    beforeEach(() => {
      author = new ApiUser({email: "some-user@email.com", role: UserRole.USER});
      apiComment = new ApiComment({
        id: 1,
        author,
        text: "some text",
        commentThreadId: 4,
        date: 12345689
      });

      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/comments/threads/4`,
        new ApiComment({
          id: 1,
          author,
          text: "some text",
          commentThreadId: 4,
          date: 12345689
        })
      );
    });

    it("makes a call to the endpoint", () => {
      CommentApi.createCommentForThread({
          projectId: "some-project-id",
        commentThreadId: 4
        },
        apiComment,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/comments/threads/4`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      CommentApi.createCommentForThread({
          projectId: "some-project-id",
        commentThreadId: 4
        },
        apiComment,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::updateComment", () => {
    let author;
    let apiComment;
    beforeEach(() => {
      author = new ApiUser({email: "some-user@email.com", role: UserRole.USER});
      apiComment = new ApiComment({
        id: 1,
        author,
        text: "some updated text",
        commentThreadId: 4,
        date: 12345689
      });

      fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/comments/1`,
        new ApiComment({
          id: 1,
          author,
          text: "some updated text",
          commentThreadId: 4,
          date: 12345689
        })
      );
    });

    it("makes a call to the endpoint", () => {
      CommentApi.updateComment({
          projectId: "some-project-id",
        commentId: 1
        },
        apiComment,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/comments/1`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      CommentApi.updateComment({
          projectId: "some-project-id",
          commentId: 1
        },
        apiComment,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

});