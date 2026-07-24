import { YantraErrorCode } from '@yantra/sdk';

export class RuntimeKernelError extends Error {
  readonly code: string;
  readonly context?: Record<string, unknown>;

  constructor(code: string, message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'RuntimeKernelError';
    this.code = code;
    this.context = context;
  }
}

export function missingService(serviceId: string): RuntimeKernelError {
  return new RuntimeKernelError(
    YantraErrorCode.CapabilityUnavailable,
    `Service not registered: ${serviceId}`,
    { serviceId }
  );
}

export function duplicateService(serviceId: string): RuntimeKernelError {
  return new RuntimeKernelError(
    YantraErrorCode.ValidationFailure,
    `Service already registered: ${serviceId}`,
    { serviceId }
  );
}
