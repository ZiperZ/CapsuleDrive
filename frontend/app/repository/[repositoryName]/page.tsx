'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { gql, request } from 'graphql-request';

import RepositoryItem from '@/components/RepositoryItem';
import RepositoryView from '@/components/RepositoryView';

const handleFetch = async (repositoryName: string) => {
  const response = await request(process.env.NEXT_PUBLIC_API_URL, gql`
    query($repositoryName: String!) {
      repositoryByName(repositoryName: $repositoryName)
    }
  `, {
    repositoryName
  });
};

const Page = () => {
  const { repositoryName } = useParams();
  const { data, status } = useQuery([repositoryName], () => handleFetch(repositoryName));

  return (
    <div className="">
      <RepositoryView>
        <RepositoryItem key="1" name="test" filetype="text" />
        <RepositoryItem key="2" name="test" filetype="text" />
        <RepositoryItem key="3" name="test" filetype="text" />
        <RepositoryItem key="4" name="test" filetype="text" />
      </RepositoryView>
    </div>
  );
};
export default Page;