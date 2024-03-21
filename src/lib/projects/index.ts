import { MasterProject } from '@/types/projects';
import { ProjectInputGroup } from './listingConfig';

/**
 * Used to get the specific key used to access the project details considering the type of project
 * @param project ProjectData
 * @returns ProjectDetailsSpecificKeys
 */
export const getProjectDetailsKey = (
  project: MasterProject
): ProjectDetailsSpecificKeys => {
  if (!!project.fundProject) return 'fundProject';
  if (!!project.privateEquityProject) return 'privateEquityProject';
  if (!!project.artProject) return 'artProject';
  return 'realStateProject';
};

export const getProjectJsonFieldsAsArray = (
  project: MasterProject,
  step: ProjectInputGroup
): Array<JsonFieldsStruct> => {
  return (
    (jsonFieldsTypeGuard(project) &&
      project.jsonFields?.[step] &&
      Object.values(project.jsonFields[step])) ||
    []
  );
};

export type JsonFieldsStruct = {
  id: string;
  label: string | null;
  value: string | null;
};

export type JsonFields =
  | { [k in ProjectInputGroup]: { [k: string]: JsonFieldsStruct } }
  | null;

export const jsonFieldsTypeGuard = (
  data: object
): data is { jsonFields: JsonFields } => {
  return (
    Boolean(data) &&
    'jsonFields' in data &&
    Boolean(data?.jsonFields) &&
    typeof data?.jsonFields === 'object'
  );
};

export type ProjectDetailsSpecificKeys =
  | 'privateEquityProject'
  | 'realStateProject'
  | 'artProject'
  | 'fundProject';
