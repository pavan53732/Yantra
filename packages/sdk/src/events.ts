export const RuntimeEventTypes = {
  MissionCreated: 'mission.created',
  MissionPlanned: 'mission.planned',
  MissionExecuting: 'mission.executing',
  MissionVerified: 'mission.verified',
  MissionCompleted: 'mission.completed',
  CapabilityRegistered: 'capability.registered',
  CapabilityInvoked: 'capability.invoked',
  VerifierCompleted: 'verifier.completed'
} as const;

export type RuntimeEventType = typeof RuntimeEventTypes[keyof typeof RuntimeEventTypes];
