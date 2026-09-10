const clientStatuses = [
  {
    name: "Lead",
    description: "Potential client that has not yet been contacted",
    isActive: true,
    code: "LEAD",
  },
  {
    name: "Contacted",
    description: "Client has been contacted by the team",
    isActive: true,
    code: "CONTACTED",
  },
  {
    name: "Qualified",
    description: "Client has been qualified as a potential opportunity",
    isActive: true,
    code: "QUALIFIED",
  },
  {
    name: "Proposal Sent",
    description: "A proposal has been sent to the client",
    isActive: true,
    code: "PROPOSAL_SENT",
  },
  {
    name: "Approved",
    description: "Client has approved the proposal",
    isActive: true,
    code: "APPROVED",
  },
  {
    name: "Onboarded",
    description: "Client has completed the onboarding process",
    isActive: true,
    code: "ONBOARDED",
  },
  {
    name: "Suspended",
    description: "Client relationship is temporarily suspended",
    isActive: true,
    code: "SUSPENDED",
  },
  {
    name: "Archived",
    description: "Client is no longer actively managed",
    isActive: true,
    code: "ARCHIVED",
  },
];

module.exports = clientStatuses;
