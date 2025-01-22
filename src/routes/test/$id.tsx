import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/test/$id')({
  component: TestComponent,
});

function TestComponent() {
  const { id } = Route.useParams();
  return <div>Post {id}</div>;
}
  