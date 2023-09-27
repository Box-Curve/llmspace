// Comment to explain what the code does
// This code processes IPs from F5 Silverline and creates corresponding records in the sn_ti_observable table and security tags in the sn_security_tag table.
function processIPs(ips, tagType) {
    let observableCount = 0;
    let tagCount = 0;
  
    ips.forEach(function(ip) {
      let observable = new GlideRecord('sn_ti_observable');
      observable.addQuery('value', ip.toString()); // Updated to use toString()
      observable.query();
  
      if (!observable.next()) {
        observable.initialize();
        observable.setValue('value', ip.toString()); // Updated to use toString()
        observable.setValue('type', 'IP');
        observable.insert();
        observableCount++;
      }
  
      let securityTag = new GlideRecord('sn_security_tag');
      // Removed securityTag.initialize() as it is not necessary
      securityTag.setValue('name', tagType);
      securityTag.setValue('observable', observable.getUniqueValue());
      securityTag.insert();
      tagCount++;
    });
  
    return { observableCount, tagCount };
  }
  
  let allowlistIPs = getAllowlistIPsFromF5Silverline();
  let { observableCount: allowlistObservableCount, tagCount: allowlistTagCount } = processIPs(allowlistIPs, 'AllowlistIP');
  
  let denylistIPs = getDenylistIPsFromF5Silverline();
  let { observableCount: denylistObservableCount, tagCount: denylistTagCount } = processIPs(denylistIPs, 'BlocklistIP');
  
  let summaryMessage = 'Summary:\n';
  summaryMessage += 'Number of records added to the sn_ti_observable table: ' + (allowlistObservableCount + denylistObservableCount) + '\n';
  summaryMessage += 'Number of AllowlistIP tags added: ' + allowlistTagCount + '\n';
  summaryMessage += 'Number of BlocklistIP tags added: ' + denylistTagCount + '\n';
  summaryMessage += 'Total number of records processed: ' + (allowlistIPs.length + denylistIPs.length) + '\n';
  
  gs.log(summaryMessage);
  