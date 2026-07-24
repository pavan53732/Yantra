import type { RuntimeEvent } from '@yantra/sdk';

export type ServiceFactory<T = unknown> = (container: ServiceContainer) => T;

export interface ServiceDescriptor<T = unknown> {
  id: string;
  dependencies?: string[];
  lifecycle?: 'singleton' | 'transient';
  factory: ServiceFactory<T>;
}

export interface ServiceContainer {
  register<T>(descriptor: ServiceDescriptor<T>): void;
  resolve<T>(id: string): T;
  has(id: string): boolean;
  entries(): string[];
}

export interface RuntimeConfiguration {
  environment: 'development' | 'test' | 'production';
  workspaceRoot: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface RuntimeLogger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  entries(): RuntimeLogEntry[];
}

export interface RuntimeLogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
}

export interface RuntimeLifecycleParticipant {
  id: string;
  start?(): Promise<void>;
  stop?(): Promise<void>;
  health?(): Promise<HealthStatus>;
}

export interface HealthStatus {
  id: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  details?: Record<string, unknown>;
}

export interface ExtensionRegistration {
  id: string;
  register(container: ServiceContainer): void;
}

export interface RuntimeKernel {
  container: ServiceContainer;
  events: EventBus;
  logger: RuntimeLogger;
  configuration: RuntimeConfiguration;
  start(): Promise<void>;
  stop(): Promise<void>;
  health(): Promise<HealthStatus[]>;
}

export interface EventBus {
  publish<TPayload = unknown>(event: RuntimeEvent<TPayload>): void;
  subscribe(type: string, handler: (event: RuntimeEvent) => void): () => void;
  history(): RuntimeEvent[];
}
