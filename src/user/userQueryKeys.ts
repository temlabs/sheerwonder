const userQueryKeys = {
  all: ['USERS'],
  user: (userId: string) => [...userQueryKeys.all, userId],
};

export default userQueryKeys;
