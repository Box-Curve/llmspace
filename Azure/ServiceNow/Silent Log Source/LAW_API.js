/**
 * Function to get an access token using OAuth.
 *
 * @returns {string} The access token.
 */
async function getAccessToken() {
      // Create a new OAuth2 client.
      const oauth2Client = new OAuth2Client({
       clientId: $API_Client_ID,
       clientSecret: $API_Client_Secret,
       tenantId: $API_Tenant_ID,
       authUri: $API_Identity_URL,
       tokenUri: $API_Identity_URL + '/oauth2/v2.0/token',
      });
      
      // Get the access token.
      const accessToken = await oauth2Client.getAccessToken({
       scope: $API_Azure_Resource_Manager,
      });
      
      return accessToken;
     }
      
     /**
      * Function to check the log status of all Configuration Items (CIs) in Sentinel.
      */
     async function checkLogStatuses() {
      try {
       // Get the access token and lookup table.
       const accessToken = await getAccessToken();
       const lookupTable = await getLookupTable();
      
       // Create a new RESTMessageV2 object.
       const restMessage = new sn_ws.RESTMessageV2();
      
       // Set the endpoint URL and HTTP method.
       restMessage.setEndpoint('https://api.loganalytics.io/v1/workspaces/' + WORKSPACE_ID + '/query');
       restMessage.setHttpMethod('POST');
      
       // Set the Authorization header.
       restMessage.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      
       // Construct the KQL query.
       const listQuery = `
         SELECT LookupTable.\`CI Name\`, CommonSecurityLog.DeviceId, CommonSecurityLog.SerialNumber, CommonSecurityLog.TimeGenerated, CommonSecurityLog.Status
         FROM CommonSecurityLog
         JOIN LookupTable ON CommonSecurityLog.ComputerName = LookupTable.\`Device Name\`;
       `;
      
       // Set the request body.
       restMessage.setRequestBody(JSON.stringify({ "query": listQuery }));
      
       // Execute the API request and get the response.
       const response = await restMessage.execute();
      
       // Check the HTTP status code and parse the response body.
       const httpStatus = response.getStatusCode();
       const responseBody = JSON.parse(response.getBody());
      
       // Handle errors.
       if (httpStatus !== 200 || responseBody.error) {
        const errorMsg = responseBody.error?.message || 'API request failed';
        logger.error(`Error: ${errorMsg}. HTTP Status Code: ${httpStatus}`);
        return;
       }
      
       // Handle empty response.
       if (!responseBody.value || !responseBody.value.length) {
        logger.warn('No device details returned from Sentinel.');
        return;
       }
      
       // Iterate over the device list and handle each device info.
       responseBody.value.forEach(async function(device) {
        try {
         const { ['CI Name']: ciName, DeviceId, SerialNumber, TimeGenerated, Status } = device;
      
         // More modular and detailed logic for handling each device
         await handleDeviceInfo(ciName, DeviceId, SerialNumber, TimeGenerated, Status, lookupTable);
        } catch (error) {
         logger.error(`Unexpected error occurred while handling device info for CI ${ciName}: `, error);
        }
       });
      } catch (error) {
       logger.error('Unexpected error occurred: ', error);
      }
     }
      
     /**
      * Function to handle the device info for a given CI.
    