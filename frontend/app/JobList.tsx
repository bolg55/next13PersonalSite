import Image from 'next/image';

const baseUrl = process.env.SERVER_URL;

const getJobs = async () => {
  const res = await fetch(`${baseUrl}/job`);
  const jobs = await res.json();

  return jobs.data.attributes;
};

type Job = {
  id: string;
  title: string;
  company: string;
  fromDate: string;
  toDate: string;
  logo: {
    data: {
      attributes: {
        name: string;
        formats: {
          thumbnail: {
            url: string;
          };
        };
      };
    };
  };
};

type JobList = {
  job: Job[];
  resume: {
    cv: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

const JobList = async () => {
  const jobList = await getJobs();
  const { job, resume }: JobList = jobList;

  const jobListItems = job.map((job) => (
    <li key={job.id} className='flex gap-4'>
      <div className='relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5'>
        <Image
          alt={job.logo.data.attributes.name}
          src={job.logo.data.attributes.formats.thumbnail.url}
          width='32'
          height='32'
          decoding='async'
          data-nimg='1'
          className='h-7 w-7'
          loading='lazy'
        />
      </div>
      <dl className='flex flex-auto flex-wrap gap-x-2'>
        <dt className='sr-only'>Company</dt>
        <dd className='w-full flex-none text-sm font-medium text-zinc-900'>
          {job.company}
        </dd>
        <dt className='sr-only'>Role</dt>
        <dd className='text-xs text-zinc-500'>{job.title}</dd>
        <dt className='sr-only'>Date</dt>
        <dd
          className='ml-auto text-xs text-zinc-400 '
          aria-label='2019 until Present'
        >
          <time dateTime={job.fromDate}>{job.fromDate}</time>
          <span aria-hidden='true'>—</span>
          <time dateTime={job.toDate}>{job.toDate}</time>
        </dd>
      </dl>
    </li>
  ));

  return (
    <div className='border rounded-2xl border-zinc-100 p-6 bg-white'>
      <h2 className='flex text-sm font-semibold text-zinc-900'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
          aria-hidden='true'
          className='h-6 w-6 flex-none'
        >
          <path
            d='M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z'
            className='fill-zinc-100 stroke-zinc-400 '
          ></path>
          <path
            d='M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5'
            className='stroke-zinc-400 '
          ></path>
        </svg>
        <span className='ml-3'>Work</span>
      </h2>
      <ol className='mt-6 space-y-4'>
        <>{jobListItems}</>
      </ol>
      <a
        className='inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60  group mt-6 w-full'
        href={resume.cv.data.attributes.url}
        target='_blank'
        rel='noopener noreferrer'
        download
      >
        Download CV
        <svg
          viewBox='0 0 16 16'
          fill='none'
          aria-hidden='true'
          className='h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600'
        >
          <path
            d='M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>
        </svg>
      </a>
    </div>
  );
};
export default JobList;
