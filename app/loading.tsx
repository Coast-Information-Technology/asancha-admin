import { Skeleton } from '../src/components/ui/skeleton/skeleton';

export default function Loading() {
  return (
    <main aria-label="Loading page" className="asancha-page-shell" role="status">
      <Skeleton height="2.25rem" rounded />
      <Skeleton height="5rem" rounded />
      <section className="asancha-card-grid" aria-label="Loading content">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton height="10rem" key={index} rounded />
        ))}
      </section>
    </main>
  );
}
