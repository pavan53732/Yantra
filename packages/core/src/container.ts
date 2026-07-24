import type { ServiceContainer, ServiceDescriptor } from './types';
import { duplicateService, missingService } from './errors';

export class RuntimeContainer implements ServiceContainer {
  private readonly descriptors = new Map<string, ServiceDescriptor>();
  private readonly singletons = new Map<string, unknown>();

  register<T>(descriptor: ServiceDescriptor<T>): void {
    if (this.descriptors.has(descriptor.id)) throw duplicateService(descriptor.id);
    this.descriptors.set(descriptor.id, descriptor);
  }

  resolve<T>(id: string): T {
    const descriptor = this.descriptors.get(id);
    if (!descriptor) throw missingService(id);

    if (descriptor.lifecycle !== 'transient') {
      if (this.singletons.has(id)) return this.singletons.get(id) as T;
      const instance = descriptor.factory(this);
      this.singletons.set(id, instance);
      return instance as T;
    }

    return descriptor.factory(this) as T;
  }

  has(id: string): boolean {
    return this.descriptors.has(id);
  }

  entries(): string[] {
    return Array.from(this.descriptors.keys()).sort();
  }
}
