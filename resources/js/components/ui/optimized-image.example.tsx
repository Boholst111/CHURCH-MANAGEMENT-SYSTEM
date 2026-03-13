import React from 'react';
import { OptimizedImage } from './optimized-image';

/**
 * Examples demonstrating the OptimizedImage component usage
 */

export const OptimizedImageExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <OptimizedImage
          src="/images/member-photo.jpg"
          alt="Member photo"
          width={200}
          height={200}
          className="rounded-full"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">With Custom Sizes</h2>
        <OptimizedImage
          src="/images/event-banner.jpg"
          alt="Event banner"
          width={800}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
          className="rounded-lg"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">With Fallback</h2>
        <OptimizedImage
          src="/images/profile.jpg"
          alt="Profile photo"
          fallback="/images/default-avatar.png"
          width={150}
          height={150}
          className="rounded-full border-2 border-primary-200"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Eager Loading (Above the Fold)</h2>
        <OptimizedImage
          src="/images/hero-image.jpg"
          alt="Hero image"
          loading="eager"
          width={1200}
          height={600}
          objectFit="cover"
          className="rounded-xl"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Lazy Loading (Below the Fold)</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <OptimizedImage
              key={i}
              src={`/images/gallery-${i}.jpg`}
              alt={`Gallery image ${i}`}
              loading="lazy"
              width={400}
              height={300}
              className="rounded-lg"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Different Object Fit Options</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">Cover</p>
            <OptimizedImage
              src="/images/sample.jpg"
              alt="Cover example"
              width={200}
              height={200}
              objectFit="cover"
              className="rounded-lg border"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Contain</p>
            <OptimizedImage
              src="/images/sample.jpg"
              alt="Contain example"
              width={200}
              height={200}
              objectFit="contain"
              className="rounded-lg border"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Fill</p>
            <OptimizedImage
              src="/images/sample.jpg"
              alt="Fill example"
              width={200}
              height={200}
              objectFit="fill"
              className="rounded-lg border"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">With Event Handlers</h2>
        <OptimizedImage
          src="/images/test.jpg"
          alt="Test image"
          width={300}
          height={200}
          onLoad={() => console.log('Image loaded successfully')}
          onError={() => console.error('Failed to load image')}
          className="rounded-lg"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Grid of Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <OptimizedImage
              key={i}
              src={`/images/thumbnail-${i + 1}.jpg`}
              alt={`Thumbnail ${i + 1}`}
              width={250}
              height={250}
              loading="lazy"
              className="rounded-lg hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Member Card with Optimized Image</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-sm">
          <OptimizedImage
            src="/images/member-john.jpg"
            alt="John Doe"
            width={80}
            height={80}
            fallback="/images/default-avatar.png"
            className="rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-center">John Doe</h3>
          <p className="text-sm text-neutral-600 text-center">Regular Member</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Event Card with Optimized Banner</h2>
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden max-w-md">
          <OptimizedImage
            src="/images/event-worship-night.jpg"
            alt="Worship Night"
            width={400}
            height={200}
            objectFit="cover"
            loading="lazy"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Worship Night</h3>
            <p className="text-sm text-neutral-600">
              Join us for an evening of praise and worship
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedImageExamples;
