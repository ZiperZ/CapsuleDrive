'use client';

export interface RepositoryItemProps {
  title: string;
  itemType: 'file' | 'directory';
}

const RepositoryItem = ({ title, itemType }: RepositoryItemProps) => {
  return (
    <div className="relative w-4 h-4 p-2 group">
      <div className="absolute w-full h-full -z-10 bg-slate-600 opacity-0 group-hover:opacity-30"></div>

      <img src="" />  {/* TODO: change src according to filetype */}
      <span className="font-[poppins]">{ title }</span>
    </div>
  );
};
export default RepositoryItem;