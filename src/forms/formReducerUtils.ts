// export type ActionValueMap<Actions extends string> = {[key in Actions]: any};

export interface FormAction<
  ActionValueMap,
  Action extends keyof ActionValueMap,
> {
  type: Action;
  payload: ActionValueMap[Action];
}

export type AllFormActions<ActionValueMap> = {
  [Action in keyof ActionValueMap]: FormAction<ActionValueMap, Action>;
}[keyof ActionValueMap];
