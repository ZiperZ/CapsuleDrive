import type { Resolver } from './types';
import Repository from '@Models/Repository';

export default (async (parent, args, contextValue) => {
  const repoName = args.repository;
  const folderPath = args.path;

  // FIXME: merge into a single sql query
  const repository = await Repository.findOne({
    where: {
      name: repoName
    }
  });
  const isOwner = repository?.hasOwnerUser(contextValue.user?.id);
  const isShared = repository?.hasSharedUser(contextValue.user?.id);
  if (!repository || !contextValue.user || (!isOwner && !isShared)) {
    throw Error('Either repository does not exists or you\'re not privileged to access it.');
  }
  const folder = (await repository.getFolders({ where: { path: folderPath } }))[0];
  // folder.getFiles(); // FIXME: implement it
  return [];

}) as Resolver<{}, { repository: string, path: string }>;