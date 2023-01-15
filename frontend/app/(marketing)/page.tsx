import JobList from '../JobList';

const Page = () => {
  return (
    <>
      <h2>Hi there</h2>
      {/* @ts-expect-error Server Component */}
      <JobList />
    </>
  );
};
export default Page;
