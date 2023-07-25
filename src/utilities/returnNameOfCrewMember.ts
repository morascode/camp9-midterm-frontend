import { MovieDetailDbResponse } from './types';

export function returnNameOfCrewMember(
  crewMember: 'Director' | 'Screenplay',
  data: MovieDetailDbResponse
) {
  let crewMemberObject = data.credits.crew.set.find(i => i.job === crewMember);
  if (typeof crewMemberObject !== 'undefined') {
    return crewMemberObject.name;
  } else {
    return '(not found)';
  }
}
