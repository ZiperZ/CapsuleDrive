'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

import { RepositoryItemProps } from '@/components/RepositoryItem';
import RepositoryView from '@/components/RepositoryView';

const handleFetch = async (repositoryName: string, signal: AbortSignal | undefined) => {
  type FetchedDataType = { 
    directoryContents: Array<RepositoryItemProps>
  };
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, { signal });
  const response = await client.request<FetchedDataType, { repositoryName: string }>(gql`#graphql
    query FetchDirectoryItems($repositoryName: String!) {
      directoryContents(repositoryName: $repositoryName) {
        id
        name
        size
        path
      }
    }
  `, {
    repositoryName
  });

  return response.directoryContents;
};

const Page = () => {
  const { repositoryName } = useParams();
  const { data, status } = useQuery([repositoryName], ({ signal }) => handleFetch(repositoryName, signal));

  let items: RepositoryItemProps[] = [];
  if (status === 'success') {
    items = data;
  }

  return (
    <div className="">
      <RepositoryView items={items} />
    </div>
  );
};
export default Page;