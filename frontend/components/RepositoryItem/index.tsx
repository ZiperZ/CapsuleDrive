interface RepositoryItemProperties {
  name: string;
  filetype: string;
}

const RepositoryItem = ({ name, filetype }: RepositoryItemProperties) => {
  return (
    <div className="relative w-4 h-4 group">
      {/* background color of the item */}
      {/* it becomes semi-opaque black when item is hovered or clicked */}
      <div className="absolute w-full h-full -z-10 bg-slate-600 opacity-0 group-hover:opacity-30"></div>

      <img alt={`file of type ${filetype}`} src="" />  {/* TODO: change src according to filetype */}
      <span className="font-[poppins]">{ name }</span>
    </div>
  );
};
export default RepositoryItem;