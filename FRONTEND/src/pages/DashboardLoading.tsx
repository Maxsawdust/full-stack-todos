import { Heading, LoadingSpinner } from "../components";

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Heading big>Loading...</Heading>
      <LoadingSpinner />
    </div>
  );
}
