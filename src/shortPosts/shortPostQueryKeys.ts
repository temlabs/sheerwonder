const shortPostQueryKeys = {
  all: ['SHORT_POSTS'],
  createdBy: (userId: string) => [...shortPostQueryKeys.all, userId],
};

export default shortPostQueryKeys;
