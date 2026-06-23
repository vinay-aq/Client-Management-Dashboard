const { CLIENT_WORKFLOW } = require("../../constants/clientWorkflow");

function isValidClientTransition(currentStatus, nextStatus) {
  return CLIENT_WORKFLOW[currentStatus]?.includes(nextStatus) ;
}

module.exports = { isValidClientTransition };
