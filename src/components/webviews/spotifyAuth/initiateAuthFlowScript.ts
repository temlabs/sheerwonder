const initiateAuthFlowScript = `
const clientId = '2643e388efb64df690de5adc82c06369';
const scope =
  'user-read-private user-read-email user-read-currently-playing streaming playlist-read-private';
const redirectUri = 'sheer-wonder://home';
const queryObject = {        
response_type: 'code',
        client_id:clientId,
        scope: scope,
        redirect_uri:redirectUri
      };
    const queryParams = new URLSearchParams(queryObject);
    const queryString = queryParams.toString();
    window.location.href = 'https://accounts.spotify.com/authorize?'+queryString
    document.documentElement.style.paddingBottom = '100px';
    return;
    //var event = new CustomEvent('changeUrl', { detail: { url: 'https://accounts.spotify.com/authorize?'+queryString } });
    //document.dispatchEvent(event);
`;

export default initiateAuthFlowScript;
