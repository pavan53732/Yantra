export const YantraErrorCode = {
  SpecificationViolation: 'SPECIFICATION_VIOLATION',
  ValidationFailure: 'VALIDATION_FAILURE',
  CapabilityUnavailable: 'CAPABILITY_UNAVAILABLE',
  MissionPlanningFailed: 'MISSION_PLANNING_FAILED',
  MissionExecutionFailed: 'MISSION_EXECUTION_FAILED',
  VerificationFailed: 'VERIFICATION_FAILED'
} as const;

export type YantraErrorCode = typeof YantraErrorCode[keyof typeof YantraErrorCode];
