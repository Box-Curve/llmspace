/**
 * Function to check the log status of all Configuration Items (CIs) in Sentinel.
 */
function checkLogStatuses() {
  
    // Hypothetical function to dynamically retrieve the token to authenticate API requests.
    // Ensures secure and dynamic token retrieval.
    var accessToken = getAccessToken(); 
    
    // Hypothetical function to retrieve the lookup table that maps CI names in ServiceNow to device names in Sentinel.
    // Ensures proper mapping between ServiceNow CIs and Sentinel devices.
    var lookupTable = getLookupTable(); 
    
    // Creating a new instance of RESTMessageV2 to handle outbound REST messages to Sentinel's API.
    var restMessage = new sn_ws.RESTMessageV2();
    
    // Setting the endpoint URL to Sentinel's API endpoint to get data related to devices.
    restMessage.setEndpoint('https://api.loganalytics.io/v1/workspaces/' + YOUR_SENTINEL_WORKSPACE_ID + '/query');
    
    // Setting the HTTP method to POST to send the query to Sentinel's API.
    restMessage.setHttpMethod('POST');
    
    // Setting the Authorization header with the retrieved access token for authenticating to Sentinel's API.
    restMessage.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    
    // Constructing the Kusto Query Language (KQL) query to fetch the full list of devices from Sentinel
    // with their current status and the timestamp of the last log received.
    // It joins the device list with the lookup table to map the CI names in ServiceNow.
    var listQuery = "SELECT LookupTable.`CI Name`, CommonSecurityLog.TimeGenerated, CommonSecurityLog.Status " +
                    "FROM CommonSecurityLog " +
                    "JOIN LookupTable ON CommonSecurityLog.ComputerName = LookupTable.`Device Name`";
    
    // Setting the constructed KQL query as the request body in JSON format.
    restMessage.setRequestBody(JSON.stringify({ "query": listQuery }));
    
    // Executing the API request to Sentinel and storing the response.
    var response = restMessage.execute();
    
    // Getting the HTTP status code of the response to check the success of the API request.
    var httpStatus = response.getStatusCode();
    
    // Parsing the JSON response body to extract the list of devices and their data.
    var responseBody = JSON.parse(response.getBody());
    
    // Checking the HTTP status and if there are any errors in the response body.
    // Logging any errors and stopping the execution of the function if errors are found.
    if (httpStatus !== 200 || responseBody.error)

    {
    // Constructing an error message based on the received error in the response body, if available, 
    // else setting a default error message.
    var errorMsg = (responseBody.error && responseBody.error.message) ? responseBody.error.message : 'API request failed';
    
    // Logging the constructed error message along with the received HTTP status code for debugging purposes.
    gs.error('Error: ' + errorMsg + '. HTTP Status Code: ' + httpStatus);
    
    // Exiting the function early due to the error, preventing further execution.
    return;
  }

  // Checking the existence and length of the 'value' array in the response body, 
  // which supposedly holds the list of devices and their details.
  if (!responseBody.value || responseBody.value.length === 0) {
    
    // Logging a warning message if no device details are found in the response body.
    gs.warn('No device details returned from Sentinel.');
    
    // Exiting the function early due to lack of data, preventing further processing.
    return;
  }
   // Iterating over each item (device details) in the 'value' array of the response body.
  responseBody.value.forEach(function(device) {
    
    // Extracting the CI Name, Status, and TimeGenerated (timestamp of the last log received) 
    // from each item (device details).
    var ciName = device['CI Name'];
    var status = device.Status;
    var lastLogReceivedTime = device.TimeGenerated;
    
    // Performing appropriate actions, comparisons, updates, and notifications based on extracted data.
    // For example, generating alerts if the status is undesirable, or if the last log received is older than a certain threshold.
    // Actual implementation will depend on specific requirements and logic.

    // Matching each device against ServiceNow CI records locally, and updating the CI records as necessary.
    // For instance, comparing 'ciName' with names of CI records in ServiceNow and updating the matched CI record's status and last log received time.
    
    // ...
    // Implement required logic for each device detail here.
    // ...
    
  });

}

// Calling the checkLogStatuses() function to initiate the process.
checkLogStatuses();
