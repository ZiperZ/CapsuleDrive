'use client';

import RepositoryItem, { RepositoryItemProps } from '@/components/RepositoryItem';

interface RepositoryViewProps {
  items: RepositoryItemProps[];
}

const RepositoryView = ({ items }: RepositoryViewProps) => {
  const repoElements = items.map(i => <RepositoryItem key={i.title} title={i.title} itemType={i.itemType} />);
  // TODO: implement drag/move/delete etc. 

  return (
    <div>
      { repoElements }
    </div>
  );
};
export default RepositoryView;