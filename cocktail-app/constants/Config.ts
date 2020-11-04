export default class AppConfiguration {
    static readonly GQLBackendUrl = 'http://localhost:4000/api/graphql';
    static readonly storageKeyForAuth = 'AUTH_KEY';
    static readonly storageKeyForUserDetails = 'USER_DETAILS_KEY';
    static readonly loginFailedMessage = 'Login failed due to invalid credential';
}